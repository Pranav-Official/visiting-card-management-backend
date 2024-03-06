import getCardListService from '../../services/cardServices/getCardListService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const getCardListController = async (req: Request, res: Response) => {
  try {
    const card_id = req.query.card_id as string;

    const getCardList = await getCardListService(card_id);
    if (getCardList.status) {
      return res.status(StatusCodes.OK).send(getCardList.message);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json(getCardList.message);
    }
  } catch (error) {
    console.error('error', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: 'Internal server error', data: error });
  }
};

export default getCardListController;
