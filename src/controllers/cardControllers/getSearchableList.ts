import { Response,Request } from "express";
import getSearchableListService from "../../services/cardServices/getSearchableListService";

//controller for getSearchableList service
const getSearchableListController = async(req:Request,res:Response)=>{

    try{
        const {user_id} = req.body;
        if(!user_id){
            return res.status(400).json("user_id is missing")
        }

        const searchableList = await getSearchableListService(user_id);
        return res.status(200).json(searchableList);
    }
    catch(error){
        return res.status(401).json("cannot return searchable list");
    }
}

export default getSearchableListController;