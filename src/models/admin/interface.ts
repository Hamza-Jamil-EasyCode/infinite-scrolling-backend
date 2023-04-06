import { Types } from 'mongoose';

export interface AdminModel {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface SignUpModel {
  email: string;
  name: string;
  password: string;
}

export type CreateAdminResponseModel = AdminModel & {
  _id: Types.ObjectId;
};

export type GetAdminResponseModel = AdminModel & {
  _id: Types.ObjectId;
} | null;
