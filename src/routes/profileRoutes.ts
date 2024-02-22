//getProfile router
import { Router,Request,Response } from 'express';
import getProfileController from '../controllers/profileControllers/getProfileController';

const router = Router();

router.get('/getProfile', async (req: Request, res: Response) => {
  getProfileController(req, res);
});

export default router;
