import express from "express";
import { createTodo, getAllTodos } from "../controllers/todo.controller";

const todoRouter = express.Router();

todoRouter.post('/todos/add', createTodo);
todoRouter.get('/todos', getAllTodos);

export default todoRouter;