import { Request, Response } from "express";
import wrapAsync from "express-async-handler";
import StatsService from "../../services/stats/stats";
import UserServices from "../../services/users/users";
import { AddressModel, UsersModel } from "../../models/users/interface";
import { generateRandomNumber } from "../../helper/helper";
import mongoose from "mongoose";

const createUser = async (req: Request, res: Response) => {
  const postData: UsersModel = req.body;

  const resp = await UserServices.createUser(postData);

  res.status(200).send({
    data: resp,
    message: "Record created",
  });
};

const updateUser = async (req: Request, res: Response) => {
  const userID = req.params.userID;
  const postData: UsersModel = req.body;

  const resp = await UserServices.updateUserByID(
    new mongoose.Types.ObjectId(userID),
    postData
  );

  res.status(200).send({
    data: resp,
    message: "Record created",
  });
};

const insertUsers = async (req: Request, res: Response) => {
  const address: AddressModel = {
    addressLine1: "test address",
    addressLine2: "test address",
    city: "test city",
    state: "test state",
    country: "test country",
  };

  const total = await StatsService.getTotalUsers();

  const users: UsersModel[] = [...new Array(10000)].map((e, i: number) => {
    const user: UsersModel = {
      name: `test-user-${total + i}`,
      email: `test-${total + i}@gmail.com`,
      phoneNumber: generateRandomNumber(10),
      address: address,
      role: i % 10 === 0 ? "senior" : i % 2 ? "internee" : "junior",
    };

    return user;
  });

  // console.log(users);

  const resp = await UserServices.insertUsers(users);

  res.status(200).send({
    data: resp,
    message: "Record found",
  });
};

const getAllUsers = async (req: Request, res: Response) => {
  const { pageNumber, limit } = req.query;

  const resp = await UserServices.getAllUsers(
    Number(pageNumber),
    Number(limit)
  );
  const total = await StatsService.getTotalUsers();

  res.status(200).json({
    data: resp,
    total,
    message: "Record found",
  });
};

const getUserByID = async (req: Request, res: Response) => {
  const userID = req.params.userID;

  const resp = await UserServices.getUserByID(
    new mongoose.Types.ObjectId(userID)
  );

  res.status(200).json({
    data: resp,
    message: "Record found",
  });
};

const inActiveUserByID = async (req: Request, res: Response) => {
  const userID = req.params.userID;

  const { isActive } = req.body;

  const resp = await UserServices.updateUserStatusByID(
    new mongoose.Types.ObjectId(userID),
    isActive
  );

  res.status(200).json({
    data: resp,
    message: `Record ${Boolean(isActive) ? "activate" : "in-activate"}`,
  });
};

const UserController = {
  createUser: wrapAsync(createUser),
  insertUsers: wrapAsync(insertUsers),
  updateUser: wrapAsync(updateUser),
  getAllUsers: wrapAsync(getAllUsers),
  getUserByID: wrapAsync(getUserByID),
  inActiveUserByID: wrapAsync(inActiveUserByID),
};

export default UserController;
