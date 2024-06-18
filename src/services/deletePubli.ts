export const deletePubli = async (id: any, user: any, publi: any) => {
  const res2 = await fetch(`/api/subirInfo/${id}`, {
    method: "DELETE",
  });
  await res2.json();

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

  //   const newAuditoria = await resAud.json(); // usar para enviar la respuesta al cliente
  location.reload();
};
