/*
  Warnings:

  - Added the required column `Fecha_Fin` to the `Publicidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_inicio` to the `Publicidad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_actividad` to the `Publicidad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `publicidad` ADD COLUMN `Fecha_Fin` DATETIME(3) NOT NULL,
    ADD COLUMN `fecha_inicio` DATETIME(3) NOT NULL,
    ADD COLUMN `status_actividad` BOOLEAN NOT NULL;
