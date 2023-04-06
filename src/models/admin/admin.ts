import mongoose, { Schema } from 'mongoose';
import { AdminModel } from './interface';

const AdminsSchema = new Schema<AdminModel>(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: String,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const AdminsSchemaDB = mongoose.model<AdminModel>('admins', AdminsSchema);
