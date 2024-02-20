import { Router, Request, Response } from 'express';
import createNewCardService from '../services/cardServices/createNewCardService';
import getCardListService from '../services/cardServices/getCardListService';
import addToExistingContactService from '../services/cardServices/addToExistingContactService';
import getAcceptedCards from '../controllers/cardControllers/getAcceptedCards';
import getContactListController from '../controllers/cardControllers/getContactList';
import getSearchableListController from '../controllers/cardControllers/getSearchableList';

const router = Router();
//API end point to get contact list in homepage
router.get('/getContactList', async (req: Request, res: Response) => {
  await getContactListController(req, res);
});

router.post('/createNewCard', async (req: Request, res: Response) => {
  createNewCardService(req, res);
});

router.get('/getCardList', async (req: Request, res: Response) => {
  getCardListService(req, res);
});

router.get('/getAcceptedCardList', async (req: Request, res: Response) => {
  getAcceptedCards(req, res);
});

router.post('/addToExistingContact', async (req: Request, res: Response) => {
  addToExistingContactService(req, res);
});

router.get('/getSearchList', async (req: Request, res: Response) => {
  await getSearchableListController(req, res);
});

export default router;
