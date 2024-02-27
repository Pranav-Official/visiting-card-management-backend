import { Router, Request, Response } from 'express';
import getProfileController from '../controllers/profileControllers/getProfileController';
import getUserListController from '../controllers/profileControllers/getUserListController';

const router = Router();
//API Endpoint to get profile details
router.get('/getProfile', async (req: Request, res: Response) => {
  getProfileController(req, res);
});

router.get('/getUserList', async (req: Request, res: Response) => {
  getUserListController(req, res);
});

export default router;
