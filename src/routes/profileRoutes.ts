import { Router, Request, Response } from 'express';
import getProfileController from '../controllers/profileControllers/getProfileController';
import getUserListController from '../controllers/profileControllers/getUserListController';
import addProfileDetailsController from '../controllers/profileControllers/addProfileDetailsController';

const router = Router();
//API Endpoint to get profile details
router.get('/getProfile', async (req: Request, res: Response) => {
  getProfileController(req, res);
});

router.get('/getUserList', async (req: Request, res: Response) => {
  getUserListController(req, res);
});

router.patch('/addProfileDetails', async (req: Request, res: Response) => {
  addProfileDetailsController(req, res);
});

export default router;
