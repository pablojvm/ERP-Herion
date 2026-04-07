import React, { useState, useEffect } from "react";
import { Kpi, Strip, AlertCard } from "./components.jsx";
import { getCuadrantes }  from "./api/cuadrantes.js";
import { getNominas }     from "./api/nominas.js";
import { ALERTAS }        from "./data.js";

export default function Dashboard({ onNav }) {
  const [alertsRead, setAlertsRead] = useState([]);
  const [kpis, setKpis] = useState({
    cobertura: "…", sinCubrir: "…", nominas: "…", facturacion: "…"
  });

  useEffect(() => {
    Promise.allSettled([
      getCuadrantes("28/03/2026"),
      getNominas("Marzo 2026"),
    ]).then(([cuad, nom]) => {
      const rows = cuad.status === "fulfilled" ? cuad.value : [];
      const noms = nom.status  === "fulfilled" ? nom.value  : [];

      const realizados = rows.filter(r => r.estado === "realizado").length;
      const cobertura  = rows.length ? ((realizados / rows.length) * 100).toFixed(1) + "%" : "—";
      const sinCubrir  = rows.filter(r => r.estado === "pendiente").length;
      const facturacion = noms.reduce((s, n) => s + Number(n.devengado), 0);

      setKpis({
        cobertura,
        sinCubrir,
        nominas:     noms.length,
        facturacion: facturacion > 0 ? `€${(facturacion / 1000).toFixed(0)}K` : "€842K",
      });
    });
  }, []);

  // Obtener nombre de usuario del token
  const token = localStorage.getItem("token");
  let nombreUsuario = "USUARIO";
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      nombreUsuario = payload.nombre || payload.username || "USUARIO";
    } catch {}
  }

  return (
    <div>
      {/* Bienvenida */}
      <div style={{ padding: "16px 16px 12px" }}>
        <div style={{ fontSize: 12, color: "var(--t2)", fontWeight: 600 }}>Bienvenido,</div>
        <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 2 }}>{nombreUsuario}</div>
        <div style={{ fontSize: 11, color: "var(--t2)" }}>ALERTA Y CONTROL S.A. · NIF A28978807 · 28/03/2026</div>
      </div>

      <Strip
        left="Facturación Mes"    leftValue={kpis.facturacion}
        right="Empleados activos" rightValue="3.241"
      />

      <div className="kpi-grid">
        <Kpi label="Cuadrantes"  value={kpis.cobertura}  sub="cobertura hoy"   color="var(--green)" />
        <Kpi label="Sin cubrir"  value={kpis.sinCubrir}  sub="pendientes"      color="#dc2626"      />
        <Kpi label="Nóminas"     value={kpis.nominas}    sub="Marzo proceso"   color="#7c3aed"      />
        <Kpi label="Incidencias" value="14"              sub="abiertas"        color="#d97706"      />
      </div>

      {/* Accesos rápidos */}
      <div className="section">
        <div className="section-title">⚡ Accesos Rápidos</div>
        <div className="quick-grid">
          {[
            ["📅","Cuadrantes","cuadrantes"], ["👥","Personal","personal"],
            ["💶","Nóminas","nominas"],        ["📒","Contabilidad","contabilidad"],
            ["🤝","Clientes","clientes"],      ["🦺","PRL","prl"],
            ["🚗","Vehículos","vehiculos"],    ["📊","BI / CSM","bi"],
          ].map(([ico, label, tab]) => (
            <button
              key={tab}
              onClick={() => onNav(tab)}
              style={{
                border: "none", background: "var(--white)", borderRadius: 14,
                padding: "12px 4px 10px", cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,.06)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
              }}
            >
              <span style={{ fontSize: 22 }}>{ico}</span>
              <span style={{ fontSize: 9.5, fontWeight: 700, color: "var(--t2)" }}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Alertas */}
      <div className="section" style={{ marginTop: 6 }}>
        <div className="section-title">
          🔔 Alertas — {ALERTAS.length - alertsRead.length} pendientes
        </div>
        {ALERTAS.map((a, i) => (
          <div key={i} style={{ opacity: alertsRead.includes(i) ? 0.4 : 1, position: "relative" }}>
            <AlertCard {...a} />
            {!alertsRead.includes(i) && (
              <button
                onClick={() => setAlertsRead(p => [...p, i])}
                style={{
                  position: "absolute", top: 10, right: 10,
                  border: "1px solid var(--b)", background: "var(--white)",
                  borderRadius: 7, padding: "2px 8px", fontSize: 10,
                  fontWeight: 700, cursor: "pointer", color: "var(--t2)"
                }}
              >✓</button>
            )}
          </div>
        ))}
      </div>

      {/* Actividad reciente */}
      <div className="section" style={{ marginTop: 6 }}>
        <div className="section-title">🕐 Actividad Reciente</div>
        <div className="card">
          {[
            ["✅", "Cuadrante Abril aprobado — Madrid-Norte", "Hace 8 min"],
            ["💶", "Nómina Marzo procesada — 1.847 empleados", "Hace 32 min"],
            ["⚠️", "Incidencia abierta INC-1441 — Sevilla",   "Hace 1h"],
            ["📄", "Factura F-0842 pagada — Grupo Hospitalario","Hace 2h"],
          ].map(([ico, t, d], j) => (
            <div key={j} style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              padding: "10px 0", borderBottom: j < 3 ? "1px solid var(--b)" : "none"
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{ico}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{t}</div>
                <div style={{ fontSize: 11, color: "var(--t2)", marginTop: 2 }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 16 }} />
    </div>
  );
}