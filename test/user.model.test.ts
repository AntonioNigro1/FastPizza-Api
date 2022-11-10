import { dbConnectionTest, dbDisconnectTest } from "./dbConnectionTest";
import { IUser } from "../src/core/entities/user/interface/user";
const UserDB = require("../src/core/entities/user/models/User");

describe("userModel Testing", () => {
  const userInput: IUser = {
    name: "Test name",
    email: "testemail5@gmail.com",
    password: "test1234",
  };
  const userInstance = new UserDB({ ...userInput });
  beforeAll(async () => {
    await dbConnectionTest();
  });

  afterAll(async () => {
    await dbDisconnectTest();
  });

  test("userSchema Create Test", async () => {
    const createdUser = await userInstance.save();
    expect(createdUser.name).toBe(userInstance.name);
    expect(createdUser.email).toBe(userInstance.email);
    expect(createdUser.password).toBe(userInstance.password);
  });

  test("userSchema Read Test", async () => {
    const fetchedUser = await UserDB.findOne({ _id: userInstance._id });
    expect(fetchedUser).toBeDefined();
    expect(fetchedUser).toMatchObject(userInput);
  });

  test("userSchema Update Test", async () => {
    const userInputUpdate: IUser = {
      name: "Updated name",
      email: "updated@gmail.com",
      password: "updatedpassword1234",
    };
    await UserDB.updateOne({ _id: userInstance._id }, { ...userInputUpdate });
    const fetchedUser = await UserDB.findOne({ _id: userInstance._id });
    expect(fetchedUser).toBeDefined();
    expect(fetchedUser).toMatchObject(userInputUpdate);
    expect(fetchedUser).not.toMatchObject(userInput);
  });

  test("userSchema Delete Test", async () => {
    await UserDB.deleteOne({ _id: userInstance._id });
    const fetchedUser = await UserDB.findOne({ _id: userInstance._id });
    expect(fetchedUser).toBeNull();
  });
});
