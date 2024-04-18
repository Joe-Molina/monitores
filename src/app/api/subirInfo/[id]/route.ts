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