/*
  Warnings:

  - A unique constraint covering the columns `[userId,url]` on the table `Shortened` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Shortened_userId_url_key" ON "Shortened"("userId", "url");
