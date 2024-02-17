import { Router, Request, Response } from 'express';
import getProfile from '../services/profile/getProfile';

const router = Router();

router.get('/getProfile', async (req: Request, res: Response) => {
  getProfile(req, res);
});

export default router;
