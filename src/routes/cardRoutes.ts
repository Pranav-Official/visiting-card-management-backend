import { Router, Request, Response } from 'express';
import getContactListService from '../services/cardServices/getContactListService';
import createNewCardController from '../controllers/cardControllers/createNewCard';
import getCardListService from '../services/cardServices/getCardListService';
import addToExistingContactService from '../services/cardServices/addToExistingContactService';
import getPendingCardsController from '../controllers/cardControllers/getPendingCardsController';


const router = Router();
//API end point to get contact list in homepage
router.get('/getContactList', async (req: Request, res: Response) => {
  getContactListService(req, res);
});

router.post('/createNewCard', async (req: Request, res: Response) => {
  createNewCardController(req, res);
});

router.get('/getCardList', async (req: Request, res: Response) => {
  getCardListService(req, res);
});

router.post('/addToExistingContact', async (req: Request, res: Response) => {
  addToExistingContactService(req, res);
});

router.get('/getPendingCardList', async (req: Request, res: Response) => {
  getPendingCardsController(req, res);
});


export default router;
