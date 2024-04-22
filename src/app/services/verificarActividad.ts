export const verificarEstadoActividad = (fechaInicio: any, fechaFin: any) => {
    // Comprobación de tipo de datos para las fechas
    if (!(fechaInicio instanceof Date) || !(fechaFin instanceof Date)) {
        throw new TypeError('fechaInicio y fechaFin deben ser objetos Date');
    }
    // Nombres de variables más descriptivos
    const fechaDeInicio = fechaInicio.getTime();
    const fechaDeFin = fechaFin.getTime();
    
    // Comparación concisa usando AND lógico (&&)
    const resultado = fechaDeInicio < Date.now() && fechaDeFin > Date.now();
    return resultado
};