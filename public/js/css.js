(function () {
  // Avoid double-injection
  if (typeof window === 'undefined' || document.getElementById('vreden-css')) return;

  const css = `
/* VREDEN Shared Stylesheet (injected by css.js) */

/* Reset & base */
* { box-sizing: border-box; margin: 0; padding: 0; }
html,body { height: 100%; }
body {
  font-family: 'Poppins', 'Lato', Arial, sans-serif;
  background-color: #f5f6fb;
  color: #111;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.45;
}

/* Header / top bar common */
header {
  position: relative;
  right: 20px;
  left: 20px;
  top: -40px;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255,255,255,0.18);
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  border-radius: 14px;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.24);
}
header .logo {
  color: #fd21bb;
  font-weight: 700;
  text-decoration: none;
  font-size: 1.9rem;
  letter-spacing: 0.2px;
}
header ul { display: flex; gap: 8px; list-style: none; align-items: center; }
header ul li a {
  text-decoration: none;
  font-weight: 500;
  color: #000;
  padding: 8px 14px;
  border-radius: 24px;
  transition: all 180ms ease;
}
header ul li a:hover,
header ul li a.active {
  background: #fff;
  box-shadow: 0 6px 18px rgba(0,0,0,0.08);
}

/* Shared container used by many pages */
.vr-container, .container {
  position: relative;
  z-index: 1;
  padding: 36px;
  max-width: 1100px;
  margin: 40px auto;
  background: rgba(255,255,255,0.28);
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0,0,0,0.05);
  backdrop-filter: blur(6px);
}

/* Content block */
.content {
  max-width: 760px;
  padding: 32px;
  border-radius: 12px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.12);
}

/* Buttons / CTAs */
.vr-btn, .content a, .btn {
  display: inline-block;
  padding: 10px 20px;
  background: #fff;
  color: #000;
  border-radius: 28px;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
}

/* Social icons vertical bar */
.sci {
  position: absolute;
  right: -25px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
}
.sci li a {
  text-decoration: none;
  width: 50px; height: 50px;
  background: #fff;
  display:flex; justify-content:center; align-items:center;
  border-radius: 50%;
  box-shadow: 0 8px 18px rgba(0,0,0,0.08);
  transition: transform .25s ease;
}
.sci li a:hover { transform: translateY(-6px) rotate(6deg); }

/* Responsive tweaks */
@media (max-width: 992px) {
  header { top: -60px; padding: 16px; left: 0; right: 0; flex-direction: column; gap: 10px; }
  .vr-container, .container { width: calc(100% - 24px); padding: 20px; margin-top: 18px; }
  .sci { position: relative; right: 0; flex-direction: row; gap: 12px; margin-top: 14px; left: 0; }
  .content { padding: 22px; }
}

/* Update page (.log items) */
.log {
  background: rgba(255,255,255,0.06);
  border-radius: 10px;
  padding: 18px;
  margin: 18px 0;
  backdrop-filter: blur(8px);
  transition: opacity .45s ease, transform .45s ease;
  opacity: 0;
  transform: translateY(18px);
  color: #f7f7f7;
}
.log.visible { opacity: 1; transform: translateY(0); }
.log .date { font-size: 13px; color: #d1d1d1; margin-bottom: 10px; display:block; }
.image-preview { max-width: 100%; border-radius: 6px; display:block; margin: 8px 0 12px; }

/* Loading overlay */
#loading {
  position: fixed; inset: 0;
  display:flex; align-items:center; justify-content:center;
  background: rgba(30,30,47,0.98);
  z-index: 9999;
}
#loading .spinner-border {
  width: 3rem; height: 3rem;
  border-width: .35rem;
  color: #fff;
}

/* 404 / svg animations helpers */
@keyframes swing {
  0% { transform: rotate(8deg); } 100% { transform: rotate(-8deg); }
}
@keyframes swinghair {
  0% { transform: rotate(5deg); } 100% { transform: rotate(-5deg); }
}

/* Utility */
.text-muted { color: #8b8b8b; }
.center { text-align: center; }
.mb-1 { margin-bottom: .5rem; }
.mb-2 { margin-bottom: .75rem; }
.mb-3 { margin-bottom: 1rem; }
.mt-1 { margin-top: .5rem; }
.p-2 { padding: .5rem; }

/* Dark theme helper (applies when .vrd-dark on body) */
body.vrd-dark {
  background-color: #0f0f16;
  color: #eaeaea;
}
body.vrd-dark header { background: rgba(0,0,0,0.35); border-color: rgba(255,255,255,0.04); }
body.vrd-dark .vr-container, body.vrd-dark .container { background: rgba(20,20,30,0.42); box-shadow: 0 10px 30px rgba(0,0,0,0.6); border-color: rgba(255,255,255,0.03); }
body.vrd-dark .vr-btn, body.vrd-dark .content a { background: #0a0a0a; color: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.6); }
`;

  const style = document.createElement('style');
  style.id = 'vreden-css';
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);

  // Expose small API for dynamic theme toggling
  window.VREDEN_CSS = {
    enableDark: function () {
      document.body.classList.add('vrd-dark');
      // persist preference
      try { localStorage.setItem('vreden_theme', 'dark'); } catch (e) {}
    },
    disableDark: function () {
      document.body.classList.remove('vrd-dark');
      try { localStorage.setItem('vreden_theme', 'light'); } catch (e) {}
    },
    toggleDark: function () {
      document.body.classList.toggle('vrd-dark');
      try { localStorage.setItem('vreden_theme', document.body.classList.contains('vrd-dark') ? 'dark' : 'light'); } catch (e) {}
    },
    injected: true
  };

  // Auto-apply saved theme preference
  try {
    const pref = localStorage.getItem('vreden_theme');
    if (pref === 'dark') window.VREDEN_CSS.enableDark();
  } catch (e) {}

  // Common DOM-ready helper to add "visible" class to .log elements when they appear
  (function observeLogs() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.log').forEach(el => el.classList.add('visible'));
      return;
    }
    const logs = document.querySelectorAll('.log');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    }, { threshold: 0.12 });
    logs.forEach(l => io.observe(l));
  })();

  // UMD-ish export for Node environments bundling this file
  try {
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = { cssText: css };
    }
  } catch (e) {}

})();
