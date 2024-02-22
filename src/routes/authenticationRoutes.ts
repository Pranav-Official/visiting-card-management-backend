import { Router, Request, Response } from 'express';
import userRegistrationController from '../controllers/authentication/userRegistrationController';

const router = Router();

router.post('/userRegistration', async (req: Request, res: Response) => {
  userRegistrationController(req, res);
});

export default router;
