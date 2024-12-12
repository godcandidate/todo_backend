import mongoose, { Document, Model, Schema } from "mongoose";
import 'dotenv/config';

export interface ITodo extends Document {
  title: string;
  description: string;
  priority: string;
  category: string;
  date: Date;
  active: Boolean;
}

// Todo Schema
const todoSchema: Schema<ITodo> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    priority: {
      type: String,
      required: [true, "Priority is required"],
      enum: ["low", "medium", "high"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["work", "personal", "shopping", "other"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    active: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

// Set the current date to indicate completion
todoSchema.methods.markCompleted = function (): void {
  this.date = new Date(); 
};

// Todo Model
const todoModel: Model<ITodo> = mongoose.model("Todo", todoSchema);

export default todoModel;
