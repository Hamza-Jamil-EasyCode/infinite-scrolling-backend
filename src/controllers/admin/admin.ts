import { Request, Response } from 'express';
import wrapAsync from 'express-async-handler';
import { ApiError, HttpStatusCode } from '../../middleware/error/ApiError';
import {
  CreateAdminResponseModel,
  LoginModel,
  SignUpModel,
  AdminModel,
  GetAdminResponseModel,
} from '../../models/admin/interface';
import bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { config } from '../../config';
import jwt from 'jsonwebtoken';
import AdminValidateSchemas from '../../validation/admins/admin';
import AdminServices from '../../services/admin/admin';

const loginAdmin = async (req: Request, res: Response) => {
  const postData: LoginModel = req.body;

  const isAdminExist: GetAdminResponseModel =
    await AdminServices.getAdminByEmail(postData.email);

  console.log(isAdminExist);

  if (!isAdminExist)
    throw new ApiError(HttpStatusCode.NOT_FOUND, 'Email not exist');

  const isPasswordMatch: boolean = bcrypt.compareSync(
    postData.password,
    isAdminExist.password,
  );

  if (!isPasswordMatch)
    throw new ApiError(HttpStatusCode.NOT_FOUND, 'Invalid credentials');

  const dataForToken = {
    _id: isAdminExist?._id,
    AdminName: isAdminExist?.name,
    email: isAdminExist?.email,
    isActive: isAdminExist?.isActive,
    createdAt: isAdminExist?.createdAt,
    updatedAt: isAdminExist?.email,
  };

  const token = await jwt.sign(dataForToken, config.server.jwtSecretKey!);

  res.status(200).send({
    data: dataForToken,
    token,
    message: 'Login successfully',
  });
};

const createAdmin = async (req: Request, res: Response) => {
  const { error, value } = AdminValidateSchemas.register.validate(req.body);

  if (error) throw error;

  const signUpData: SignUpModel = value;

  const isEmailExist = await AdminServices.getAdminByEmail(signUpData.email);

  if (isEmailExist)
    throw new ApiError(HttpStatusCode.BAD_REQUEST, 'Email already exist');

  const bcryptPassword = await bcrypt.hashSync(signUpData.password, 12);

  const postData: AdminModel = {
    email: signUpData.email,
    name: signUpData.name,
    password: bcryptPassword,
  };

  const resp: CreateAdminResponseModel = await AdminServices.createAdmin(
    postData,
  );

  res.status(200).json({
    data: resp,
    message: 'Record created successfully',
  });
};

const getAdmins = async (req: Request, res: Response) => {
  const resp = await AdminServices.getAdmins();

  res.status(200).send({
    data: resp,
    message: 'Record created',
  });
};

const getAdminByID = async (req: Request, res: Response) => {
  const adminID: Types.ObjectId = req.body.adminID;
  const resp = await AdminServices.getAdminByID(adminID);

  res.status(200).send({
    data: resp,
    message: 'Record created',
  });
};

const checkAdminExist = async (req: Request, res: Response) => {
  const adminID: Types.ObjectId = req.body.adminID;
  const resp = await AdminServices.getAdminByID(adminID);

  const data = {
    _id: resp?._id,
    name: resp?.name,
    email: resp?.email,
    isActive: resp?.isActive,
    createdAt: resp?.createdAt,
    updatedAt: resp?.email,
  };

  res.status(200).send({
    data,
    message: 'Record created',
  });
};

const AdminController = {
  createAdmin: wrapAsync(createAdmin),
  getAdmins: wrapAsync(getAdmins),
  getAdminByID: wrapAsync(getAdminByID),
  checkAdminExist: wrapAsync(checkAdminExist),
  loginAdmin: wrapAsync(loginAdmin),
};

export default AdminController;
