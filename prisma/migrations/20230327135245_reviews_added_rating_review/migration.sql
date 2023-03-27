/*
  Warnings:

  - Added the required column `rating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "rating" INTEGER NOT NULL,
ADD COLUMN     "review" TEXT NOT NULL;
