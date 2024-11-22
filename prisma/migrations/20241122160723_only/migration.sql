/*
  Warnings:

  - You are about to drop the column `weight` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Diary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feedback` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_authorID_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorID_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_trainingPlanID_fkey";

-- DropForeignKey
ALTER TABLE "TrainingPlan" DROP CONSTRAINT "TrainingPlan_authorID_fkey";

-- DropForeignKey
ALTER TABLE "feedback" DROP CONSTRAINT "feedback_authorID_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "weight";

-- DropTable
DROP TABLE "Diary";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "TrainingPlan";

-- DropTable
DROP TABLE "feedback";
