const User = require("../models/User");

export async function verEmail(email: string) {
  if (await User.findOne({ email: email })) {
    return { success: false, message: "Email already exists", status: 400 };
  }
}
