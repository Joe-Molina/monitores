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
      const { fecha_inicio, Fecha_Fin } =
        await request.json();
  
      const updateTime = await prisma.publicidad.update({
        where: {
          id: Number(params.id),
        },
        data: {
          fecha_inicio,
          Fecha_Fin
        },
      });
  
      if (!updateTime) {
        return NextResponse.json(
          { message: "card no encontrada" },
          { status: 404 }
        );
      }
  
      return NextResponse.json(updateTime);
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