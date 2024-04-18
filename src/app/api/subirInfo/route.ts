import { prisma } from "../../../libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const publicidad = await prisma.publicidad.findMany();
    return NextResponse.json(publicidad);
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

    console.log('llegamo hasta aca')

    const { name, type, duration } = await request.json();

    console.log(name, type, duration)

    const newPublicidad = await prisma.publicidad.create({
      data: {
        name, type, duration 
      }
    })
    
    console.log('pero no hasta aca?')

    return NextResponse.json(newPublicidad);
  } catch (error) {}
}