import { Response ,Request} from 'express';
import getContactListService from "../../services/cardServices/getContactListService";
import { StatusCodes } from 'http-status-codes';

//controller to fetch contactList
const getContactListController = async(req:Request,res:Response<responseType>)=>{

    try{
        const user_id = req.query.user_id as string;
        if(!user_id){
            return res.status(StatusCodes.UNAUTHORIZED).json({status: false, message:'user_id not entered',data:{}})
        }
        const contactList = await getContactListService(user_id);
        console.log(contactList)
       
        
        return res.status(StatusCodes.OK).json(contactList);
    }
    catch(error){
        return res.status(StatusCodes.NOT_FOUND).json({status:false, message:'error in fetching contact list',data:error});
    }
}
export default getContactListController;