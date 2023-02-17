/*
  Warnings:

  - The primary key for the `Shelter` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Shelter" DROP CONSTRAINT "Shelter_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Shelter_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Shelter_id_seq";
