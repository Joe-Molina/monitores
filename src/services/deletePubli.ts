export const deletePubli = async (id: any) => {

    console.log(id)

    const res2 = await fetch(`/api/subirInfo/${id}`, {
        method: "DELETE"
    }
    )
    await res2.json()
    location.reload()

}