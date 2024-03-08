import { Response ,Request} from 'express';
import getCardDetailsService from '../../services/cardServices/getCardDetailsService';
import { StatusCodes } from 'http-status-codes';

const getCardDetailsController =async(req:Request,res:Response<responseType>) =>{
    try{
        const {card_id,full} = req.query
        if(!card_id){
            return res.status(StatusCodes.BAD_REQUEST).json({status: false, message:'card id not given',data:{}})
        }

        const isFull = full === 'true';

        const cardDetails = await getCardDetailsService(card_id as string,isFull);
        if(cardDetails.status){
            return res.status(StatusCodes.OK).json(cardDetails);
        }
        else{
            return res.status(StatusCodes.NOT_FOUND).json(cardDetails);

        }
    }
    catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status: false, message:'card details service error',data: error});
    }
}

export default getCardDetailsController;