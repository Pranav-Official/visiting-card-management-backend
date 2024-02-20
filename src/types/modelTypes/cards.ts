import { Model } from 'sequelize';
interface CardType {
  card_id: string;
  card_name: string | null;
  img_front_link: string | null;
  img_back_link: string | null;
  job_title: string | null;
  email: string | null;
  phone: string | null;
  company_name: string | null;
  company_website: string | null;
  description: string | null;
  contact_name: string | null;
  parent_card_id: string | null;
  user_id: string | null;
  shared_or_not: number | null;
  createdAt: Date | null;
  modifiedAt: Date | null;
}
class Cards extends Model<CardType> {
  card_id: string;
  card_name: string | null;
  img_front_link: string | null;
  img_back_link: string | null;
  job_title: string | null;
  email: string | null;
  phone: string | null;
  company_name: string | null;
  company_website: string | null;
  description: string | null;
  contact_name: string | null;
  parent_card_id: string | null;
  user_id: string | null;
  shared_or_not: number | null;
  createdAt: Date | null;
  modifiedAt: Date | null;
  static card_name: any;
  static img_front_link: any;
  static img_back_link: any;
  static job_title: any;
  static email: any;
  static phone: any;
  static company_name: any;
  static company_website: any;
  static contact_name: any;
  static user_id: any;
}

export default Cards;
