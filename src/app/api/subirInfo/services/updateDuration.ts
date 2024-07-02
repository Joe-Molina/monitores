import { prisma } from "../../../../libs/prisma";

export const updateDuration = async (duration: number, id: number) => {
  if (duration) {
    const res = await prisma.publicidad.update({
      where: { id },
      data: {
        duration,
      },
    });

    return res.duration;
  } else {
    // el else de abajo devuelve un json con la publicacion que se busco pero q no paso duracion nueva
    const res = await prisma.publicidad.findFirst({
      where: { id },
    });
    return res?.duration;
  }
};
