import {Router, Request, Response} from 'express';
import createNewCard from '../services/cardServices/createNewCard';

const router =  Router();

//End point to craete a new card
router.post("/createnewcard", async (req: Request, res:Response) => {

    createNewCard(req, res);

  });

  export default router;