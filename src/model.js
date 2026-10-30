export const categories = [
 {name:'식비',value:384000,color:'#0847ff',icon:'food',desc:'배달, 외식, 카페테리아 등',change:18},
 {name:'쇼핑',value:278000,color:'#30dba3',icon:'bag',desc:'온라인몰, 패션, 리빙',change:-4},
 {name:'교통',value:156000,color:'#ffa9ad',icon:'train',desc:'대중교통, 택시, 주유',change:0},
 {name:'카페/간식',value:120000,color:'#b7beff',icon:'cup',desc:'카페, 디저트, 베이커리',change:6},
 {name:'생활',value:110000,color:'#dadfff',icon:'home',desc:'관리비, 통신비, 정기구독',change:0},
 {name:'기타',value:200000,color:'#7d8093',icon:'dots',desc:'의료, 문화생활, 모임회비',change:-2}
];
export const cards = [
 {id:'dream',name:'신한카드 Deep Dream',short:'Deep Dream',type:'신용',used:700000,target:1000000,color:'#0752ff',tag:'외식 / 마트',benefit:'전 가맹점 기본 적립 + 외식 / 마트',fit:'상',annual:10000},
 {id:'life',name:'신한카드 Mr.Life',short:'Mr.Life',type:'신용',used:320000,target:400000,color:'#78879f',tag:'생활 / 공과금',benefit:'공과금, 병원/약국, 온라인쇼핑 할인',fit:'중',annual:15000},
 {id:'id',name:'삼성 iD ON 카드',short:'iD ON',type:'신용',used:210000,target:200000,color:'#bd355e',tag:'쇼핑 / 배달',benefit:'온라인 쇼핑, 배달앱 혜택',fit:'상',annual:20000},
 {id:'nori',name:'KB 노리2 체크카드',short:'NORI 2',type:'체크',used:98000,target:50000,color:'#00bca0',tag:'교통 / 카페',benefit:'대중교통, 통신비 관련 할인',fit:'중',annual:0}
];
export const transactions=[
 {shop:'GS25 편의점',amount:18500,loss:1850,card:'dream',date:'10.24 19:42',reason:'해당 카드 편의점 월간 혜택 한도 초과',tip:'KB 노리2로 결제했다면 1,850원 할인 가능',icon:'bag'},
 {shop:'스타벅스 강남점',amount:24000,loss:4800,card:'life',date:'10.20 14:15',reason:'전월 실적 미달로 할인 조건 미충족',tip:'실적 조건과 월 한도를 결제 전에 확인해 보세요.',icon:'cup'},
 {shop:'쿠팡 로켓배송',amount:56000,loss:5600,card:'dream',date:'10.15 09:30',reason:'쇼핑 부문 월 적립 횟수 초과',tip:'삼성 iD ON으로 결제했다면 5,600원 할인 가능',icon:'bag'},
 {shop:'파리바게뜨',amount:22500,loss:2250,card:'life',date:'10.08 18:20',reason:'전월 실적 미달로 베이커리 업종 혜택 제외',tip:'보유 카드와 멤버십의 중복 적용 여부를 확인하세요.',icon:'food'}
];
export const won=n=>Math.round(n).toLocaleString('ko-KR');
export const total=categories.reduce((s,c)=>s+c.value,0);
export function predict({months=1,extra=0,selected=categories.map(c=>c.name),method='all'}) {
 const base=categories.filter(c=>selected.includes(c.name)).reduce((s,c)=>s+c.value,0);
 const factor=method==='credit'?.92:method==='check'?.08:1;
 return Array.from({length:months},(_,i)=>Math.round(base*factor*(1.08+i*.025)+(i===0?extra:0)));
}
