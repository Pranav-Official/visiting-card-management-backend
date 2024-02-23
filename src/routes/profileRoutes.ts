//getProfile router
import { Router, Request, Response } from 'express';
import getProfileController from '../controllers/profileControllers/getProfileController';
import changePasswordController from '../controllers/cardControllers/changePasswordController';

const router = Router();

router.get('/getProfile', async (req: Request, res: Response) => {
  getProfileController(req, res);
});
router.patch('/changePassword', async (req: Request, res: Response) => {
  changePasswordController(req, res);
});

export default router;
