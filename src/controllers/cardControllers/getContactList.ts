import { Response ,Request} from 'express';
import getContactListService from "../../services/cardServices/getContactListService";


const getContactListController = async(req:Request,res:Response)=>{

    try{
        getContactListService(req,res);
        return res.status(200);
    }
    catch(error){
        return res.status(400).json("contact list service not found");
    }
}
export default getContactListController;