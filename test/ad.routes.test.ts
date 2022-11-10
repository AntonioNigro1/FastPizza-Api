import { dbDisconnectTest } from "./dbConnectionTest";
import { IAdsTest } from "../src/core/entities/ad/interface/ad";
import { request } from "./helpers";

describe("Ad public routes Test", () => {
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
  afterAll(async () => {
    await dbDisconnectTest();
  });

  test("GetAds Test", async () => {
    await request.get("/ad/").expect(200);
  });

  test("FilterAds Test", async () => {
    const filterInfo = { filter: 300 };
    await request.post("/ad/filter").send(filterInfo).expect(200);
  });

  test("LikeAd Test", async () => {
    const info = { adId: "6349512f5a6d780b171e1ba6" };
    await request.post("/ad/like").send(info).expect(200);
  });

  test("RemoveLike Test", async () => {
    const info = { adId: "6349512f5a6d780b171e1ba6" };
    await request.put("/ad/like").send(info).expect(200);
  });

  test("MostLiked Ad", async () => {
    await request.get("/ad/mostlikedad").expect(200);
  });

  test("Comment Test", async () => {
    const commentInfo = {
      adId: "6349512f5a6d780b171e1ba6",
      comment: "test comment",
    };
    await request.post("/ad/comment").send(commentInfo).expect(200);
  });

  test("GetComments Test", async () => {
    await request.get("/ad/6349512f5a6d780b171e1ba6/comments").expect(200);
  });

  test("RemoveComment Test", async () => {
    const commentInfo = {
      adId: "6349512f5a6d780b171e1ba6",
      commentId: "fakeid12345",
    };
    await request.put("/ad/comment").send(commentInfo).expect(400);
  });

  test("LikeComment Test", async () => {
    const commentInfo = {
      adId: "6349512f5a6d780b171e1ba6",
      commentId: "634966e49dfc0b14f3919547",
    };
    await request
      .post("/ad/comments/likecomment")
      .send(commentInfo)
      .expect(200);
  });

  test("RemoveLikeComment Test", async () => {
    const commentInfo = {
      adId: "6349512f5a6d780b171e1ba6",
      commentId: "634966e49dfc0b14f3919547",
    };
    await request
      .post("/ad/comments/rmvlikecomment")
      .send(commentInfo)
      .expect(200);
  });

  test("ListCommentByLike Test", async () => {
    await request
      .get(`/ad/6349512f5a6d780b171e1ba6/comments/sortlike`)
      .expect(200);
  });
});
