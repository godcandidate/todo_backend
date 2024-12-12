import { NextFunction, Request, Response } from "express";
import todoModel from "../models/todo.model";

import "dotenv/config";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";

//Add todo interface
interface IAddTodoBody {
  title: string;
  description: string;
  priority: string;
  category: string;
  date: Date;
}

export const createTodo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, priority, category, date } = req.body;

    const todo: IAddTodoBody = {
      title,
      description,
      priority,
      category,
      date,
    };

    //save todo in database
    await todoModel.create(todo);  

    return res.status(200).send({
      msg: 'Todo added successfully',
    });

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//Retrieve all todos
export const getAllTodos = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
  try {

    //Get all todos from database
    const todos = await todoModel.find();

    res.status(200).json(todos);

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
});


//Get a todo details given the id
export const getTodo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
  try {

     //Get a todo from database
    const post_id = req.params.id;
    const todo = await todoModel.findById(post_id);
   

    res.status(200).json(todo);

  } catch (error: any) {
    return next(new ErrorHandler(error.message, 400));
  }
});


// update a todo details given the id
export const editTodo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todoData = req.body;
      
      const todoId = req.params.id;

      const todo = await todoModel.findByIdAndUpdate(
        todoId,
        { $set: todoData },
        { new: true }
      );

      res.status(200).json(todo);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Delete a todo given its ID
export const deleteTodo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todoId = req.params.id;

      // Delete the todo
      await todoModel.findByIdAndDelete(todoId);

      res.status(200).json({
        msg: "Todo successfully deleted",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
