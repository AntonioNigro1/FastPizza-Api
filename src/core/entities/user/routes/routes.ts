import express from "express";
const router = express.Router();
const UserControllers = require("../controllers/user.controller");

router.route("/create").post(UserControllers.create);
router.route("/authenticate").post(UserControllers.authenticate);
module.exports = router;
