
import { Request, Response } from "express";
import acceptCardService from "../../services/cardServices/acceptCardService";


const acceptCardContoller =  async(req: Request, res: Response) => {

    try{
        const cardData = req.body;
        const acceptedCards = await acceptCardService(cardData);
    }
    catch(error){
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }

};
export default acceptCardContoller;


