// 레시피 데이터 (cuisine: 한식/양식/중식, occasion: 평소/특별한날)
// needsSide: true인 한식 메인요리는 반찬과 세트로 추천됨. 없으면 반찬 없이 그대로 한 그릇(일품) 메뉴.
export const RECIPES = [
  // 한식 - 일품(반찬 불필요)
  {cuisine:'한식', occasion:'평소', name:'계란볶음밥', ingredients:['밥','계란','대파','간장','식용유'], steps:'대파를 잘게 썰어 기름에 볶다가 밥을 넣고 볶는다. 계란을 풀어 넣고 골고루 섞은 뒤 간장으로 간한다.', tip:'찬밥을 쓰면 밥알이 흩어져 더 맛있습니다.'},
  {cuisine:'한식', occasion:'평소', name:'콩나물국밥', ingredients:['콩나물','밥','계란','대파','국간장'], steps:'콩나물을 물에 넣고 끓인 뒤 국간장으로 간한다. 계란을 풀어 넣고 밥과 대파를 곁들인다.', tip:'뚜껑을 열고 끓이면 콩나물 비린내가 줄어듭니다.'},

  // 한식 - 찌개/메인(반찬 세트 필요)
  {cuisine:'한식', occasion:'평소', name:'김치찌개', ingredients:['김치','돼지고기','두부','대파','고춧가루'], steps:'김치와 돼지고기를 볶다가 물을 붓고 끓인다. 두부와 대파를 넣고 한소끔 더 끓인다.', tip:'신김치를 쓰면 더 깊은 맛이 납니다.', needsSide:true},
  {cuisine:'한식', occasion:'평소', name:'된장찌개', ingredients:['된장','두부','애호박','양파','감자'], steps:'물에 된장을 풀고 감자, 양파를 먼저 넣어 끓인다. 두부와 애호박을 넣고 마저 끓인다.', tip:'멸치육수를 쓰면 깊은 맛이 더해집니다.', needsSide:true},
  {cuisine:'한식', occasion:'평소', name:'제육볶음', ingredients:['돼지고기','고추장','양파','대파','마늘'], steps:'고추장 양념에 돼지고기를 재운다. 팬에 양파와 함께 볶다가 대파를 넣고 마무리한다.', tip:'재우는 시간이 길수록 양념이 잘 배입니다.', needsSide:true},

  {cuisine:'한식', occasion:'특별한날', name:'갈비찜', ingredients:['소갈비','간장','배','당근','밤'], steps:'갈비를 핏물 빼고 간장 양념에 재운다. 당근, 밤과 함께 물을 붓고 오래 졸인다.', tip:'배를 갈아 넣으면 고기가 훨씬 부드러워집니다.'},
  {cuisine:'한식', occasion:'특별한날', name:'잡채', ingredients:['당면','시금치','당근','버섯','간장'], steps:'당면을 삶아 간장 양념에 무친다. 각 채소는 따로 볶은 뒤 당면과 함께 버무린다.', tip:'재료를 따로 볶아야 색과 식감이 살아있습니다.'},

  // 양식
  {cuisine:'양식', occasion:'평소', name:'토마토파스타', ingredients:['파스타면','토마토소스','마늘','올리브유','양파'], steps:'마늘과 양파를 올리브유에 볶다가 토마토소스를 넣고 끓인다. 삶은 면과 버무린다.', tip:'면수를 조금 넣으면 소스가 더 부드럽게 어우러집니다.'},
  {cuisine:'양식', occasion:'평소', name:'크림파스타', ingredients:['파스타면','생크림','베이컨','양파','파마산치즈'], steps:'베이컨과 양파를 볶다가 생크림을 넣고 끓인다. 삶은 면을 넣고 치즈로 마무리한다.', tip:'약불에서 끓여야 크림이 분리되지 않습니다.'},
  {cuisine:'양식', occasion:'평소', name:'감자수프', ingredients:['감자','우유','양파','버터','소금'], steps:'감자와 양파를 버터에 볶다가 물을 붓고 익힌다. 갈아서 우유를 넣고 다시 끓인다.', tip:'감자를 완전히 익힌 뒤 갈아야 부드럽습니다.'},
  {cuisine:'양식', occasion:'평소', name:'그릴드치즈샌드위치', ingredients:['식빵','치즈','버터'], steps:'식빵 사이에 치즈를 넣고 버터 두른 팬에 앞뒤로 노릇하게 굽는다.', tip:'약불에서 천천히 구워야 속까지 치즈가 녹습니다.'},
  {cuisine:'양식', occasion:'평소', name:'시저샐러드', ingredients:['양상추','닭가슴살','파마산치즈','시저드레싱','크루통'], steps:'닭가슴살을 구워 썰고, 양상추와 함께 드레싱에 버무린다. 치즈와 크루통을 올린다.', tip:'양상추는 물기를 완전히 제거해야 드레싱이 겉돌지 않습니다.'},
  {cuisine:'양식', occasion:'특별한날', name:'스테이크', ingredients:['소고기','버터','마늘','로즈마리','후추'], steps:'고기를 실온에 두었다가 센 불에 겉면을 굽는다. 버터와 마늘, 로즈마리로 향을 입힌다.', tip:'굽고 나서 몇 분 레스팅하면 육즙이 덜 빠집니다.'},
  {cuisine:'양식', occasion:'특별한날', name:'라자냐', ingredients:['라자냐면','토마토소스','다진고기','치즈','베사멜소스'], steps:'면과 소스, 고기, 치즈를 켜켜이 쌓는다. 오븐에 넣어 치즈가 녹을 때까지 굽는다.', tip:'층을 얇게 여러 번 쌓아야 골고루 익습니다.'},

  // 중식
  {cuisine:'중식', occasion:'평소', name:'마파두부', ingredients:['두부','다진고기','두반장','대파','전분'], steps:'다진고기를 두반장과 볶다가 두부를 넣고 끓인다. 전분물로 농도를 맞춘다.', tip:'두부를 데쳐서 넣으면 부서지지 않습니다.'},
  {cuisine:'중식', occasion:'평소', name:'짜장라면', ingredients:['라면','춘장','양파','돼지고기','전분'], steps:'춘장을 기름에 볶아 향을 낸 뒤 양파, 돼지고기와 볶는다. 삶은 라면과 비빈다.', tip:'춘장은 미리 볶아야 쓴맛이 사라집니다.'},
  {cuisine:'중식', occasion:'평소', name:'볶음면', ingredients:['중화면','양배추','당근','굴소스','대파'], steps:'채소를 볶다가 삶은 면을 넣고 굴소스로 간한다.', tip:'센 불에서 빠르게 볶아야 면이 뭉치지 않습니다.'},
  {cuisine:'중식', occasion:'평소', name:'계란탕', ingredients:['계란','전분','대파','치킨스톡','참기름'], steps:'육수를 끓여 전분물로 농도를 낸다. 풀어둔 계란을 가늘게 흘려 넣는다.', tip:'계란을 넣고 바로 젓지 않아야 예쁜 계란꽃이 생깁니다.'},
  {cuisine:'중식', occasion:'평소', name:'두부계란볶음', ingredients:['두부','계란','대파','간장','식용유'], steps:'두부를 노릇하게 구운 뒤 계란물을 부어 함께 볶는다. 간장으로 간한다.', tip:'두부의 물기를 빼야 잘 부서지지 않습니다.'},
  {cuisine:'중식', occasion:'특별한날', name:'탕수육', ingredients:['돼지고기','전분','식초','설탕','간장'], steps:'고기에 전분을 묻혀 두 번 튀긴다. 새콤달콤 소스를 끓여 부어 완성한다.', tip:'소스는 따로 내면 바삭함이 오래 유지됩니다.'},
  {cuisine:'중식', occasion:'특별한날', name:'양장피', ingredients:['양장피','새우','오이','겨자소스','당근'], steps:'양장피를 삶아 채소, 새우와 함께 접시에 돌려 담는다. 겨자소스를 곁들인다.', tip:'재료를 가늘게 채썰어야 보기도 좋고 먹기도 편합니다.'}
];

