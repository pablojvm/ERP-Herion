import React, { useState, useEffect } from "react";
import CSS from "./styles.js";
import { NAV_MODULES, BOTTOM_TABS, DRAWER_SECTIONS, ALERTAS } from "./data.js";
import Dashboard    from "./Dashboard.jsx";
import Personal     from "./Personal.jsx";
import Nominas      from "./Nominas.jsx";
import Cuadrantes   from "./Cuadrantes.jsx";
import Contabilidad from "./Contabilidad.jsx";
import Clientes     from "./Clientes.jsx";
import Login        from "./Login.jsx";
import { PRL, Vehiculos, BI } from "./ModuloGenerico.jsx";
import { me } from "./api/auth.js";

// ── HOOK: detectar breakpoint ─────────────────────────────────────────────
function useBreakpoint() {
  const [bp, setBp] = useState(() => window.innerWidth);
  useEffect(() => {
    const fn = () => setBp(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return { isMobile: bp < 768, isTablet: bp >= 768 && bp < 1024, isDesktop: bp >= 1024 };
}

// ── DRAWER (solo móvil) ───────────────────────────────────────────────────
function Drawer({ active, user, onNavigate, onClose, onLogout }) {
  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <div className="drawer-header">
          <div className="drawer-logo">e-Satellite®</div>
          <div className="drawer-sub">GETP360 · v1.3.4.39</div>
          <div className="drawer-user">
            <div className="drawer-avatar">{user?.nombre?.charAt(0) || "?"}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{user?.nombre}</div>
              <div style={{ fontSize: 10, opacity: 0.75 }}>{user?.username} · {user?.rol}</div>
            </div>
          </div>
        </div>
        <div className="drawer-nav">
          {DRAWER_SECTIONS.map(sec => (
            <div key={sec.label}>
              <div className="drawer-section">{sec.label}</div>
              {sec.items.map(id => {
                const mod = NAV_MODULES.find(m => m.id === id);
                if (!mod) return null;
                return (
                  <div key={id} className={`drawer-item ${active === id ? "on" : ""}`}
                    onClick={() => { onNavigate(id); onClose(); }}>
                    <span style={{ width: 20, textAlign: "center" }}>{mod.icon}</span>
                    <span>{mod.label}</span>
                  </div>
                );
              })}
            </div>
          ))}
          <div className="drawer-section">Sistema</div>
          <div className="drawer-item" onClick={onLogout}>
            <span style={{ width: 20, textAlign: "center" }}>🚪</span>
            <span>Cerrar Sesión</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ── SIDEBAR (tablet + desktop) ────────────────────────────────────────────
function Sidebar({ active, user, onNavigate, onLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">🛡️ e-Satellite®</div>
        <div className="sidebar-sub">GETP360 · v1.3.4.39 · 22 módulos</div>
        <div className="sidebar-user">
          <div className="sidebar-avatar">{user?.nombre?.charAt(0) || "?"}</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{user?.nombre}</div>
            <div style={{ fontSize: 10, opacity: 0.75 }}>{user?.username}</div>
          </div>
        </div>
      </div>
      <div className="sidebar-nav">
        {/* Inicio */}
        <div
          className={`sidebar-item ${active === "dashboard" ? "on" : ""}`}
          onClick={() => onNavigate("dashboard")}
        >
          <span>🏠</span><span>Inicio</span>
        </div>

        {DRAWER_SECTIONS.map(sec => (
          <div key={sec.label}>
            <div className="sidebar-section">{sec.label}</div>
            {sec.items.map(id => {
              const mod = NAV_MODULES.find(m => m.id === id);
              if (!mod) return null;
              return (
                <div key={id} className={`sidebar-item ${active === id ? "on" : ""}`}
                  onClick={() => onNavigate(id)}>
                  <span style={{ width: 20, textAlign: "center" }}>{mod.icon}</span>
                  <span style={{ flex: 1 }}>{mod.label}</span>
                  {mod.prefix && (
                    <span style={{ fontSize: 9, fontFamily: "var(--mono)", color: "var(--t3)" }}>
                      {mod.prefix.split("_")[0]}_
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        <div className="sidebar-section">Sistema</div>
        <div className="sidebar-item" onClick={() => alert("⚙️ Configuración del sistema")}>
          <span>⚙️</span><span>Configuración</span>
        </div>
        <div className="sidebar-item" onClick={onLogout}>
          <span>🚪</span><span>Cerrar Sesión</span>
        </div>
      </div>
    </div>
  );
}

// ── PANEL DERECHO (solo desktop) ──────────────────────────────────────────
function RightPanel() {
  const [read, setRead] = useState([]);
  return (
    <div className="right-panel">
      <div>
        <div className="rp-title">🔔 Alertas — {ALERTAS.length - read.length} pendientes</div>
        {ALERTAS.map((a, i) => (
          <div key={i} style={{
            opacity: read.includes(i) ? 0.35 : 1,
            background: a.tipo === "r" ? "#fee2e2" : "#fef3c7",
            borderRadius: 10, padding: "10px 12px", marginBottom: 8,
            display: "flex", gap: 8, alignItems: "flex-start", position: "relative"
          }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{a.ico}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, lineHeight: 1.3 }}>{a.txt}</div>
              <div style={{ fontSize: 10, color: "var(--t2)", marginTop: 2 }}>{a.sub}</div>
            </div>
            {!read.includes(i) && (
              <button onClick={() => setRead(p => [...p, i])} style={{
                border: "none", background: "transparent", cursor: "pointer",
                fontSize: 12, color: "var(--t3)", padding: 2, flexShrink: 0
              }}>✓</button>
            )}
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--b)", paddingTop: 12 }}>
        <div className="rp-title">🕐 Actividad Reciente</div>
        {[
          ["✅", "Cuadrante Abril aprobado", "Hace 8 min"],
          ["💶", "Nómina Marzo procesada",   "Hace 32 min"],
          ["⚠️", "Incidencia INC-1441",      "Hace 1h"],
          ["📄", "Factura F-0842 pagada",    "Hace 2h"],
        ].map(([ico, t, d], j) => (
          <div key={j} style={{
            display: "flex", gap: 8, alignItems: "flex-start",
            padding: "8px 0", borderBottom: j < 3 ? "1px solid var(--b)" : "none"
          }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>{ico}</span>
            <div>
              <div style={{ fontSize: 11.5, fontWeight: 600 }}>{t}</div>
              <div style={{ fontSize: 10, color: "var(--t2)" }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── VIEWS ─────────────────────────────────────────────────────────────────
const VIEWS = {
  dashboard:    (onNav) => <Dashboard onNav={onNav} />,
  cuadrantes:   ()      => <Cuadrantes />,
  personal:     ()      => <Personal />,
  nominas:      ()      => <Nominas />,
  contabilidad: ()      => <Contabilidad />,
  clientes:     ()      => <Clientes />,
  prl:          ()      => <PRL />,
  vehiculos:    ()      => <Vehiculos />,
  bi:           ()      => <BI />,
};

// ── APP ───────────────────────────────────────────────────────────────────
export default function App() {
  const [screen,   setScreen]   = useState("dashboard");
  const [drawer,   setDrawer]   = useState(false);
  const [user,     setUser]     = useState(null);
  const [checking, setChecking] = useState(true);
  const { isMobile, isDesktop } = useBreakpoint();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setChecking(false); return; }
    me()
      .then(u  => setUser(u))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setChecking(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setDrawer(false);
    setScreen("dashboard");
  };

  const mod = NAV_MODULES.find(m => m.id === screen);

  if (checking) {
    return (
      <>
        <style>{CSS}</style>
        <div className="app" style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 13, color: "var(--t2)" }}>Cargando...</div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <style>{CSS}</style>
        <div className="app"><Login onLogin={setUser} /></div>
      </>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="app">

        {/* Drawer solo móvil */}
        {isMobile && drawer && (
          <Drawer
            active={screen} user={user}
            onNavigate={setScreen}
            onClose={() => setDrawer(false)}
            onLogout={handleLogout}
          />
        )}

        {/* Top Navbar */}
        <div className="navbar">
          {/* Hamburger solo en móvil */}
          {isMobile && (
            <button className="navbar-btn navbar-hamburger" onClick={() => setDrawer(true)}>☰</button>
          )}
          <div style={{ flex: 1 }}>
            <div className="navbar-title">{mod?.icon} {mod?.label || "e-Satellite®"}</div>
            {mod?.prefix && <div className="navbar-sub">{mod.prefix}</div>}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="navbar-btn" style={{ position: "relative" }}
              onClick={() => alert("🔔 Alertas pendientes")}>
              🔔<span className="bell-dot" />
            </button>
          </div>
        </div>

        {/* Body: sidebar + screen + right panel */}
        <div className="app-body">

          {/* Sidebar tablet + desktop */}
          {!isMobile && (
            <Sidebar
              active={screen} user={user}
              onNavigate={setScreen}
              onLogout={handleLogout}
            />
          )}

          {/* Contenido principal */}
          <div className="screen" style={{ paddingTop: 16 }}>
            <div className="screen-inner">
              {(VIEWS[screen] ?? VIEWS.dashboard)(setScreen)}
            </div>
          </div>

          {/* Panel derecho solo desktop */}
          {isDesktop && <RightPanel />}

        </div>

        {/* Bottom tabbar solo móvil */}
        {isMobile && (
          <div className="tabbar">
            {BOTTOM_TABS.map(t => (
              <button key={t.id} className={`tabitem ${screen === t.id ? "on" : ""}`}
                onClick={() => setScreen(t.id)}>
                <span className="tabitem-icon">{t.icon}</span>
                <span className="tabitem-label">{t.label}</span>
              </button>
            ))}
          </div>
        )}

      </div>
    </>
  );
}