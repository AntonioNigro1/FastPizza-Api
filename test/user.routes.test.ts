import { IUser } from "../src/core/entities/user/interface/user";
import { dbDisconnectTest } from "./dbConnectionTest";
import { request } from "./helpers";
const UserDB = require("../src/core/entities/user/models/User");

describe("User public routes Test", () => {
  afterAll(async () => {
    await dbDisconnectTest();
  });
  test("createUser Test ", async () => {
    const userInfo: IUser = {
      name: "testuser",
      email: "testemailtest@gmail.com",
      password: "test1234",
    };
    await request.post("/user/create").send(userInfo).expect(200);
    await UserDB.deleteOne({ email: userInfo.email });
  });
  test("authenticateUser Test", async () => {
    const userInfo = {
      email: "testemail1@gmail.com",
      password: "test1234",
    };
    await request.post("/user/authenticate").send(userInfo).expect(200);
  });
});
