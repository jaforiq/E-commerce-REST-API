import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployee extends Document {
  name: string;
  salary: number;
  role: string;
  permission: string[];
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const employeeSchema = new Schema<IEmployee>(
  {
    name: {
      type: String,
      required: [true, 'Employee name is required'],
      trim: true,
    },
    salary: {
      type: Number,
      required: [true, 'Salary is required'],
      min: [0, 'Salary cannot be negative'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: ['admin', 'manager', 'employee', 'intern'],
    },
    permission: {
      type: [String],
      default: ['read'],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for search
employeeSchema.index({ name: 'text', role: 'text' });

export const Employee = mongoose.model<IEmployee>('Employee', employeeSchema);
