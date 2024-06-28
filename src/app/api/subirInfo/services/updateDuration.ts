import { prisma } from "../../../../libs/prisma";

export const updateDuration = async (id: string, duration: number) => {
  const res = await prisma.publicidad.update({
    where: {
      id: Number(id), //pasar params.id
    },
    data: {
      duration,
    },
  });

  return res;
};
