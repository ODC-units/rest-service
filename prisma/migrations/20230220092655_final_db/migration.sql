/*
  Warnings:

  - Added the required column `author` to the `Shelter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `ShelterArchive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shelter" ADD COLUMN     "author" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ShelterArchive" ADD COLUMN     "author" TEXT NOT NULL;
