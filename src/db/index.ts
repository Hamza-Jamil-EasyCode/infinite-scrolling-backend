const mongoose = require('mongoose');
import { config } from '../config';
const connectionString: string = String(config.server.db);

const connectDB = async () => {
  await mongoose.set("strictQuery", true);
  await mongoose
    .connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((resp: any) => console.log('Connected to MongoDB successfully'))
    .catch((error: Error) => {
      console.log('Not Connected to MongoDB');
      console.log(error?.message || error);
    });
};

export default connectDB;
