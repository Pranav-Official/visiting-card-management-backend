import { Router, Request, Response } from 'express';
import getContactListService from '../services/cardServices/getContactListService';
import createNewCardService from '../services/cardServices/createNewCardService';
import getCardListService from '../services/cardServices/getCardListService';
import addToExistingContactService from '../services/cardServices/addToExistingContactService';
import getSimilarCardController from '../controllers/cardControllers/getSimilarCardController';

const router = Router();
//API end point to get contact list in homepage
router.get('/getContactList', async (req: Request, res: Response) => {
  getContactListService(req, res);
});

router.post('/createNewCard', async (req: Request, res: Response) => {
  createNewCardService(req, res);
});

router.get('/getCardList', async (req: Request, res: Response) => {
  getCardListService(req, res);
});

router.post('/addToExistingContact', async (req: Request, res: Response) => {
  addToExistingContactService(req, res);
});
// Call the controller function to handle the request
router.get('/getSimilarCards', async (req: Request, res: Response) => {
  getSimilarCardController(req, res);
});

export default router;
