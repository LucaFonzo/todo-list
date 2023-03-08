import { Request, Response } from 'express';
import { Task } from '../models';
export const create = async (req: Request, res: Response) => {
  try {
    const { task_name, task_description, task_priority, project_fk } = req.body;
    const task = await Task.create({
      task_name,
      task_description,
      task_priority,
      project_fk,
    });
    await task.save();
    return res.status(201).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error 500" });
  }
}

export const getAll = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll();
    return res.json({ tasks });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error 500" });
  }
};

export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findOne({ where: { task_id: id } });
    if (!task) {
      return res.status(400).json({msg: `Task With ID: ${id} Not Exists`})
    }
    return res.json({ task });
  } catch (error) {
    return res.status(500).json({msg: "Server Error 500"})
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { task_name, task_description, task_priority, project_fk } = req.body;
    const { id } = req.params;
    const task = await Task.update({
      task_name,
      task_description,
      task_priority,
      project_fk,
    }, { where: { task_id: id } });
    if (!task) {
      return res.status(400).json({msg: `Task With ID: ${id} Not Exists`})
    };
    return res.json({ msg: `Task With ID: ${id} Updated With Success` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error 500" });
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.destroy({ where: { task_id: id } });
    if (!task) {
      return res.status(400).json({ msg: `Task With ID: ${id} Not Exists` });
    }
    return res.json({ task });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error 500" });
  }
};