import { Model } from 'sequelize';

export class Cards extends Model {
  public card_id!: string;
  public card_name!: string | null;
  public img_front_link!: string | null;
  public img_back_link!: string | null;
  public job_title!: string | null;
  public email!: string | null;
  public phone!: string | null;
  public company_name!: string | null;
  public company_website!: string | null;
  public description!: string | null;
  public contatact_name!: string | null;
  public parent_card_id!: string | null;
  public user_id!: string | null;
  public shared_or_not!: number | null;
  public createdAt!: Date | null;
  public modifiedAt!: Date | null;
}

export default Cards;
