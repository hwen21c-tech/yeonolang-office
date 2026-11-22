# 연오랑 3D 사무실 (yeonolang-office)

관제탑(stock-dashboard-live-6frm)과 **별개 앱으로 설치**하기 위한 독립 PWA 저장소입니다.
원본은 `sd_live/public/study-3d.html` (Three.js 단일 HTML, 3D 사무실 — 25분 집중 타이머·할 일·시황 전광판·미니게임).

- 배포(GitHub Pages): https://hwen21c-tech.github.io/yeonolang-office/
- 설치: 폰 Chrome으로 위 주소를 열고 메뉴 → **앱 설치 / 홈 화면에 추가**
- 앱 식별자(manifest `id`)가 `https://hwen21c-tech.github.io/yeonolang-office/`라서 관제탑 앱(`stock-dashboard-live-6frm.vercel.app`)과 홈 화면에서 겹치지 않습니다.

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

## 배포 / 갱신

GitHub Pages는 **`gh-pages` 브랜치(루트)** 를 배포 소스로 쓰고 있습니다. `main`과 `gh-pages`는 같은 내용으로 유지하세요.

```bash
git push origin main
git push origin main:gh-pages     # Pages 반영
```

Pages 소스를 `main`으로 바꾸고 싶으면 저장소 Settings → Pages → Source에서 브랜치를 `main / (root)`로 바꾸면 됩니다(그 뒤 `gh-pages`는 지워도 됨).

### Vercel (선택 — 완전 독립 도메인)
1. https://vercel.com/new → `hwen21c-tech/yeonolang-office` Import
2. Framework Preset: **Other**, Build Command 없음, Output Directory: **루트**
3. Deploy → `https://yeonolang-office.vercel.app` 같은 전용 도메인
4. 폰에서 접속 후 **앱 설치** — 도메인이 다르므로 관제탑과 완전히 분리된 앱으로 설치됩니다.

## 최초 구성 메모
- 원본 `study-3d.html`에서 바꾼 곳: 관제탑 API 절대 주소 호출(정적 호스트에서도 실시간 시도, 실패 시 브리핑 JSON 폴백), `manifest`/`apple-touch-icon` 경로, 서비스 워커 등록.
