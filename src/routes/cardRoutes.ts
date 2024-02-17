import { Router, Request, Response } from 'express'
import addToExistingContact from '../services/cardServices/addToExistingContact';

const cardRoutes = Router();

cardRoutes.post('/addToExistingContact', async (req: Request, res:Response) => {
    addToExistingContact(req, res);
})

export default cardRoutes;