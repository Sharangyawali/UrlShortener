/*
  Warnings:

  - A unique constraint covering the columns `[shortUrl]` on the table `Shortened` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Shortened_shortUrl_key" ON "Shortened"("shortUrl");
