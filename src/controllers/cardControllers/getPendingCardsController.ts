
import { Request, Response } from "express";
import getPendingCardsService from "../../services/cardServices/getPendingCardService";

const getPendingCardsController = async(req: Request, res: Response) => {
    try{
          await  getPendingCardsService(req, res);
          return res.status(200);
    }
    catch(error){
        console.error('error',error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

  export default getPendingCardsController;