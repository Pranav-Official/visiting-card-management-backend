import express,{Request,Response} from 'express';
import getCardList from '../services/cardServices/getCardList';

const router = express.Router();

router.get('/getCardList', async (req:Request, res:Response) => {
    getCardList(req,res);
 });
 
 export default router;
 