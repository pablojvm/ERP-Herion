-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'gestor',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empleado" (
    "id" SERIAL NOT NULL,
    "cod" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "apell1" TEXT NOT NULL,
    "apell2" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "fecnac" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "pob" TEXT NOT NULL,
    "prov" TEXT NOT NULL,
    "tel1" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "delegacion" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "situacion" TEXT NOT NULL DEFAULT 'activo',
    "convenio" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "modoPago" TEXT NOT NULL DEFAULT 'Transferencia',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Empleado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "codCli" TEXT NOT NULL,
    "nombreCli" TEXT NOT NULL,
    "codPais" TEXT NOT NULL DEFAULT 'ESP',
    "codProvincia" TEXT NOT NULL,
    "codPostal" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tipoTel1" TEXT NOT NULL,
    "fechaAlta" TEXT NOT NULL,
    "codTarifa" TEXT NOT NULL,
    "codGrupoCli" TEXT NOT NULL,
    "nivelFact" TEXT NOT NULL DEFAULT 'M',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nomina" (
    "id" SERIAL NOT NULL,
    "empleadoId" INTEGER NOT NULL,
    "mes" TEXT NOT NULL,
    "fecini" TEXT NOT NULL,
    "fecfin" TEXT NOT NULL,
    "diasNomina" INTEGER NOT NULL,
    "devengado" DOUBLE PRECISION NOT NULL,
    "deducciones" DOUBLE PRECISION NOT NULL,
    "liquido" DOUBLE PRECISION NOT NULL,
    "cuotaSS" DOUBLE PRECISION NOT NULL,
    "convenio" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "contrato" TEXT NOT NULL,
    "delegacion" TEXT NOT NULL,
    "grCotiz" TEXT NOT NULL,
    "regimenSS" TEXT NOT NULL,
    "paga" BOOLEAN NOT NULL DEFAULT false,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nomina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuadrante" (
    "id" SERIAL NOT NULL,
    "empleadoId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "contrato" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "fecha" TEXT NOT NULL,
    "horas" TEXT NOT NULL,
    "centro" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'pendiente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cuadrante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuenta" (
    "id" SERIAL NOT NULL,
    "codCta" TEXT NOT NULL,
    "desCta" TEXT NOT NULL,
    "desAbrev" TEXT NOT NULL,
    "codGrupoCta" TEXT NOT NULL,
    "natCta" TEXT NOT NULL,
    "ctaActiva" BOOLEAN NOT NULL DEFAULT true,
    "generaAnl" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Cuenta_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_username_key" ON "Usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Empleado_cod_key" ON "Empleado"("cod");

-- CreateIndex
CREATE UNIQUE INDEX "Empleado_nif_key" ON "Empleado"("nif");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_codCli_key" ON "Cliente"("codCli");

-- CreateIndex
CREATE UNIQUE INDEX "Cuenta_codCta_key" ON "Cuenta"("codCta");

-- AddForeignKey
ALTER TABLE "Nomina" ADD CONSTRAINT "Nomina_empleadoId_fkey" FOREIGN KEY ("empleadoId") REFERENCES "Empleado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cuadrante" ADD CONSTRAINT "Cuadrante_empleadoId_fkey" FOREIGN KEY ("empleadoId") REFERENCES "Empleado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cuadrante" ADD CONSTRAINT "Cuadrante_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
