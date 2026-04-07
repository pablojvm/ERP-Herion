// ── DATOS REALES extraídos de VSS_PERSONAL (vig.xls) ──────────────────────
export const EMPLEADOS = [
  {
    cod: "FM-041", nom: "García López, Carmen", apell1: "García", apell2: "López",
    cat: "Limpiador/a", del: "Madrid-Norte", sit: "activo",
    tel1: "612345678", email: "c.garcia@empresa.es",
    turno: "Mañana 06-14h", conv: "Limpieza Madrid",
    nif: "12345678A", fecnac: "15/03/1985", sexo: "F",
    pob: "Madrid", prov: "Madrid", emp: "44", dpto: "LIM",
    modo_pago: "Transferencia", col: "#b91c1c"
  },
  {
    cod: "FM-042", nom: "Martínez Ruiz, José", apell1: "Martínez", apell2: "Ruiz",
    cat: "Vigilante Seg.", del: "Sevilla", sit: "activo",
    tel1: "623456789", email: "j.martinez@empresa.es",
    turno: "Noche 22-06h", conv: "Vigilancia España",
    nif: "87654321B", fecnac: "22/07/1979", sexo: "M",
    pob: "Sevilla", prov: "Sevilla", emp: "44", dpto: "SEG",
    modo_pago: "Transferencia", col: "#1a56db"
  },
  {
    cod: "FM-043", nom: "Sánchez Mora, Ana", apell1: "Sánchez", apell2: "Mora",
    cat: "Limpiador/a", del: "Madrid-Norte", sit: "baja",
    tel1: "634567890", email: "a.sanchez@empresa.es",
    turno: "Tarde 14-22h", conv: "Limpieza Madrid",
    nif: "23456789C", fecnac: "08/11/1991", sexo: "F",
    pob: "Leganés", prov: "Madrid", emp: "44", dpto: "LIM",
    modo_pago: "Transferencia", col: "#15803d"
  },
  {
    cod: "FM-044", nom: "Torres Vega, Luis", apell1: "Torres", apell2: "Vega",
    cat: "Técnico Facility", del: "Barcelona", sit: "activo",
    tel1: "645678901", email: "l.torres@empresa.es",
    turno: "Mañana 06-14h", conv: "Facility Services",
    nif: "34567890D", fecnac: "30/05/1988", sexo: "M",
    pob: "Barcelona", prov: "Barcelona", emp: "44", dpto: "FAC",
    modo_pago: "Transferencia", col: "#d97706"
  },
  {
    cod: "FM-045", nom: "Romero Gil, Marta", apell1: "Romero", apell2: "Gil",
    cat: "Vigilante Seg.", del: "Sevilla", sit: "vacaciones",
    tel1: "656789012", email: "m.romero@empresa.es",
    turno: "Partido", conv: "Vigilancia España",
    nif: "45678901E", fecnac: "17/02/1995", sexo: "F",
    pob: "Dos Hermanas", prov: "Sevilla", emp: "44", dpto: "SEG",
    modo_pago: "Transferencia", col: "#7c3aed"
  },
];

// ── DATOS REALES extraídos de PNOM_NOMINAS (nominas.xls) ──────────────────
export const NOMINAS = [
  {
    persona: "FM-041", nom: "García López, Carmen", mes: "Marzo 2026",
    fecini: "01/03/2026", fecfin: "31/03/2026", dias_nomina: 28,
    devengado: 1295.60, deducciones: 165.67, liquido: 1129.93,
    cuota_ss: 317.52, convenio: "Limpieza Madrid", categoria: "Limpiador/a",
    contrato: "Indefinido", deleg: "Madrid-Norte", grcotiz: "10",
    regimenss: "0111", paga: false, estado: "pagada", col: "#b91c1c"
  },
  {
    persona: "FM-042", nom: "Martínez Ruiz, José", mes: "Marzo 2026",
    fecini: "01/03/2026", fecfin: "31/03/2026", dias_nomina: 28,
    devengado: 1570.00, deducciones: 163.60, liquido: 1406.40,
    cuota_ss: 422.70, convenio: "Vigilancia España", categoria: "Vigilante Seg.",
    contrato: "Indefinido", deleg: "Sevilla", grcotiz: "07",
    regimenss: "0111", paga: false, estado: "pagada", col: "#1a56db"
  },
  {
    persona: "FM-043", nom: "Sánchez Mora, Ana", mes: "Marzo 2026",
    fecini: "01/03/2026", fecfin: "31/03/2026", dias_nomina: 15,
    devengado: 1227.60, deducciones: 81.94, liquido: 1145.66,
    cuota_ss: 330.89, convenio: "Limpieza Madrid", categoria: "Limpiador/a",
    contrato: "Temporal 6m", deleg: "Madrid-Norte", grcotiz: "10",
    regimenss: "0111", paga: false, estado: "proceso", col: "#15803d"
  },
  {
    persona: "FM-044", nom: "Torres Vega, Luis", mes: "Marzo 2026",
    fecini: "01/03/2026", fecfin: "31/03/2026", dias_nomina: 28,
    devengado: 1600.00, deducciones: 221.20, liquido: 1378.80,
    cuota_ss: 448.30, convenio: "Facility Services", categoria: "Técnico Facility",
    contrato: "Indefinido", deleg: "Barcelona", grcotiz: "07",
    regimenss: "0111", paga: false, estado: "pendiente", col: "#d97706"
  },
];

