/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Shelter` table. All the data in the column will be lost.
  - You are about to drop the `Version` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `version` to the `Shelter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shelter" DROP COLUMN "updatedAt",
ADD COLUMN     "version" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Version";

-- CreateTable
CREATE TABLE "ShelterArchive" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "beds" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShelterArchive_pkey" PRIMARY KEY ("id")
);
