import { Request, Response } from 'express';
import changePasswordService from '../../services/authentication/changePasswordService';

// Controller function for handling requests to change password
const changePasswordController = async (req: Request, res: Response) => {
  try {
    const { email, new_password } = req.body;

    // Checking if any of the required parameters are missing
    if (!email || !new_password) {
      return res.status(400).json({
        error: 'Please provide necessary credentials',
      });
    }

    // Calling the service to change password
    const changedPasswordDetails = await changePasswordService(
      email,
      new_password,
    );

    // Sending the changed password details in the response if successful
    if (changedPasswordDetails.status === true) {
      return res.status(200).json(changedPasswordDetails);
    } else return res.status(400).json(changedPasswordDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default changePasswordController;
