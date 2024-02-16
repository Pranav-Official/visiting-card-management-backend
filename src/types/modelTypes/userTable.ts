import { Model } from 'sequelize';
interface UserTableType {
  user_id: string;
  user_fullname: string | null;
  user_email: string | null;
  password_hash: string | null;
  createdAt: Date | null;
  modifiedAt: Date | null;
}
export class UserTable extends Model<UserTableType> {
  password_hash: string | null;
}

export default UserTable;
