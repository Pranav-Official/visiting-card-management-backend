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
import acceptCardController from '../controllers/cardControllers/acceptCard';
import addSharedCardToExistingContactController from '../controllers/cardControllers/addSharedCardToExistingContactController';
import getCardDetailsController from '../controllers/cardControllers/getCardDetails';
import overWriteExistingCard from '../controllers/cardControllers/overWriteExistingCard';
import multer from 'multer';
import modifiedCreateCardController from '../controllers/cardControllers/modifiedCreateCardController';
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, 'src/images'); // Specify the destination folder for storing uploaded files
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname); // Use the original filename for storing the uploaded file
  },
});

const upload = multer({ storage: storage });

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
//API Endpoint to get similar Cards
router.get('/getSimilarCards', async (req: Request, res: Response) => {
  getSimilarCardController(req, res);
});
router.patch('/deleteCard', async (req: Request, res: Response) => {
  deleteCardController(req, res);
});

router.patch('/editCard', async (req: Request, res: Response) => {
  editCardDetails(req, res);
});
router.post('/shareCard', async (req: Request, res: Response) => {
  shareCardController(req, res);
});

router.post(
  '/addSharedCardToExistingContact',
  async (req: Request, res: Response) => {
    addSharedCardToExistingContactController(req, res);
  },
);

router.get('/getCardDetails', async (req: Request, res: Response) => {
  getCardDetailsController(req, res);
});

router.post('/acceptCard', async (req: Request, res: Response) => {
  acceptCardController(req, res);
});

router.patch('/overwriteExistingCard', async (req: Request, res: Response) => {
  overWriteExistingCard(req, res);
});
router.post('/modifiedCreateNewCard', upload.fields([{ name: 'img_front_link', maxCount: 1 }, { name: 'img_back_link', maxCount: 1 }]), modifiedCreateCardController);

export default router;
