/*
  Warnings:

  - The primary key for the `shelter_service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `serviceId` on the `shelter_service` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `shelter_service` table. All the data in the column will be lost.
  - The primary key for the `shelter_service_archive` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `serviceId` on the `shelter_service_archive` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `shelter_service_archive` table. All the data in the column will be lost.
  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `serviceAttribute` to the `shelter_service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceValue` to the `shelter_service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceAttribute` to the `shelter_service_archive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceValue` to the `shelter_service_archive` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "shelter_service" DROP CONSTRAINT "shelter_service_serviceId_fkey";

-- DropForeignKey
ALTER TABLE "shelter_service_archive" DROP CONSTRAINT "shelter_service_archive_serviceId_fkey";

-- AlterTable
ALTER TABLE "shelter_service" DROP CONSTRAINT "shelter_service_pkey",
DROP COLUMN "serviceId",
DROP COLUMN "value",
ADD COLUMN     "serviceAttribute" TEXT NOT NULL,
ADD COLUMN     "serviceValue" TEXT NOT NULL,
ADD CONSTRAINT "shelter_service_pkey" PRIMARY KEY ("shelterId", "serviceAttribute");

-- AlterTable
ALTER TABLE "shelter_service_archive" DROP CONSTRAINT "shelter_service_archive_pkey",
DROP COLUMN "serviceId",
DROP COLUMN "value",
ADD COLUMN     "serviceAttribute" TEXT NOT NULL,
ADD COLUMN     "serviceValue" TEXT NOT NULL,
ADD CONSTRAINT "shelter_service_archive_pkey" PRIMARY KEY ("shelterId", "serviceAttribute", "date");

-- DropTable
DROP TABLE "service";
