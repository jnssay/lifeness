-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('GOOGLE', 'CUSTOM', 'BOTH');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "authType" "AuthType" NOT NULL DEFAULT 'CUSTOM';
