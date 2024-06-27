import { FormState } from "@/app/inicio/interfaces/interfaces";
import {
  serviceSubirArchivoACarpeta,
  serviceSubirRegistro,
} from "@/services/subirPublicacion";

export const verificarArchivo = async (
  publis: any,
  user: any,
  file: any,
  formState: FormState
) => {
  console.log(formState);

  const compareFillName = publis.filter(
    (publi: any) => publi.name == formState.Form.name
  );

  if (compareFillName.length > 0) {
    return alert(
      "ya hay un documento llamado " +
        formState.Form.name +
        " debes cambiar el nombre del archivo que quieres guardar antes de subirlo"
    );
  } else {
    const data = await serviceSubirRegistro(formState.Form, user);

    if (file) {
      await serviceSubirArchivoACarpeta(file);

      return data;
    }
  }
};
