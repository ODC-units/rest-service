/*
  Warnings:

  - The primary key for the `Service` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the `ShelterArchive` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ShelterService" DROP CONSTRAINT "ShelterService_serviceId_fkey";

-- AlterTable
ALTER TABLE "Service" DROP CONSTRAINT "Service_pkey",
DROP COLUMN "name",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Service_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "ShelterArchive";

-- AddForeignKey
ALTER TABLE "ShelterService" ADD CONSTRAINT "ShelterService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
