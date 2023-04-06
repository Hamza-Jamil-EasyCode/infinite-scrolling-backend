import { Types } from 'mongoose';

export interface AddressModel {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
}

export interface UsersModel {
  name: string;
  email: string;
  address: AddressModel;
  role: 'internee' | 'junior' | 'senior';
  phoneNumber: number;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateUserResponseModel = UsersModel & {
  _id: Types.ObjectId;
};

export interface PaginationRequest {
  pageNumber: number;
  limit: number;
}

export interface GetPaginatedUsersResponse {
  total: number;
}
