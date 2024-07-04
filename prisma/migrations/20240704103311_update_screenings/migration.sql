-- DropForeignKey
ALTER TABLE "Screening" DROP CONSTRAINT "Screening_screenId_fkey";

-- AlterTable
ALTER TABLE "Screening" ALTER COLUMN "screenId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Screening" ADD CONSTRAINT "Screening_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "Screen"("id") ON DELETE SET NULL ON UPDATE CASCADE;
