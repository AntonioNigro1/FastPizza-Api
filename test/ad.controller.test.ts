import { Request, Response } from "express";
import { dbConnectionTest, dbDisconnectTest } from "./dbConnectionTest";
import { IAdsTest } from "../src/core/entities/ad/interface/ad";
const AdDB = require("../src/core/entities/ad/models/Ad");
const AdController = require("../src/core/entities/ad/controllers/ad.controller");

describe("adController Testing", () => {
  const adInput: IAdsTest = {
    name: "Test name",
    imagePath: "uploads/b18ecbe5-2e5d-4e22-8b67-2bd154409010.png",
    description: "test test test test test",
    ingredients: ["test"],
    likes: 1,
    price: 50,
    user: "test",
    comments: [{ comment: "test", likes: 2 }],
  };

  beforeAll(async () => {
    await dbConnectionTest();
  });

  afterAll(async () => {
    await dbDisconnectTest();
  });

  test("adController create Test", async () => {
    const adInput = {
      name: "Test name",
      description: "test test test test test",
      ingredients: ["test"],
      likes: 1,
      price: 50,
      user: "test",
      comments: [{ comment: "test", likes: 2 }],
    };

    const mockRequest = {
      body: adInput,
      file: { path: "uploads/b18ecbe5-2e5d-4e22-8b67-2bd154409010.png" },
    } as any as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await AdController.create(mockRequest, mockResponse);
    await AdDB.deleteOne({ description: adInput.description });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("adController getAds Test", async () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await AdController.getAds(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("adController filterAds Test", async () => {
    const mockRequest = { body: { filter: 250 } };
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await AdController.filterAds(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("adController likeAd Test", async () => {
    const mockRequest = { body: { adId: "6349512f5a6d780b171e1ba6" } };
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await AdController.like(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("adController removeLikeAd Test", async () => {
    const mockRequest = { body: { adId: "6349512f5a6d780b171e1ba6" } };
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await AdController.rmvLike(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("adController mostLiked Test", async () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await AdController.mostLiked(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("adController comment Test", async () => {
    const adInstance = new AdDB({ ...adInput });
    await adInstance.save();
    const mockRequest = {
      body: { adId: adInstance._id, comment: "test comment" },
    };
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await AdController.comment(mockRequest, mockResponse);
    await AdDB.deleteOne({ _id: adInstance._id });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("adController getComments Test", async () => {
    const mockRequest = {
      params: { id: "6349512f5a6d780b171e1ba6" },
    };
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await AdController.getComments(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("adController rmvComment Test", async () => {
    const adInstance = new AdDB({ ...adInput });
    await adInstance.save();
    const mockRequest = {
      body: { adId: adInstance._id, commentId: adInstance.comments[0]._id },
    };
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await AdController.rmvComment(mockRequest, mockResponse);
    await AdDB.deleteOne({ _id: adInstance._id });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("adController likeComment Test", async () => {
    const adInstance = new AdDB({ ...adInput });
    await adInstance.save();
    const mockRequest = {
      body: { adId: adInstance._id, commentId: adInstance.comments[0]._id },
    };
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;
    await AdController.likeComment(mockRequest, mockResponse);
    await AdDB.deleteOne({ _id: adInstance._id });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("adController rmvLikeComment Test", async () => {
    const mockRequest = {
      body: {
        adId: "6349512f5a6d780b171e1ba6",
        commentId: "634966e49dfc0b14f3919547",
      },
    };
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;

    await AdController.rmvLikeComment(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });

  test("adController listCommentByLike", async () => {
    const mockRequest = {
      params: {
        id: "6349512f5a6d780b171e1ba6",
      },
    };
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    } as any as Response;

    await AdController.listCommentByLike(mockRequest, mockResponse);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});
