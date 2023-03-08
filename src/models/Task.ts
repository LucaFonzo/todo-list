import { DataTypes } from "sequelize";
import { sequelize } from "../database/db";

const Task = sequelize.define('Task', {
  task_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  task_name: {
    type: DataTypes.STRING
  },
  task_description: {
    type: DataTypes.STRING
  },
  task_priority: {
    type: DataTypes.INTEGER
  }
})


export default Task;