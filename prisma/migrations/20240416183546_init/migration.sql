-- CreateTable
CREATE TABLE `Publicidad` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `position` INTEGER NOT NULL,

    UNIQUE INDEX `Publicidad_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
