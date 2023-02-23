import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createJWT: () => string;
  comparePassword: (userPassword: string) => Promise<boolean>;
}

const UserSchema = new Schema<User>({
  firstName: {
    type: String,
    required: [true, "Please Provide First Name"],
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: [true, "Please Provide Last Name"],
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please Provide A Valid Email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    minlength: 6,
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, email: this.email, time: Date.now() },
    `${process.env.JWT_SECRET}`,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.comparePassword = async function (userPassword: string) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

export default model<User>("User", UserSchema);
