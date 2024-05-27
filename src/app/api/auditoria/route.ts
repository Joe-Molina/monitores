import { prisma } from "../../../libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const NewRegistro = await prisma.auditoria.findMany();
      return NextResponse.json(NewRegistro);
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
  
  export async function POST(request: Request) {
    try {
      const { id_usuario, accion, descripcion, tipo } = await request.json();

  
      const newPublicidad = await prisma.auditoria.create({
        data: {
            id_usuario, accion, descripcion, tipo
        }
      })
  
      return NextResponse.json(newPublicidad);
    } catch (error) {}
  }