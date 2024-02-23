import shareCardService from "../../services/cardServices/shareCardService";
import { Request, Response } from "express";
 
const shareCardController = async(req: Request, res: Response) => {
    try{
        const card_id = req.query.card_id as string;
        const user_id=req.query.user_id as string;
 
        const shareCard = await shareCardService(card_id,user_id); //To pass the card_id and user_id to sharedCardService 
        if(shareCard.status){
            return res.status(200).send(shareCard.message);
        }
        else{
            return res.status(404).json(shareCard.message);
        }
        
    }
    catch(error){
        return res.status(500).json({ error: 'Internal server error' });
    }
}
 
 
  export default shareCardController;