import UserController from "./controllers/users/users";
import { generateRandomNumber } from "./helper/helper";
import { AddressModel, UsersModel } from "./models/users/interface";
import StatsService from "./services/stats/stats";
import UserServices from "./services/users/users";

const seedDatabase = async () => {
  try {
    const totalUsers = await StatsService.getTotalUsers();

    if (totalUsers !== 0) return;

    // Create 10,000 dummy users
    const address: AddressModel = {
      addressLine1: "test address",
      addressLine2: "test address",
      city: "test city",
      state: "test state",
      country: "test country",
    };

    const users: UsersModel[] = [...new Array(10000)].map((e, i: number) => {
      const user: UsersModel = {
        name: `test-user-${i}`,
        email: `test-${i}@gmail.com`,
        phoneNumber: generateRandomNumber(10),
        address: address,
        role: i % 10 === 0 ? "senior" : i % 2 ? "internee" : "junior",
      };

      return user;
    });

    // Insert the users into the database
    await UserServices.insertUsers(users);

    console.log("Successfully seeded the database with 10,000 users.");
  } catch (error) {
    throw error;
  }
};

export default seedDatabase;
