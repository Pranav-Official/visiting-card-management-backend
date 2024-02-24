import getUserListService from "../../services/profile/getUsersList";
import { Request, Response } from "express";
 
const getUserListController = async(req: Request, res: Response) => {
    try{
        const user_id = req.query.user_id as string;
          const getUserList=await  getUserListService(user_id);
          if(getUserList.status){
          return res.status(200).send(getUserList.message);
          }
          else{
            return res.status(404).json(getUserList.message);
          }}
    catch(error){
        console.error('error',error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
 
  export default getUserListController;