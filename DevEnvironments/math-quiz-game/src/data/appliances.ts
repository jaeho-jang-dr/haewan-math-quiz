import { Appliance } from '@/types'

export const appliances: Record<string, Appliance> = {
  // 🌀 선풍기 & 바람 시리즈 (8종)
  fan1: {
    name: '탁상용 선풍기',
    icon: '🌀',
    image: '💻',
    description: '작고 귀여운 데스크 선풍기',
    requirement: '레벨 1 완료',
    color: 'from-blue-400 to-cyan-300',
    category: 'fan',
    rarity: 'common'
  },
  fan2: {
    name: '스탠드 선풍기',
    icon: '💨',
    image: '🏢',
    description: '시원한 바람을 만드는 타워형 선풍기',
    requirement: '레벨 2 완료',
    color: 'from-green-400 to-emerald-300',
    category: 'fan',
    rarity: 'common'
  },
  fan3: {
    name: '타워 선풍기',
    icon: '❄️',
    image: '🏗️',
    description: '세련된 디자인의 고급 선풍기',
    requirement: '레벨 3 완료',
    color: 'from-purple-400 to-violet-300',
    category: 'fan',
    rarity: 'common'
  },
  fan4: {
    name: '천장 선풍기',
    icon: '🌪️',
    image: '🎪',
    description: '천장에 달린 멋진 대형 선풍기',
    requirement: '완벽한 점수',
    color: 'from-yellow-400 to-orange-300',
    category: 'fan',
    rarity: 'rare'
  },
  mini_fan: {
    name: 'USB 미니선풍기',
    icon: '⚡',
    image: '📱',
    description: '휴대용 작은 USB 선풍기',
    requirement: '연속 5문제 정답',
    color: 'from-pink-400 to-rose-300',
    category: 'fan',
    rarity: 'common'
  },
  wall_fan: {
    name: '벽걸이 선풍기',
    icon: '🔄',
    image: '🏠',
    description: '벽에 설치하는 공간절약 선풍기',
    requirement: '연속 8문제 정답',
    color: 'from-teal-400 to-cyan-400',
    category: 'fan',
    rarity: 'rare'
  },
  exhaust_fan: {
    name: '환풍기',
    icon: '🌊',
    image: '🏢',
    description: '공기를 순환시키는 환풍기',
    requirement: '레벨 4 완료',
    color: 'from-slate-400 to-gray-300',
    category: 'fan',
    rarity: 'common'
  },
  industrial_fan: {
    name: '산업용 선풍기',
    icon: '⚙️',
    image: '🏭',
    description: '강력한 바람의 산업용 선풍기',
    requirement: '선풍기 마스터',
    color: 'from-zinc-500 to-slate-400',
    category: 'fan',
    rarity: 'epic'
  },

  // 🍳 주방 가전 시리즈 (12종)
  blender: {
    name: '블렌더',
    icon: '🥤',
    image: '🍹',
    description: '맛있는 주스를 만드는 믹서기',
    requirement: '10문제 연속 정답',
    color: 'from-red-400 to-pink-300',
    category: 'kitchen',
    rarity: 'common'
  },
  coffee: {
    name: '커피머신',
    icon: '☕',
    image: '🏪',
    description: '향긋한 커피를 만드는 에스프레소 머신',
    requirement: '레벨 완주',
    color: 'from-amber-600 to-yellow-400',
    category: 'kitchen',
    rarity: 'rare'
  },
  toaster: {
    name: '토스터',
    icon: '🍞',
    image: '🥖',
    description: '바삭한 빵을 만드는 토스터기',
    requirement: '특별 도전',
    color: 'from-orange-400 to-red-300',
    category: 'kitchen',
    rarity: 'common'
  },
  microwave: {
    name: '전자레인지',
    icon: '🔥',
    image: '📺',
    description: '음식을 따뜻하게 하는 마이크로웨이브',
    requirement: '모든 레벨 클리어',
    color: 'from-indigo-400 to-blue-300',
    category: 'kitchen',
    rarity: 'rare'
  },
  rice_cooker: {
    name: '전기밥솥',
    icon: '🍚',
    image: '🍱',
    description: '맛있는 밥을 짓는 전기밥솥',
    requirement: '주방가전 3개 수집',
    color: 'from-green-500 to-emerald-400',
    category: 'kitchen',
    rarity: 'common'
  },
  air_fryer: {
    name: '에어프라이어',
    icon: '🍟',
    image: '🍤',
    description: '기름 없이 바삭하게 튀기는 기계',
    requirement: '연속 15문제 정답',
    color: 'from-yellow-500 to-orange-400',
    category: 'kitchen',
    rarity: 'rare'
  },
  mixer: {
    name: '믹서기',
    icon: '🥄',
    image: '🧁',
    description: '베이킹용 반죽을 만드는 믹서',
    requirement: '베이킹 도전 완료',
    color: 'from-pink-500 to-rose-400',
    category: 'kitchen',
    rarity: 'common'
  },
  juicer: {
    name: '착즙기',
    icon: '🍊',
    image: '🥤',
    description: '신선한 과일즙을 만드는 기계',
    requirement: '건강 도전 완료',
    color: 'from-orange-500 to-yellow-400',
    category: 'kitchen',
    rarity: 'common'
  },
  electric_kettle: {
    name: '전기포트',
    icon: '🫖',
    image: '☕',
    description: '빠르게 물을 끓이는 전기포트',
    requirement: '음료 도전 완료',
    color: 'from-blue-500 to-indigo-400',
    category: 'kitchen',
    rarity: 'common'
  },
  pressure_cooker: {
    name: '압력솥',
    icon: '🍲',
    image: '🥘',
    description: '빠르고 맛있게 요리하는 압력솥',
    requirement: '요리 마스터',
    color: 'from-red-500 to-orange-500',
    category: 'kitchen',
    rarity: 'rare'
  },
  food_processor: {
    name: '푸드프로세서',
    icon: '🥕',
    image: '🥗',
    description: '야채를 썰고 다지는 만능 기계',
    requirement: '야채 도전 완료',
    color: 'from-green-600 to-teal-500',
    category: 'kitchen',
    rarity: 'common'
  },
  dishwasher: {
    name: '식기세척기',
    icon: '🧽',
    image: '🍽️',
    description: '자동으로 설거지하는 편리한 기계',
    requirement: '청결 도전 완료',
    color: 'from-cyan-500 to-blue-500',
    category: 'kitchen',
    rarity: 'epic'
  },

  // ❄️ 냉장 & 냉각 시리즈 (7종)
  refrigerator: {
    name: '냉장고',
    icon: '🧊',
    image: '🏠',
    description: '음식을 신선하게 보관하는 대형 냉장고',
    requirement: '주방 마스터',
    color: 'from-blue-600 to-indigo-500',
    category: 'cooling',
    rarity: 'epic'
  },
  freezer: {
    name: '냉동고',
    icon: '❄️',
    image: '🧊',
    description: '음식을 얼려 보관하는 냉동고',
    requirement: '아이스 도전 완료',
    color: 'from-cyan-600 to-blue-600',
    category: 'cooling',
    rarity: 'rare'
  },
  ice_maker: {
    name: '제빙기',
    icon: '🧊',
    image: '❄️',
    description: '자동으로 얼음을 만드는 기계',
    requirement: '시원함 도전',
    color: 'from-cyan-400 to-blue-400',
    category: 'cooling',
    rarity: 'common'
  },
  wine_cooler: {
    name: '와인냉장고',
    icon: '🍷',
    image: '🍾',
    description: '와인을 최적 온도로 보관하는 고급 냉장고',
    requirement: '고급 도전 완료',
    color: 'from-purple-600 to-indigo-600',
    category: 'cooling',
    rarity: 'rare'
  },
  ice_cream_maker: {
    name: '아이스크림메이커',
    icon: '🍦',
    image: '🍨',
    description: '집에서 아이스크림을 만드는 기계',
    requirement: '달콤함 도전',
    color: 'from-pink-400 to-purple-400',
    category: 'cooling',
    rarity: 'common'
  },
  water_cooler: {
    name: '정수기',
    icon: '💧',
    image: '🚰',
    description: '깨끗하고 시원한 물을 제공하는 정수기',
    requirement: '건강 마스터',
    color: 'from-blue-400 to-cyan-400',
    category: 'cooling',
    rarity: 'common'
  },
  mini_fridge: {
    name: '미니냉장고',
    icon: '🧊',
    image: '📦',
    description: '작은 공간용 귀여운 미니냉장고',
    requirement: '작은 공간 마스터',
    color: 'from-teal-400 to-blue-400',
    category: 'cooling',
    rarity: 'common'
  },

  // 🧹 청소 가전 시리즈 (8종)
  robot_vacuum: {
    name: '로봇청소기',
    icon: '🤖',
    image: '🚁',
    description: '자동으로 청소하는 스마트 로봇',
    requirement: '스마트 도전 완료',
    color: 'from-gray-500 to-slate-400',
    category: 'cleaning',
    rarity: 'rare'
  },
  vacuum_cleaner: {
    name: '진공청소기',
    icon: '🧹',
    image: '🏠',
    description: '강력한 흡입력의 진공청소기',
    requirement: '청소 도전 시작',
    color: 'from-purple-500 to-violet-400',
    category: 'cleaning',
    rarity: 'common'
  },
  steam_cleaner: {
    name: '스팀청소기',
    icon: '💨',
    image: '🌫️',
    description: '뜨거운 증기로 깨끗하게 청소',
    requirement: '깔끔함 도전',
    color: 'from-blue-400 to-teal-400',
    category: 'cleaning',
    rarity: 'common'
  },
  mop_robot: {
    name: '물걸레로봇',
    icon: '🌊',
    image: '🏠',
    description: '자동으로 물걸레질하는 로봇',
    requirement: '로봇 컬렉터',
    color: 'from-cyan-500 to-blue-500',
    category: 'cleaning',
    rarity: 'rare'
  },
  carpet_cleaner: {
    name: '카펫청소기',
    icon: '🧽',
    image: '🏡',
    description: '카펫 전용 깊은 청소기',
    requirement: '바닥 마스터',
    color: 'from-brown-400 to-amber-400',
    category: 'cleaning',
    rarity: 'common'
  },
  window_cleaner: {
    name: '창문청소로봇',
    icon: '🪟',
    image: '🏢',
    description: '창문을 자동으로 닦는 로봇',
    requirement: '유리창 마스터',
    color: 'from-sky-400 to-blue-400',
    category: 'cleaning',
    rarity: 'rare'
  },
  pressure_washer: {
    name: '고압세척기',
    icon: '💦',
    image: '🚿',
    description: '강력한 물줄기로 청소하는 기계',
    requirement: '파워 청소',
    color: 'from-blue-600 to-cyan-600',
    category: 'cleaning',
    rarity: 'common'
  },
  dust_collector: {
    name: '집진기',
    icon: '🌪️',
    image: '🏭',
    description: '먼지를 완벽하게 수집하는 산업용 청소기',
    requirement: '산업 청소 마스터',
    color: 'from-gray-600 to-slate-600',
    category: 'cleaning',
    rarity: 'epic'
  },

  // 🌡️ 온도 조절 시리즈 (6종)
  air_conditioner: {
    name: '에어컨',
    icon: '❄️',
    image: '🏠',
    description: '시원한 바람으로 더위를 식혀주는 에어컨',
    requirement: '여름 마스터',
    color: 'from-blue-500 to-cyan-500',
    category: 'climate',
    rarity: 'rare'
  },
  heater: {
    name: '전기히터',
    icon: '🔥',
    image: '🌡️',
    description: '따뜻한 열로 추위를 물리치는 히터',
    requirement: '겨울 마스터',
    color: 'from-red-500 to-orange-500',
    category: 'climate',
    rarity: 'common'
  },
  humidifier: {
    name: '가습기',
    icon: '💧',
    image: '💨',
    description: '건조한 공기에 수분을 공급하는 가습기',
    requirement: '습도 조절 마스터',
    color: 'from-cyan-400 to-blue-400',
    category: 'climate',
    rarity: 'common'
  },
  dehumidifier: {
    name: '제습기',
    icon: '🌀',
    image: '💨',
    description: '습한 공기를 건조하게 만드는 제습기',
    requirement: '건조 마스터',
    color: 'from-orange-400 to-yellow-400',
    category: 'climate',
    rarity: 'common'
  },
  air_purifier: {
    name: '공기청정기',
    icon: '🌿',
    image: '🍃',
    description: '깨끗한 공기를 만드는 공기청정기',
    requirement: '공기 마스터',
    color: 'from-green-500 to-teal-500',
    category: 'climate',
    rarity: 'rare'
  },
  fan_heater: {
    name: '온풍기',
    icon: '🔥',
    image: '💨',
    description: '따뜻한 바람을 내보내는 온풍기',
    requirement: '따뜻함 마스터',
    color: 'from-red-400 to-pink-400',
    category: 'climate',
    rarity: 'common'
  },

  // 📱 스마트 가전 시리즈 (5종)
  smart_tv: {
    name: '스마트 TV',
    icon: '📺',
    image: '🖥️',
    description: '인터넷에 연결된 똑똑한 TV',
    requirement: '엔터테인먼트 마스터',
    color: 'from-slate-600 to-gray-600',
    category: 'smart',
    rarity: 'rare'
  },
  smart_speaker: {
    name: '스마트 스피커',
    icon: '🔊',
    image: '🎵',
    description: '목소리로 조작하는 AI 스피커',
    requirement: '음성 도전 완료',
    color: 'from-indigo-500 to-purple-500',
    category: 'smart',
    rarity: 'rare'
  },
  smart_light: {
    name: '스마트 조명',
    icon: '💡',
    image: '✨',
    description: '색깔과 밝기를 조절하는 스마트 전구',
    requirement: '조명 마스터',
    color: 'from-yellow-400 to-amber-400',
    category: 'smart',
    rarity: 'common'
  },
  smart_doorbell: {
    name: '스마트 초인종',
    icon: '🔔',
    image: '🏠',
    description: '카메라가 달린 똑똑한 초인종',
    requirement: '보안 마스터',
    color: 'from-blue-500 to-indigo-500',
    category: 'smart',
    rarity: 'rare'
  },
  smart_thermostat: {
    name: '스마트 온도조절기',
    icon: '🌡️',
    image: '📱',
    description: '자동으로 온도를 조절하는 스마트 기기',
    requirement: '자동화 마스터',
    color: 'from-green-500 to-blue-500',
    category: 'smart',
    rarity: 'epic'
  },

  // 👔 생활 편의 시리즈 (4종)
  iron: {
    name: '다리미',
    icon: '👔',
    image: '👕',
    description: '옷의 주름을 펴주는 다리미',
    requirement: '옷차림 마스터',
    color: 'from-gray-500 to-slate-500',
    category: 'lifestyle',
    rarity: 'common'
  },
  hair_dryer: {
    name: '드라이어',
    icon: '💇',
    image: '💨',
    description: '머리를 빠르게 말려주는 드라이어',
    requirement: '헤어 마스터',
    color: 'from-pink-500 to-rose-500',
    category: 'lifestyle',
    rarity: 'common'
  },
  electric_blanket: {
    name: '전기담요',
    icon: '🛏️',
    image: '🔥',
    description: '따뜻한 잠자리를 만들어주는 전기담요',
    requirement: '따뜻한 밤 마스터',
    color: 'from-blue-400 to-purple-400',
    category: 'lifestyle',
    rarity: 'common'
  },
  massager: {
    name: '안마기',
    icon: '💆',
    image: '🙌',
    description: '피로를 풀어주는 전기 안마기',
    requirement: '휴식 마스터',
    color: 'from-green-400 to-teal-400',
    category: 'lifestyle',
    rarity: 'rare'
  }
}