
import Cards from "../../models/cards";
type returnObject = {
  status:boolean;
  message:Object
}

const getCardDetailsService = async(card_id:string):Promise<returnObject>=>{
    try {
        const list = await Cards.findAll({
          where: {card_id: card_id},
          attributes: ['card_name', 'img_front_link','img_back_link','job_title','email','phone','company_name','company_website','description'],
        });

        if(list === null){
          return {status:false,message:{error:"card id not found"}};
          
          }
          else{
            return {status:false,message:list};
          }
        }       
      catch (error) {
        throw new Error('Cannot return card details');    
      }
}

export default getCardDetailsService;