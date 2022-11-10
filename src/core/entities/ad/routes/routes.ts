import express from "express";
const router = express.Router();
const AdController = require("../controllers/ad.controller");

router.route("/").get(AdController.getAds);
router.route("/like").post(AdController.like).put(AdController.rmvLike);
router
  .route("/comment")
  .post(AdController.comment)
  .put(AdController.rmvComment);
router.route("/comments/likecomment").post(AdController.likeComment);
router.route("/comments/rmvlikecomment").post(AdController.rmvLikeComment);
router.route("/:id/comments").get(AdController.getComments);
router.route("/:id/comments/sortlike").get(AdController.listCommentByLike);
router.route("/mostlikedad").get(AdController.mostLiked);
router.route("/filter").post(AdController.filterAds);

module.exports = router;
