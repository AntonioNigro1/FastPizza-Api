import { Request, Response } from "express";
import { dbConnectionTest, dbDisconnectTest } from "./dbConnectionTest";
import { IUser } from "../src/core/entities/user/interface/user";
import { v4 } from "uuid";
const UserDB = require("../src/core/entities/user/models/User");
const UserController = require("../src/core/entities/user/controllers/user.controller");

describe("userController Testing", () => {
  const userInput: IUser = {
    name: "Test name",
    email: "test15@gmail.com",
    password: "test1234",
  };

  beforeAll(async () => {
    await dbConnectionTest();
  });

  afterAll(async () => {
    await dbDisconnectTest();
  });

  test("userController create Test", async () => {
    const mockRequest = { body: userInput };
    mockRequest as any as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await UserController.create(mockRequest, mockResponse);
    await UserDB.deleteOne({ email: userInput.email });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("userController authenticate Test", async () => {
    const mockRequest = {
      body: {
        email: "lipe1110@gmail.com",
        password: "tty23123",
      },
    };
    mockRequest as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await UserController.authenticate(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("userController update Test", async () => {
    const mockRequest = {
      params: { id: "633def453e68816e1cd5288f" },
      body: {
        name: v4(),
        email: "lipe1110@gmail.com",
        password: "tty23123",
      },
    } as any as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await UserController.update(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("userController delete Test", async () => {
    const userInstance = new UserDB({ ...userInput });
    await userInstance.save();
    const mockRequest = {
      params: { id: userInstance._id },
    } as any as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await UserController.delete(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("userController getUser Test", async () => {
    const userInstance = new UserDB({ ...userInput });
    await userInstance.save();
    const mockRequest = {
      userId: userInstance._id,
    } as any as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await UserController.getUser(mockRequest, mockResponse);
    await UserDB.deleteOne({ email: userInput.email });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("userController getUsers Test", async () => {
    const mockRequest = {} as any as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await UserController.getUsers(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});
