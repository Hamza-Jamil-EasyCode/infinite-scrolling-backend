import express, { Router } from "express";
import { checkToken } from "../../middleware/auth/checkToken";
import UserController from "../../controllers/users/users";

export const UsersRoutes: Router = express.Router();

UsersRoutes.post("/users", UserController.createUser);
UsersRoutes.post("/users/insert", checkToken, UserController.insertUsers);
// UsersRoutes.get(
//   '/users/exist/:userID',
//   checkToken,
//   UsersController.checkUserExist,
// );
UsersRoutes.get("/users/:userID", checkToken, UserController.getUserByID);
UsersRoutes.get("/users", checkToken, UserController.getAllUsers);
UsersRoutes.put("/users/:userID", checkToken, UserController.updateUser);
UsersRoutes.put("/users/delete/:userID", checkToken, UserController.inActiveUserByID);
