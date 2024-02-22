import deleteCardService from "../../services/cardServices/deleteCardService";
import { Request, Response } from "express";
 
const deleteCardController = async(req: Request, res: Response) => {
    try{
        const {card_id} = req.body;
       
 
        const deleteCard = await deleteCardService(card_id);
        if(deleteCard.status){
            return res.status(200).send(deleteCard.message);
        }
        else{
            return res.status(404).json(deleteCard.message);
        }
        
    }
    catch(error){
        return res.status(500).json({ error: 'Internal server error' });
    }
}
 
 
  export default deleteCardController;