import { Sequelize } from 'sequelize';


export const sequelize = new Sequelize(
  process.env.DB_NAME ?? "todo_db",
  process.env.DB_USER ?? "root",
  process.env.DB_PASSWORD ?? "",
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) ?? 3306 ,
    dialect: "mysql",
  }
);

export async function connectDB() {
  try {
    //await sequelize.sync();
    await sequelize.authenticate();
    console.log("Database connection succesfull");
  } catch (error) {
    console.log(error);
  }
}


