# 연오랑 3D 사무실 (yeonolang-office)

관제탑(stock-dashboard-live-6frm)과 겹치지 않는 **독립 PWA**로 설치하기 위한 저장소입니다.
원본은 `sd_live/public/study-3d.html` (Three.js 단일 HTML, 3D 사무실 — 25분 집중 타이머·할 일·시황 전광판·미니게임).

## 구성

| 파일 | 설명 |
| --- | --- |
| `index.html` | 3D 사무실 본체 (원본 study-3d.html → index.html) |
| `manifest.json` | 독립 앱 매니페스트 — `id`/`start_url`/`scope` 모두 저장소 루트, `display: standalone` |
| `sw.js` | 서비스 워커 (셸 캐시 · 오프라인 실행 · 설치 요건 충족) |
| `icon-192.png`, `icon-512.png` | PWA 아이콘 (유효한 PNG) |
| `data/latest-briefing.json` | 실시간 시세를 못 받을 때 쓰는 최신 브리핑 폴백 |

## 시세 데이터

- 실시간: `https://stock-dashboard-live-6frm.vercel.app/api/stock-live` (절대 주소, CORS 허용 `*`)
- 폴백: `data/latest-briefing.json`

## 배포

### Vercel (권장 — 완전 독립 도메인)
1. https://vercel.com/new → `hwen21c-tech/yeonolang-office` Import
2. Framework Preset: **Other**, Build Command 없음, Output Directory: **`.`(루트)**
3. Deploy → `https://yeonolang-office.vercel.app` 같은 전용 도메인 생성
4. 폰 브라우저에서 접속 → Chrome 메뉴 **앱 설치 / 홈 화면에 추가**

### GitHub Pages (미리보기)
`https://hwen21c-tech.github.io/yeonolang-office/` — Settings → Pages 가 `main` / root 로 켜져 있습니다.
Pages 주소에서도 설치할 수 있지만, 홈 화면 아이콘이 관제탑과 섞이지 않게 하려면 Vercel 전용 도메인 쪽을 쓰는 편이 좋습니다.
