import jwt from "jsonwebtoken";

export const generateJWT = async (user_id: string, user_name: string) => {
  return jwt.sign({
    user_id,
    user_name,
  }, process.env.PRIVATE_KEY as string, {
    expiresIn: '1d'
  })
};
