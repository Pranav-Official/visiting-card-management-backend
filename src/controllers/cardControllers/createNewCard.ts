import { StatusCodes } from "http-status-codes";
import createNewCardService from "../../services/cardServices/createNewCardService";
import { Request, Response } from "express";

const createNewCardController = async(req: Request, res: Response):Promise<void> => {
    try {
        const cardData = req.body;
    
        const success = await createNewCardService(cardData);
    
        if (success) {
          res.status(StatusCodes.OK).json(success);
        } else {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(success);
        }
      } catch (error) {
        console.error(error);
         res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: false, message: 'Internal server error', data: error });
      }
};
  export default createNewCardController;