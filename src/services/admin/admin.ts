import { Types } from 'mongoose';
import { AdminModel } from '../../models/admin/interface';
import { AdminsSchemaDB } from '../../models/admin/admin';

const createAdmin = async (postData: AdminModel) =>
  await new AdminsSchemaDB(postData).save();

const getAdmins = async () => await AdminsSchemaDB.find().exec();

const getAdminByEmail = async (email: string) =>
  await AdminsSchemaDB.findOne({ email }).exec();

const updateAdminByID = async (adminID: Types.ObjectId, postData: AdminModel) =>
  await AdminsSchemaDB.findByIdAndUpdate(adminID, postData).exec();

const updateAdminLoggedInStatus = async (
  adminID: Types.ObjectId,
  isLogged: boolean,
) =>
  await AdminsSchemaDB.findByIdAndUpdate(
    adminID,
    { isLogged },
    {
      new: true,
    },
  ).exec();

const getAdminByID = async (adminID: Types.ObjectId) =>
  await AdminsSchemaDB.findOne(adminID).exec();

const AdminServices = {
  createAdmin,
  updateAdminByID,
  getAdmins,
  getAdminByEmail,
  updateAdminLoggedInStatus,
  getAdminByID,
};

export default AdminServices;
