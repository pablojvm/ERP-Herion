import React, { useState, useEffect, useCallback } from "react";
import { Pill, SearchBar, SectionHeader, FieldRow, BackBtn, Empty, Btn } from "./components.jsx";
import { getEmpleados, getEmpleado } from "./api/empleados.js";

const COLORS = ["#b91c1c","#1a56db","#15803d","#d97706","#7c3aed"];

// ── FICHA DETALLE ─────────────────────────────────────────────────────────
function FichaEmpleado({ empId, onBack }) {
  const [emp, setEmp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEmpleado(empId)
      .then(setEmp)
      .finally(() => setLoading(false));
  }, [empId]);

  if (loading) return <div style={{ padding: 32, textAlign: "center", color: "var(--t2)" }}>Cargando...</div>;
  if (!emp)    return <div style={{ padding: 32, textAlign: "center", color: "var(--t2)" }}>No encontrado</div>;

  return (
    <div>
      <BackBtn onBack={onBack} title="Ficha Empleado" />
      <div style={{ padding: "12px 16px 0" }}>
        <div className="card" style={{ textAlign: "center", paddingTop: 24 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20, background: COLORS[emp.id % 5],
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 auto 12px"
          }}>
            {emp.nom.charAt(0)}
          </div>
          <div style={{ fontSize: 17, fontWeight: 900 }}>{emp.nom}</div>
          <div style={{ fontSize: 13, color: "var(--t2)", margin: "4px 0 10px" }}>{emp.departamento}</div>
          <Pill c={emp.situacion === "activo" ? "g" : emp.situacion === "baja" ? "r" : "a"}>
            {emp.situacion === "activo" ? "● Activo" : emp.situacion === "baja" ? "● Baja" : "✈ Vacaciones"}
          </Pill>
        </div>

        <div className="card">
          <div style={{ fontWeight: 800, fontSize: 13, marginBottom: 12 }}>
            Datos Empleado{" "}
            <span style={{ fontFamily: "var(--mono)", fontSize: 10, color: "var(--t3)" }}>VSS_PERSONAL</span>
          </div>
          <FieldRow field="VSSPER_COD"       value={emp.cod} />
          <FieldRow field="VSSPER_NOM"        value={emp.nom} />
          <FieldRow field="VSSPER_NIF"        value={emp.nif} />
          <FieldRow field="VSSPER_FECNAC"     value={emp.fecnac} />
          <FieldRow field="VSSPER_SEXO"       value={emp.sexo} />
          <FieldRow field="VSSPER_POB"        value={emp.pob} />
          <FieldRow field="VSSPER_PROV"       value={emp.prov} />
          <FieldRow field="VSSPER_TEL1"       value={emp.tel1} />
          <FieldRow field="VSSPER_EMAIL"      value={emp.email} />
          <FieldRow field="VSSPER_DELEG"      value={emp.delegacion} />
          <FieldRow field="VSSPER_EMP"        value={emp.empresa} />
          <FieldRow field="VSSPER_DPTO"       value={emp.departamento} />
          <FieldRow field="VSSPER_SITLABORAL" value={emp.situacion} />
          <FieldRow field="VSSPER_CONVENIO"   value={emp.convenio} />
          <FieldRow field="VSSPER_TURNO"      value={emp.turno} />
          <FieldRow field="VSSPER_MODO_PAGO"  value={emp.modoPago} last />
        </div>

        <Btn variant="red"   onClick={() => alert(`✏️ Editando ficha de ${emp.nom}`)}>✏️ Editar Empleado</Btn>
        <Btn variant="ghost" onClick={() => alert(`📋 Historial de contratos de ${emp.nom}`)}>📋 Ver Contratos</Btn>
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
}

// ── LISTADO ───────────────────────────────────────────────────────────────
export default function Personal() {
  const [empleados, setEmpleados] = useState([]);
  const [search,    setSearch]    = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState("");

  const fetchEmpleados = useCallback(async (q) => {
    setLoading(true);
    setError("");
    try {
      const data = await getEmpleados(q);
      setEmpleados(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Carga inicial
  useEffect(() => { fetchEmpleados(""); }, [fetchEmpleados]);

  // Búsqueda con debounce
  useEffect(() => {
    const t = setTimeout(() => fetchEmpleados(search), 300);
    return () => clearTimeout(t);
  }, [search, fetchEmpleados]);

  if (selectedId) {
    return <FichaEmpleado empId={selectedId} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div>
      <div className="section">
        <SectionHeader title="Personal" prefix="VSS_PERSONAL" />
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Buscar empleado, categoría, delegación..."
      />

      <div style={{ padding: "0 16px" }}>
        {error && (
          <div style={{ background: "#fee2e2", color: "#991b1b", borderRadius: 10, padding: "10px 14px", fontSize: 12, marginBottom: 10 }}>
            ⚠️ {error}
          </div>
        )}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          {loading
            ? <div style={{ padding: 32, textAlign: "center", color: "var(--t2)", fontSize: 13 }}>Cargando...</div>
            : empleados.length === 0
              ? <Empty />
              : empleados.map((emp, i) => (
                <div
                  key={emp.id}
                  className="list-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedId(emp.id)}
                >
                  <div className="list-avatar" style={{ background: COLORS[i % 5] }}>
                    {emp.nom.charAt(0)}
                  </div>
                  <div className="list-content">
                    <div className="list-title">{emp.nom}</div>
                    <div className="list-sub">{emp.departamento} · {emp.delegacion}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <Pill c={emp.situacion === "activo" ? "g" : emp.situacion === "baja" ? "r" : "a"}>
                      {emp.situacion}
                    </Pill>
                    <span style={{ fontSize: 12, color: "var(--t3)" }}>→</span>
                  </div>
                </div>
              ))}
        </div>
        <div style={{ textAlign: "center", fontSize: 11, color: "var(--t3)", marginTop: 8 }}>
          {empleados.length} empleados · VSS_PERSONAL
        </div>
      </div>
      <div style={{ height: 16 }} />
    </div>
  );
}