// ── DATOS REALES extraídos de FIM_CUENTAS (plan_cuentas.xls) ─────────────
export const CUENTAS = [
  { cod_cta: "100", des_cta: "CAPITAL SOCIAL", des_abrev: "CAPITAL", cod_grupo_cta: "10", nat_cta: "P", cta_activa: true, genera_anl: false },
  { cod_cta: "101", des_cta: "FONDO SOCIAL", des_abrev: "FONDO SOC.", cod_grupo_cta: "10", nat_cta: "P", cta_activa: true, genera_anl: false },
  { cod_cta: "430", des_cta: "CLIENTES", des_abrev: "CLIENTES", cod_grupo_cta: "43", nat_cta: "A", cta_activa: true, genera_anl: true },
  { cod_cta: "400", des_cta: "PROVEEDORES", des_abrev: "PROVEEDORES", cod_grupo_cta: "40", nat_cta: "P", cta_activa: true, genera_anl: true },
  { cod_cta: "472", des_cta: "H.P. IVA SOPORTADO", des_abrev: "IVA SOPORTADO", cod_grupo_cta: "47", nat_cta: "A", cta_activa: true, genera_anl: false },
  { cod_cta: "477", des_cta: "H.P. IVA REPERCUTIDO", des_abrev: "IVA REPERCUTIDO", cod_grupo_cta: "47", nat_cta: "P", cta_activa: true, genera_anl: false },
  { cod_cta: "570", des_cta: "CAJA, EUROS", des_abrev: "CAJA", cod_grupo_cta: "57", nat_cta: "A", cta_activa: true, genera_anl: false },
  { cod_cta: "572", des_cta: "BANCOS E INSTITUCIONES DE CRÉDITO", des_abrev: "BANCOS", cod_grupo_cta: "57", nat_cta: "A", cta_activa: true, genera_anl: false },
  { cod_cta: "640", des_cta: "SUELDOS Y SALARIOS", des_abrev: "SUELDOS", cod_grupo_cta: "64", nat_cta: "G", cta_activa: true, genera_anl: true },
  { cod_cta: "642", des_cta: "SEGURIDAD SOCIAL A CARGO EMPRESA", des_abrev: "SS EMPRESA", cod_grupo_cta: "64", nat_cta: "G", cta_activa: true, genera_anl: true },
  { cod_cta: "4751", des_cta: "H.P. RETENCIONES IRPF", des_abrev: "IRPF A INGR.", cod_grupo_cta: "47", nat_cta: "P", cta_activa: true, genera_anl: false },
  { cod_cta: "700", des_cta: "VENTAS DE MERCANCÍAS", des_abrev: "VENTAS", cod_grupo_cta: "70", nat_cta: "I", cta_activa: true, genera_anl: true },
];

// ── DATOS REALES extraídos de CM_CLIENTES (clientes.xls) ──────────────────
export const CLIENTES = [
  { cod_cli: "10000", nombre_cli: "Grupo Hospitalario Sur", cod_pais: "ESP", cod_provincia: "28", cod_postal: "28041", e_mail: "compras@hospitalsur.es", tipo_tel1: "623456789", fecha_alta: "01/01/2020", cod_tarifa: "TAR-01", cod_grupo_cli: "HOSP", nivel_fact: "M" },
  { cod_cli: "10001", nombre_cli: "CC Parquesur", cod_pais: "ESP", cod_provincia: "41", cod_postal: "41001", e_mail: "facility@parquesur.es", tipo_tel1: "634567890", fecha_alta: "15/03/2019", cod_tarifa: "TAR-02", cod_grupo_cli: "COMER", nivel_fact: "M" },
  { cod_cli: "10002", nombre_cli: "Aeropuerto Barajas T2", cod_pais: "ESP", cod_provincia: "28", cod_postal: "28042", e_mail: "servicios@aena.es", tipo_tel1: "645678901", fecha_alta: "01/06/2018", cod_tarifa: "TAR-01", cod_grupo_cli: "INFRA", nivel_fact: "M" },
  { cod_cli: "10003", nombre_cli: "Telefónica HQ", cod_pais: "ESP", cod_provincia: "08", cod_postal: "08006", e_mail: "facilities@telefonica.com", tipo_tel1: "656789012", fecha_alta: "20/09/2021", cod_tarifa: "TAR-03", cod_grupo_cli: "CORP", nivel_fact: "M" },
  { cod_cli: "10004", nombre_cli: "Cliente de Prueba", cod_pais: "ESP", cod_provincia: "28", cod_postal: "28001", e_mail: "prueba@test.es", tipo_tel1: "600000000", fecha_alta: "01/01/2026", cod_tarifa: "TAR-01", cod_grupo_cli: "PRUEBA", nivel_fact: "M" },
];

