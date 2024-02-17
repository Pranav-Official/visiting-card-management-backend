import { Request, Response } from 'express';
import UserTable from '../../models/userTable';
import Cards from '../../models/cards';
import SharedCards from '../../models/sharedCards';

//getProfile api endpoint

const getProfileService = async (req: Request, res: Response) => {
  try {
    //finding user
    const { user_id } = req.body;

    const user = await UserTable.findOne({
      where: {
        user_id: user_id,
      },
      raw: true,
    });
    console.log(user);

    if (!user) {
      return res.status(404).json({
        message: 'User not found!',
      });
    }
    //totalContacts count
    const totalContacts = await Cards.count({
      where: {
        user_id: user_id,
        parent_card_id: null,
      },
    });
    //total accepted cards count
    const acceptedCards = await Cards.count({
      where: {
        user_id: user_id,
        shared_or_not: 1,
      },
    });
    //total pending cards count
    const pendingCards = await SharedCards.count({
      where: {
        user_id: user_id,
        status: 'pending',
      },
    });

    return res.status(200).json({
      fullName: user.user_fullname,
      email: user.user_email,
      totalContacts: totalContacts,
      totalAcceptedCards: acceptedCards,
      totalPendingCards: pendingCards,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getProfileService;
