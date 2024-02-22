import { UUID } from "crypto";
import Cards from "../../models/cards";

const getCardDetailsService = async(card_id:UUID){
    try {
        const list = await Cards.findAll({
          where: { card_id: card_id},
          attributes: ['card_name', 'img_front_link','img_back_link','job_title','email','phone'],
        });
        return list;
      } 
}