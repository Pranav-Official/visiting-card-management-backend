import { Response ,Request} from 'express';

const getCardDetailsController =async(req:Request,res:Response) =>{
    try{
        const {card_id} = req.body;
        if(!card_id){
            return res.status(400).json("card_id is missing")
        }

        const cardDetails = await getCardDetailsService(card_id);
        return res.status(200).json(cardDetails);

    }
    catch(error){
        return res.status(401).json("cannot return card details");
    }
}

export default getCardDetailsController;