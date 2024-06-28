import { prisma } from "../../../../libs/prisma";
import { NextResponse } from "next/server";
import { asignarPositions } from "../services/asignarPosition";
import { updateDate } from "../services/updateDate";
import { updateDuration } from "../services/updateDuration";

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

    if (duration) {
      const updateD = updateDuration(params.id, duration);
      return NextResponse.json(updateD);
    }

    /////////////

    if (fecha_inicio || Fecha_Fin) {
      const updateTime = updateDate(fecha_inicio, Fecha_Fin, params.id);
      return NextResponse.json(updateTime);
    }

    // const updateDura = updateDuration(params.id, duration);

    if (position) {
      const updatePosi = asignarPositions(position, params.id);
      return NextResponse.json(updatePosi);
    }

    // if (updateTime) {
    //   return NextResponse.json(updateTime);
    // } else if (updateDura) {
    // } else if (updatePosi) {
    //   return NextResponse.json(updatePosi);
    // }
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
