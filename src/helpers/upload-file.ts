import { v4 as uuidv4 } from "uuid";
import { UploadedFile } from "express-fileupload";
import path from "path";
export const uploadFile = (
  file: UploadedFile | UploadedFile[],
  validExtensions = ["jpg", "png", "gif", "jpeg"],
  folder: string
) => {
  return new Promise((resolve, reject) => {
    const fileToUpload = file as UploadedFile;
    const fileNameSplited = fileToUpload.name.split(".");
    const extension = fileNameSplited[fileNameSplited.length - 1];
    if (!validExtensions.includes(extension)) {
      return reject(`Not Valid Extension: ${extension}`);
    }
    const tmpName = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", folder, tmpName);
    fileToUpload.mv(uploadPath);
    return resolve(uploadPath);
  });
};