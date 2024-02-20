import Cards from '../../models/cards';

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
    return acceptedCards;
  } catch (err) {
    return null;
  }
};

export default getAcceptedCardsService;
