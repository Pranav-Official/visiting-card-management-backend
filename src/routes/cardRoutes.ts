import { Router, Request, Response } from 'express';

import getPendingCardsController from '../controllers/cardControllers/getPendingCardsController';

import getCardListController from '../controllers/cardControllers/getCardListController';
import deleteCardController from '../controllers/cardControllers/deleteCardController';
import editCardDetails from '../controllers/cardControllers/editCardDetails';
import createNewCardController from '../controllers/cardControllers/createNewCard';
import getSimilarCardController from '../controllers/cardControllers/getSimilarCardController';
import addToExistingContactController from '../controllers/cardControllers/addToExistingCardController';
import getAcceptedCards from '../controllers/cardControllers/getAcceptedCards';
import getContactListController from '../controllers/cardControllers/getContactList';
import getSearchableListController from '../controllers/cardControllers/getSearchableList';
import shareCardController from '../controllers/cardControllers/shareCardController';
import getCardDetailsController from '../controllers/cardControllers/getCardDetails';



const router = Router();
//API end point to get contact list in homepage
router.get('/getContactList', async (req: Request, res: Response) => {
  await getContactListController(req, res);
});

router.post('/createNewCard', async (req: Request, res: Response) => {
  createNewCardController(req, res);
});

router.get('/getCardList', async (req: Request, res: Response) => {
  getCardListController(req, res);
});

//API Endpoint to Add Card to an Existing Contact
router.get('/getAcceptedCardList', async (req: Request, res: Response) => {
  getAcceptedCards(req, res);
});


router.post('/addToExistingContact', async (req: Request, res: Response) => {
  addToExistingContactController(req, res);
});


router.get('/getPendingCardList', async (req: Request, res: Response) => {
  getPendingCardsController(req, res);
});

router.get('/getSearchList', async (req: Request, res: Response) => {
  await getSearchableListController(req, res);
});

router.get('/getSimilarCards', async (req: Request, res: Response) => {
  getSimilarCardController(req, res);
});
router.patch('/deleteCard',async(req:Request,res:Response)=>{
    deleteCardController(req,res);
})

router.patch('/editCard', async (req: Request, res: Response) => {
  editCardDetails(req, res);
});
router.get('/shareCard',async(req:Request,res:Response)=>{
  shareCardController(req,res);
});

router.get('/getCardDetails'),async(req:Request,res:Response) =>{
  getCardDetailsController(req,res);
}
export default router;
