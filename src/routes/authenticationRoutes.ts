import { Router, Request, Response } from 'express';

import userRegistrationController from '../controllers/authentication/userRegistrationController';
import userLoginController from '../controllers/authentication/userLoginController';
import changePasswordController from '../controllers/authentication/changePasswordController';

const router = Router();

router.post('/userRegistration', async (req: Request, res: Response) => {
  userRegistrationController(req, res);
});

router.post('/userLogin', async (req: Request, res: Response) => {
  userLoginController(req, res);
});

//API Endpoint to change password
router.patch('/changePassword', async (req: Request, res: Response) => {
  changePasswordController(req, res);
});
export default router;
