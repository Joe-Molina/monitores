import { prisma } from "../../../../libs/prisma";

export const updateStartDate = async (fecha_inicio: Date, id: number) => {
  if (fecha_inicio) {
    const update = await prisma.publicidad.update({
      where: { id },
      data: {
        fecha_inicio,
      },
    });
    return update.fecha_inicio;
  } else {
    const publi = await prisma.publicidad.findFirst({
      where: {
        id: Number(id),
      },
    });
    return publi?.fecha_inicio;
  }
};

export const updateEndDate = async (Fecha_Fin: any, id: number) => {
  if (Fecha_Fin) {
    const update = await prisma.publicidad.update({
      where: { id },
      data: {
        Fecha_Fin,
      },
    });

    return update.Fecha_Fin;
  } else {
    const publi = await prisma.publicidad.findFirst({
      where: { id },
    });
    return publi?.Fecha_Fin;
  }
};
