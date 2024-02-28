import { Response ,Request} from 'express';
import getCardDetailsService from '../../services/cardServices/getCardDetailsService';

const getCardDetailsController =async(req:Request,res:Response) =>{
    try{
        const card_id = req.query.card_id as string;
        if(!card_id){
            return res.status(400).json("card_id is missing")
        }

        const cardDetails = await getCardDetailsService(card_id);
        if(cardDetails.status){
            return res.status(200).json(cardDetails);
        }
        else{
            return res.status(400).json(cardDetails);

        }
    }
    catch(error){
        return res.status(401).json("cannot return card details");
    }
}

export default getCardDetailsController;