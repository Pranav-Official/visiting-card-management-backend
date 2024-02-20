import { Request, Response } from 'express';
import getProfileService from '../../services/profile/getProfileService';

// Controller for fetching profile data
const getProfileController = async (req: Request, res: Response) => {
  try {
    // Extracting user_id from the request body
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({
        message: 'User ID not provided',
      });
    }

    // Calling the service function to retrieve profile details
    const profileDetails = await getProfileService(user_id);

    // Returning profile details in the response
    return res.status(200).json(profileDetails);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getProfileController;
