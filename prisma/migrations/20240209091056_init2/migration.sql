-- CreateTable
CREATE TABLE "with-drizzle_files" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uploadedBy" INTEGER NOT NULL,

    CONSTRAINT "with-drizzle_files_pkey" PRIMARY KEY ("id")
);
