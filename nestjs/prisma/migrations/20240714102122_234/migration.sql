-- DropForeignKey
ALTER TABLE "Shortened" DROP CONSTRAINT "Shortened_userId_fkey";

-- AddForeignKey
ALTER TABLE "Shortened" ADD CONSTRAINT "Shortened_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
