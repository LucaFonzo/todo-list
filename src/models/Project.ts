import { DataTypes } from "sequelize";
import { sequelize } from '../database/db';
import Task from "./Task";

const Project = sequelize.define('Project', {
  project_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  project_name: {
    type: DataTypes.STRING
  },
  project_description: {
    type: DataTypes.STRING
  }
});

Project.hasMany(Task, {
  foreignKey: "project_fk",
  sourceKey: "project_id",
});

Task.belongsTo(Project, {
  foreignKey: "project_fk",
  targetKey: "project_id",
});


export default Project;