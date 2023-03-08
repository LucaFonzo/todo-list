"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.get = exports.getAll = exports.create = void 0;
const models_1 = require("../models");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_name, task_description, task_priority, project_fk } = req.body;
        const task = yield models_1.Task.create({
            task_name,
            task_description,
            task_priority,
            project_fk,
        });
        yield task.save();
        return res.status(201).json({ task });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error 500" });
    }
});
exports.create = create;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield models_1.Task.findAll();
        return res.json({ tasks });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error 500" });
    }
});
exports.getAll = getAll;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield models_1.Task.findOne({ where: { task_id: id } });
        if (!task) {
            return res.status(400).json({ msg: `Task With ID: ${id} Not Exists` });
        }
        return res.json({ task });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error 500" });
    }
});
exports.get = get;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_name, task_description, task_priority, project_fk } = req.body;
        const { id } = req.params;
        const task = yield models_1.Task.update({
            task_name,
            task_description,
            task_priority,
            project_fk,
        }, { where: { task_id: id } });
        if (!task) {
            return res.status(400).json({ msg: `Task With ID: ${id} Not Exists` });
        }
        ;
        return res.json({ msg: `Task With ID: ${id} Updated With Success` });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error 500" });
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield models_1.Task.destroy({ where: { task_id: id } });
        if (!task) {
            return res.status(400).json({ msg: `Task With ID: ${id} Not Exists` });
        }
        return res.json({ task });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error 500" });
    }
});
exports.remove = remove;
