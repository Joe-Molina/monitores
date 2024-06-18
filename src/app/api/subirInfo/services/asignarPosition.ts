import { prisma } from "../../../../libs/prisma";

export const asignarPositions = async (position: any, id: any) => {
  const thisPubli = await prisma.publicidad.findFirst({
    where: {
      id: Number(id),
    },
  });
  const positionPubli = await prisma.publicidad.findFirst({
    where: {
      position,
    },
  });

  if (position == positionPubli?.position) {
    const OldPosition = thisPubli?.position;
    const NewPosition = positionPubli?.position;

    const updateNewPosition = await prisma.publicidad.update({
      where: {
        id: Number(id), // aca pasar params.id
      },
      data: {
        position: NewPosition,
      },
    });

    const updateOldPosition = await prisma.publicidad.update({
      where: {
        id: positionPubli?.id,
      },
      data: {
        position: OldPosition,
      },
    });

    return updateNewPosition;
  } else {
    const updatePosition = await prisma.publicidad.update({
      where: {
        id: Number(id), //pasar params.id
      },
      data: {
        position,
      },
    });

    return updatePosition;
  }
};
