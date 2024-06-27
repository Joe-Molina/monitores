export const deletePubli = async (id: any, user: any, publi: any) => {
  console.log(id);

  const res2 = await fetch(`/api/subirInfo/${id}`, {
    method: "DELETE",
  });
  const data = await res2.json();
  console.log(data);

  const resAud = await fetch("/api/auditoria", {
    method: "POST",
    body: JSON.stringify({
      id_usuario: Number(user.id),
      accion: user.name,
      descripcion: `Eliminacion de imagen ${publi.name}`,
      tipo: "Eliminacion",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const datos = await resAud.json();
  return data;
};
