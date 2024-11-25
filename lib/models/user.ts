import { model, models, Schema } from "mongoose";
import { IUser } from "../interfaces/user";
import { v4 as uuidV4 } from "uuid";
const userSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    user_clerk_id: {
      type: String,
      required: true,
      unique: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export const User = models?.User || model("User", userSchema);
