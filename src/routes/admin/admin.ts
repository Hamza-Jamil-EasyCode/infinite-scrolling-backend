import express, { Router } from 'express';
import AdminController from '../../controllers/admin/admin';
import { checkToken } from '../../middleware/auth/checkToken';

export const AdminRoutes: Router = express.Router();

AdminRoutes.post('/admin/login', AdminController.loginAdmin);
AdminRoutes.post('/admin/register', AdminController.createAdmin);
AdminRoutes.get(
  '/admin/exist/:adminID',
  checkToken,
  AdminController.checkAdminExist,
);
AdminRoutes.get('/admin', checkToken, AdminController.getAdmins);
