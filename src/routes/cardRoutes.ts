import { Router, Request, Response } from 'express';
import getContactListService from '../services/cardServices/getContactListService';
import createNewCardService from '../services/cardServices/createNewCardService';
import addToExistingContactService from '../services/cardServices/addToExistingContactService';
import getCardListController from '../controllers/cardControllers/getCardListController';
import deleteCardController from '../controllers/cardControllers/deleteCardController';
const router = Router();
//API end point to get contact list in homepage
router.get('/getContactList', async (req: Request, res: Response) => {
  getContactListService(req, res);
});

router.post('/createNewCard', async (req: Request, res: Response) => {
  createNewCardService(req, res);
});

router.get('/getCardList', async (req: Request, res: Response) => {
  getCardListController(req, res);
});

router.post('/addToExistingContact', async (req: Request, res: Response) => {
  addToExistingContactService(req, res);
});
router.patch('/deleteCard',async(req:Request,res:Response)=>{
    deleteCardController(req,res);
})

export default router;
