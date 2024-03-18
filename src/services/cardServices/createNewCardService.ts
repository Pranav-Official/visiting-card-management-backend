import Cards from '../../models/cards';

// Function to create a new card
const createNewCardService = async (cardData: Cards) => {
  try {
    const {
      card_name,
      img_front_link,
      img_back_link,
      job_title,
      email,
      phone,
      company_name,
      company_website,
      contact_name,
      user_id,
    } = cardData;

    if (card_name && email && phone) {
      const createCard = await Cards.create(
        {
          card_name,
          img_front_link,
          img_back_link,
          job_title,
          email,
          phone,
          company_name,
          company_website,
          description: null,
          contact_name,
          parent_card_id: null,
          user_id,
          shared_or_not: 0,
        },
        { raw: true },
      );

      const createdCardId = createCard.get('card_id');

      // Return the created card_id
      return {
        status: true,
        message: 'Card created successfully',
        data: { cardId: createdCardId },
      };
    } else {
      return {
        status: false,
        message: 'Card creation failed',
        data: { error: Error },
      };
    }
  } catch (error) {
    console.error(error);
    return { status: false, message: error.message, data: {} };
  }
};

export default createNewCardService;
