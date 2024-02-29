
import getCardListService from "../../services/cardServices/getCardListService";
import { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
 
const getCardListController = async(req: Request, res: Response<responseType>) => {
    try{

        const card_id = req.query.card_id as string;
        if(!card_id){
          return res.status(StatusCodes.BAD_REQUEST).json('Card ID not found in request body')
        }
        else{
          const getCardList=await  getCardListService(card_id);
          if(getCardList.status){
          return res.status(StatusCodes.OK).json(getCardList);
          }
          else{
            return res.staus(StatusCodes.NOT_FOUND).json(getCardList);
          }}}
    catch(error){
        console.error('error',error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal server error' });
    }
};
 
  export default getCardListController;