-- CreateTable
CREATE TABLE "Service" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "ShelterService" (
    "shelterId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ShelterService_pkey" PRIMARY KEY ("shelterId","serviceId")
);

-- AddForeignKey
ALTER TABLE "ShelterService" ADD CONSTRAINT "ShelterService_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShelterService" ADD CONSTRAINT "ShelterService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
