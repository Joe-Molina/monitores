export const updateEndTime = async (data: any, id: any) => {

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

export const updateInitialTime = async (data: any, id: any) => {

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