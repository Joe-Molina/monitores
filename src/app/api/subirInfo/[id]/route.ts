import { prisma } from "../../../../libs/prisma";
import { NextResponse } from "next/server";

interface Params {
    params: { id: string };
  }

export async function DELETE(request: Request, { params }: Params) {
    try {
      const deletePublicidad = await prisma.publicidad.delete({
        where: {
          id: Number(params.id),
        },
      });
  
      if (!deletePublicidad) {
        return NextResponse.json(
          { message: "Publicidad no encontrada" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(deletePublicidad);
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          {
            message: error.message,
          },
          {
            status: 500,
          }
        );
      }
    }
  }

  export async function PUT(request: Request, { params }: Params) {
    try {
      const { fecha_inicio, Fecha_Fin, position, duration } =
        await request.json();

        const thisPubli = await prisma.publicidad.findFirst({
          where: {
            id: Number(params.id),
          }
        });

        const positionPubli = await prisma.publicidad.findFirst({
          where: {
            position,
          }
        });

        console.log(thisPubli)
        console.log(positionPubli)


        if(position == positionPubli?.position ){

          console.log('entro al if')
          const OldPosition = thisPubli?.position
          const NewPosition = positionPubli?.position


          const updateTime = await prisma.publicidad.update({
            where: {
              id: Number(params.id),
            },
            data: {
              fecha_inicio,
              Fecha_Fin,
              position: NewPosition
            },
          });

          const updateTimeSecond = await prisma.publicidad.update({
            where: {
              id: positionPubli?.id,
            },
            data: {
              fecha_inicio,
              Fecha_Fin,
              position: OldPosition
            },
          });

          if (!updateTime) {
            return NextResponse.json(
              { message: "card no encontrada" },
              { status: 404 }
            );
          }

          return NextResponse.json(updateTime);

        } else {

          const updateTime = await prisma.publicidad.update({
            where: {
              id: Number(params.id),
            },
            data: {
              fecha_inicio,
              Fecha_Fin,
              position,
              duration
            },
          });
      
          if (!updateTime) {
            return NextResponse.json(
              { message: "card no encontrada" },
              { status: 404 }
            );
          }

          return NextResponse.json(updateTime);
        }



  
  
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          {
            message: error.message,
          },
          {
            status: 500,
          }
        );
      }
    }
  }