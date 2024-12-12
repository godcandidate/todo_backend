import request from "supertest";
import { app } from "../app";
import todoModel from "../models/todo.model";

jest.mock("../models/todo.model", () => ({
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

// Clear mocks to avoid memory leaks
describe("Todo Controllers", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("Todo Controllers", () => {
    describe("POST /api/v1/todos/add", () => {
      it("should create a new todo", async () => {
        const newTodo = {
          title: "Test Todo",
          description: "Test Description",
          priority: "high",
          category: "work",
          date: "2024-12-12T07:17:03.462Z",
        };

        (todoModel.create as jest.Mock).mockResolvedValue(newTodo);

        const response = await request(app)
          .post("/api/v1/todos/add")
          .send(newTodo);

        expect(response.status).toBe(200);
        expect(todoModel.create).toHaveBeenCalledWith(newTodo);
      });
    });

    describe("GET /api/v1/todos", () => {
      it("should retrieve all todos", async () => {
        const todos = [
          { title: "Todo 1", description: "Description 1" },
          { title: "Todo 2", description: "Description 2" },
        ];

        (todoModel.find as jest.Mock).mockResolvedValue(todos);

        const response = await request(app).get("/api/v1/todos");

        expect(response.status).toBe(200);
        expect(todoModel.find).toHaveBeenCalled();
      });
    });

    describe("GET /api/v1/todos/:id", () => {
      it("should retrieve a todo by ID", async () => {
        const todo = { title: "Todo 1", description: "Description 1" };

        (todoModel.findById as jest.Mock).mockResolvedValue(todo);

        const response = await request(app).get("/api/v1/todos/1");

        expect(response.status).toBe(200);
        expect(response.body.todo).toEqual(todo);
        expect(todoModel.findById).toHaveBeenCalledWith("1");
      });
    });

    describe("PUT /api/v1/todos/:id", () => {
      it("should update a todo", async () => {
        const updatedTodo = {
          title: "Updated Todo",
          description: "Updated Description",
        };

        (todoModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(
          updatedTodo
        );

        const response = await request(app)
          .put("/api/v1/todos/1")
          .send(updatedTodo);

        expect(response.status).toBe(200); // Adjust based on your controller
        expect(todoModel.findByIdAndUpdate).toHaveBeenCalledWith(
          "1",
          { $set: updatedTodo },
          { new: true }
        );
      });
    });

    describe("DELETE /api/v1/todos/:id", () => {
      it("should delete a todo", async () => {
        const todo = { title: "Todo 1", description: "Description 1" };

        (todoModel.findById as jest.Mock).mockResolvedValue(todo);
        (todoModel.findByIdAndDelete as jest.Mock).mockResolvedValue(todo);

        const response = await request(app).delete("/api/v1/todos/1");

        expect(response.status).toBe(200);
        expect(todoModel.findById).toHaveBeenCalledWith("1");
        expect(todoModel.findByIdAndDelete).toHaveBeenCalledWith("1");
      });

    });
  });
});
