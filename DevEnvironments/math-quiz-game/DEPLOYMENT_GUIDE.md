# 🚀 해완이의 수학 게임 - 배포 및 테스트 가이드

## 📊 현재 상태
✅ **웹 테스트**: `http://localhost:3000` (개발 서버 실행 중)  
✅ **빌드 완료**: `dist/` 폴더에 배포용 파일 생성  
✅ **PWA 준비**: 아이폰 홈화면 추가 가능  
✅ **압축 파일**: `haewan-math-game.tar.gz` (219KB)  

## 🌐 웹에서 바로 테스트하기

### 개발 서버 (권장)
```bash
npm run dev
# 접속: http://localhost:3000
```

### 빌드된 파일로 테스트
```bash
cd dist
python3 -m http.server 8080
# 접속: http://localhost:8080
```

## 📱 아이폰으로 옮기는 방법들

### 1. 무료 온라인 호스팅 (가장 쉬운 방법)

#### Netlify (추천 ⭐)
1. https://netlify.com 접속
2. "Sites" → "Add new site" → "Deploy manually"
3. `dist` 폴더 드래그&드롭
4. 자동으로 생성된 URL로 아이폰에서 접속
5. Safari에서 "홈화면에 추가"

#### Vercel
1. https://vercel.com 접속
2. "New Project" → "Browse all templates"
3. `dist` 폴더 업로드
4. 배포 완료 후 URL 확인

### 2. 파일 전송 방법

#### AirDrop (Mac → iPhone)
1. `haewan-math-game.tar.gz` 파일을 Mac에서 선택
2. AirDrop으로 iPhone에 전송
3. iPhone에서 "파일" 앱으로 압축 해제
4. `index.html`을 Safari로 열기

#### 이메일 전송
1. `haewan-math-game.tar.gz` 파일을 이메일에 첨부
2. iPhone에서 이메일 열기
3. 첨부파일 다운로드 후 압축 해제
4. Safari로 `index.html` 실행

#### 클라우드 저장소
- **iCloud Drive**: Mac에서 업로드 → iPhone에서 다운로드
- **Google Drive**: 파일 업로드 → 앱에서 다운로드
- **Dropbox**: 동일한 방식

### 3. GitHub Pages (무료 호스팅)
1. GitHub 저장소 생성
2. `dist` 폴더 내용을 저장소에 업로드
3. Settings → Pages → Source를 "Deploy from a branch"로 설정
4. `https://사용자명.github.io/저장소명` URL로 접속

## 🎯 테스트 체크리스트

### 웹 브라우저에서 확인
- [ ] 김해완 자동 추가됨
- [ ] "안녕 해완!" 환영 메시지 표시
- [ ] 음성 인사말 재생 (스피커 아이콘 클릭)
- [ ] 레벨 1~3 선택 가능
- [ ] 게임 플레이 정상 작동
- [ ] 성공/실패 메시지 선명하게 표시
- [ ] 메인메뉴 돌아가기 버튼 작동
- [ ] 점수 저장 및 불러오기

### 아이폰에서 확인
- [ ] 세로 모드에서 정상 표시
- [ ] 터치 반응 좋음
- [ ] Safe Area 적용 (노치 문제 없음)
- [ ] 음성 메시지 재생됨
- [ ] PWA로 홈화면 추가 가능
- [ ] 오프라인에서도 작동 (Service Worker)

## 🔧 기술 정보

### 빌드 결과
```
dist/index.html           1.75 kB
dist/assets/index.css    40.61 kB (7.09 kB gzipped)
dist/assets/index.js    209.61 kB (65.16 kB gzipped)
총 크기: ~252 kB (압축시 ~73 kB)
```

### PWA 기능
- ✅ 오프라인 캐시 (Service Worker)
- ✅ 홈화면 추가 가능
- ✅ 전체화면 모드
- ✅ iOS 메타태그 최적화

### 지원 브라우저
- **iOS Safari** 12.0+ (권장)
- **Chrome Mobile** 70+
- **Firefox Mobile** 65+

## 🎮 김해완을 위한 특별 기능

### 음성 메시지
- 환영 인사: "안녕 해완! 게임을 시작해 볼까?"
- 격려: "해완이 정말 잘하고 있어!"
- 위로: "괜찮아! 해완이는 할 수 있어!"

### 개인화 요소
- 자동 플레이어 등록
- 특별한 왕관 아이콘
- 맞춤형 메시지
- 한국어 음성 지원

---

🎉 **해완이의 수학 실력 향상을 응원합니다!** 🎉

📞 **문의사항이 있으시면 언제든 말씀해 주세요!**