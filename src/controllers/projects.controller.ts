import { Request, Response } from "express";
import { Project } from "../models/index";

export const create = async (req: Request, res: Response) => {
  try {
    const { project_name, project_description } = req.body;
    const project = await Project.create({ project_name, project_description });
    res.status(201).json({ project });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error 500" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const projects = await Project.findAll();
    return res.json({ projects });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error 500" });
  }
}

export const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({ where: { project_id: id } });
    return res.json({ project });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error 500" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { project_name, project_description } = req.body;
    const project = await Project.update({ project_name, project_description }, { where: { project_id: id } });
    if (!project) {
      return res.status(400).json({ msg: `Project With id: ${id} Not Exists` });
    }
    return res.json({ msg: `Project With id: ${id} Updated With Success` });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error 500" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await Project.destroy({ where: { project_id: id } });
    if (!project) {
      return res.status(400).json({ msg: `Project with id: ${id} Not Exists` });
    }
    return res.json({ msg: "Project Deleted With Success" });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error 500" });
  }
};

