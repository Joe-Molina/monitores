import fs from 'fs'
import path from 'path'

const directorioActual = path.join(process.cwd(), 'public', 'fotos');;
console.log(directorioActual);

export const archivos = fs.readdirSync(directorioActual).forEach(archivo => {
    console.log(archivo); // Muestra el nombre de cada archivo o carpeta
});


