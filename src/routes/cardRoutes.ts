import { Router,Request,Response } from "express";
import getContactList from "../services/cardServices/getContactList";
import createNewCard from '../services/cardServices/createNewCard';
import getCardList from '../services/cardServices/getCardList';

const router =  Router();
//API end point to get contact list in homepage
router.get('/getContactList',async(req:Request,res:Response)=>{
    getContactList(req,res);
});

router.post("/createnewcard", async (req: Request, res:Response) => {

    createNewCard(req, res);
});

router.get('/getCardList', async (req:Request, res:Response) => {
    getCardList(req,res);
 });

export default router;

