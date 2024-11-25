export interface IUser {
  _id?: string;
  email: string;
  name: string;
  password?: string;
  user_clerk_id: string;
  is_deleted?: boolean;
}
