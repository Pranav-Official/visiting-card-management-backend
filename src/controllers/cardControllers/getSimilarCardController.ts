import { Request, Response } from 'express';
import getSimilarCardsService from '../../services/cardServices/getSimilarCardsService';

// Controller function for handling requests to find similar cards
const getSimilarCardsController = async (req: Request, res: Response) => {
  try {
    const { user_id, card_name, phone, email } = req.query as {
      user_id: string;
      card_name: string;
      phone: string;
      email: string;
    };

    // Checking if required parameters are missing
    if (!user_id && !card_name && !phone && !email) {
      return res.status(400).json({
        error: 'Provide necessary credentials ',
      });
    }

    // Calling the service to retrieve similar card details
    const similarCardDetails = await getSimilarCardsService(
      user_id,
      card_name,
      phone,
      email,
    );

    // Sending the similar card details in the response if successful
    if (similarCardDetails.status == true)
      return res.status(200).json(similarCardDetails);
    else return res.status(400).json(similarCardDetails);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default getSimilarCardsController;
