import { Model } from 'sequelize';

export class UserTable extends Model {
  public user_id!: string;
  public user_fullname!: string | null;
  public user_email!: string | null;
  public password_hash!: string | null;
  public createdAt!: Date | null;
  public modifiedAt!: Date | null;
}

export default UserTable;
