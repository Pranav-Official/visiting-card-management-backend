import UserTable from '../../models/userTable';
import Cards from '../../models/cards';
import SharedCards from '../../models/sharedCards';

//getProfileService function to fetch profile details
const getProfileService = async (user_id: string) => {
  try {
    const user = await UserTable.findOne({
      where: {
        user_id: user_id,
      },
      raw: true,
    });
    console.log(user);

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
    return {
      fullName: user.user_fullname,
      email: user.user_email,
      totalContacts: totalContacts,
      totalAcceptedCards: acceptedCards,
      totalPendingCards: pendingCards,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Cannot get profile');
  }
};

export default getProfileService;
