import { Request, Response } from "express";
import { User } from '../models';
import bcrytp from 'bcrypt';
export const create = async (req: Request, res: Response) => {
  const { user_name, user_email, user_password } = req.body;
  try {
    const hashedPassword = await bcrytp.hash(user_password, 10);
    const user = await User.create({
      user_name,
      user_email,
      user_password: hashedPassword,
    });
    await user.save();
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.destroy({ where: { user_id: id } });
    if (!user) {
      return res.status(400).json({ msg: `User With ID: ${id} Doesnt Exists` });
    }
    return res.json({ msg: `User With ID: ${id} Deleted With Success` });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error 500" });
  }
}

export const getAll = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error 500" });
  }
}

export const get = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ where: { user_id: id } });
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error 500" });
  }
}

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_name, user_email, user_password } = req.body;
  try {
    await User.update({ user_name, user_email, user_password }, { where: { user_id: id } });
    return res.json({ msg: `User Updated SuccesFull` });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error 500" });
  }
}
