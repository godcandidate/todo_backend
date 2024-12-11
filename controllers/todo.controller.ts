import { Request, Response } from "express";
import todoModel from "../models/todo.model";

import "dotenv/config";
import { CatchAsyncError } from "../middlewares/catchAsyncError";

//Add todo interface
interface IAddTodoBody {
  title: string;
  description: string;
  priority: string;
  category: string;
  date: Date;
}

export const createTodo = CatchAsyncError(
  async (req: Request, res: Response) => {
  try {
    const { title, description, priority, category, date } = req.body;

    const todo: IAddTodoBody = {
      title,
      description,
      priority,
      category,
      date,
    };

    await todoModel.create(todo);  // Assuming you have the correct model and create method

    return res.status(200).send({
      msg: 'Todo added successfully',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Error, todo not created' });
  }
});
