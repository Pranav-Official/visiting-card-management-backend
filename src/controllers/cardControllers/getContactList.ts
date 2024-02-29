import { Response ,Request} from 'express';
import getContactListService from "../../services/cardServices/getContactListService";

//controller to fetch contactList
const getContactListController = async(req:Request,res:Response<responseType>)=>{

    try{
        const user_id = req.query.user_id as string;
        if(!user_id){
            return res.status(400).json({status: false, message:'user_id not entered',data:{}})
        }
        const contactList = await getContactListService(user_id);
        console.log(contactList)
       
        // return res.status(200).json({status:true, message:'contact list retrieved',data: {contactList}});
        return res.status(200).json(contactList);
    }
    catch(error){
        return res.status(401).json({status:false, message:'error in fetching contact list',data:error});
    }
}
export default getContactListController;