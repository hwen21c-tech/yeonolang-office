/* 연오랑 3D 사무실 — 독립 PWA 서비스 워커
   · 셸(index·manifest·아이콘)은 캐시해 오프라인에서도 뜨게 한다.
   · 시세 API(다른 도메인)는 건드리지 않고, 브리핑 JSON 은 네트워크 우선.
*/
const VERSION = 'yeonolang-office-v1';
const SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './data/latest-briefing.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => c.addAll(SHELL))
      .catch(() => {})
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;      // 관제탑 API 등 외부 호출은 그대로 통과
  if (/\/api\//.test(url.pathname)) return;

  // 화면 이동: 네트워크 우선 → 실패하면 캐시된 셸
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // 그 밖의 같은 도메인 자원: 캐시 우선 + 뒤에서 갱신
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => hit);
      return hit || net;
    })
  );
});
