import { Model } from 'sequelize';
export class SharedCards extends Model {
  declare shared_card_id: string;
  declare card_id: string;
  declare user_id: string;
  declare status: string;
  declare createdAt: Date;
  declare modifiedAt: Date;
  declare Card: any;
  declare UserTable: any;
}

export default SharedCards;
