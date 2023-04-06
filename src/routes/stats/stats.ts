import express, { Router } from 'express';
import StatsController from '../../controllers/stats/stats';
import { checkToken } from '../../middleware/auth/checkToken';

export const StatsRoutes: Router = express.Router();

StatsRoutes.get(
  '/stats/total/users',
  checkToken,
  StatsController.getTotalUsers,
);
