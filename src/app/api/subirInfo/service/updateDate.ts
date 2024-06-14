import { prisma } from "../../../../libs/prisma";

export const updateDate = async (
  fecha_inicio: any,
  Fecha_Fin: any,
  id: any
) => {
  if (Fecha_Fin) {
    const update = await prisma.publicidad.update({
      where: {
        id: Number(id), //pasar params.id
      },
      data: {
        Fecha_Fin,
      },
    });

    console.log("fecha fin");
    console.log(update);

    return update;
  } else if (fecha_inicio) {
    const update = await prisma.publicidad.update({
      where: {
        id: Number(id), //pasar params.id
      },
      data: {
        fecha_inicio,
      },
    });
    return update;
  }
};
