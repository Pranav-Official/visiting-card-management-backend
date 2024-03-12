import { Response, Request } from "express";
import getSearchableListService from "../../services/cardServices/getSearchableListService";
import { StatusCodes } from "http-status-codes";

// Controller for getSearchableList service
const getSearchableListController = async (req: Request, res: Response<responseType>) => {
    try {
        const user_id = req.query.user_id as string;
        if (!user_id) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: false, message: "user_id is missing",data:{} });
        }

        const searchableList = await getSearchableListService(user_id);

        if (searchableList.status === "error") {
            return res.status(StatusCodes.NOT_FOUND).json({ status: false, message: "Cannot find a list", data: searchableList.error });
        } else {
            return res.status(StatusCodes.OK).json({ status: true, message: "Searchable list retrieved successfully", data: searchableList.data });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, message: "Cannot return searchable list", data: error });
    }
};

export default getSearchableListController;



