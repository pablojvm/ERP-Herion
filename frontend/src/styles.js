const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');

  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;}

  :root{
    --red:#b91c1c; --red2:#dc2626; --red-dark:#7a0000;
    --bg:#f2f4f7; --white:#fff; --surf:#f7f8fa;
    --b:#e2e6ea; --b2:#cdd2d8;
    --t:#1a1d23; --t2:#5a6278; --t3:#9aa0b0;
    --blue:#1a56db; --blue2:#3b82f6; --bl:#eff6ff;
    --green:#15803d; --gl:#f0fdf4;
    --amber:#d97706; --violet:#7c3aed;
    --font:'Nunito',system-ui,sans-serif;
    --mono:'JetBrains Mono',monospace;
    --nav-h:56px; --tab-h:60px;
    --sidebar-w:260px;
  }

  html,body,#root{height:100%;overflow:hidden;}
  body{font-family:var(--font);background:var(--bg);color:var(--t);font-size:14px;-webkit-font-smoothing:antialiased;}

  /* ── APP SHELL ─────────────────────────────────────────────────────── */
  .app{
    display:flex;flex-direction:column;height:100%;
    background:var(--bg);position:relative;overflow:hidden;
  }

  /* Mobile: max-width centrado */
  @media (max-width: 767px) {
    .app{max-width:430px;margin:0 auto;box-shadow:0 0 40px rgba(0,0,0,.15);}
  }

  /* ── NAVBAR ────────────────────────────────────────────────────────── */
  .navbar{
    background:linear-gradient(135deg,var(--red-dark),var(--red),#b91c1c);
    color:#fff;height:var(--nav-h);display:flex;align-items:center;
    padding:0 16px;gap:10px;flex-shrink:0;
    box-shadow:0 2px 12px rgba(176,28,28,.4);
    position:relative;z-index:10;
  }
  .navbar-btn{
    width:36px;height:36px;border-radius:10px;
    background:rgba(255,255,255,.15);display:flex;align-items:center;
    justify-content:center;cursor:pointer;border:none;color:#fff;font-size:18px;
    flex-shrink:0;
  }
  .navbar-title{flex:1;font-size:15px;font-weight:800;letter-spacing:-.2px;}
  .navbar-sub{font-size:10px;opacity:.75;font-weight:500;}
  .bell-dot{position:absolute;top:6px;right:6px;width:8px;height:8px;
    background:#fbbf24;border-radius:50%;border:2px solid var(--red);}

  /* Tablet+: ocultar hamburger, mostrar logo */
  @media (min-width: 768px) {
    .navbar-hamburger{display:none !important;}
    .navbar{padding:0 24px;}
  }

  /* ── LAYOUT PRINCIPAL (tablet+) ────────────────────────────────────── */
  .app-body{
    flex:1;display:flex;overflow:hidden;
  }

  /* ── SIDEBAR (tablet+) ──────────────────────────────────────────────── */
  .sidebar{
    display:none;
  }

  @media (min-width: 768px) {
    .sidebar{
      display:flex;flex-direction:column;
      width:var(--sidebar-w);flex-shrink:0;
      background:var(--white);border-right:1px solid var(--b);
      overflow-y:auto;overflow-x:hidden;
    }
    .sidebar::-webkit-scrollbar{width:4px;}
    .sidebar::-webkit-scrollbar-thumb{background:var(--b2);border-radius:2px;}
  }

  .sidebar-header{
    background:linear-gradient(135deg,var(--red-dark),var(--red));
    color:#fff;padding:20px 16px 16px;flex-shrink:0;
  }
  .sidebar-logo{font-size:18px;font-weight:900;letter-spacing:-.5px;}
  .sidebar-sub{font-size:10px;opacity:.8;margin-top:2px;}
  .sidebar-user{display:flex;align-items:center;gap:10px;margin-top:14px;}
  .sidebar-avatar{
    width:36px;height:36px;border-radius:10px;
    background:rgba(255,255,255,.25);display:flex;align-items:center;
    justify-content:center;font-size:14px;font-weight:800;flex-shrink:0;
  }
  .sidebar-nav{flex:1;padding:8px 0;}
  .sidebar-section{
    padding:10px 14px 4px;font-size:9px;font-weight:800;
    color:var(--t3);text-transform:uppercase;letter-spacing:1px;
  }
  .sidebar-item{
    display:flex;align-items:center;gap:10px;padding:10px 14px;
    cursor:pointer;color:var(--t2);font-size:13px;font-weight:600;
    transition:background .1s;border-right:3px solid transparent;
  }
  .sidebar-item:hover{background:var(--bl);color:var(--blue);}
  .sidebar-item.on{background:var(--bl);color:var(--red);border-right-color:var(--red);}

  /* ── SCREEN / CONTENIDO ─────────────────────────────────────────────── */
  .screen{
    flex:1;overflow-y:auto;overflow-x:hidden;
    -webkit-overflow-scrolling:touch;
    padding-bottom:8px;
  }
  .screen::-webkit-scrollbar{width:6px;}
  .screen::-webkit-scrollbar-thumb{background:var(--b2);border-radius:3px;}

  /* Desktop: contenido central con max-width */
  @media (min-width: 1024px) {
    .screen-inner{
      max-width:860px;
      margin:0 auto;
      padding:0 8px;
    }
  }

  /* ── PANEL DERECHO (solo desktop) ──────────────────────────────────── */
  .right-panel{display:none;}

  @media (min-width: 1024px) {
    .right-panel{
      display:flex;flex-direction:column;
      width:280px;flex-shrink:0;
      background:var(--white);border-left:1px solid var(--b);
      overflow-y:auto;padding:16px 14px;gap:12px;
    }
    .right-panel::-webkit-scrollbar{width:4px;}
    .right-panel::-webkit-scrollbar-thumb{background:var(--b2);border-radius:2px;}
    .rp-title{font-size:10px;font-weight:800;color:var(--t3);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;}
  }

  /* ── BOTTOM TAB BAR (solo móvil) ────────────────────────────────────── */
  .tabbar{
    height:var(--tab-h);background:var(--white);border-top:1px solid var(--b);
    display:flex;flex-shrink:0;box-shadow:0 -4px 20px rgba(0,0,0,.06);
  }
  @media (min-width: 768px) {
    .tabbar{display:none;}
  }
  .tabitem{
    flex:1;display:flex;flex-direction:column;align-items:center;
    justify-content:center;gap:3px;cursor:pointer;border:none;
    background:none;color:var(--t3);font-family:var(--font);transition:color .15s;
  }
  .tabitem.on{color:var(--red);}
  .tabitem-icon{font-size:20px;line-height:1;}
  .tabitem-label{font-size:9.5px;font-weight:700;letter-spacing:.2px;}

  /* ── DRAWER (solo móvil) ────────────────────────────────────────────── */
  .drawer-overlay{position:absolute;inset:0;background:rgba(0,0,0,.5);z-index:50;}
  .drawer{
    position:absolute;left:0;top:0;bottom:0;width:80%;
    background:var(--white);z-index:51;display:flex;flex-direction:column;
    overflow:hidden;box-shadow:4px 0 24px rgba(0,0,0,.2);
  }
  @media (min-width: 768px) {
    .drawer-overlay,.drawer{display:none !important;}
  }
  .drawer-header{background:linear-gradient(135deg,var(--red-dark),var(--red));color:#fff;padding:40px 20px 20px;}
  .drawer-logo{font-size:22px;font-weight:900;letter-spacing:-.5px;}
  .drawer-sub{font-size:11px;opacity:.8;margin-top:2px;}
  .drawer-user{display:flex;align-items:center;gap:10px;margin-top:16px;}
  .drawer-avatar{width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,.25);
    display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;}
  .drawer-nav{flex:1;overflow-y:auto;padding:12px 0;}
  .drawer-section{padding:12px 16px 4px;font-size:9.5px;font-weight:800;color:var(--t3);text-transform:uppercase;letter-spacing:1px;}
  .drawer-item{display:flex;align-items:center;gap:12px;padding:12px 16px;cursor:pointer;
    color:var(--t2);font-size:13.5px;font-weight:600;transition:background .1s;}
  .drawer-item:hover,.drawer-item.on{background:var(--bl);color:var(--blue);}
  .drawer-item.on{border-right:3px solid var(--red);color:var(--red);}

  /* ── COMMON LAYOUT ──────────────────────────────────────────────────── */
  .section{padding:16px 16px 0;}
  .section-title{font-size:11px;font-weight:800;color:var(--t2);text-transform:uppercase;
    letter-spacing:.5px;margin-bottom:10px;}
  .card{background:var(--white);border-radius:14px;padding:14px;
    box-shadow:0 2px 8px rgba(0,0,0,.06);margin-bottom:10px;}

  /* KPI grid: 2 col móvil → 4 col tablet+ */
  .kpi-grid{
    display:grid;grid-template-columns:1fr 1fr;
    gap:10px;padding:0 16px;margin-bottom:10px;
  }
  @media (min-width: 768px) {
    .kpi-grid{grid-template-columns:repeat(4,1fr);}
  }

  .kpi{background:var(--white);border-radius:12px;padding:12px 12px 10px;
    box-shadow:0 2px 8px rgba(0,0,0,.06);position:relative;overflow:hidden;}
  .kpi::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--kc,var(--red));}
  .kpi-label{font-size:9.5px;color:var(--t2);font-weight:700;text-transform:uppercase;letter-spacing:.4px;margin-bottom:3px;}
  .kpi-value{font-size:21px;font-weight:900;font-family:var(--mono);color:var(--kc,var(--red));line-height:1;margin-bottom:3px;}
  .kpi-sub{font-size:9.5px;color:var(--t3);}

  /* List */
  .list-item{display:flex;align-items:center;gap:12px;padding:12px 14px;border-bottom:1px solid var(--b);}
  .list-item:last-child{border-bottom:none;}
  .list-avatar{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;
    justify-content:center;font-size:16px;font-weight:800;color:#fff;flex-shrink:0;}
  .list-content{flex:1;min-width:0;}
  .list-title{font-size:13.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .list-sub{font-size:11px;color:var(--t2);margin-top:2px;}

  /* Accesos rápidos: 4 col móvil → 8 col tablet+ */
  .quick-grid{
    display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px;
  }
  @media (min-width: 768px) {
    .quick-grid{grid-template-columns:repeat(8,1fr);}
  }

  /* PILL */
  .pill{display:inline-flex;align-items:center;padding:3px 9px;border-radius:20px;font-size:10.5px;font-weight:700;}
  .pill-g{background:#dcfce7;color:#166534;} .pill-r{background:#fee2e2;color:#991b1b;}
  .pill-b{background:#dbeafe;color:#1e40af;} .pill-a{background:#fef3c7;color:#92400e;}
  .pill-v{background:#ede9fe;color:#5b21b6;}

  /* PROGRESS */
  .prog-wrap{background:#e5e7eb;border-radius:4px;height:6px;overflow:hidden;}
  .prog-fill{height:100%;border-radius:4px;transition:width .4s;}

  /* STRIP */
  .strip{background:linear-gradient(135deg,var(--red-dark),var(--red));margin:0 16px 10px;
    border-radius:14px;padding:14px;color:#fff;display:flex;justify-content:space-between;align-items:center;}
  .strip-label{font-size:10px;opacity:.8;font-weight:600;}
  .strip-value{font-size:19px;font-weight:900;font-family:var(--mono);}

  /* HTABS */
  .htabs{display:flex;overflow-x:auto;gap:8px;padding:0 16px 12px;scrollbar-width:none;}
  .htabs::-webkit-scrollbar{display:none;}
  .htab{padding:7px 16px;border-radius:20px;font-size:12px;font-weight:700;cursor:pointer;
    white-space:nowrap;border:none;font-family:var(--font);background:var(--white);color:var(--t2);
    box-shadow:0 1px 4px rgba(0,0,0,.08);flex-shrink:0;}
  .htab.on{background:var(--red);color:#fff;}

  /* BUTTONS */
  .btn{border:none;border-radius:12px;padding:13px;font-size:13.5px;font-weight:800;cursor:pointer;
    font-family:var(--font);display:flex;align-items:center;justify-content:center;
    gap:7px;width:100%;margin-bottom:8px;}
  .btn-red{background:linear-gradient(135deg,var(--red),#dc2626);color:#fff;box-shadow:0 4px 14px rgba(176,28,28,.35);}
  .btn-blue{background:linear-gradient(135deg,var(--blue),var(--blue2));color:#fff;}
  .btn-ghost{background:var(--surf);color:var(--t2);border:1.5px solid var(--b);}

  /* SEARCH */
  .search-bar{margin:0 16px 12px;background:var(--white);border-radius:12px;
    display:flex;align-items:center;gap:10px;padding:10px 14px;
    box-shadow:0 2px 8px rgba(0,0,0,.05);}
  .search-input{flex:1;border:none;outline:none;font-size:14px;font-family:var(--font);background:transparent;}

  /* FORM */
  .form-group{margin-bottom:14px;}
  .form-label{font-size:11px;font-weight:700;color:var(--t2);margin-bottom:5px;
    text-transform:uppercase;letter-spacing:.4px;display:block;}
  .form-input,.form-select{width:100%;border:1.5px solid var(--b);border-radius:10px;
    padding:12px 14px;font-size:14px;font-family:var(--font);outline:none;}
  .form-input:focus,.form-select:focus{border-color:var(--red);}

  /* ALERT */
  .alert-card{border-radius:12px;padding:12px 14px;display:flex;
    align-items:flex-start;gap:10px;margin-bottom:8px;}
  .alert-r{background:#fee2e2;} .alert-a{background:#fef3c7;} .alert-g{background:#f0fdf4;}
  .alert-text{font-size:12.5px;font-weight:700;}
  .alert-sub{font-size:11px;color:var(--t2);margin-top:2px;}

  /* MODAL */
  .modal-overlay{position:absolute;inset:0;background:rgba(0,0,0,.5);z-index:60;display:flex;align-items:flex-end;}
  .modal-sheet{background:var(--white);border-radius:20px 20px 0 0;width:100%;
    max-height:90%;overflow-y:auto;padding:20px;}
  @media (min-width: 768px) {
    .modal-overlay{align-items:center;justify-content:center;}
    .modal-sheet{border-radius:20px;max-width:560px;max-height:80vh;}
  }
  .modal-handle{width:36px;height:4px;background:var(--b2);border-radius:2px;margin:0 auto 16px;}
  .modal-title{font-size:16px;font-weight:900;margin-bottom:16px;}
`;

export default CSS;