import React, { useState, useEffect } from "react";
import { Kpi, Strip, HTabs, Pill, Btn, SectionHeader, FieldRow } from "./components.jsx";
import { getNominas, calcularNominas, pagarNominas } from "./api/nominas.js";

const TABS = [
  ["listado", "📋 Listado"],
  ["recibo",  "💶 Recibo"],
  ["ss",      "🏛️ TC1/TC2"],
  ["irpf",    "📊 IRPF 111"],
];

const MES = "Marzo 2026";
const COLORS = ["#b91c1c","#1a56db","#15803d","#d97706","#7c3aed"];

// ── TAB: LISTADO ──────────────────────────────────────────────────────────
function TabListado({ rows, setRows }) {
  const [loading, setLoading] = useState(false);

  const handleCalcular = async () => {
    setLoading(true);
    try {
      await calcularNominas(MES);
      const data = await getNominas(MES);
      setRows(data);
      alert("⚙️ Nóminas calculadas " + MES);
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePagar = async () => {
    setLoading(true);
    try {
      await pagarNominas(MES);
      const data = await getNominas(MES);
      setRows(data);
      alert("💶 Fichero SEPA generado y nóminas pagadas.");
    } catch (e) {
      alert("Error: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "0 16px" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <Btn variant="red"   style={{ flex: 1 }} onClick={handleCalcular} disabled={loading}>⚙️ Calcular</Btn>
        <Btn variant="ghost" style={{ flex: 1 }} onClick={handlePagar}    disabled={loading}>💶 Pagar</Btn>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {rows.map((n, i) => (
          <div key={n.id} className="list-item">
            <div className="list-avatar" style={{ background: COLORS[i % 5] }}>
              {(n.empleado?.nom || n.nom || "?").charAt(0)}
            </div>
            <div className="list-content">
              <div className="list-title" style={{ fontSize: 12.5 }}>
                {n.empleado?.nom || n.nom}
              </div>
              <div className="list-sub" style={{ fontFamily: "var(--mono)", fontSize: 9.5 }}>
                NORDO_DEVENGADO: €{Number(n.devengado).toFixed(2)}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 14, fontWeight: 900, color: "var(--green)" }}>
                €{Number(n.liquido).toFixed(2)}
              </div>
              <Pill c={n.estado === "pagada" ? "g" : n.estado === "calculada" || n.estado === "proceso" ? "b" : "a"}>
                {n.estado}
              </Pill>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TAB: RECIBO ───────────────────────────────────────────────────────────
function TabRecibo({ rows }) {
  const n = rows[0];
  if (!n) return <div style={{ padding: 32, textAlign: "center", color: "var(--t2)" }}>Sin datos</div>;

  return (
    <div style={{ padding: "0 16px" }}>
      <div className="card" style={{ padding: 14 }}>
        <div style={{ borderBottom: "2px solid var(--red)", paddingBottom: 8, marginBottom: 8 }}>
          <div style={{ fontWeight: 900, fontSize: 14 }}>ALERTA Y CONTROL S.A.</div>
          <div style={{ fontSize: 10, color: "var(--t2)" }}>NIF: A28978807 · RECIBO SALARIO · {n.mes}</div>
        </div>
        <div style={{ fontSize: 11, color: "var(--t2)", marginBottom: 8 }}>
          {n.empleado?.nom} · {n.categoria} · {n.convenio}
        </div>
        {[
          ["NORDO_DEVENGADO",   "Salario Base + Plus Conv.", `€${Number(n.devengado).toFixed(2)}`,    "var(--t)"],
          ["NORDO_CUOTA_SS",    "Cuota SS empresa",          `€${Number(n.cuotaSS).toFixed(2)}`,      "#dc2626"],
          ["NORDO_DEDUCCIONES", "Deducciones totales",       `−€${Number(n.deducciones).toFixed(2)}`, "#dc2626"],
          ["NORDO_LIQUIDO",     "LÍQUIDO A PERCIBIR",        `€${Number(n.liquido).toFixed(2)}`,      "var(--green)"],
        ].map(([f, l, v, c], i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "9px 0", borderBottom: i < 3 ? "1px solid var(--b)" : "none"
          }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>{l}</div>
              <div style={{ fontSize: 9, fontFamily: "var(--mono)", color: "var(--t3)" }}>{f}</div>
            </div>
            <div style={{ fontSize: 15, fontWeight: 900, color: c, fontFamily: "var(--mono)" }}>{v}</div>
          </div>
        ))}
      </div>
      <Btn variant="red" onClick={() => alert("🖨️ Generando recibo PDF...")}>🖨️ Imprimir Recibo PDF</Btn>
    </div>
  );
}

// ── TAB: TC1/TC2 — estático ────────────────────────────────────────────────
function TabSS() {
  return (
    <div style={{ padding: "0 16px" }}>
      <Strip left="Cuota Patronal (TC1)" leftValue="€142.840" right="Total TGSS" rightValue="€167.460" />
      {[
        ["Contingencias Comunes", "23,60%", "4,70%",  "€1.137.520"],
        ["AT / EP",               "1,50%",  "0,00%",  "€72.300"],
        ["Desempleo",             "5,50%",  "1,55%",  "€265.100"],
        ["FOGASA",                "0,20%",  "0,00%",  "€9.640"],
        ["Formación Profesional", "0,60%",  "0,10%",  "€28.920"],
      ].map((r, i) => (
        <div key={i} className="card" style={{ padding: "12px 14px", marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{r[0]}</div>
            <div style={{ fontFamily: "var(--mono)", fontWeight: 900, fontSize: 14, color: "#dc2626" }}>{r[3]}</div>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 5 }}>
            <span style={{ fontSize: 11, color: "var(--t2)" }}>Empresa: <strong style={{ color: "#dc2626" }}>{r[1]}</strong></span>
            <span style={{ fontSize: 11, color: "var(--t2)" }}>Trab.: <strong style={{ color: "var(--blue)" }}>{r[2]}</strong></span>
          </div>
        </div>
      ))}
      <Btn variant="red" onClick={() => alert("📤 Generando TC1/TC2...")}>📤 Presentar en Sistema RED</Btn>
    </div>
  );
}

// ── TAB: IRPF — estático ──────────────────────────────────────────────────
function TabIRPF() {
  return (
    <div style={{ padding: "0 16px" }}>
      <div className="kpi-grid">
        <Kpi label="Base Retenciones" value="€520K"   sub="NORDO_RETRIBUCION" color="var(--blue)" />
        <Kpi label="A Ingresar AEAT"  value="€52.840" sub="Mod. 111 · Abr"   color="#dc2626" />
      </div>
      <div className="card" style={{ padding: 14 }}>
        {[
          ["NIF Empresa",        "A28978807"],
          ["Ejercicio",          "2026"],
          ["Período",            "03 — Marzo"],
          ["% Medio Retención",  "10,16%"],
          ["Trabajadores",       "1.847"],
          ["Régimen SS",         "0111 — General"],
        ].map(([l, v], i, arr) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between",
            padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--b)" : "none"
          }}>
            <span style={{ fontSize: 12, color: "var(--t2)" }}>{l}</span>
            <span style={{ fontSize: 13, fontWeight: 800, fontFamily: "var(--mono)" }}>{v}</span>
          </div>
        ))}
      </div>
      <Btn variant="red" onClick={() => alert("📤 Generando Modelo 111...")}>📤 Generar Modelo 111</Btn>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────
export default function Nominas() {
  const [tab,     setTab]     = useState("listado");
  const [rows,    setRows]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  useEffect(() => {
    getNominas(MES)
      .then(setRows)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const totDevengado = rows.reduce((s, n) => s + Number(n.devengado), 0);
  const totLiquido   = rows.reduce((s, n) => s + Number(n.liquido),   0);
  const totSS        = rows.reduce((s, n) => s + Number(n.cuotaSS),   0);
  const totIRPF      = rows.reduce((s, n) => s + Number(n.deducciones), 0);

  return (
    <div>
      <div className="section">
        <SectionHeader title="Nóminas" prefix="PNOM_NOMINAS" />
      </div>

      {error && (
        <div style={{ margin: "0 16px 10px", background: "#fee2e2", color: "#991b1b", borderRadius: 10, padding: "10px 14px", fontSize: 12 }}>
          ⚠️ {error}
        </div>
      )}

      <div className="kpi-grid">
        <Kpi label="Bruta Total"   value={loading ? "…" : `€${(totDevengado/1000).toFixed(1)}K`}  sub="NORDO_DEVENGADO"    color="var(--blue)"  />
        <Kpi label="Líquido Total" value={loading ? "…" : `€${(totLiquido/1000).toFixed(1)}K`}    sub="NORDO_LIQUIDO"     color="var(--green)" />
        <Kpi label="SS Empresa"    value={loading ? "…" : `€${(totSS/1000).toFixed(1)}K`}         sub="NORDO_CUOTA_SS"    color="#dc2626"      />
        <Kpi label="IRPF"          value={loading ? "…" : `€${(totIRPF/1000).toFixed(1)}K`}       sub="NORDO_DEDUCCIONES" color="#7c3aed"      />
      </div>

      <HTabs tabs={TABS} active={tab} onChange={setTab} />

      {loading
        ? <div style={{ padding: 32, textAlign: "center", color: "var(--t2)" }}>Cargando...</div>
        : <>
            {tab === "listado" && <TabListado rows={rows} setRows={setRows} />}
            {tab === "recibo"  && <TabRecibo  rows={rows} />}
            {tab === "ss"      && <TabSS />}
            {tab === "irpf"    && <TabIRPF />}
          </>
      }
      <div style={{ height: 16 }} />
    </div>
  );
}