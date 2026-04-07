import React, { useState, useEffect } from "react";
import { Kpi, HTabs, Pill, Prog, Btn, SectionHeader } from "./components.jsx";
import { getCuadrantes, updateCuadrante } from "./api/cuadrantes.js";

const TABS = [
  ["hoy",      "📅 Hoy"],
  ["analisis", "⏱️ Horas"],
  ["rentab",   "💰 Rentab."],
  ["cierre",   "🔒 Cierre"],
];
const ESTADOS = ["realizado", "pendiente", "incidencia"];
const FECHA   = "28/03/2026";

// ── TAB: HOY ──────────────────────────────────────────────────────────────
function TabHoy({ rows, onToggle }) {
  return (
    <div style={{ padding: "0 16px" }}>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {rows.map((r, i) => (
          <div key={r.id} style={{
            padding: "12px 14px",
            borderBottom: i < rows.length - 1 ? "1px solid var(--b)" : "none"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{r.empleado?.nom || r.emp}</div>
                <div style={{ fontSize: 11, color: "var(--t2)", marginTop: 1 }}>{r.contrato}</div>
                <div style={{ fontSize: 10.5, color: "var(--t3)", marginTop: 1 }}>
                  🕐 {r.turno} · {r.fecha} · {r.horas}h · {r.centro}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                <Pill c={r.estado === "realizado" ? "g" : r.estado === "pendiente" ? "a" : "r"}>
                  {r.estado}
                </Pill>
                <button
                  style={{ border: "1px solid var(--b)", background: "var(--surf)", borderRadius: 6, padding: "3px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer", color: "var(--t2)" }}
                  onClick={() => onToggle(r.id, r.estado)}
                >✏️ Cambiar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", fontSize: 11, color: "var(--t3)", marginTop: 6 }}>
        {rows.filter(r => r.estado === "realizado").length} realizados de {rows.length} · VSS_CUADRANTE_D
      </div>
    </div>
  );
}

// ── TAB: ANÁLISIS — estático ──────────────────────────────────────────────
function TabAnalisis() {
  return (
    <div style={{ padding: "0 16px" }}>
      {[
        ["Hospital Sur-Madrid",  "248h", "242h", "−6h",  97],
        ["CC Parquesur-Sevilla", "192h", "192h", "0h",  100],
        ["Telefónica HQ-BCN",   "160h", "142h", "−18h", 89],
        ["Aeropuerto T2-MAD",   "480h", "476h", "−4h",  99],
        ["CC Nervión-Sevilla",  "128h", "118h", "−10h", 92],
        ["Parque Empresarial",  "96h",  "96h",  "0h",  100],
      ].map(([c, plan, real, desv, pct], i) => (
        <div key={i} className="card" style={{ padding: "12px 14px", marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{c}</div>
            <Pill c={pct >= 99 ? "g" : pct >= 90 ? "a" : "r"}>{pct}%</Pill>
          </div>
          <div style={{ display: "flex", gap: 20, marginBottom: 7 }}>
            <span style={{ fontSize: 11, color: "var(--t2)" }}>Plan: <strong>{plan}</strong></span>
            <span style={{ fontSize: 11, color: "var(--t2)" }}>Real: <strong style={{ color: "var(--blue)" }}>{real}</strong></span>
            <span style={{ fontSize: 11, color: "var(--t2)" }}>Desv: <strong style={{ color: desv === "0h" ? "var(--green)" : "#dc2626" }}>{desv}</strong></span>
          </div>
          <Prog pct={pct} color={pct >= 99 ? "var(--green)" : pct >= 90 ? "#d97706" : "#dc2626"} />
        </div>
      ))}
    </div>
  );
}

// ── TAB: RENTABILIDADES — estático ────────────────────────────────────────
function TabRentab() {
  return (
    <div style={{ padding: "0 16px" }}>
      {[
        ["Hospital Sur",  "€28.400",  "€20.300", "€8.100",  "28,5%"],
        ["CC Parquesur",  "€54.200",  "€42.200", "€12.000", "22,1%"],
        ["Aeropuerto T2", "€120.000", "€92.200", "€27.800", "23,2%"],
        ["Telefónica HQ", "€76.500",  "€61.400", "€15.100", "19,7%"],
      ].map(([c, f, g, m, p], i) => (
        <div key={i} className="card" style={{ padding: "12px 14px", marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontWeight: 800, fontSize: 14 }}>{c}</div>
            <span style={{ fontFamily: "var(--mono)", fontWeight: 900, color: "var(--green)", fontSize: 15 }}>{m}</span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "var(--t2)" }}>Fact: <strong>{f}</strong></span>
            <span style={{ fontSize: 11, color: "var(--t2)" }}>Gasto: <strong style={{ color: "#dc2626" }}>{g}</strong></span>
            <Pill c="g">{p}</Pill>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── TAB: CIERRE — estático ────────────────────────────────────────────────
function TabCierre() {
  const [pasos, setPasos] = useState([true, false, false, false, false]);
  const siguiente = pasos.filter(Boolean).length;

  return (
    <div style={{ padding: "0 16px" }}>
      <div style={{ background: "#fef3c7", borderRadius: 12, padding: 12, marginBottom: 12, display: "flex", gap: 8 }}>
        <span style={{ fontSize: 17 }}>⚠️</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13 }}>Cierre Marzo 2026 — En proceso</div>
          <div style={{ fontSize: 11, color: "var(--t2)" }}>Completa los pasos en orden. El cierre es irreversible.</div>
        </div>
      </div>
      {["Validación Cuadrantes","Cierre Nóminas","Cierre Facturación","Cierre Contabilidad","Cierre Definitivo"].map((paso, i) => (
        <div key={i} className="card" style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "13px 14px", marginBottom: 8,
          background: pasos[i] ? "#f0fdf4" : "var(--white)",
          border: `1px solid ${pasos[i] ? "#bbf7d0" : "var(--b)"}`,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: pasos[i] ? "var(--green)" : "var(--b)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 12, flexShrink: 0,
            color: pasos[i] ? "#fff" : "var(--t3)",
          }}>
            {pasos[i] ? "✓" : i + 1}
          </div>
          <div style={{ flex: 1, fontWeight: 700, fontSize: 13 }}>{paso}</div>
          {!pasos[i] && i === siguiente && (
            <button
              style={{ border: "none", background: "var(--red)", color: "#fff", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}
              onClick={() => {
                if (i === 4 && !window.confirm("¿Confirmas el CIERRE DEFINITIVO?")) return;
                setPasos(prev => { const n = [...prev]; n[i] = true; return n; });
              }}
            >Ejecutar</button>
          )}
        </div>
      ))}
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────
export default function Cuadrantes() {
  const [tab,     setTab]     = useState("hoy");
  const [rows,    setRows]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    getCuadrantes(FECHA)
      .then(setRows)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const toggleEstado = async (id, estadoActual) => {
    const next = ESTADOS[(ESTADOS.indexOf(estadoActual) + 1) % ESTADOS.length];
    try {
      await updateCuadrante(id, { estado: next });
      setRows(prev => prev.map(r => r.id === id ? { ...r, estado: next } : r));
    } catch (e) {
      alert("Error al actualizar: " + e.message);
    }
  };

  const realizados = rows.filter(r => r.estado === "realizado").length;
  const cobertura  = rows.length ? ((realizados / rows.length) * 100).toFixed(1) : "0";
  const sinCubrir  = rows.filter(r => r.estado === "pendiente").length;
  const incidencias = rows.filter(r => r.estado === "incidencia").length;

  return (
    <div>
      <div className="section">
        <SectionHeader title="Cuadrantes" prefix="VSS_CUADRANTE_D" />
      </div>

      {error && (
        <div style={{ margin: "0 16px 10px", background: "#fee2e2", color: "#991b1b", borderRadius: 10, padding: "10px 14px", fontSize: 12 }}>
          ⚠️ {error}
        </div>
      )}

      <div className="kpi-grid">
        <Kpi label="Planificados" value={loading ? "…" : rows.length}     sub="hoy"         color="var(--blue)"  />
        <Kpi label="Cubiertos"    value={loading ? "…" : `${cobertura}%`} sub="cobertura"   color="var(--green)" />
        <Kpi label="Sin Cubrir"   value={loading ? "…" : sinCubrir}       sub="pendientes"  color="#dc2626"      />
        <Kpi label="Incidencias"  value={loading ? "…" : incidencias}     sub="abiertas"    color="#d97706"      />
      </div>

      <HTabs tabs={TABS} active={tab} onChange={setTab} />

      {loading
        ? <div style={{ padding: 32, textAlign: "center", color: "var(--t2)" }}>Cargando...</div>
        : <>
            {tab === "hoy"      && <TabHoy rows={rows} onToggle={toggleEstado} />}
            {tab === "analisis" && <TabAnalisis />}
            {tab === "rentab"   && <TabRentab />}
            {tab === "cierre"   && <TabCierre />}
          </>
      }
      <div style={{ height: 16 }} />
    </div>
  );
}