import { Router,Request,Response } from "express";
import getContactList from "../services/cardServices/getContactList";
const cardRouter = Router();

//API end point to get contact list in homepage
cardRouter.get('/getContactList',async(req:Request,res:Response)=>{
    getContactList(req,res);
});

export default cardRouter;