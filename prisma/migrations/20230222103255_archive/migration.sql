-- CreateTable
CREATE TABLE "ShelterArchive" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShelterArchive_pkey" PRIMARY KEY ("id","createdAt")
);

-- CreateTable
CREATE TABLE "ShelterServiceArchive" (
    "shelterId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "serviceId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ShelterServiceArchive_pkey" PRIMARY KEY ("shelterId","date","serviceId")
);

-- AddForeignKey
ALTER TABLE "ShelterServiceArchive" ADD CONSTRAINT "ShelterServiceArchive_shelterId_date_fkey" FOREIGN KEY ("shelterId", "date") REFERENCES "ShelterArchive"("id", "createdAt") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShelterServiceArchive" ADD CONSTRAINT "ShelterServiceArchive_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
