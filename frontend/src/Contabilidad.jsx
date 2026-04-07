import React, { useState, useEffect } from "react";
import { Kpi, HTabs, Pill, Btn, SectionHeader } from "./components.jsx";
import { getCuentas } from "./api/contabilidad.js";

const TABS = [
  ["cuentas", "📒 Plan Cuentas"],
  ["pyg",     "📊 PyG"],
  ["iva",     "🧾 IVA / 303"],
  ["n43",     "🏦 N43 Banco"],
];

// ── TAB: PLAN DE CUENTAS ─────────────────────────────────────────────────
function TabCuentas() {
  const [cuentas, setCuentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCuentas()
      .then(setCuentas)
      .finally(() => setLoading(false));
  }, []);

  const natColor = { A: "var(--blue)", P: "#dc2626", G: "#d97706", I: "var(--green)" };

  if (loading) return <div style={{ padding: 32, textAlign: "center", color: "var(--t2)" }}>Cargando...</div>;

  return (
    <div style={{ padding: "0 16px" }}>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {cuentas.map((c, i) => (
          <div key={c.id} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "11px 14px",
            borderBottom: i < cuentas.length - 1 ? "1px solid var(--b)" : "none"
          }}>
            <div style={{ fontFamily: "var(--mono)", fontWeight: 900, fontSize: 15, color: "var(--red)", width: 48, flexShrink: 0 }}>
              {c.codCta}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {c.desCta}
              </div>
              <div style={{ fontSize: 9.5, color: "var(--t3)", marginTop: 2, fontFamily: "var(--mono)" }}>
                NAT_CTA: <strong style={{ color: natColor[c.natCta] }}>{c.natCta}</strong>
                {" "}· COD_GRUPO_CTA: <strong>{c.codGrupoCta}</strong>
                {" "}· GENERA_ANL: <strong>{c.generaAnl ? "Sí" : "No"}</strong>
              </div>
            </div>
            <Pill c={c.ctaActiva ? "g" : "a"}>{c.ctaActiva ? "activa" : "inact."}</Pill>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TAB: PyG — estático ───────────────────────────────────────────────────
function TabPyG() {
  const rows = [
    ["(+) Ventas de servicios (700)", "€842.000",  "var(--green)", false],
    ["(−) Aprovisionamientos",        "−€124.000", "#dc2626",      false],
    ["= MARGEN BRUTO",                "€718.000",  "var(--blue)",  true ],
    ["(−) Gastos personal (640/642)", "−€482.000", "#dc2626",      false],
    ["(−) Otros gastos explotación",  "−€52.000",  "#dc2626",      false],
    ["= EBITDA",                      "€184.000",  "var(--blue)",  true ],
    ["(−) Amortizaciones (68X)",      "−€8.400",   "#dc2626",      false],
    ["= RESULTADO EXPLOTACIÓN (EBIT)","€175.600",  "var(--blue)",  true ],
    ["(−) Resultado financiero",      "−€2.100",   "#dc2626",      false],
    ["= RDO. ANTES IMPUESTOS (RAI)",  "€173.500",  "var(--green)", true ],
    ["(−) Impuesto Soc. 25%",         "−€43.375",  "#dc2626",      false],
    ["= RESULTADO DEL EJERCICIO",     "€130.125",  "var(--green)", true ],
  ];
  return (
    <div style={{ padding: "0 16px" }}>
      {rows.map(([l, v, c, bold], i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: bold ? "10px 14px" : "8px 0",
          marginBottom: bold ? 8 : 0,
          background: bold ? "var(--surf)" : "transparent",
          borderRadius: bold ? 10 : 0,
          borderBottom: !bold && i < rows.length - 1 ? "1px solid var(--b)" : "none",
        }}>
          <span style={{ fontSize: 12.5, fontWeight: bold ? 800 : 400 }}>{l}</span>
          <span style={{ fontFamily: "var(--mono)", fontWeight: bold ? 900 : 600, fontSize: bold ? 15 : 13, color: c }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

// ── TAB: IVA — estático ───────────────────────────────────────────────────
function TabIVA() {
  return (
    <div style={{ padding: "0 16px" }}>
      <div className="kpi-grid">
        <Kpi label="IVA Repercutido (477)" value="€176K" sub="Facturas emit. T1"  color="#dc2626"      />
        <Kpi label="IVA Soportado (472)"   value="€28K"  sub="Facturas recib. T1" color="var(--blue)"  />
      </div>
      <div className="card" style={{ padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--b)" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>Modelo 303 — T1 2026</div>
            <div style={{ fontSize: 9.5, color: "var(--t3)", fontFamily: "var(--mono)" }}>FIM_IVA · Vto: 20/04/2026</div>
          </div>
          <Pill c="a">pendiente</Pill>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0" }}>
          <span style={{ fontWeight: 800, fontSize: 14 }}>A INGRESAR HACIENDA</span>
          <span style={{ fontFamily: "var(--mono)", fontWeight: 900, fontSize: 18, color: "#dc2626" }}>€148.380</span>
        </div>
      </div>
      <Btn variant="red" onClick={() => alert("📤 Generando Modelo 303\nImporte: €148.380")}>📤 Presentar Modelo 303</Btn>
    </div>
  );
}

// ── TAB: N43 — estático ───────────────────────────────────────────────────
function TabN43() {
  const movs = [
    { fecha: "28/03", ref: "REC-001", concepto: "Cobro F-0842 Grupo Hospitalario", imp: "+€32.948,30",   ok: true  },
    { fecha: "27/03", ref: "PAG-012", concepto: "Pago nóminas febrero",            imp: "−€482.000,00",  ok: true  },
    { fecha: "26/03", ref: "PAG-003", concepto: "Pago proveedor CleanPro S.L.",    imp: "−€5.178,80",    ok: true  },
    { fecha: "25/03", ref: "REC-002", concepto: "Cobro F-0840 Aeropuerto T2",      imp: "+€139.150,00",  ok: false },
  ];
  return (
    <div style={{ padding: "0 16px" }}>
      <div className="kpi-grid">
        <Kpi label="Saldo N43 (572)" value="€1,82M" sub="al 28/03"      color="var(--green)" />
        <Kpi label="Pendientes"       value="1"      sub="por conciliar" color="#d97706"      />
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
        <Btn variant="ghost" style={{ flex: 1 }} onClick={() => alert("📥 Importando fichero N43...")}>📥 Importar N43</Btn>
        <Btn variant="blue"  style={{ flex: 1 }} onClick={() => alert("🔄 Conciliando...\n3 movimientos cuadrados ✅")}>🔄 Conciliar</Btn>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {movs.map((m, i) => (
          <div key={i} className="list-item">
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {m.concepto}
              </div>
              <div style={{ fontSize: 10, color: "var(--t3)", fontFamily: "var(--mono)", marginTop: 2 }}>
                {m.fecha} · {m.ref}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontFamily: "var(--mono)", fontWeight: 900, fontSize: 13, color: m.imp.startsWith("+") ? "var(--green)" : "#dc2626" }}>
                {m.imp}
              </div>
              <Pill c={m.ok ? "g" : "a"}>{m.ok ? "✓ OK" : "pendiente"}</Pill>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────
export default function Contabilidad() {
  const [tab, setTab] = useState("cuentas");

  return (
    <div>
      <div className="section">
        <SectionHeader title="Contabilidad" prefix="FIM_CUENTAS" />
      </div>

      <div className="kpi-grid">
        <Kpi label="Saldo Banco (572)" value="€1,82M" sub="FIM_N43 · 28/03"  color="var(--green)" />
        <Kpi label="IVA a Ingresar"    value="€148K"  sub="Mod. 303 · Abr"   color="#dc2626"      />
        <Kpi label="Cobros Pendientes" value="€284K"  sub="430 Clientes"      color="#d97706"      />
        <Kpi label="Asientos Mes"      value="1.284"  sub="Libro Diario"      color="var(--blue)"  />
      </div>

      <HTabs tabs={TABS} active={tab} onChange={setTab} />

      {tab === "cuentas" && <TabCuentas />}
      {tab === "pyg"     && <TabPyG />}
      {tab === "iva"     && <TabIVA />}
      {tab === "n43"     && <TabN43 />}

      <div style={{ height: 16 }} />
    </div>
  );
}