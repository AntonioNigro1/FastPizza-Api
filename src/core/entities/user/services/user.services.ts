import jwt from "jsonwebtoken";
import { IAuthenticateUser, IUser } from "../interface/user";
import { verEmail } from "../utils/verEmail";
import { verPassword } from "../utils/verPassword";
const User = require("../models/User");

module.exports = {
  async create(data: IUser) {
    const { name, email, password } = data;
    verEmail(email);
    if (name && email && password) {
      const verified = verPassword(password);
      if (verified) {
        const userInstance = new User({ ...data });
        const response = await userInstance.save();
        return {
          data: response,
          success: true,
          message: "User created successfuly",
          status: 200,
        };
      } else {
        return {
          data: null,
          success: false,
          message: "Password must contain numbers and letters",
          status: 400,
        };
      }
    }
  },
  async authenticate(data: IAuthenticateUser) {
    const { email, password } = data;

    const { SECRET_KEY } = process.env;
    if (SECRET_KEY === undefined) {
      return;
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return { success: false, message: "User not found", status: 400 };
    }

    if (password != user.password) {
      return { success: false, message: "Invalid password", status: 400 };
    }
    user.password = undefined;
    const token = jwt.sign({ id: user.id }, SECRET_KEY, {
      expiresIn: 8640000,
    });

    return {
      success: true,
      message: "Authenticated",
      status: 200,
      data: user,
      token,
    };
  },
  async update(id: string, data: IUser) {
    try {
      const { name, email, password } = data;
      const response = await User.updateOne(
        { _id: id },
        { name: name, email: email, password: password }
      );
      if (response != null) {
        return {
          sucess: true,
          message: "User updated successfuly",
          status: 200,
        };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: "User not found", status: 403 };
    }
  },
  async delete(_id: string) {
    try {
      const response = await User.findOneAndRemove({ _id });
      if (response) {
        return {
          success: true,
          message: "User deleted sucessfully",
          status: 200,
        };
      } else {
        return {
          sucess: false,
          message: "User not found",
          status: 404,
        };
      }
    } catch (error) {
      return { success: false, message: error, status: 403 };
    }
  },

  async getUser(id: string) {
    const user = undefined;
    try {
      const user = await User.findOne({ _id: id });
      user.password = undefined;
      return {
        success: true,
        message: "User found successfuly",
        status: 200,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: "User not found",
        status: 400,
        data: user,
      };
    }
  },
  async getUsers() {
    try {
      const results = await User.find({});
      if (results.length == 0) {
        return { success: false, data: null, status: 400 };
      }
      return { success: true, data: results, status: 200 };
    } catch (error) {
      return { success: false, message: error, status: 400 };
    }
  },
};
