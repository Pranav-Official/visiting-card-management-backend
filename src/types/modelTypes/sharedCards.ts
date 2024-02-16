import { Model } from 'sequelize';

export class SharedCards extends Model {
  public shared_card_id!: string;
  public card_id!: string;
  public user_id!: string;
  public status!: string;
  public createdAt!: Date;
}

export default SharedCards;
