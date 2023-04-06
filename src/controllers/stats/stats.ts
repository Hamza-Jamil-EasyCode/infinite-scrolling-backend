import { Request, Response } from 'express';
import wrapAsync from 'express-async-handler';
import StatsService from '../../services/stats/stats';

const getTotalUsers = async (req: Request, res: Response) => {
  const resp = await StatsService.getTotalUsers();

  res.status(200).send({
    data: resp,
    message: 'Record found',
  });
};

const StatsController = {
  getTotalUsers: wrapAsync(getTotalUsers),
};

export default StatsController;
