import { connect } from "../db";
import { User } from "../models/user";
import { IUser } from "../interfaces/user";
import { v4 as uuidV4 } from "uuid";

export const createUser = async (user: IUser) => {
  try {
    await connect();
    console.log(user);
    const createdDocument = await User.create({
      _id: uuidV4(),
      email: user.email,
      name: user.name,
      user_clerk_id: user.user_clerk_id,
    });

    return createdDocument;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};
