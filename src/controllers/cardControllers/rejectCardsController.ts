import rejectCardsService from '../../services/cardServices/rejectCardsService';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const rejectCardsController = async (
  req: Request,
  res: Response<responseType>,
) => {
  try {
    const { user_id, card_ids } = req.body;

    if (!Array.isArray(card_ids) || card_ids.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: 'Card IDs must be provided as a non-empty array',
        data: {},
      });
    }

    // Call rejectCardsService with user_id and card_ids only
    const rejectCardsResponse = await rejectCardsService(user_id, card_ids);

    // Return response based on the service result
    if (rejectCardsResponse.status) {
      return res.status(StatusCodes.OK).json(rejectCardsResponse);
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json(rejectCardsResponse);
    }
  } catch (error) {
    console.error('Error in rejecting cards:', error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: 'Internal server error',
      data: {},
    });
  }
};

export default rejectCardsController;
