
import getUserListService from "../../services/profile/getUsersList";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
 
const getUserListController = async(req: Request, res: Response<responseType>) => {
    try{
        const user_id = req.query.user_id as string;
        if(!user_id){
          return res.status(StatusCodes.BAD_REQUEST).json({status:false,message:' User ID not found in request body',data:{}})
        } 
        else{
          const getUserList=await  getUserListService(user_id);
          if(getUserList.status){
          return res.status(StatusCodes.OK).json(getUserList);
          }
          else{
            return res.status(StatusCodes.NOT_FOUND).json(getUserList); 
          }}}
    catch(error){
        console.error('error',error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:false,message:'Internal server error',data:error });
    }
};
 
  export default getUserListController;