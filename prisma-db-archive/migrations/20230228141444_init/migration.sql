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
    "serviceAttribute" TEXT NOT NULL,
    "serviceValue" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shelter_service_archive_pkey" PRIMARY KEY ("shelterId","serviceAttribute","serviceValue","date")
);

-- CreateTable
CREATE TABLE "service" (
    "attribute" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("attribute","value")
);

-- AddForeignKey
ALTER TABLE "shelter_service_archive" ADD CONSTRAINT "shelter_service_archive_shelterId_date_fkey" FOREIGN KEY ("shelterId", "date") REFERENCES "shelter_archive"("id", "createdAt") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shelter_service_archive" ADD CONSTRAINT "shelter_service_archive_serviceAttribute_serviceValue_fkey" FOREIGN KEY ("serviceAttribute", "serviceValue") REFERENCES "service"("attribute", "value") ON DELETE RESTRICT ON UPDATE CASCADE;
