import { IUser } from "../src/core/entities/user/interface/user";
import { request } from "./helpers";
import dotenv from "dotenv";
import { dbDisconnectTest } from "./dbConnectionTest";
const UserDB = require("../src/core/entities/user/models/User");

describe("User private routes Test", () => {
  afterAll(async () => {
    await dbDisconnectTest();
  });

  dotenv.config();
  const token = process.env.AUTH_TOKEN;

  test("UpdateUser Test", async () => {
    await request
      .put("/user/63375e64f662af21d48600ed")
      .send({
        body: {
          name: "philipe",
          email: "lipe@hotmail.com",
          password: "asdfuh33223",
        },
      })
      .expect(401);

    await request
      .put("/user/63375e64f662af21d48600ed")
      .set({ Authorization: "" })
      .send({
        body: {
          name: "philipe",
          email: "lipe@hotmail.com",
          password: "asdfuh33223",
        },
      })
      .expect(401);

    await request
      .put("/user/63375e64f662af21d48600ed")
      .set({ Authorization: "Bearer" })
      .send({
        body: {
          name: "philipe",
          email: "lipe@hotmail.com",
          password: "asdfuh33223",
        },
      })
      .expect(401);
    await request
      .put("/user/63375e64f662af21d48600ed")
      .set({ Authorization: "Bearer " + token })
      .send({
        body: {
          name: "philipe",
          email: "lipe@hotmail.com",
          password: "asdfuh33223",
        },
      })
      .expect(200);
  });

  test("DeleteUser Test", async () => {
    const userInput: IUser = {
      name: "Test name",
      email: "testemail5@gmail.com",
      password: "test1234",
    };
    const userInstance = new UserDB({ ...userInput });
    await userInstance.save();
    await request
      .del(`/user/${userInstance._id}`)
      .set({ Authorization: "Bearer " + token });
  });

  test("GetUser Test", async () => {
    await request
      .get("/user/")
      .set("Authorization", "Bearer " + token)
      .expect(200);
  });

  test("GetUsers Test", async () => {
    await request
      .get("/user/users")
      .set("Authorization", "Bearer " + token)
      .expect(200);
  });
});
