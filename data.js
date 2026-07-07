// 레시피 데이터 (cuisine: 한식/양식/중식, occasion: 평소/특별한날)
// needsSide: true인 한식 메인요리는 반찬과 세트로 추천됨. 없으면 반찬 없이 그대로 한 그릇(일품) 메뉴.
// ingredients: {name, amount} 배열 (정확한 분량 표기)
// steps: 번호가 매겨진 조리 순서 배열 (단계별 소요시간 포함)
// time: 총 예상 조리시간
// brands: 양식 핵심 재료의 구매 가능 브랜드 추천 (선택)
export const RECIPES = [
  // 한식 - 일품(반찬 불필요)
  {
    cuisine:'한식', occasion:'평소', name:'계란볶음밥', time:'15분',
    ingredients:[{name:'밥',amount:'1공기(200g)'},{name:'계란',amount:'2개'},{name:'대파',amount:'1/4대'},{name:'간장',amount:'1큰술'},{name:'식용유',amount:'1큰술'}],
    steps:[
      '1. 대파를 잘게 썬다 (2분)',
      '2. 팬에 식용유를 두르고 대파를 볶아 향을 낸다 (2분)',
      '3. 밥을 넣고 골고루 볶는다 (3분)',
      '4. 계란을 풀어 넣고 재빨리 섞는다 (3분)',
      '5. 간장을 둘러 간을 맞추고 마무리한다 (2분)'
    ],
    tip:'찬밥을 쓰면 밥알이 흩어져 더 맛있습니다.'
  },
  {
    cuisine:'한식', occasion:'평소', name:'콩나물국밥', time:'15분',
    ingredients:[{name:'콩나물',amount:'150g'},{name:'밥',amount:'1공기(200g)'},{name:'계란',amount:'1개'},{name:'대파',amount:'1/4대'},{name:'국간장',amount:'1큰술'},{name:'물',amount:'2컵(400ml)'}],
    steps:[
      '1. 냄비에 물을 붓고 콩나물을 넣어 끓인다 (5분)',
      '2. 국간장으로 간을 맞춘다 (1분)',
      '3. 계란을 풀어 넣고 반숙으로 익힌다 (2분)',
      '4. 대파를 썰어 넣는다 (1분)',
      '5. 그릇에 밥을 담고 국물을 붓는다 (1분)'
    ],
    tip:'뚜껑을 열고 끓이면 콩나물 비린내가 줄어듭니다.'
  },

  // 한식 - 찌개/메인(반찬 세트 필요)
  {
    cuisine:'한식', occasion:'평소', name:'김치찌개', time:'25분', needsSide:true,
    ingredients:[{name:'김치',amount:'200g'},{name:'돼지고기',amount:'앞다리살 150g'},{name:'두부',amount:'150g'},{name:'대파',amount:'1/2대'},{name:'고춧가루',amount:'1큰술'},{name:'간장',amount:'1작은술'},{name:'다진마늘',amount:'1작은술'},{name:'식용유',amount:'1큰술'},{name:'물',amount:'2컵(400ml)'}],
    steps:[
      '1. 돼지고기와 김치를 한입 크기로 썬다 (3분)',
      '2. 냄비에 식용유를 두르고 돼지고기를 볶는다 (3분)',
      '3. 김치·고춧가루·다진마늘을 넣고 함께 볶는다 (3분)',
      '4. 물을 붓고 끓인다 (10분)',
      '5. 두부·대파를 넣고 간장으로 간을 맞춰 한소끔 더 끓인다 (5분)'
    ],
    tip:'신김치를 쓰면 더 깊은 맛이 납니다.'
  },
  {
    cuisine:'한식', occasion:'평소', name:'된장찌개', time:'20분', needsSide:true,
    ingredients:[{name:'된장',amount:'2큰술'},{name:'두부',amount:'150g'},{name:'애호박',amount:'1/3개'},{name:'양파',amount:'1/4개'},{name:'감자',amount:'1/2개'},{name:'물',amount:'2컵(400ml)'}],
    steps:[
      '1. 감자와 양파를 한입 크기로 썬다 (3분)',
      '2. 물에 된장을 풀어 끓인다 (2분)',
      '3. 감자와 양파를 넣고 끓인다 (7분)',
      '4. 두부와 애호박을 썰어 넣고 마저 끓인다 (5분)'
    ],
    tip:'멸치육수를 쓰면 깊은 맛이 더해집니다.'
  },
  {
    cuisine:'한식', occasion:'평소', name:'제육볶음', time:'25분', needsSide:true,
    ingredients:[{name:'돼지고기',amount:'앞다리살 250g'},{name:'고추장',amount:'1.5큰술'},{name:'간장',amount:'1큰술'},{name:'양파',amount:'1/2개'},{name:'대파',amount:'1/2대'},{name:'다진마늘',amount:'1작은술'},{name:'식용유',amount:'1큰술'}],
    steps:[
      '1. 고추장·간장·다진마늘을 섞어 양념장을 만든다 (2분)',
      '2. 돼지고기에 양념장을 버무려 재운다 (10분)',
      '3. 팬에 식용유를 두르고 양파를 볶는다 (2분)',
      '4. 재운 고기를 넣고 볶는다 (8분)',
      '5. 대파를 넣고 마무리한다 (3분)'
    ],
    tip:'재우는 시간이 길수록 양념이 잘 배입니다.'
  },

  {
    cuisine:'한식', occasion:'특별한날', name:'갈비찜', time:'90분',
    ingredients:[{name:'소갈비',amount:'800g'},{name:'간장',amount:'5큰술'},{name:'배',amount:'간 것 1/2개'},{name:'당근',amount:'1개'},{name:'밤',amount:'10알'},{name:'다진마늘',amount:'1큰술'},{name:'물',amount:'3컵(600ml)'}],
    steps:[
      '1. 갈비를 찬물에 담가 핏물을 뺀다 (30분)',
      '2. 끓는 물에 갈비를 5분간 데친 뒤 씻는다 (10분)',
      '3. 간장·간 배·다진마늘을 섞어 양념장을 만든다 (3분)',
      '4. 냄비에 갈비·양념장·물을 넣고 끓인다 (10분)',
      '5. 당근과 밤을 넣고 약불에서 오래 졸인다 (40분)'
    ],
    tip:'배를 갈아 넣으면 고기가 훨씬 부드러워집니다.'
  },
  {
    cuisine:'한식', occasion:'특별한날', name:'잡채', time:'40분',
    ingredients:[{name:'당면',amount:'150g'},{name:'시금치',amount:'100g'},{name:'당근',amount:'1/2개'},{name:'표고버섯',amount:'3개'},{name:'간장',amount:'3큰술'},{name:'설탕',amount:'1큰술'},{name:'참기름',amount:'1큰술'},{name:'식용유',amount:'1큰술'}],
    steps:[
      '1. 당면을 물에 담가 불린다 (30분, 다른 손질과 동시 진행)',
      '2. 당근·표고버섯은 채썰고 시금치는 데친다 (5분)',
      '3. 각 채소를 식용유에 따로 볶는다 (5분)',
      '4. 당면을 끓는 물에 삶는다 (7분)',
      '5. 삶은 당면에 간장·설탕·참기름을 넣고 볶는다 (3분)',
      '6. 볶은 채소와 당면을 함께 버무린다 (2분)'
    ],
    tip:'재료를 따로 볶아야 색과 식감이 살아있습니다.'
  },

  // 양식 (핵심 재료만, 브랜드 추천 포함)
  {
    cuisine:'양식', occasion:'평소', name:'토마토파스타', time:'20분',
    ingredients:[{name:'파스타면',amount:'200g'},{name:'토마토소스',amount:'300g'},{name:'다진마늘',amount:'1작은술'},{name:'올리브유',amount:'1큰술'},{name:'소금',amount:'약간'}],
    brands:[{item:'파스타면', options:['오뚜기','CJ 백설','바릴라','델라라니에리']},{item:'토마토소스', options:['오뚜기','청정원','하인즈','무티']}],
    steps:[
      '1. 끓는 물에 소금을 넣고 파스타면을 삶는다 (10분)',
      '2. 팬에 올리브유를 두르고 마늘을 볶는다 (2분)',
      '3. 토마토소스를 넣고 끓인다 (5분)',
      '4. 삶은 면을 넣고 버무린다 (3분)'
    ],
    tip:'면수를 조금 넣으면 소스가 더 부드럽게 어우러집니다.'
  },
  {
    cuisine:'양식', occasion:'평소', name:'크림파스타', time:'20분',
    ingredients:[{name:'파스타면',amount:'200g'},{name:'생크림',amount:'200ml',substitute:'생크림이 없으면 우유 200ml + 버터 20g으로 대체 가능'},{name:'베이컨',amount:'80g'},{name:'다진마늘',amount:'1작은술'},{name:'파마산치즈',amount:'2큰술',substitute:'파마산치즈가 없으면 체다치즈나 슬라이스치즈로 대체 가능'},{name:'소금',amount:'약간'},{name:'후추',amount:'약간'}],
    brands:[{item:'생크림', options:['서울우유','매일유업','엘르앤비르']},{item:'파마산치즈', options:['명작치즈','크래프트','대상']}],
    steps:[
      '1. 끓는 물에 파스타면을 삶는다 (10분)',
      '2. 팬에 베이컨과 마늘을 볶는다 (3분)',
      '3. 생크림을 넣고 약불에서 끓인다 (4분)',
      '4. 삶은 면과 파마산치즈를 넣고 버무린다 (3분)'
    ],
    tip:'약불에서 끓여야 크림이 분리되지 않습니다.'
  },
  {
    cuisine:'양식', occasion:'평소', name:'감자수프', time:'25분',
    ingredients:[{name:'감자',amount:'2개'},{name:'우유',amount:'300ml'},{name:'양파',amount:'1/4개'},{name:'버터',amount:'1큰술'},{name:'소금',amount:'약간'}],
    brands:[{item:'우유', options:['서울우유','매일우유','연세우유']},{item:'버터', options:['서울우유버터','앵커','대성']}],
    steps:[
      '1. 감자와 양파를 얇게 썬다 (3분)',
      '2. 냄비에 버터를 녹여 양파를 볶는다 (2분)',
      '3. 감자를 넣고 물을 부어 익힌다 (12분)',
      '4. 믹서로 곱게 간다 (3분)',
      '5. 우유를 넣고 소금으로 간하며 다시 끓인다 (5분)'
    ],
    tip:'감자를 완전히 익힌 뒤 갈아야 부드럽습니다.'
  },
  {
    cuisine:'양식', occasion:'평소', name:'그릴드치즈샌드위치', time:'10분',
    ingredients:[{name:'식빵',amount:'2장'},{name:'슬라이스치즈',amount:'2장'},{name:'버터',amount:'1큰술'}],
    brands:[{item:'식빵', options:['삼립','파리바게뜨','신라명과']},{item:'슬라이스치즈', options:['서울우유','매일유업','크래프트']}],
    steps:[
      '1. 식빵 사이에 치즈를 넣는다 (1분)',
      '2. 팬에 버터를 두르고 약불로 예열한다 (2분)',
      '3. 샌드위치를 올려 앞뒤로 노릇하게 굽는다 (7분)'
    ],
    tip:'약불에서 천천히 구워야 속까지 치즈가 녹습니다.'
  },
  {
    cuisine:'양식', occasion:'평소', name:'시저샐러드', time:'15분',
    ingredients:[{name:'양상추',amount:'1/2통'},{name:'닭가슴살',amount:'1쪽'},{name:'마요네즈',amount:'3큰술'},{name:'파마산치즈',amount:'2큰술',substitute:'파마산치즈가 없으면 체다치즈나 슬라이스치즈로 대체 가능'},{name:'레몬즙',amount:'1작은술',substitute:'레몬즙이 없으면 식초로 대체 가능'},{name:'다진마늘',amount:'약간'},{name:'후추',amount:'약간'}],
    brands:[{item:'마요네즈', options:['오뚜기','CJ 큐원','베스트푸드']}],
    steps:[
      '1. 닭가슴살을 소금·후추로 밑간해 팬에 굽는다 (8분)',
      '2. 마요네즈·파마산치즈·레몬즙·다진마늘을 섞어 드레싱을 만든다 (2분)',
      '3. 양상추를 한입 크기로 뜯는다 (2분)',
      '4. 구운 닭가슴살을 썬다 (2분)',
      '5. 양상추에 드레싱을 버무리고 닭가슴살을 올린다 (1분)'
    ],
    tip:'양상추는 물기를 완전히 제거해야 드레싱이 겉돌지 않습니다.'
  },
  {
    cuisine:'양식', occasion:'특별한날', name:'스테이크', time:'30분(실온 20분 포함)',
    ingredients:[{name:'소고기',amount:'등심 200g'},{name:'버터',amount:'1큰술'},{name:'다진마늘',amount:'1작은술'},{name:'소금',amount:'약간'},{name:'후추',amount:'약간'}],
    steps:[
      '1. 고기를 실온에 둔다 (20분)',
      '2. 소금과 후추로 밑간한다 (1분)',
      '3. 팬을 센 불로 달군다 (2분)',
      '4. 고기 겉면을 앞뒤로 굽는다 (4분)',
      '5. 버터와 마늘을 넣어 향을 입히며 마저 굽는다 (3분)',
      '6. 불을 끄고 레스팅한다 (3분)'
    ],
    tip:'굽고 나서 몇 분 레스팅하면 육즙이 덜 빠집니다.'
  },
  {
    cuisine:'양식', occasion:'특별한날', name:'라자냐', time:'70분',
    ingredients:[{name:'라자냐면',amount:'9장'},{name:'토마토소스',amount:'400g'},{name:'다진고기',amount:'300g'},{name:'생크림',amount:'200ml',substitute:'생크림이 없으면 우유 200ml + 버터 20g으로 대체 가능'},{name:'모짜렐라치즈',amount:'200g',substitute:'모짜렐라치즈가 없으면 슬라이스치즈나 체다치즈로 대체 가능'},{name:'양파',amount:'1/2개'},{name:'다진마늘',amount:'1작은술'}],
    brands:[{item:'토마토소스', options:['오뚜기','청정원','하인즈']},{item:'모짜렐라치즈', options:['서울우유','대상','전주비빔치즈']}],
    steps:[
      '1. 라자냐면을 끓는 물에 삶는다 (10분)',
      '2. 팬에 양파·마늘·다진고기를 볶는다 (8분)',
      '3. 토마토소스를 넣고 끓여 미트소스를 만든다 (10분)',
      '4. 생크림을 데워 크림소스를 만든다 (5분)',
      '5. 오븐 용기에 면·미트소스·크림소스·치즈 순으로 층을 쌓는다 (10분)',
      '6. 180도 오븐에서 굽는다 (25분)'
    ],
    tip:'층을 얇게 여러 번 쌓아야 골고루 익습니다. (베사멜소스 대신 생크림으로 단순화한 레시피입니다.)'
  },

  // 중식
  {
    cuisine:'중식', occasion:'평소', name:'마파두부', time:'15분',
    ingredients:[{name:'두부',amount:'300g'},{name:'다진고기',amount:'100g'},{name:'두반장',amount:'1큰술',substitute:'두반장이 없으면 고추장 1큰술 + 다진마늘 약간으로 대체 가능(맛은 다소 달라짐)'},{name:'대파',amount:'1/4대'},{name:'다진마늘',amount:'1작은술'},{name:'전분',amount:'1작은술 (물 2큰술과 섞어 전분물로 사용)'},{name:'물',amount:'1/2컵(100ml)'}],
    steps:[
      '1. 두부를 깍둑썰어 끓는 물에 살짝 데친다 (3분)',
      '2. 팬에 다진고기와 다진마늘을 볶는다 (3분)',
      '3. 두반장을 넣고 볶아 향을 낸다 (1분)',
      '4. 물을 붓고 두부를 넣어 끓인다 (5분)',
      '5. 전분물을 둘러 농도를 맞추고 대파를 올린다 (3분)'
    ],
    tip:'두부를 데쳐서 넣으면 부서지지 않습니다. (두반장은 대체 시 맛이 크게 달라져 그대로 사용합니다.)'
  },
  {
    cuisine:'중식', occasion:'평소', name:'짜장라면', time:'15분',
    ingredients:[{name:'라면',amount:'1개'},{name:'춘장',amount:'2큰술'},{name:'양파',amount:'1/4개'},{name:'돼지고기',amount:'50g'},{name:'전분',amount:'1작은술 (물 2큰술과 섞어 전분물로 사용)'},{name:'식용유',amount:'1큰술'}],
    steps:[
      '1. 팬에 식용유를 두르고 춘장을 볶아 향을 낸다 (2분)',
      '2. 양파와 돼지고기를 넣고 볶는다 (4분)',
      '3. 물을 소량 붓고 끓인다 (2분)',
      '4. 전분물을 둘러 농도를 맞춘다 (1분)',
      '5. 라면을 삶아 소스와 비빈다 (6분)'
    ],
    tip:'춘장은 미리 볶아야 쓴맛이 사라집니다.'
  },
  {
    cuisine:'중식', occasion:'평소', name:'볶음면', time:'15분',
    ingredients:[{name:'중화면',amount:'200g'},{name:'양배추',amount:'100g'},{name:'당근',amount:'1/4개'},{name:'굴소스',amount:'1큰술'},{name:'대파',amount:'1/4대'},{name:'식용유',amount:'1큰술'}],
    steps:[
      '1. 양배추와 당근을 채썬다 (3분)',
      '2. 중화면을 끓는 물에 삶는다 (3분)',
      '3. 팬에 식용유를 두르고 채소를 볶는다 (3분)',
      '4. 삶은 면을 넣고 굴소스로 간한다 (4분)',
      '5. 대파를 올려 마무리한다 (2분)'
    ],
    tip:'센 불에서 빠르게 볶아야 면이 뭉치지 않습니다.'
  },
  {
    cuisine:'중식', occasion:'평소', name:'계란탕', time:'10분',
    ingredients:[{name:'계란',amount:'2개'},{name:'전분',amount:'1작은술 (물 2큰술과 섞어 전분물로 사용)'},{name:'대파',amount:'1/4대'},{name:'치킨스톡',amount:'1작은술'},{name:'참기름',amount:'약간'}],
    steps:[
      '1. 물에 치킨스톡을 풀어 끓인다 (3분)',
      '2. 전분물을 둘러 농도를 낸다 (2분)',
      '3. 풀어둔 계란을 가늘게 흘려 넣는다 (2분)',
      '4. 대파와 참기름을 넣고 마무리한다 (3분)'
    ],
    tip:'계란을 넣고 바로 젓지 않아야 예쁜 계란꽃이 생깁니다.'
  },
  {
    cuisine:'중식', occasion:'평소', name:'두부계란볶음', time:'12분',
    ingredients:[{name:'두부',amount:'200g'},{name:'계란',amount:'2개'},{name:'대파',amount:'1/4대'},{name:'간장',amount:'1큰술'},{name:'식용유',amount:'1큰술'}],
    steps:[
      '1. 두부를 큼직하게 썬다 (2분)',
      '2. 팬에 식용유를 두르고 두부를 노릇하게 굽는다 (5분)',
      '3. 계란을 풀어 넣고 함께 볶는다 (3분)',
      '4. 간장과 대파를 넣어 마무리한다 (2분)'
    ],
    tip:'두부의 물기를 빼야 잘 부서지지 않습니다.'
  },
  {
    cuisine:'중식', occasion:'특별한날', name:'탕수육', time:'45분',
    ingredients:[{name:'돼지고기',amount:'안심 300g'},{name:'전분',amount:'5큰술'},{name:'식초',amount:'3큰술'},{name:'설탕',amount:'3큰술'},{name:'간장',amount:'1큰술'},{name:'물',amount:'1/2컵(100ml)'},{name:'식용유',amount:'튀김용 적당량'}],
    steps:[
      '1. 돼지고기를 한입 크기로 썰어 밑간한다 (5분)',
      '2. 고기에 전분을 두껍게 묻힌다 (5분)',
      '3. 170도 기름에 1차로 튀긴다 (5분)',
      '4. 190도로 올려 2차로 바삭하게 튀긴다 (5분)',
      '5. 식초·설탕·간장·물을 끓여 소스를 만든다 (5분)',
      '6. 소스를 고기에 부어 버무리거나 따로 낸다 (2분)'
    ],
    tip:'소스는 따로 내면 바삭함이 오래 유지됩니다.'
  },
  {
    cuisine:'중식', occasion:'특별한날', name:'양장피', time:'30분',
    ingredients:[{name:'양장피',amount:'100g'},{name:'새우',amount:'10마리'},{name:'오이',amount:'1/2개'},{name:'당근',amount:'1/4개'},{name:'연겨자',amount:'1작은술'},{name:'식초',amount:'2큰술'},{name:'설탕',amount:'1큰술'},{name:'간장',amount:'1큰술'}],
    steps:[
      '1. 양장피를 찬물에 불린다 (10분)',
      '2. 새우를 데쳐 익힌다 (3분)',
      '3. 오이와 당근을 채썬다 (5분)',
      '4. 양장피를 끓는 물에 데쳐 헹군다 (5분)',
      '5. 연겨자·식초·설탕·간장을 섞어 소스를 만든다 (2분)',
      '6. 재료를 접시에 돌려 담고 소스를 곁들인다 (5분)'
    ],
    tip:'재료를 가늘게 채썰어야 보기도 좋고 먹기도 편합니다. (겨자소스는 연겨자 기반으로 단순화한 레시피입니다.)'
  }
];

