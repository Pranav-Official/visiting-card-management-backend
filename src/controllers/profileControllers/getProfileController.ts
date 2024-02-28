import { Request, Response } from 'express';
import getProfileService from '../../services/profile/getProfileService';

// Controller for fetching profile data
const getProfileController = async (req: Request, res: Response) => {
  try {
    // Extracting user_id from the request query
    const user_id = req.query.user_id as string;

    if (!user_id) {
      return res.status(400).json({
        error: 'Please provide user ID ',
      });
    }

    // Calling the service function to retrieve profile details
    const profileDetails = await getProfileService(user_id);

    // Returning profile details in the response if successful
    if (profileDetails.status === true)
      return res.status(200).json(profileDetails);
    else return res.status(400).json(profileDetails);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default getProfileController;
