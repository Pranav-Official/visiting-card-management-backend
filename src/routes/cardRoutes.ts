import { Router, Request, Response } from 'express';
import createNewCardController from '../controllers/cardControllers/createNewCard';
import getCardListService from '../services/cardServices/getCardListService';
import getSimilarCardController from '../controllers/cardControllers/getSimilarCardController';
import addToExistingContactController from '../controllers/cardControllers/addToExistingCardController';
import getAcceptedCards from '../controllers/cardControllers/getAcceptedCards';
import getContactListController from '../controllers/cardControllers/getContactList';
import getSearchableListController from '../controllers/cardControllers/getSearchableList';


const router = Router();
//API end point to get contact list in homepage
router.get('/getContactList', async (req: Request, res: Response) => {
  await getContactListController(req, res);
});

router.post('/createNewCard', async (req: Request, res: Response) => {
  createNewCardController(req, res);
});

router.get('/getCardList', async (req: Request, res: Response) => {
  getCardListService(req, res);
});

//API Endpoint to Add Card to an Existing Contact
router.get('/getAcceptedCardList', async (req: Request, res: Response) => {
  getAcceptedCards(req, res);
});


router.post('/addToExistingContact', async (req: Request, res: Response) => {
  addToExistingContactController(req, res);
});

router.get('/getSearchList', async (req: Request, res: Response) => {
  await getSearchableListController(req, res);
});
// Call the controller function to handle the request
router.get('/getSimilarCards', async (req: Request, res: Response) => {
  getSimilarCardController(req, res);
});

export default router;
