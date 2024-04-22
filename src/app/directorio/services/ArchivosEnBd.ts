import { prisma } from '../../../libs/prisma'




export const fotosBd = prisma.publicidad.findMany({
    select: {
        name: true,
    }
})