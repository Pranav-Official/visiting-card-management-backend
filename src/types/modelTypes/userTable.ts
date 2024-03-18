import { Model } from 'sequelize';
export class UserTable extends Model {
  declare password_hash: string | null;
  declare user_id: string;
  declare user_fullname: string | null;
  declare user_email: string | null;
  declare createdAt: Date | null;
  declare modifiedAt: Date | null;
}

export default UserTable;
