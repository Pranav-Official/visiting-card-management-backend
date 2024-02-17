
import { Router,Request,Response } from "express";
import getContactList from "../services/cardServices/getContactList";
import createNewCard from '../services/cardServices/createNewCard';

const router =  Router();
//API end point to get contact list in homepage
router.get('/getContactList',async(req:Request,res:Response)=>{
    getContactList(req,res);
});

router.post("/createnewcard", async (req: Request, res:Response) => {

    createNewCard(req, res);
});

export default router;

