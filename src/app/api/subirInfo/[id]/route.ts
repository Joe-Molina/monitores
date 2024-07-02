import { prisma } from "../../../../libs/prisma";
import { NextResponse } from "next/server";
import { asignarPositions } from "../services/asignarPosition";
import { updateEndDate, updateStartDate } from "../services/updateDate";
import { updateDuration } from "../services/updateDuration";

interface Params {
  params: { id: number };
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

    const newDuration = await updateDuration(duration, Number(params.id));
    const newEndDate = await updateEndDate(Fecha_Fin, Number(params.id));
    const newStartDate = await updateStartDate(fecha_inicio, Number(params.id));
    const newPositions = await asignarPositions(position, Number(params.id));

    return NextResponse.json({
      newDuration,
      newEndDate,
      newPositions,
      newStartDate,
    });
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
