import express from "express";
const authMiddleware = require("../../../middlewares/auth");
const UserControllers = require("../controllers/user.controller");

const router = express.Router();

router.use(authMiddleware);

router.route("/").get(UserControllers.getUser);
router.route("/:id").put(UserControllers.update).delete(UserControllers.delete);
router.route("/users").get(UserControllers.getUsers);

module.exports = router;
