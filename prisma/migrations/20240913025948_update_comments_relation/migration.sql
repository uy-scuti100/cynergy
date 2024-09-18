/*
  Warnings:

  - You are about to drop the column `createdAt` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `parentId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `task_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_parentId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_taskId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_projectId_fkey";

-- DropIndex
DROP INDEX "comments_taskId_idx";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "createdAt",
DROP COLUMN "parentId",
DROP COLUMN "taskId",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "parent_id" UUID,
ADD COLUMN     "task_id" UUID NOT NULL,
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "start_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "createdAt",
DROP COLUMN "createdBy",
DROP COLUMN "dueDate",
DROP COLUMN "projectId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "created_by" UUID NOT NULL,
ADD COLUMN     "due_date" TIMESTAMP(3),
ADD COLUMN     "project_id" UUID NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "comments_task_id_idx" ON "comments"("task_id");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
