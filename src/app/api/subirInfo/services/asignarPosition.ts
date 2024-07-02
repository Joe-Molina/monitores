import { prisma } from "../../../../libs/prisma";

export const asignarPositions = async (position: number, id: number) => {
  if (position) {
    const publi1 = await prisma.publicidad.findFirst({
      where: { id },
    });

    const publi2 = await prisma.publicidad.findFirst({
      where: {
        position,
      },
    });

    if (position === publi2?.position) {
      const updatePosition2 = await prisma.publicidad.update({
        where: {
          id: publi2?.id,
        },
        data: {
          position: publi1?.position,
        },
      });

      const updatePosition1 = await prisma.publicidad.update({
        where: { id },
        data: { position },
      });

      return {
        publi2: updatePosition2,
        publi1: updatePosition1,
      };
    } else {
      const updatePosition = await prisma.publicidad.update({
        where: { id },
        data: { position },
      });

      return { publi1: updatePosition };
    }
  }
};
