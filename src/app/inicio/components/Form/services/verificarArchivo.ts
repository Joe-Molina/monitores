import { useFormContext } from "@/app/inicio/hooks/useForm";
import {
  serviceSubirArchivoACarpeta,
  serviceSubirRegistro,
} from "@/services/subirPublicacion";

export const verificarArchivo = async (data: any, user: any, file: any) => {
  const { formState } = useFormContext();

  const compareFillName = data.filter(
    //@ts-ignore
    (file) => file.name == formState.Form.name
  );

  if (compareFillName.length > 0) {
    return alert(
      "ya hay un documento llamado " +
        formState.Form.name +
        " debes cambiar el nombre del archivo que quieres guardar antes de subirlo"
    );
  } else {
    // es un archivo nuevo
    await serviceSubirRegistro(formState.Form, user);

    if (file) {
      await serviceSubirArchivoACarpeta(file);
    }
  }

  location.reload();
};
