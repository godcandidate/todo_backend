import express from "express";
import { createTodo } from "../controllers/todo.controller";

const todoRouter = express.Router();

todoRouter.post('/add', createTodo);

export default todoRouter;