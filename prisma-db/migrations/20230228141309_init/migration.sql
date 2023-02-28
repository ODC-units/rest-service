-- CreateTable
CREATE TABLE "shelter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shelter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shelter_service" (
    "shelterId" TEXT NOT NULL,
    "serviceAttribute" TEXT NOT NULL,
    "serviceValue" TEXT NOT NULL,

    CONSTRAINT "shelter_service_pkey" PRIMARY KEY ("shelterId","serviceAttribute","serviceValue")
);

-- CreateTable
CREATE TABLE "service" (
    "attribute" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("attribute","value")
);

-- AddForeignKey
ALTER TABLE "shelter_service" ADD CONSTRAINT "shelter_service_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "shelter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shelter_service" ADD CONSTRAINT "shelter_service_serviceAttribute_serviceValue_fkey" FOREIGN KEY ("serviceAttribute", "serviceValue") REFERENCES "service"("attribute", "value") ON DELETE RESTRICT ON UPDATE CASCADE;
