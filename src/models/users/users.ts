import mongoose, { Schema } from 'mongoose';
import { AddressModel, UsersModel } from './interface';

export const AddressSchema = new Schema<AddressModel>({
    addressLine1: String,
    addressLine2: String,
    city: String,
    country: String,
    state: String,
  });

const UsersSchema = new Schema<UsersModel>(
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
    address: AddressSchema,
    phoneNumber: Number,
    role: {
      type: String,
      enum: ['internee', 'junior', 'senior'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const UsersSchemaDB = mongoose.model<UsersModel>('users', UsersSchema);
