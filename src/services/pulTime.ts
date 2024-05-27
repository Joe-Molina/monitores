export const updateEndTime = async (data: any, id: any, user: any, oldFecha: any, name: any) => {

    await fetch('/api/auditoria', {
        method: "POST",
        body: JSON.stringify({
            id_usuario: Number(user.id),
            accion: user.name,
            descripcion: `cambio de fecha del archivo ${name} de ${oldFecha} a ${data.toLocaleDateString()}`,
            tipo: "cambio de fecha fin"
        }
        ),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const res = await fetch(`/api/subirInfo/${id}`, {
        method: "PUT",
        body: JSON.stringify({ Fecha_Fin: data }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const datos = await res.json();
    if (datos) {
        location.reload()
    }

}

export const updateInitialTime = async (data: any, id: any, user: any, oldFecha: any, name: any) => {

    await fetch('/api/auditoria', {
        method: "POST",
        body: JSON.stringify({
            id_usuario: Number(user.id),
            accion: user.name,
            descripcion: `cambio de fecha del archivo ${name} de ${oldFecha} a ${data.toLocaleDateString()}`,
            tipo: "cambio de fecha inicio"
        }
        ),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const res = await fetch(`/api/subirInfo/${id}`, {
        method: "PUT",
        body: JSON.stringify({ fecha_inicio: data }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const datos = await res.json();
    if (datos) {
        location.reload()
    }
}