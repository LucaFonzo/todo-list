import { Request, Response } from "express"
import { uploadFile } from "../helpers/upload-file";

export const uploadAvatar = async (req: Request, res: Response) => {
  if (!req.files?.avatar) {
    return res.status(400).json({ msg: "Not Image Found" });
  }
  const pathImg = await uploadFile(req.files?.avatar, ["png", "jpg"], "img");
  return res.json({ msg: "Image Upload SuccessFull", pathImg });
}
