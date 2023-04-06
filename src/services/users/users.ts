import { Types } from "mongoose";
import { AdminModel } from "../../models/admin/interface";
import { UsersModel } from "../../models/users/interface";
import { UsersSchemaDB } from "../../models/users/users";

const createUser = async (postData: UsersModel) =>
  await new UsersSchemaDB(postData).save();

const getAllUsers = async (pageNumber: number, limit: number) =>
  await UsersSchemaDB.find().limit(limit).skip(pageNumber).exec();

const getUserByEmail = async (email: string) =>
  await UsersSchemaDB.findOne({ email }).exec();

const updateUserByID = async (userID: Types.ObjectId, postData: UsersModel) =>
  await UsersSchemaDB.findByIdAndUpdate(userID, postData, { new: true }).exec();

const updateUserStatusByID = async (
  userID: Types.ObjectId,
  isActive: boolean
) =>
  await UsersSchemaDB.findByIdAndUpdate(
    userID,
    { isActive },
    { new: true }
  ).exec();

const getUserByID = async (userID: Types.ObjectId) =>
  await UsersSchemaDB.findOne(userID).exec();

const insertUsers = async (postData: UsersModel[]) =>
  await UsersSchemaDB.insertMany(postData);

const UserServices = {
  createUser,
  getAllUsers,
  getUserByEmail,
  updateUserByID,
  getUserByID,
  insertUsers,
  updateUserStatusByID,
};

export default UserServices;