// 한식 반찬 (needsSide 메인요리와 세트로 추천)
export const SIDES = [
  {
    name:'계란말이', time:'10분',
    ingredients:[{name:'계란',amount:'3개'},{name:'당근',amount:'약간'},{name:'대파',amount:'약간'},{name:'소금',amount:'약간'},{name:'식용유',amount:'1큰술'}],
    steps:[
      '1. 계란을 풀어 다진 당근·대파·소금을 섞는다 (2분)',
      '2. 팬에 기름을 두르고 약불로 예열한다 (1분)',
      '3. 계란물을 얇게 부어 익힌다 (2분)',
      '4. 반쯤 익으면 돌돌 말아 옆으로 밀어둔다 (2분)',
      '5. 남은 계란물을 부어가며 반복해 두툼하게 만든다 (3분)'
    ],
    tip:'약불에서 여러 번 나눠 부어야 층이 곱게 나옵니다.'
  },
  {
    name:'오이무침', time:'10분',
    ingredients:[{name:'오이',amount:'1개'},{name:'고춧가루',amount:'1작은술'},{name:'식초',amount:'1큰술'},{name:'설탕',amount:'1작은술'},{name:'다진마늘',amount:'약간'},{name:'소금',amount:'약간'}],
    steps:[
      '1. 오이를 얇게 썰어 소금에 절인다 (5분)',
      '2. 절인 오이의 물기를 짠다 (1분)',
      '3. 고춧가루·식초·설탕·다진마늘을 넣고 무친다 (4분)'
    ],
    tip:'무치기 직전에 절이면 오이의 아삭함이 살아있습니다.'
  },
  {
    name:'시금치나물', time:'10분',
    ingredients:[{name:'시금치',amount:'200g'},{name:'다진마늘',amount:'약간'},{name:'참기름',amount:'1작은술'},{name:'국간장',amount:'1작은술'},{name:'깨소금',amount:'약간'}],
    steps:[
      '1. 시금치를 끓는 물에 데친다 (2분)',
      '2. 찬물에 헹궈 물기를 짠다 (3분)',
      '3. 다진마늘·참기름·국간장·깨소금을 넣고 무친다 (5분)'
    ],
    tip:'데친 뒤 바로 찬물에 헹궈야 색이 선명하게 유지됩니다.'
  },
  {
    name:'멸치볶음', time:'10분',
    ingredients:[{name:'잔멸치',amount:'100g'},{name:'간장',amount:'1큰술'},{name:'설탕',amount:'1작은술'},{name:'다진마늘',amount:'약간'},{name:'식용유',amount:'1작은술'}],
    steps:[
      '1. 멸치를 마른 팬에 볶아 비린내를 날린다 (3분)',
      '2. 식용유를 두르고 다진마늘을 볶는다 (2분)',
      '3. 간장과 설탕을 넣고 윤기나게 볶는다 (5분)'
    ],
    tip:'멸치를 먼저 마른 팬에 볶으면 더 바삭해집니다.'
  },
  {
    name:'감자조림', time:'15분',
    ingredients:[{name:'감자',amount:'2개'},{name:'간장',amount:'2큰술'},{name:'설탕',amount:'1큰술'},{name:'식용유',amount:'1작은술'},{name:'깨소금',amount:'약간'}],
    steps:[
      '1. 감자를 도톰하게 썬다 (3분)',
      '2. 팬에 식용유를 두르고 감자 겉면을 익힌다 (4분)',
      '3. 간장·설탕·물을 넣고 조린다 (7분)',
      '4. 깨소금을 뿌려 마무리한다 (1분)'
    ],
    tip:'중불에서 천천히 조려야 감자가 부서지지 않습니다.'
  }
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
