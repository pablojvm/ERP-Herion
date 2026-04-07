import React from "react";

// ── PILL ──────────────────────────────────────────────────────────────────
export const Pill = ({ c, children }) => (
  <span className={`pill pill-${c}`}>{children}</span>
);

// ── KPI CARD ──────────────────────────────────────────────────────────────
export const Kpi = ({ label, value, sub, color }) => (
  <div className="kpi" style={{ "--kc": color }}>
    <div className="kpi-label">{label}</div>
    <div className="kpi-value">{value}</div>
    <div className="kpi-sub">{sub}</div>
  </div>
);

// ── KPI GRID (wrapper 2 columnas) ─────────────────────────────────────────
export const KpiGrid = ({ children }) => (
  <div className="kpi-grid">{children}</div>
);

// ── PROGRESS BAR ─────────────────────────────────────────────────────────
export const Prog = ({ pct, color }) => (
  <div className="prog-wrap">
    <div className="prog-fill" style={{ width: `${pct}%`, background: color || "var(--blue)" }} />
  </div>
);

// ── STRIP (banner rojo con métricas) ─────────────────────────────────────
export const Strip = ({ left, leftValue, right, rightValue }) => (
  <div className="strip">
    <div>
      <div className="strip-label">{left}</div>
      <div className="strip-value">{leftValue}</div>
    </div>
    <div style={{ textAlign: "right" }}>
      <div className="strip-label">{right}</div>
      <div className="strip-value">{rightValue}</div>
    </div>
  </div>
);

// ── HORIZONTAL TABS ───────────────────────────────────────────────────────
export const HTabs = ({ tabs, active, onChange }) => (
  <div className="htabs">
    {tabs.map(([id, label]) => (
      <button
        key={id}
        className={`htab ${active === id ? "on" : ""}`}
        onClick={() => onChange(id)}
      >
        {label}
      </button>
    ))}
  </div>
);

// ── SEARCH BAR ────────────────────────────────────────────────────────────
export const SearchBar = ({ value, onChange, placeholder = "Buscar..." }) => (
  <div className="search-bar">
    <span style={{ fontSize: 17, color: "var(--t3)" }}>🔍</span>
    <input
      className="search-input"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    {value && (
      <span
        style={{ cursor: "pointer", color: "var(--t3)" }}
        onClick={() => onChange("")}
      >✕</span>
    )}
  </div>
);

// ── ALERT CARD ────────────────────────────────────────────────────────────
export const AlertCard = ({ tipo, ico, txt, sub }) => (
  <div className={`alert-card alert-${tipo}`}>
    <div style={{ fontSize: 18, flexShrink: 0 }}>{ico}</div>
    <div>
      <div className="alert-text">{txt}</div>
      <div className="alert-sub">{sub}</div>
    </div>
  </div>
);

// ── SECTION HEADER ────────────────────────────────────────────────────────
export const SectionHeader = ({ title, prefix, style }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, ...style }}>
    <div style={{ fontWeight: 900, fontSize: 18 }}>{title}</div>
    {prefix && (
      <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)" }}>{prefix}</span>
    )}
  </div>
);

// ── BTN ───────────────────────────────────────────────────────────────────
export const Btn = ({ variant = "red", children, onClick, style }) => (
  <button
    className={`btn btn-${variant}`}
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
);

// ── ROW DETAIL (campo: valor) ─────────────────────────────────────────────
export const FieldRow = ({ field, value, last }) => (
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 0", borderBottom: last ? "none" : "1px solid var(--b)"
  }}>
    <span style={{ fontSize: 10, color: "var(--t3)", fontFamily: "var(--mono)" }}>{field}</span>
    <span style={{ fontSize: 13, fontWeight: 700, maxWidth: "55%", textAlign: "right" }}>{value}</span>
  </div>
);

// ── EMPTY STATE ───────────────────────────────────────────────────────────
export const Empty = ({ icon = "🔍", text = "Sin resultados" }) => (
  <div style={{ textAlign: "center", padding: "32px 20px", color: "var(--t2)" }}>
    <div style={{ fontSize: 40, marginBottom: 10 }}>{icon}</div>
    <div style={{ fontSize: 14, fontWeight: 600 }}>{text}</div>
  </div>
);

// ── BACK BUTTON ───────────────────────────────────────────────────────────
export const BackBtn = ({ onBack, title }) => (
  <div style={{ padding: "16px 16px 0", display: "flex", gap: 10, alignItems: "center" }}>
    <button
      onClick={onBack}
      style={{
        border: "none", background: "var(--white)", borderRadius: 10,
        width: 36, height: 36, cursor: "pointer", fontSize: 18,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)"
      }}
    >←</button>
    <div style={{ fontWeight: 800, fontSize: 16 }}>{title}</div>
  </div>
);

// ── LIST ITEM ─────────────────────────────────────────────────────────────
export const ListItem = ({ color, initial, title, sub, right, onClick }) => (
  <div className="list-item" style={{ cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
    <div className="list-avatar" style={{ background: color }}>{initial}</div>
    <div className="list-content">
      <div className="list-title">{title}</div>
      {sub && <div className="list-sub">{sub}</div>}
    </div>
    {right && <div style={{ flexShrink: 0 }}>{right}</div>}
  </div>
);
