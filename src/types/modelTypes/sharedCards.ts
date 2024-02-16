import { Model } from 'sequelize';

interface SharedCardType {
  shared_card_id: string;
  card_id: string;
  user_id: string;
  status: string;
  createdAt: Date;
  modifiedAt: Date;
}
export class SharedCards extends Model<SharedCardType> {}

export default SharedCards;
