//controller for profile data fetch
import { Request, Response } from 'express';
import getProfileService from '../../services/profile/getProfileService';

const getProfileController = async (req: Request, res: Response) => {
  try {
    //finding user
    const { user_id } = req.body;
    if (!user_id) {
      return res.status(404).json({
        message: 'User not found!',
      });
    }
    //passing user id to getProfileService function
    const profileDetails = await getProfileService(user_id);
    return res.status(200).json(profileDetails);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getProfileController;
