import { prisma } from "../../../../libs/prisma";
import { NextResponse } from "next/server";
import { asignarPositions } from "../service/asignarPosition";
import { updateDate } from "../service/updateDate";
import { updateDuration } from "../service/updateDuration";

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

    /////////////
    const updateTime = updateDate(fecha_inicio, Fecha_Fin, params.id);

    const updateDura = updateDuration(params.id, duration);

    const updatePosi = asignarPositions(position, params.id);

    if (updateTime) {
      return NextResponse.json(updateTime);
    } else if (updateDura) {
      return NextResponse.json(updateDura);
    } else if (updatePosi) {
      return NextResponse.json(updatePosi);
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
