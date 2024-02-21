import createNewCardService from "../../services/cardServices/createNewCardService";
import { Request, Response } from "express";

const createNewCardController = async(req: Request, res: Response) => {
    try{
          await  createNewCardService(req, res);
          return res.status(200);
    }
    catch(error){
        console.error('error',error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

  export default createNewCardController;