"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../database/db");
const Task = db_1.sequelize.define('Task', {
    task_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    task_name: {
        type: sequelize_1.DataTypes.STRING
    },
    task_description: {
        type: sequelize_1.DataTypes.STRING
    },
    task_priority: {
        type: sequelize_1.DataTypes.INTEGER
    }
});
exports.default = Task;
