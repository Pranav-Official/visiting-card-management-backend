import { Model } from 'sequelize';
class Cards extends Model {
  declare card_id: string;
  declare card_name: string | null;
  declare img_front_link: string | null;
  declare img_back_link: string | null;
  declare job_title: string | null;
  declare email: string | null;
  declare phone: string | null;
  declare company_name: string | null;
  declare company_website: string | null;
  declare description: string | null;
  declare contact_name: string | null;
  declare parent_card_id: string | null;
  declare user_id: string | null;
  declare shared_or_not: number | null;
  declare createdAt: Date | null;
  declare modifiedAt: Date | null;
}

export default Cards;
