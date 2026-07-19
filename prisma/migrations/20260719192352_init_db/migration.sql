/*
  Warnings:

  - Added the required column `UpdatedAt` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "UpdatedAt" TIMESTAMP(3) NOT NULL;
