import express from 'express';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { z } from 'zod';
import { RECIPES, todaySeed, weekSeed, seededPick, seededPickMany } from './data.js';

function filterPool(cuisine, occasion) {
  return RECIPES.filter(r =>
    (!cuisine || r.cuisine === cuisine) &&
    (!occasion || r.occasion === occasion)
  );
}

function matchScore(recipe, have) {
  if (!have || !have.length) return 0;
  const haveSet = new Set(have.map(s => s.trim()));
  const matched = recipe.ingredients.filter(i => haveSet.has(i));
  return matched.length / recipe.ingredients.length;
}

function diffIngredients(recipe, have) {
  const haveSet = new Set((have || []).map(s => s.trim()));
  const already = recipe.ingredients.filter(i => haveSet.has(i));
  const toBuy = recipe.ingredients.filter(i => !haveSet.has(i));
  return { already, toBuy };
}

function createServer() {
  const server = new McpServer({ name: 'family-recipe', version: '1.0.0' });

  server.registerTool(
    'recommend_recipe',
    {
      title: '남은 재료 레시피 추천',
      description: 'Happy Family Operation(행복한 가정만들기 작전)의 레시피 추천 도구입니다. 지금 집에 있는 재료를 알려주면 그 재료를 가장 많이 활용할 수 있는 레시피 하나를 정해주고, 이미 있는 재료와 추가로 구입해야 할 재료를 정확히 계산해서 알려줍니다.',
      inputSchema: {
        ingredients: z.array(z.string()).optional().describe('지금 집에 있는 재료 목록 (선택, 없으면 오늘의 추천 메뉴로 안내)'),
        cuisine: z.enum(['한식', '양식', '일식', '중식']).optional().describe('원하는 요리 종류 (선택)'),
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
        const scored = pool.map(r => ({ r, score: matchScore(r, ingredients) }));
        scored.sort((a, b) => b.score - a.score);
        recipe = scored[0].r;
      } else {
        const seed = todaySeed() + (cuisine ? cuisine.length : 0) + occ.length;
        recipe = seededPick(pool, seed);
      }

      const { already, toBuy } = diffIngredients(recipe, ingredients);

      const lines = [
        `🍳 추천 메뉴: ${recipe.name} (${recipe.cuisine} · ${recipe.occasion})`,
        `📋 조리법: ${recipe.steps}`,
        `💡 팁: ${recipe.tip}`
      ];

      if (ingredients && ingredients.length) {
        lines.push(
          already.length ? `✅ 이미 있는 재료: ${already.join(', ')}` : '✅ 이미 있는 재료: 없음',
          toBuy.length ? `🛒 추가로 구입할 재료: ${toBuy.join(', ')}` : '🛒 추가로 구입할 재료: 없음 (지금 있는 재료로 바로 가능해요!)'
        );
      } else {
        lines.push(`🧾 필요한 재료: ${recipe.ingredients.join(', ')}`);
      }

      lines.push('💡 이번 주 식단이 궁금하면 일주일 메뉴도 물어보세요.');

      return { content: [{ type: 'text', text: lines.join('\n') }] };
    }
  );

  server.registerTool(
    'weekly_menu',
    {
      title: '일주일 식단 추천',
      description: 'Happy Family Operation(행복한 가정만들기 작전)의 일주일 식단 추천 도구입니다. 원하는 요리 종류를 알려주면 7일치 메뉴를 겹치지 않게 한 번에 추천합니다. 이번 주(월~일) 동안은 같은 결과가 유지됩니다.',
      inputSchema: {
        cuisine: z.enum(['한식', '양식', '일식', '중식']).optional().describe('원하는 요리 종류 (선택, 없으면 전체에서 골고루 추천)')
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
      const pool = filterPool(cuisine, null);
      const seed = weekSeed() + (cuisine ? cuisine.length : 0);
      const picks = seededPickMany(pool, seed, 7);
      const days = ['월', '화', '수', '목', '금', '토', '일'];

      const lines = picks.map((r, i) => `${days[i]}요일: ${r.name} (${r.cuisine}${r.occasion === '특별한날' ? ' · 특별한 날 메뉴' : ''})`);

      return {
        content: [{
          type: 'text',
          text: [`📅 이번 주 식단 추천${cuisine ? ` (${cuisine})` : ''}`, ...lines, '💡 재료가 남았다면 recommend_recipe로 오늘 뭐 먹을지 바로 물어보세요.'].join('\n')
        }]
      };
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
