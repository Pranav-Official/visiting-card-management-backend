import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import modifiedCreateCardService from "../../services/cardServices/modifiedCreateCardService";


const createNewCardController = async (req: Request, res: Response<responseType>) => {
  try {
    const cardData = req.body;

    // Check if files are uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({status: false, message: 'No files were uploaded',data:{}});
    }

    const img_front_link = (req.files['img_front_link'] as Express.Multer.File[])[0].path;
    const img_back_link = (req.files['img_back_link'] as Express.Multer.File[])[0].path;

    const success = await modifiedCreateCardService({ ...cardData, img_front_link, img_back_link });

    if (success) {
      return res.status(StatusCodes.OK).json(success);
    } else {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(success);
    }
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: 'Internal server error', data: error });
  }
};

export default createNewCardController;
