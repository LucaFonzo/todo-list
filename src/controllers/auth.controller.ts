import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { User } from "../models";
import { generateJWT } from "../helpers/generate-jwt";
export const login = async (req: Request, res: Response) => {
  const { user_email, user_password } = req.body;
  try {
    const user = await User.findOne({ where: { user_email } });
    if (!user) {
      return res.status(400).json({ msg: `User With Email ${user_email} No Exists` });
    }
    const isValidPassword = await bcrypt.compare(
      user_password,
      user.dataValues.user_password
    );
    if (!isValidPassword) {
      return res.status(400).json({ msg: 'Incorrect Password' });
    }
    const { user_id, user_name } = user.dataValues;
    const token = await generateJWT(user_id, user_name);
    res.json({token})
  } catch (error) {
    return res.status(400).json({msg: "Not Valid User"})
  }
}