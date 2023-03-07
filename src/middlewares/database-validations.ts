import { User } from "../models";
export const emailExist = async (email = "") => {
  const user = await User.findOne({ where: { user_email: email } });
  if (user) {
    throw new Error(`User With Email ${email} Already Exists`);
  }
  return true;
};
