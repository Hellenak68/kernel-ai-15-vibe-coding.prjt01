# 주간 레시피 플래너 - 1인 가구를 위한 맞춤 식단 서비스

## 🍽️ 프로젝트 소개

1인 가구 사용자가 '오늘 뭐 먹지?' 고민 없이, 집에 있는 재료를 활용해 1주일치 1인분 맞춤 레시피·장보기 리스트·영양 정보를 한 번에 받아볼 수 있는 웹 애플리케이션입니다.

## ✨ 주요 기능

### 🗓️ 주간 맞춤 레시피 추천
- AI 기반 주간 식단 자동 추천
- 아침, 점심, 저녁, 간식별 레시피 관리
- 주간/월간 캘린더 뷰

### 🥬 냉장고 재료 관리
- 재료 추가, 수정, 삭제
- 카테고리별 분류 (채소, 육류, 유제품, 곡물, 양념 등)
- 유통기한 알림 및 관리

### 🛒 스마트 장보기 리스트
- 주간 레시피 기반 자동 재료 리스트 생성
- 카테고리별 정리 및 체크리스트
- 예상 구매 비용 계산

### 📚 레시피 데이터베이스
- 500+ 1인분 맞춤 레시피
- 난이도별 분류 (초급, 중급, 고급)
- 태그 기반 검색 및 필터링
- 즐겨찾기 기능

### 📊 영양 정보 트래킹
- 칼로리, 단백질, 탄수화물, 지방 등 상세 영양 정보
- 일일 영양 섭취량 시각화
- 건강한 식단 관리 지원

## 🚀 기술 스택

- **Frontend**: React 18 + TypeScript
- **Styling**: CSS3 + Custom CSS Variables
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Build Tool**: Vite
- **Package Manager**: npm

## 📱 반응형 디자인

- 모바일, 태블릿, 데스크톱 최적화
- 터치 친화적 UI/UX
- 한국어 최적화 (Noto Sans KR 폰트)

## 🛠️ 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 빌드
```bash
npm run build
```

### 4. 미리보기
```bash
npm run preview
```

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   └── Header.tsx     # 네비게이션 헤더
├── pages/              # 페이지 컴포넌트
│   ├── Home.tsx       # 메인 홈페이지
│   ├── WeeklyPlan.tsx # 주간 레시피 계획
│   ├── Pantry.tsx     # 냉장고 관리
│   ├── Recipes.tsx    # 레시피 검색
│   └── ShoppingList.tsx # 장보기 리스트
├── types/              # TypeScript 타입 정의
│   └── index.ts       # 인터페이스 및 타입
├── App.tsx            # 메인 앱 컴포넌트
├── main.tsx           # 앱 진입점
└── index.css          # 전역 스타일
```

## 🎯 타겟 사용자

- **1순위**: 자취 초보 20·30대 직장인
- **2순위**: 헬스·다이어트 중인 1인 가구

## 💡 핵심 가치

1. **시간 절약**: 주간 식단 계획 시간 50% 단축
2. **음식 낭비 방지**: 1인분 정확한 분량 제공
3. **건강한 식단**: 영양 균형 잡힌 레시피 추천
4. **편의성**: 장보기부터 조리까지 원스톱 서비스

## 🔮 향후 로드맵

- [ ] 챗봇 레시피 Q&A (OpenAI API 연동)
- [ ] 알레르기·식이 제한 기능
- [ ] SNS 공유 기능
- [ ] 광고/구독 수익화
- [ ] 모바일 앱 개발

## 📊 성공 지표

- WAU (Weekly Active Users) 1,000명 확보
- 추천 레시피 열람률 향상
- 쇼핑 리스트 생성률 증가
- 재방문율 30% 이상 달성

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

**레시피플래너**로 더 이상 '오늘 뭐 먹을지' 고민하지 마세요! 🎉
