import { NextRequest, NextResponse } from "next/server";
import {prisma} from '../../../libs/prisma'


export async function GET() {
    const publicaciones = await prisma.publicidad.findMany()

    const actualizacion = publicaciones.map((publicacion) => {

        console.log(publicacion)

    })
    

    

  
    return NextResponse.json(actualizacion);
  }