import createNewCardService from "../../services/cardServices/createNewCardService";
import { Request, Response } from "express";

const createNewCardController = async(req: Request, res: Response) => {
    try {
        const cardData = req.body;
    
        const success = await createNewCardService(cardData);
    
        if (success) {
          return res.status(200).json({ message: 'New card creation is successful' });
        } else {
          return res.status(400).json({ error: 'Missing required fields or internal error' });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
      }
};

  export default createNewCardController;