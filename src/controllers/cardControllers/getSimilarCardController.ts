import { Request, Response } from 'express';
import getSimilarCardsService from '../../services/cardServices/getSimilarCardsService';

// Controller function for handling requests to find similar cards
const getSimilarCardsController = async (req: Request, res: Response) => {
  try {
    const { user_id, card_name, phone, email } = req.body;

    // Checking if any of the required parameters are missing
    if (!user_id || !card_name || !phone || !email) {
      return res.status(400).json({
        error:
          'Bad Request: Please provide user_id, card_name, phone, and email',
      });
    }

    // Calling the service to retrieve similar card details
    const similarCardDetails = await getSimilarCardsService(
      user_id,
      card_name,
      phone,
      email,
    );

    // Sending the similar card details in the response
    return res.status(200).json(similarCardDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getSimilarCardsController;
