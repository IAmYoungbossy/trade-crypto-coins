import { Document, Schema, model } from "mongoose";

interface IUserSchema {
  email: string;
  username: string;
  password: string;
  last_name: string;
  first_name: string;
  phone_numner?: string;
}

interface IUser extends Document, IUserSchema {}

const UserSchema = new Schema(
  {
    phone_numner: String,
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    last_name: { type: String, required: true },
    first_name: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<IUser>("User", UserSchema);

export default User;
