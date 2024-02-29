
import deleteCardService from '../../services/cardServices/deleteCardService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const deleteCardController = async (req: Request, res: Response<responseType>) => {
  try {
    const card_id = req.body.card_id as string;
    if(!card_id){
      return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:'Card ID not found in request body',data:{}})
    }
    else{
    const deleteCard = await deleteCardService(card_id);
    if (deleteCard.status) {
      return res.status(StatusCodes.OK).json(deleteCard);
    } else {
      return res.status(StatusCodes.NOT_FOUND).json(deleteCard);
    }}
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status:false,message:'Internal server error',data:error });
  }
};

export default deleteCardController;
