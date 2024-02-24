import { Router, Request, Response } from 'express';
import getProfileController from '../controllers/profileControllers/getProfileController';

import changePasswordController from '../controllers/profileControllers/changePasswordController';
import getUserListController from '../controllers/profileControllers/getUserListController';


const router = Router();
//API Endpoint to get profile details
router.get('/getProfile', async (req: Request, res: Response) => {
  getProfileController(req, res);
});

//API Endpoint to change password
router.patch('/changePassword', async (req: Request, res: Response) => {
  changePasswordController(req, res);
});

router.get('/getUserList',async(req:Request,res:Response)=>{
  getUserListController(req,res);
})


export default router;
