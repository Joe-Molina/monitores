export const serviceSubirArchivoACarpeta = async (file: any, serverURL: string) => {
  const form = new FormData();
  form.set("file", file);

  //sending file
  const res = await fetch( serverURL + `/upload`, {
    method: "POST",
    body: form,
  });
  return await res.json();
};

export const serviceSubirRegistro = async (data: any, user: any, serverURL: string) => {
  const resInfo = await fetch(serverURL + "/publicidades", {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
  const newRegistro = await resInfo.json();

  return newRegistro;
};
