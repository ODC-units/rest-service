/*
  Warnings:

  - Added the required column `beds` to the `Shelter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Shelter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Shelter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Shelter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Shelter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Shelter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Shelter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shelter" ADD COLUMN     "beds" INTEGER NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
