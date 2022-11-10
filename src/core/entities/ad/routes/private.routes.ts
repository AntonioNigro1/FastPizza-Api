import express from "express";

import multer from "../../../middlewares/upload";
const authMiddleware = require("../../../middlewares/auth");

const router = express.Router();
const AdController = require("../controllers/ad.controller");

router.use(authMiddleware);
router.route("/create").post(multer.single("imagePath"), AdController.create);

module.exports = router;
