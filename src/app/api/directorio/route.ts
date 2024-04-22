import fs from 'fs'
import { NextRequest, NextResponse } from "next/server";
import path from 'path'

export async function GET(request: NextRequest) {

    
    const directorioActual = path.join(process.cwd(), 'public', 'fotos');;
    console.log(directorioActual);
    
    const archivos = fs.readdirSync(directorioActual).forEach(archivo => {
      console.log(archivo); // Muestra el nombre de cada archivo o carpeta
    });

    console.log(archivos)
  
    return NextResponse.json({s: 'succes'});
  }