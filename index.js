import express from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { RECIPES, SIDES, todaySeed, weekSeed, seededPick, seededPickMany } from './data.js';

const ILPUM_POOL = RECIPES.filter(r => r.occasion === '평소' && !(r.cuisine === '한식' && r.needsSide));
const HANSIK_SET_POOL = RECIPES.filter(r => r.cuisine === '한식' && r.occasion === '평소' && r.needsSide);

function filterPool(cuisine, occasion) {
  return RECIPES.filter(r =>
    (!cuisine || r.cuisine === cuisine) &&
    (!occasion || r.occasion === occasion)
  );
}

function combinedIngredients(recipe, sides) {
  const set = new Set(recipe.ingredients);
  (sides || []).forEach(s => s.ingredients.forEach(i => set.add(i)));
  return [...set];
}

function matchScore(ingredients, have) {
  if (!have || !have.length) return 0;
  const haveSet = new Set(have.map(s => s.trim()));
  const matched = ingredients.filter(i => haveSet.has(i));
  return matched.length / ingredients.length;
}

function diffIngredients(ingredients, have) {
  const haveSet = new Set((have || []).map(s => s.trim()));
  const already = ingredients.filter(i => haveSet.has(i));
  const toBuy = ingredients.filter(i => !haveSet.has(i));
  return { already, toBuy };
}

function marketLink(toBuy) {
  if (!toBuy.length) return null;
  return `https://search.shopping.naver.com/search/all?query=${encodeURIComponent(toBuy.join(' '))}`;
}