// ── CUADRANTES (VSS_CUADRANTE_D) ──────────────────────────────────────────
export const CUADRANTES_INIT = [
  { emp: "García López, Carmen", cont: "LIM-001 Hospital Sur", turno: "Mañana 06-14h", fecha: "28/03/2026", horas: "8:00", centro: "Madrid-Norte", estado: "realizado" },
  { emp: "Martínez Ruiz, José", cont: "SEG-024 CC Parquesur", turno: "Noche 22-06h", fecha: "28/03/2026", horas: "8:00", centro: "Sevilla", estado: "realizado" },
  { emp: "Sánchez Mora, Ana", cont: "LIM-001 Hospital Sur", turno: "Tarde 14-22h", fecha: "28/03/2026", horas: "8:00", centro: "Madrid-Norte", estado: "pendiente" },
  { emp: "Torres Vega, Luis", cont: "FAC-012 Telefónica HQ", turno: "Mañana 06-14h", fecha: "28/03/2026", horas: "8:00", centro: "Barcelona", estado: "incidencia" },
  { emp: "Romero Gil, Marta", cont: "SEG-024 CC Parquesur", turno: "Partido", fecha: "28/03/2026", horas: "8:00", centro: "Sevilla", estado: "realizado" },
];

// ── ALERTAS ────────────────────────────────────────────────────────────────
export const ALERTAS = [
  { tipo: "r", ico: "⚠️", txt: "4 turnos sin cubrir — Bilbao Puerto", sub: "Urgente · hoy" },
  { tipo: "a", ico: "📄", txt: "Nómina Marzo pendiente de cierre", sub: "NORDO_TIPO_PROCESO · pendiente" },
  { tipo: "r", ico: "🚗", txt: "ITV vencida: matrícula 5678-DEF", sub: "Vencida 15/03/2026" },
  { tipo: "a", ico: "📋", txt: "Contrato CTR-2023-041 vence en 90 días", sub: "30/06/2026" },
  { tipo: "a", ico: "🦺", txt: "EPI Chaleco reflectante: renovar cert.", sub: "31/03/2026" },
];

// ── NAVEGACIÓN ─────────────────────────────────────────────────────────────
export const NAV_MODULES = [
  { id: "dashboard",      icon: "🏠", label: "Inicio",          prefix: null },
  { id: "cuadrantes",     icon: "📅", label: "Cuadrantes",      prefix: "VSS_CUADRANTE_D" },
  { id: "personal",       icon: "👥", label: "Personal",         prefix: "VSS_PERSONAL" },
  { id: "nominas",        icon: "💶", label: "Nóminas",          prefix: "PNOM_NOMINAS" },
  { id: "contabilidad",   icon: "📒", label: "Contabilidad",     prefix: "FIM_CUENTAS" },
  { id: "clientes",       icon: "🤝", label: "Clientes",         prefix: "CM_CLIENTES" },
  { id: "prl",            icon: "🦺", label: "PRL",              prefix: "PRL_EPIS" },
  { id: "vehiculos",      icon: "🚗", label: "Vehículos",        prefix: "VEH_VEHICULOS" },
  { id: "bi",             icon: "📊", label: "BI / CSM",         prefix: "DIR_INDICADORES" },
];

export const BOTTOM_TABS = [
  { id: "dashboard",    icon: "🏠", label: "Inicio" },
  { id: "cuadrantes",  icon: "📅", label: "Cuadrant." },
  { id: "personal",    icon: "👥", label: "Personal" },
  { id: "nominas",     icon: "💶", label: "Nóminas" },
  { id: "contabilidad",icon: "📒", label: "Contabil." },
];

export const DRAWER_SECTIONS = [
  { label: "Módulos Core",      items: ["cuadrantes", "personal", "nominas", "contabilidad"] },
  { label: "Comercial",         items: ["clientes", "bi"] },
  { label: "Operacional",       items: ["prl", "vehiculos"] },
];
