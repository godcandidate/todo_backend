import express from "express";
import { createTodo, editTodo, getAllTodos, getTodo } from "../controllers/todo.controller";

const todoRouter = express.Router();

todoRouter.post('/todos/add', createTodo);

todoRouter.get('/todos', getAllTodos);

todoRouter.get("/todos/:id", getTodo);

todoRouter.put("/todos/:id", editTodo);

export default todoRouter;