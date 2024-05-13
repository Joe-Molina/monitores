export const serviceSubirArchivoACarpeta = async (file: any) => {
    const form = new FormData()
    //@ts-ignore
    form.set('file', file)

    //sending file
    const res = await fetch('/api/upload', {
        method: "POST",
        body: form
    })
    const dataUpload = await res.json()
    console.log('nuovo archivo')
    console.log(dataUpload)
}

export const serviceSubirRegistro = async (data: any) => {

    const resInfo = await fetch('/api/subirInfo', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
    const newRegistro = await resInfo.json()
    console.log(newRegistro)
}
