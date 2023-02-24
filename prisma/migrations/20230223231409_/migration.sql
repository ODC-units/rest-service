/*
  Warnings:

  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shelter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShelterArchive` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShelterService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShelterServiceArchive` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShelterService" DROP CONSTRAINT "ShelterService_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "ShelterService" DROP CONSTRAINT "ShelterService_shelterId_fkey";

-- DropForeignKey
ALTER TABLE "ShelterServiceArchive" DROP CONSTRAINT "ShelterServiceArchive_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "ShelterServiceArchive" DROP CONSTRAINT "ShelterServiceArchive_shelterId_date_fkey";

-- DropTable
DROP TABLE "Service";

-- DropTable
DROP TABLE "Shelter";

-- DropTable
DROP TABLE "ShelterArchive";

-- DropTable
DROP TABLE "ShelterService";

-- DropTable
DROP TABLE "ShelterServiceArchive";

-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

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
    "serviceId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "shelter_service_pkey" PRIMARY KEY ("shelterId","serviceId")
);

-- CreateTable
CREATE TABLE "shelter_archive" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shelter_archive_pkey" PRIMARY KEY ("id","createdAt")
);

-- CreateTable
CREATE TABLE "shelter_service_archive" (
    "shelterId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "serviceId" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "shelter_service_archive_pkey" PRIMARY KEY ("shelterId","date","serviceId")
);

-- AddForeignKey
ALTER TABLE "shelter_service" ADD CONSTRAINT "shelter_service_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "shelter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shelter_service" ADD CONSTRAINT "shelter_service_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shelter_service_archive" ADD CONSTRAINT "shelter_service_archive_shelterId_date_fkey" FOREIGN KEY ("shelterId", "date") REFERENCES "shelter_archive"("id", "createdAt") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shelter_service_archive" ADD CONSTRAINT "shelter_service_archive_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
