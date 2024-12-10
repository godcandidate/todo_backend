import todoModel from "../models/todo.model";

jest.mock("../models/todo.model");

describe("Todo Model Mocking", () => {
  it("should mock a successful save operation", async () => {
    const mockSave = jest.fn().mockResolvedValue({
      _id: "mockId123",
      title: "Test Todo",
      description: "Test Description",
      priority: "high",
      category: "work",
      date: new Date(),
      status: "active",
    });

    todoModel.prototype.save = mockSave; // Mocking the save method

    const todoData = {
      title: "Test Todo",
      description: "Test Description",
      priority: "high",
      category: "work",
      date: new Date(),
    };

    const todo = new todoModel(todoData);
    const savedTodo = await todo.save();

    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(savedTodo._id).toBe("mockId123");
    expect(savedTodo.title).toBe("Test Todo");
  });

  it("should mock a failed save operation", async () => {
    const mockSave = jest.fn().mockRejectedValue(new Error("Save failed"));

    todoModel.prototype.save = mockSave; // Mocking the save method

    const todoData = {
      title: "Test Todo",
      description: "Test Description",
      priority: "high",
      category: "work",
      date: new Date(),
    };

    const todo = new todoModel(todoData);

    await expect(todo.save()).rejects.toThrow("Save failed");
    expect(mockSave).toHaveBeenCalledTimes(1);
  });
});