function createServer() {
  const server = new McpServer({ name: 'family-recipe', version: '1.0.0' });

  server.registerTool(
    'recommend_recipe',
    {
      title: '남은 재료 레시피 추천',
      description: 'Happy Family Operation(행복한 가정만들기 작전)의 레시피 추천 도구입니다. 지금 집에 있는 재료를 알려주면 그 재료를 가장 많이 활용할 수 있는 메뉴 하나를 정해주고, 한식 찌개류는 어울리는 반찬 1~2개도 함께 추천합니다. 이미 있는 재료와 추가로 구입해야 할 재료를 계산하고, 구입할 재료가 있으면 장보기 검색 링크도 안내합니다.',
      inputSchema: {
        ingredients: z.array(z.string()).optional().describe('지금 집에 있는 재료 목록 (선택, 없으면 오늘의 추천 메뉴로 안내)'),
        cuisine: z.enum(['한식', '양식', '중식']).optional().describe('원하는 요리 종류 (선택)'),
        occasion: z.enum(['평소', '특별한날']).optional().describe('평소 식사인지 특별한 날인지 (선택, 기본값 평소)')
      },
      annotations: {
        title: '남은 재료 레시피 추천',
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async ({ ingredients, cuisine, occasion }) => {
      const occ = occasion || '평소';
      let pool = filterPool(cuisine, occ);
      if (!pool.length) pool = filterPool(cuisine, null);
      if (!pool.length) pool = filterPool(null, null);

      let recipe;
      if (ingredients && ingredients.length) {
        const scored = pool.map(r => ({ r, score: matchScore(r.ingredients, ingredients) }));
        scored.sort((a, b) => b.score - a.score);
        recipe = scored[0].r;
      } else {
        const seed = todaySeed() + (cuisine ? cuisine.length : 0) + occ.length;
        recipe = seededPick(pool, seed);
      }

      let sides = [];
      if (recipe.cuisine === '한식' && recipe.needsSide) {
        const sideSeed = todaySeed() + recipe.name.length + (ingredients ? ingredients.length : 0);
        sides = seededPickMany(SIDES, sideSeed, 2);
      }

      const allIngredients = combinedIngredients(recipe, sides);
      const { already, toBuy } = diffIngredients(allIngredients, ingredients);

      const lines = [
        `🍳 추천 메뉴: ${recipe.name} (${recipe.cuisine} · ${recipe.occasion})`,
        `📋 조리법: ${recipe.steps}`,
        `💡 팁: ${recipe.tip}`
      ];

      sides.forEach(s => {
        lines.push(`🥗 반찬: ${s.name} — ${s.steps} (팁: ${s.tip})`);
      });

      if (ingredients && ingredients.length) {
        lines.push(
          already.length ? `✅ 이미 있는 재료: ${already.join(', ')}` : '✅ 이미 있는 재료: 없음',
          toBuy.length ? `🛒 추가로 구입할 재료: ${toBuy.join(', ')}` : '🛒 추가로 구입할 재료: 없음 (지금 있는 재료로 바로 가능해요!)'
        );
      } else {
        lines.push(`🧾 필요한 재료: ${allIngredients.join(', ')}`);
      }

      const link = marketLink(toBuy.length ? toBuy : (ingredients ? [] : allIngredients));
      if (link) lines.push(`🛍️ 장보기: ${link}`);

      lines.push('💡 이번 주 식단이 궁금하면 일주일 메뉴도 물어보세요.');

      return { content: [{ type: 'text', text: lines.join('\n') }] };
    }
  );

  server.registerTool(
    'weekly_menu',
    {
      title: '일주일 식단 추천',
      description: 'Happy Family Operation(행복한 가정만들기 작전)의 일주일 식단 추천 도구입니다. 아침 7끼, 저녁 7끼를 겹치지 않게 추천합니다. 아침과 특정 요리 종류 지정 시 저녁은 반찬 없는 한그릇 메뉴 위주로, 요리 종류를 지정하지 않으면 저녁 중 3일은 한식 찌개/메인과 반찬 세트로, 나머지는 중식·양식·한식 한그릇 메뉴로 다양하게 구성합니다. 이번 주(월~일) 동안은 같은 결과가 유지됩니다.',
      inputSchema: {
        cuisine: z.enum(['한식', '양식', '중식']).optional().describe('원하는 요리 종류 (선택, 없으면 여러 종류를 섞어서 추천)')
      },
      annotations: {
        title: '일주일 식단 추천',
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
      }
    },
    async ({ cuisine }) => {
      const seed = weekSeed() + (cuisine ? cuisine.length : 0);
      const days = ['월', '화', '수', '목', '금', '토', '일'];
      const SATURDAY = 5;
      const simpleDays = [0, 1, 2, 3, 4, 6]; // 토요일 제외 6일 = 간단한 메뉴, 토요일 = 특별한 날 메뉴

      const breakfastPool = cuisine ? filterPool(cuisine, '평소') : ILPUM_POOL;
      const breakfastSource = breakfastPool.length >= 7 ? breakfastPool : [...breakfastPool, ...breakfastPool, ...breakfastPool];
      const breakfast = seededPickMany(breakfastSource, seed + 1, 7);

      const dinner = new Array(7);
      const dinnerSides = new Array(7).fill(null);

      const specialPool = filterPool(cuisine, '특별한날');
      dinner[SATURDAY] = specialPool.length ? seededPick(specialPool, seed + 6) : seededPick(ILPUM_POOL, seed + 6);

      if (cuisine) {
        const dinnerPool = filterPool(cuisine, '평소');
        const dinnerSource = dinnerPool.length >= 6 ? dinnerPool : [...dinnerPool, ...dinnerPool, ...dinnerPool];
        const picks = seededPickMany(dinnerSource, seed + 2, 6);
        simpleDays.forEach((day, k) => { dinner[day] = picks[k]; });
      } else {
        const setCount = Math.min(HANSIK_SET_POOL.length, simpleDays.length);
        const setDays = new Set(seededPickMany(simpleDays, seed + 3, setCount));
        const setPicks = seededPickMany(HANSIK_SET_POOL, seed + 4, setCount);
        const ilpumPicks = seededPickMany(ILPUM_POOL, seed + 5, simpleDays.length - setCount);

        let setIdx = 0, ilpumIdx = 0;
        simpleDays.forEach(day => {
          if (setDays.has(day)) {
            dinner[day] = setPicks[setIdx++];
            const sideSeed = (seed + 1) * (day * 7 + 13) + 4001;
            dinnerSides[day] = seededPickMany(SIDES, sideSeed, 1);
          } else {
            dinner[day] = ilpumPicks[ilpumIdx++];
          }
        });
      }

      const lines = [`📅 이번 주 식단 추천${cuisine ? ` (${cuisine})` : ''}`, '', '[아침]'];
      breakfast.forEach((r, i) => lines.push(`${days[i]}요일: ${r.name} (${r.cuisine})`));
      lines.push('', '[저녁]');
      dinner.forEach((r, i) => {
        const sideText = dinnerSides[i] && dinnerSides[i].length ? ` + 반찬: ${dinnerSides[i].map(s => s.name).join(', ')}` : '';
        lines.push(`${days[i]}요일: ${r.name} (${r.cuisine}${r.occasion === '특별한날' ? ' · 특별한 날 메뉴' : ''})${sideText}`);
      });
      lines.push('', '💡 재료가 남았다면 recommend_recipe로 오늘 뭐 먹을지 바로 물어보세요.');

      return { content: [{ type: 'text', text: lines.join('\n') }] };
    }
  );

  return server;
}

const app = express();
app.use(express.json());

app.post('/mcp', async (req, res) => {
  try {
    const server = createServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    res.on('close', () => {
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    console.error('MCP request error:', err);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: { code: -32603, message: 'Internal server error' },
        id: null
      });
    }
  }
});

async function handleNoBody(req, res) {
  try {
    const server = createServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    res.on('close', () => {
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res);
  } catch (err) {
    console.error('MCP request error:', err);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: { code: -32603, message: 'Internal server error' },
        id: null
      });
    }
  }
}

app.get('/mcp', handleNoBody);
app.delete('/mcp', handleNoBody);

app.get('/health', (req, res) => res.json({ ok: true, name: 'family-recipe-mcp' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`family-recipe MCP server listening on port ${PORT}`);
  console.log(`MCP endpoint: http://localhost:${PORT}/mcp`);
});
