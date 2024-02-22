import { Router, Request, Response } from 'express';
import userRegistrationController from '../controllers/authentication/userRegistrationController';
import userLoginController from '../controllers/authentication/userLoginController';

const router = Router();

router.post('/userRegistration', async (req: Request, res: Response) => {
  userRegistrationController(req, res);
});

router.get('/userLogin', async (req: Request, res: Response) => {
  userLoginController(req, res);
});

export default router;
