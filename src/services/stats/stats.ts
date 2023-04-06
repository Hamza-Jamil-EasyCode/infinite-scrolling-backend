import { UsersSchemaDB } from '../../models/users/users';

const getTotalUsers = async () => await UsersSchemaDB.countDocuments();

const StatsService = {
  getTotalUsers,
};

export default StatsService;
