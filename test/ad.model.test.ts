import { dbConnectionTest, dbDisconnectTest } from "./dbConnectionTest";
import { IAdsTest } from "../src/core/entities/ad/interface/ad";
const AdDB = require("../src/core/entities/ad/models/Ad");

describe("adModel Testing", () => {
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
  const adInstance = new AdDB({ ...adInput });
  beforeAll(async () => {
    await dbConnectionTest();
  });

  afterAll(async () => {
    await dbDisconnectTest();
  });

  test("adSchema Create Test", async () => {
    const createdAd = await adInstance.save();
    expect(createdAd.name).toBe(adInstance.name);
    expect(createdAd.imagePath).toBe(adInstance.imagePath);
    expect(createdAd.description).toBe(adInstance.description);
    expect(createdAd.ingredients).toBe(adInstance.ingredients);
    expect(createdAd.likes).toBe(adInstance.likes);
    expect(createdAd.price).toBe(adInstance.price);
    expect(createdAd.user).toBe(adInstance.user);
    expect(createdAd.comments).toBe(adInstance.comments);
  });

  test("adSchema Read Test", async () => {
    const fetchedAd = await AdDB.findOne({ _id: adInstance._id });
    expect(fetchedAd).toBeDefined();
    expect(fetchedAd).toMatchObject(adInput);
  });

  test("adSchema Update Test", async () => {
    const adInputUpdate: IAdsTest = {
      name: "updated name",
      imagePath: "updated imagePath",
      description: "updated desc",
      ingredients: ["updated"],
      likes: 5,
      price: 1,
      user: "updated user",
      comments: [{ comment: "updated", likes: 6 }],
    };
    await AdDB.updateOne({ _id: adInstance._id }, { ...adInputUpdate });
    const fetchedAd = await AdDB.findOne({ _id: adInstance._id });
    expect(fetchedAd).toBeDefined();
    expect(fetchedAd).toMatchObject(adInputUpdate);
    expect(fetchedAd).not.toMatchObject(adInput);
  });

  test("adSchema Delete Test", async () => {
    await AdDB.deleteOne({ _id: adInstance._id });
    const fetchedAd = await AdDB.findOne({ _id: adInstance._id });
    expect(fetchedAd).toBeNull();
  });
});
