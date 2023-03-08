import { NextFunction, Request,Response } from "express"
import jwt from 'jsonwebtoken';
export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(400).json({ msg: "Token is required" });
  }
  const isValidToken = jwt.verify(token, process.env.PRIVATE_KEY as string);
  if (!isValidToken) {
    return res.status(401).json({ msg: "Not is valid token" });
  }
  next();
}