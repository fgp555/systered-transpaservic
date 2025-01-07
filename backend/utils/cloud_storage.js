const fs = require("fs");
const path = require("path");

/**
 * Subir el archivo a almacenamiento local
 * @param {File} file Objeto que será almacenado en el servidor local
 * @param {String} pathImage Nombre base del archivo que será almacenado
 * @param {String} deletePathImage Ruta del archivo que se desea eliminar (opcional)
 */
module.exports = (file, pathImage, deletePathImage) => {
  return new Promise((resolve, reject) => {
    try {
      // Eliminar archivo existente si se proporciona `deletePathImage`
      if (deletePathImage) {
        const filePathToDelete = path.resolve(__dirname, "../uploads", deletePathImage);
        if (fs.existsSync(filePathToDelete)) {
          fs.unlinkSync(filePathToDelete);
          console.log("Archivo eliminado con éxito:", deletePathImage);
        } else {
          console.log("El archivo a eliminar no existe:", deletePathImage);
        }
      }

      // Verificar si existe el directorio de uploads, si no, crearlo
      const uploadsDir = path.resolve(__dirname, "../uploads");
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
      }

      // Extraer la extensión del archivo original
      const fileExtension = path.extname(file.originalname);
      if (!fileExtension) {
        return reject("El archivo cargado no tiene una extensión válida.");
      }

      // Agregar la extensión al nombre del archivo si no está presente
      const finalFileName = pathImage.endsWith(fileExtension) ? pathImage : `${pathImage}${fileExtension}`;

      // Ruta completa para guardar el archivo
      const filePath = path.resolve(uploadsDir, finalFileName);

      // Guardar archivo en el directorio local
      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) {
          console.error("Error al guardar el archivo:", err);
          return reject("No se pudo guardar el archivo en el servidor.");
        }

        console.log("Archivo guardado con éxito en:", filePath);

        // Generar URL local para acceder al archivo
        const localUrl = `/uploads/${finalFileName}`;
        resolve(localUrl);
      });
    } catch (error) {
      console.error("Error durante el proceso de almacenamiento:", error);
      reject("Error interno durante el almacenamiento del archivo.");
    }
  });
};
