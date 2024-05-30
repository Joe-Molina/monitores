export const serviceSubirArchivoACarpeta = async (file: any) => {
  const form = new FormData();
  //@ts-ignore
  form.set("file", file);

  //sending file
  const res = await fetch("/api/upload", {
    method: "POST",
    body: form,
  });
  const dataUpload = await res.json();
};

export const serviceSubirRegistro = async (data: any, user: any) => {
  const resInfo = await fetch("/api/subirInfo", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const newRegistro = await resInfo.json();

  //usuario que lo subio (id usuario)
  //accion (subio flayer)
  //descripcion (id tal, imagen tal)

  const resAud = await fetch("/api/auditoria", {
    method: "POST",
    body: JSON.stringify({
      id_usuario: Number(user.id),
      accion: user.name,
      descripcion: `Nueva publicacion  Tipo:${data.type} Nombre:${data.name}`,
      tipo: "historial",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const newAuditoria = await resAud.json();
  console.log(newRegistro);
  console.log(newAuditoria);
};
