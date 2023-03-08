"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const Task_1 = __importDefault(require("./Task"));
const Project = db_1.sequelize.define('Project', {
    project_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    project_name: {
        type: sequelize_1.DataTypes.STRING
    },
    project_description: {
        type: sequelize_1.DataTypes.STRING
    }
});
Project.hasMany(Task_1.default, {
    foreignKey: "project_fk",
    sourceKey: "project_id",
});
Task_1.default.belongsTo(Project, {
    foreignKey: "project_fk",
    targetKey: "project_id",
});
exports.default = Project;