// 한식 반찬 (needsSide 메인요리와 세트로 추천)
export const SIDES = [
  {name:'계란말이', ingredients:['계란','당근','대파','소금','식용유'], steps:'계란을 풀어 다진 당근, 대파, 소금을 섞는다. 팬에 얇게 부어 돌돌 말아가며 익힌다.', tip:'약불에서 여러 번 나눠 부어야 층이 곱게 나옵니다.'},
  {name:'오이무침', ingredients:['오이','고춧가루','식초','설탕','마늘'], steps:'오이를 얇게 썰어 소금에 절였다가 물기를 짠다. 고춧가루, 식초, 설탕, 마늘로 무친다.', tip:'무치기 직전에 절이면 오이의 아삭함이 살아있습니다.'},
  {name:'시금치나물', ingredients:['시금치','마늘','참기름','국간장','깨소금'], steps:'시금치를 데쳐 찬물에 헹군 뒤 물기를 짠다. 마늘, 참기름, 국간장, 깨소금으로 무친다.', tip:'데친 뒤 바로 찬물에 헹궈야 색이 선명하게 유지됩니다.'},
  {name:'멸치볶음', ingredients:['잔멸치','간장','설탕','마늘','식용유'], steps:'멸치를 마른 팬에 살짝 볶아 비린내를 날린다. 간장, 설탕, 마늘을 넣고 윤기나게 볶는다.', tip:'멸치를 먼저 마른 팬에 볶으면 더 바삭해집니다.'},
  {name:'감자조림', ingredients:['감자','간장','설탕','식용유','깨소금'], steps:'감자를 도톰하게 썰어 기름에 겉면을 익힌다. 간장, 설탕을 넣고 국물이 자작해질 때까지 조린다.', tip:'중불에서 천천히 조려야 감자가 부서지지 않습니다.'}
];

export function todaySeed(){
  const d = new Date();
  return d.getFullYear()*10000 + (d.getMonth()+1)*100 + d.getDate();
}

export function weekSeed(){
  const d = new Date();
  const day = d.getDay() === 0 ? 7 : d.getDay(); // 월=1 ... 일=7
  const monday = new Date(d);
  monday.setDate(d.getDate() - (day - 1));
  return monday.getFullYear()*10000 + (monday.getMonth()+1)*100 + monday.getDate();
}

export function seededPick(arr, seed){
  let s = seed;
  s = (s*9301+49297)%233280;
  const idx = Math.floor((s/233280) * arr.length);
  return arr[idx];
}

// 시드를 기반으로 배열에서 count개를 중복 없이 뽑음 (Fisher-Yates 유사, 결정적)
export function seededPickMany(arr, seed, count){
  const pool = [...arr];
  const picked = [];
  let s = seed;
  for (let i = 0; i < count && pool.length > 0; i++){
    s = (s*9301+49297)%233280;
    const idx = Math.floor((s/233280) * pool.length);
    picked.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return picked;
}
