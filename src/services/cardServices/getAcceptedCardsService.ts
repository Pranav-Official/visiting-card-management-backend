import Cards from '../../models/cards';

// /**
//  * Retrieves the accepted cards for a given user ID from the database.
//  *
//  * @param  user_id - The ID of the user for whom to retrieve accepted cards
//  * @return The accepted cards for the specified user ID
//  */
export const getAcceptedCardsService = async (user_id: string) => {
  try {
    const acceptedCards = await Cards.findAll({
      where: {
        user_id: user_id,
        shared_or_not: 1,
      },
      attributes: [
        'card_id',
        'card_name',
        'email',
        'phone',
        'job_title',
        'company_name',
      ],
      raw: true,
    });
    return {
      status: true,
      data: acceptedCards,
    };
  } catch (err) {
    return {
      status: false,
      error: err.message,
      message: 'Unable to fetch card details',
    };
  }
};

export default getAcceptedCardsService;
