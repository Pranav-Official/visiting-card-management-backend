import { Response ,Request} from 'express';
import getContactListService from "../../services/cardServices/getContactListService";

//controller to fetch contactList
const getContactListController = async(req:Request,res:Response)=>{

    try{
        const user_id = req.query.user_id as string;
        if(!user_id){
            return res.status(400).json("user_id is missing")
        }
        const contactList = await getContactListService(user_id);
        return res.status(200).json(contactList);
    }
    catch(error){
        return res.status(401).json("cannot return contact list");
    }
}
export default getContactListController;