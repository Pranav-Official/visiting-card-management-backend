
import getCardListService from "../../services/cardServices/getCardListService";
import { Request, Response } from "express";
 
const getCardListController = async(req: Request, res: Response) => {
    try{

        const card_id = req.query.card_id as string;

          const getCardList=await  getCardListService(card_id);
          if(getCardList.status){
          return res.status(200).send(getCardList.message);
          }
          else{
            return res.status(404).json(getCardList.message);
          }}
    catch(error){
        console.error('error',error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
 
  export default getCardListController;