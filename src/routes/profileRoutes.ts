import { Router, Request, Response } from 'express';
import getProfileService from '../services/profile/getProfileService';

const router = Router();

router.get('/getProfile', async (req: Request, res: Response) => {
  getProfileService(req, res);
});

export default router;
