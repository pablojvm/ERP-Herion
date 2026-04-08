import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding...");

  // ── USUARIOS ──────────────────────────────────────────────────────────
  await prisma.usuario.upsert({
    where:  { username: "ERPSEG490" },
    update: {},
    create: {
      username: "ERPSEG490",
      password: await bcrypt.hash("admin123", 10),
      nombre:   "BERNARDO MANIVESA",
      rol:      "admin",
    },
  });

  // ── CLIENTES ──────────────────────────────────────────────────────────
  const clientesData = [
    { codCli: "10000", nombreCli: "Grupo Hospitalario Sur",  codProvincia: "28", codPostal: "28041", email: "compras@hospitalsur.es",    tipoTel1: "623456789", fechaAlta: "01/01/2020", codTarifa: "TAR-01", codGrupoCli: "HOSP",   nivelFact: "M" },
    { codCli: "10001", nombreCli: "CC Parquesur",            codProvincia: "41", codPostal: "41001", email: "facility@parquesur.es",      tipoTel1: "634567890", fechaAlta: "15/03/2019", codTarifa: "TAR-02", codGrupoCli: "COMER",  nivelFact: "M" },
    { codCli: "10002", nombreCli: "Aeropuerto Barajas T2",   codProvincia: "28", codPostal: "28042", email: "servicios@aena.es",          tipoTel1: "645678901", fechaAlta: "01/06/2018", codTarifa: "TAR-01", codGrupoCli: "INFRA",  nivelFact: "M" },
    { codCli: "10003", nombreCli: "Telefónica HQ",           codProvincia: "08", codPostal: "08006", email: "facilities@telefonica.com",  tipoTel1: "656789012", fechaAlta: "20/09/2021", codTarifa: "TAR-03", codGrupoCli: "CORP",   nivelFact: "M" },
    { codCli: "10004", nombreCli: "Cliente de Prueba",       codProvincia: "28", codPostal: "28001", email: "prueba@test.es",             tipoTel1: "600000000", fechaAlta: "01/01/2026", codTarifa: "TAR-01", codGrupoCli: "PRUEBA", nivelFact: "M" },
  ];

  for (const c of clientesData) {
    await prisma.cliente.upsert({ where: { codCli: c.codCli }, update: {}, create: c });
  }

  // ── EMPLEADOS ─────────────────────────────────────────────────────────
  const empleadosData = [
    { cod: "FM-041", nom: "García López, Carmen",  apell1: "García",   apell2: "López",  nif: "12345678A", fecnac: "15/03/1985", sexo: "F", pob: "Madrid",       prov: "Madrid",    tel1: "612345678", email: "c.garcia@empresa.es",   delegacion: "Madrid-Norte", empresa: "44", departamento: "LIM", situacion: "activo",     convenio: "Limpieza Madrid",    turno: "Mañana 06-14h" },
    { cod: "FM-042", nom: "Martínez Ruiz, José",   apell1: "Martínez", apell2: "Ruiz",   nif: "87654321B", fecnac: "22/07/1979", sexo: "M", pob: "Sevilla",      prov: "Sevilla",   tel1: "623456789", email: "j.martinez@empresa.es", delegacion: "Sevilla",      empresa: "44", departamento: "SEG", situacion: "activo",     convenio: "Vigilancia España",  turno: "Noche 22-06h"  },
    { cod: "FM-043", nom: "Sánchez Mora, Ana",     apell1: "Sánchez",  apell2: "Mora",   nif: "23456789C", fecnac: "08/11/1991", sexo: "F", pob: "Leganés",      prov: "Madrid",    tel1: "634567890", email: "a.sanchez@empresa.es",  delegacion: "Madrid-Norte", empresa: "44", departamento: "LIM", situacion: "baja",       convenio: "Limpieza Madrid",    turno: "Tarde 14-22h"  },
    { cod: "FM-044", nom: "Torres Vega, Luis",     apell1: "Torres",   apell2: "Vega",   nif: "34567890D", fecnac: "30/05/1988", sexo: "M", pob: "Barcelona",    prov: "Barcelona", tel1: "645678901", email: "l.torres@empresa.es",   delegacion: "Barcelona",    empresa: "44", departamento: "FAC", situacion: "activo",     convenio: "Facility Services",  turno: "Mañana 06-14h" },
    { cod: "FM-045", nom: "Romero Gil, Marta",     apell1: "Romero",   apell2: "Gil",    nif: "45678901E", fecnac: "17/02/1995", sexo: "F", pob: "Dos Hermanas", prov: "Sevilla",   tel1: "656789012", email: "m.romero@empresa.es",   delegacion: "Sevilla",      empresa: "44", departamento: "SEG", situacion: "vacaciones", convenio: "Vigilancia España",  turno: "Partido"       },
  ];

  for (const e of empleadosData) {
    await prisma.empleado.upsert({ where: { cod: e.cod }, update: {}, create: e });
  }

  // ── NÓMINAS ───────────────────────────────────────────────────────────
  const emp = await prisma.empleado.findMany();
  const nominasData = [
    { empleadoId: emp[0].id, mes: "Marzo 2026", fecini: "01/03/2026", fecfin: "31/03/2026", diasNomina: 28, devengado: 1295.60, deducciones: 165.67, liquido: 1129.93, cuotaSS: 317.52, convenio: "Limpieza Madrid",   categoria: "Limpiador/a",    contrato: "Indefinido",    delegacion: "Madrid-Norte", grCotiz: "10", regimenSS: "0111", estado: "pagada"    },
    { empleadoId: emp[1].id, mes: "Marzo 2026", fecini: "01/03/2026", fecfin: "31/03/2026", diasNomina: 28, devengado: 1570.00, deducciones: 163.60, liquido: 1406.40, cuotaSS: 422.70, convenio: "Vigilancia España", categoria: "Vigilante Seg.", contrato: "Indefinido",    delegacion: "Sevilla",      grCotiz: "07", regimenSS: "0111", estado: "pagada"    },
    { empleadoId: emp[2].id, mes: "Marzo 2026", fecini: "01/03/2026", fecfin: "31/03/2026", diasNomina: 15, devengado: 1227.60, deducciones:  81.94, liquido: 1145.66, cuotaSS: 330.89, convenio: "Limpieza Madrid",   categoria: "Limpiador/a",    contrato: "Temporal 6m",   delegacion: "Madrid-Norte", grCotiz: "10", regimenSS: "0111", estado: "proceso"   },
    { empleadoId: emp[3].id, mes: "Marzo 2026", fecini: "01/03/2026", fecfin: "31/03/2026", diasNomina: 28, devengado: 1600.00, deducciones: 221.20, liquido: 1378.80, cuotaSS: 448.30, convenio: "Facility Services", categoria: "Técnico Facility",contrato: "Indefinido",    delegacion: "Barcelona",    grCotiz: "07", regimenSS: "0111", estado: "pendiente" },
  ];

  for (const n of nominasData) {
    const existe = await prisma.nomina.findFirst({ where: { empleadoId: n.empleadoId, mes: n.mes } });
    if (!existe) await prisma.nomina.create({ data: n });
  }

  // ── CUADRANTES ────────────────────────────────────────────────────────
  const cli = await prisma.cliente.findMany();
  const cuadrantesData = [
    { empleadoId: emp[0].id, clienteId: cli[0].id, contrato: "LIM-001 Hospital Sur",   turno: "Mañana 06-14h", fecha: "28/03/2026", horas: "8:00", centro: "Madrid-Norte", estado: "realizado"  },
    { empleadoId: emp[1].id, clienteId: cli[1].id, contrato: "SEG-024 CC Parquesur",   turno: "Noche 22-06h",  fecha: "28/03/2026", horas: "8:00", centro: "Sevilla",      estado: "realizado"  },
    { empleadoId: emp[2].id, clienteId: cli[0].id, contrato: "LIM-001 Hospital Sur",   turno: "Tarde 14-22h",  fecha: "28/03/2026", horas: "8:00", centro: "Madrid-Norte", estado: "pendiente"  },
    { empleadoId: emp[3].id, clienteId: cli[3].id, contrato: "FAC-012 Telefónica HQ",  turno: "Mañana 06-14h", fecha: "28/03/2026", horas: "8:00", centro: "Barcelona",    estado: "incidencia" },
    { empleadoId: emp[4].id, clienteId: cli[1].id, contrato: "SEG-024 CC Parquesur",   turno: "Partido",       fecha: "28/03/2026", horas: "8:00", centro: "Sevilla",      estado: "realizado"  },
  ];

  for (const c of cuadrantesData) {
    const existe = await prisma.cuadrante.findFirst({ where: { empleadoId: c.empleadoId, fecha: c.fecha, contrato: c.contrato } });
    if (!existe) await prisma.cuadrante.create({ data: c });
  }

  // ── PLAN DE CUENTAS ───────────────────────────────────────────────────
  const cuentasData = [
    { codCta: "100",  desCta: "CAPITAL SOCIAL",                      desAbrev: "CAPITAL",        codGrupoCta: "10", natCta: "P", ctaActiva: true,  generaAnl: false },
    { codCta: "101",  desCta: "FONDO SOCIAL",                        desAbrev: "FONDO SOC.",      codGrupoCta: "10", natCta: "P", ctaActiva: true,  generaAnl: false },
    { codCta: "430",  desCta: "CLIENTES",                            desAbrev: "CLIENTES",        codGrupoCta: "43", natCta: "A", ctaActiva: true,  generaAnl: true  },
    { codCta: "400",  desCta: "PROVEEDORES",                         desAbrev: "PROVEEDORES",     codGrupoCta: "40", natCta: "P", ctaActiva: true,  generaAnl: true  },
    { codCta: "472",  desCta: "H.P. IVA SOPORTADO",                  desAbrev: "IVA SOPORTADO",   codGrupoCta: "47", natCta: "A", ctaActiva: true,  generaAnl: false },
    { codCta: "477",  desCta: "H.P. IVA REPERCUTIDO",                desAbrev: "IVA REPERCUTIDO", codGrupoCta: "47", natCta: "P", ctaActiva: true,  generaAnl: false },
    { codCta: "570",  desCta: "CAJA, EUROS",                         desAbrev: "CAJA",            codGrupoCta: "57", natCta: "A", ctaActiva: true,  generaAnl: false },
    { codCta: "572",  desCta: "BANCOS E INSTITUCIONES DE CRÉDITO",   desAbrev: "BANCOS",          codGrupoCta: "57", natCta: "A", ctaActiva: true,  generaAnl: false },
    { codCta: "640",  desCta: "SUELDOS Y SALARIOS",                  desAbrev: "SUELDOS",         codGrupoCta: "64", natCta: "G", ctaActiva: true,  generaAnl: true  },
    { codCta: "642",  desCta: "SEGURIDAD SOCIAL A CARGO EMPRESA",    desAbrev: "SS EMPRESA",      codGrupoCta: "64", natCta: "G", ctaActiva: true,  generaAnl: true  },
    { codCta: "4751", desCta: "H.P. RETENCIONES IRPF",               desAbrev: "IRPF A INGR.",    codGrupoCta: "47", natCta: "P", ctaActiva: true,  generaAnl: false },
    { codCta: "700",  desCta: "VENTAS DE MERCANCÍAS",                desAbrev: "VENTAS",          codGrupoCta: "70", natCta: "I", ctaActiva: true,  generaAnl: true  },
  ];

  for (const c of cuentasData) {
    await prisma.cuenta.upsert({ where: { codCta: c.codCta }, update: {}, create: c });
  }

  console.log("✅ Seed completado.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());