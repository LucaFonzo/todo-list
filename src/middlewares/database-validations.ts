import { User,Project } from "../models";
export const emailExist = async (email = "") => {
  const user = await User.findOne({ where: { user_email: email } });
  if (user) {
    throw new Error(`User With Email ${email} Already Exists`);
  }
  return true;
};

export const projectExist = async (id: number) => {
  const project = await Project.findOne({ where: { project_id: id } });
  if (!project) {
    throw new Error(`Project With ID: ${id} Not Exists`);
  }
  return true;
}
