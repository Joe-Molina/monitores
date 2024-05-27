export const deletePubli = async (id: any, user: any, publi: any) => {

    console.log(id)

    const res2 = await fetch(`/api/subirInfo/${id}`, {
        method: "DELETE"
    }
    )
    await res2.json()

        //usuario que lo subio (id usuario)
    //accion (subio flayer)
    //descripcion (id tal, imagen tal)

    console.log(user)

    const resAud = await fetch('/api/auditoria', {
        method: "POST",
        body: JSON.stringify({ id_usuario: Number(user.id),
            accion: user.name,
            descripcion: `Eliminacion de imagen ${publi.name}`,
            tipo: "Eliminacion"
        } 
        ),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const newAuditoria = await resAud.json()
    location.reload()

}