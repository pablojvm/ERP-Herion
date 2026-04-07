import React from "react";
import { Kpi, KpiGrid, Btn } from "./components";

/**
 * ModuloGenerico — pantalla de placeholder para módulos sin implementación completa.
 * Props:
 *   title    string  — nombre del módulo
 *   icon     string  — emoji icono
 *   prefix   string  — prefijo de tabla en BD
 *   desc     string  — descripción corta del módulo
 *   kpis     array   — [{label, value, sub, color}] (máx 4)
 *   acciones array   — [{label, onClick}] botones de acción rápida
 */
export default function ModuloGenerico({ title, icon, prefix, desc, kpis = [], acciones = [] }) {
  return (
    <div>
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontWeight: 900, fontSize: 18 }}>{icon} {title}</div>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)" }}>{prefix}</span>
        </div>
      </div>

      {/* KPIs si los hay */}
      {kpis.length > 0 && (
        <div className="kpi-grid">
          {kpis.map((k, i) => (
            <Kpi key={i} label={k.label} value={k.value} sub={k.sub} color={k.color} />
          ))}
        </div>
      )}

      {/* Card descriptiva */}
      <div style={{ padding: "0 16px" }}>
        <div className="card" style={{ textAlign: "center", padding: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 14 }}>{icon}</div>
          <div style={{ fontSize: 15, fontWeight: 900, marginBottom: 8 }}>{title}</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)", marginBottom: 12 }}>
            {prefix}
          </div>
          <div style={{ fontSize: 13, color: "var(--t2)", lineHeight: 1.6, marginBottom: 20 }}>
            {desc}
          </div>
          <Btn variant="red" onClick={() => alert(`Abriendo módulo ${title}...`)}>
            Abrir {title}
          </Btn>
        </div>

        {/* Acciones rápidas */}
        {acciones.map((a, i) => (
          <Btn key={i} variant="ghost" onClick={a.onClick}>{a.label}</Btn>
        ))}
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
}

// ── Exportaciones predefinidas de cada módulo genérico ────────────────────

export function PRL() {
  return (
    <ModuloGenerico
      title="PRL"
      icon="🦺"
      prefix="PRL_EPIS / PRL_FICHAS_PREVENCION_CLI"
      desc="Prevención de Riesgos Laborales. Gestión de EPIs, vigilancia de la salud, fichas de prevención por cliente, no conformidades y planificación de actividades preventivas (Ley 31/1995)."
      kpis={[
        { label: "NC Abiertas",    value: "14",    sub: "+3 semana",  color: "#dc2626" },
        { label: "Conformidad ISO", value: "98,4%", sub: "+0,6%",     color: "var(--green)" },
        { label: "Empleados EPI",  value: "99,1%", sub: "+0,3%",     color: "var(--blue)" },
        { label: "Accidentes AT",  value: "2",     sub: "−4 vs ant.", color: "#d97706" },
      ]}
      acciones={[
        { label: "📋 Nueva No Conformidad", onClick: () => alert("Abriendo formulario NC...") },
        { label: "🦺 Registrar Entrega EPI", onClick: () => alert("Abriendo entrega EPI...") },
        { label: "🏥 Reconocimientos Médicos", onClick: () => alert("Abriendo gestión reconocimientos...") },
      ]}
    />
  );
}

export function Vehiculos() {
  return (
    <ModuloGenerico
      title="Vehículos"
      icon="🚗"
      prefix="VEH_VEHICULOS / VEH_VEHICULOS_MANTENIMIENTO"
      desc="Gestión integral de la flota de vehículos: alta y baja, seguros, ITV, mantenimientos programados, consumos de combustible y costes. Alertas automáticas por vencimientos."
      kpis={[
        { label: "Vehículos Activos", value: "18", sub: "de 21 en flota", color: "var(--blue)"  },
        { label: "En Revisión",       value: "2",  sub: "programada",     color: "#d97706"      },
        { label: "ITV Vencida",       value: "1",  sub: "5678-DEF",       color: "#dc2626"      },
        { label: "Km Promedio",       value: "94K",sub: "km/vehículo",    color: "#7c3aed"      },
      ]}
      acciones={[
        { label: "🚗 Alta Vehículo",       onClick: () => alert("Abriendo ficha vehículo...") },
        { label: "⚙️ Registrar Mantenimiento", onClick: () => alert("Abriendo parte mantenimiento...") },
        { label: "⛽ Registrar Consumo",    onClick: () => alert("Abriendo registro consumo...") },
      ]}
    />
  );
}

export function BI() {
  return (
    <ModuloGenerico
      title="Control Suite Manager"
      icon="📊"
      prefix="DIR_INDICADORES / DIR_BIDASHBOARDS / TRQ_DIR_"
      desc="Business Intelligence integrado. KPIs operativos, dashboards interactivos, factores de gestión, rentabilidad por cliente e integración con Power BI. Actualización en tiempo real."
      kpis={[
        { label: "Informes/mes", value: "1.842", sub: "+14,2%",     color: "var(--blue)"  },
        { label: "Usuarios BI",  value: "284",   sub: "+42",        color: "var(--green)" },
        { label: "Alertas Auto.",value: "18",    sub: "desviaciones",color: "#d97706"     },
        { label: "Power BI",     value: "Activa",sub: "sync 5 min", color: "#7c3aed"     },
      ]}
      acciones={[
        { label: "📊 Abrir Dashboard Rentabilidad", onClick: () => alert("Abriendo dashboard...") },
        { label: "📈 Informe Cuadro de Mandos",     onClick: () => alert("Generando informe...") },
        { label: "⬇️ Exportar KPIs a Excel",        onClick: () => alert("Exportando KPIs...") },
      ]}
    />
  );
}
