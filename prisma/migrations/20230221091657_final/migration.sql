/*
  Warnings:

  - You are about to drop the column `beds` on the `Shelter` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Shelter` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Shelter` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Shelter` table. All the data in the column will be lost.
  - You are about to drop the column `beds` on the `ShelterArchive` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `ShelterArchive` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `ShelterArchive` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `ShelterArchive` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shelter" DROP COLUMN "beds",
DROP COLUMN "country",
DROP COLUMN "description",
DROP COLUMN "photo";

-- AlterTable
ALTER TABLE "ShelterArchive" DROP COLUMN "beds",
DROP COLUMN "country",
DROP COLUMN "description",
DROP COLUMN "photo";
