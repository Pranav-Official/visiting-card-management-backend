import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import addProfileDetailsService from '../../services/profile/addProfileDetailsService';

type RequestType = {
  user_id: string;
  profileDetails: {
    phone: string;
    job_title: string;
    company_name: string;
  };
};

const addProfileDetailsController = async (req: Request, res: Response) => {
  try {
    const { user_id, ...profileDetails }: RequestType = req.body;

    const addingDetails = await addProfileDetailsService(
      user_id,
      profileDetails,
    );
    console.log(addingDetails);

    if (addingDetails.status === true) {
      return res.status(StatusCodes.OK).json(addingDetails);
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(addingDetails);
    }
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: 'Error Occured', data: { error } });
  }
};

export default addProfileDetailsController;
