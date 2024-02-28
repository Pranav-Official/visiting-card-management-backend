import { Response ,Request} from 'express';
import getCardDetailsService from '../../services/cardServices/getCardDetailsService';

const getCardDetailsController =async(req:Request,res:Response<responseType>) =>{
    try{
        const card_id = req.query.card_id as string;
        if(!card_id){
            return res.status(400).json({status: false, message:'card id not given',data:{}})
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
        return res.status(401).json({status: false, message:'card details service error',data: error});
    }
}

export default getCardDetailsController;