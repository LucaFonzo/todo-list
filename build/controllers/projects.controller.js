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
const index_1 = require("../models/index");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { project_name, project_description } = req.body;
        const project = yield index_1.Project.create({ project_name, project_description });
        res.status(201).json({ project });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error 500" });
    }
});
exports.create = create;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield index_1.Project.findAll();
        return res.json({ projects });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error 500" });
    }
});
exports.getAll = getAll;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const project = yield index_1.Project.findOne({ where: { project_id: id } });
        return res.json({ project });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error 500" });
    }
});
exports.get = get;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { project_name, project_description } = req.body;
        const project = yield index_1.Project.update({ project_name, project_description }, { where: { project_id: id } });
        if (!project) {
            return res.status(400).json({ msg: `Project With id: ${id} Not Exists` });
        }
        return res.json({ msg: `Project With id: ${id} Updated With Success` });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error 500" });
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const project = yield index_1.Project.destroy({ where: { project_id: id } });
        if (!project) {
            return res.status(400).json({ msg: `Project with id: ${id} Not Exists` });
        }
        return res.json({ msg: "Project Deleted With Success" });
    }
    catch (error) {
        return res.status(500).json({ msg: "Server Error 500" });
    }
});
exports.remove = remove;
