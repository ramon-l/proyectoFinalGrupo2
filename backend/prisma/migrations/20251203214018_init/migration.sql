-- CreateTable
CREATE TABLE "Clientes" (
    "clienteId" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "edad" INTEGER,
    "telefono" TEXT NOT NULL,
    "mail" TEXT NOT NULL,

    CONSTRAINT "Clientes_pkey" PRIMARY KEY ("clienteId")
);

-- CreateTable
CREATE TABLE "Autos" (
    "autoId" SERIAL NOT NULL,
    "marca" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "anho" TEXT NOT NULL,

    CONSTRAINT "Autos_pkey" PRIMARY KEY ("autoId")
);

-- CreateTable
CREATE TABLE "Ventas" (
    "ventaId" SERIAL NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "autoId" INTEGER NOT NULL,
    "tipoVenta" TEXT NOT NULL,
    "montoCuota" DOUBLE PRECISION,
    "tipoPago" TEXT NOT NULL,

    CONSTRAINT "Ventas_pkey" PRIMARY KEY ("ventaId")
);

-- CreateTable
CREATE TABLE "Catalogo" (
    "catalogoId" SERIAL NOT NULL,
    "autoId" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "descuento" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT 'En stock',
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "Catalogo_pkey" PRIMARY KEY ("catalogoId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clientes_mail_key" ON "Clientes"("mail");

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_autoId_fkey" FOREIGN KEY ("autoId") REFERENCES "Autos"("autoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Clientes"("clienteId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Catalogo" ADD CONSTRAINT "Catalogo_autoId_fkey" FOREIGN KEY ("autoId") REFERENCES "Autos"("autoId") ON DELETE RESTRICT ON UPDATE CASCADE;
