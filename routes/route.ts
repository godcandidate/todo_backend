import express from "express";
import { createTodo, getAllTodos, getTodo } from "../controllers/todo.controller";

const todoRouter = express.Router();

todoRouter.post('/todos/add', createTodo);

todoRouter.get('/todos', getAllTodos);

todoRouter.get("/todos/:id", getTodo);

export default todoRouter;