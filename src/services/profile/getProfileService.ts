import UserTable from '../../models/userTable';
import Cards from '../../models/cards';
import SharedCards from '../../models/sharedCards';

// Function to fetch profile details
const getProfileService = async (user_id: string) => {
  try {
    // Finding user details
    const user = await UserTable.findOne({
      where: {
        user_id: user_id,
      },
      raw: true,
    });
    if (!user) {
      return {
        error: 'User not found! Please check your email address and try again.',
        status: false,
      };
    }
    // Counting total contacts
    const totalContacts = await Cards.count({
      where: {
        user_id: user_id,
        parent_card_id: null,
      },
    });

    // Counting total accepted cards
    const acceptedCards = await Cards.count({
      where: {
        user_id: user_id,
        shared_or_not: 1,
      },
    });

    // Counting total pending cards
    const pendingCards = await SharedCards.count({
      where: {
        user_id: user_id,
        status: 'pending',
      },
    });
    const profileData = {
      fullName: user.user_fullname,
      email: user.user_email,
      phone: user.phone,
      job_title: user.job_title,
      company_name: user.company_name,
      totalContacts: totalContacts,
      totalAcceptedCards: acceptedCards,
      totalPendingCards: pendingCards,
    };
    // Returning profile details
    return {
      status: true,
      message: 'Successfully returned profile details',
      data: profileData,
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: 'Unable to fetch profile details' + error.message,
      data: error,
    };
  }
};

export default getProfileService;
