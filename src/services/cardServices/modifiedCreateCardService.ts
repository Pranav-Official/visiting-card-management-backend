import Cards from '../../models/cards';

interface CardData {
  card_name: string;
  job_title: string;
  email: string;
  phone: string;
  company_name: string;
  company_website: string;
  contact_name: string;
  user_id: string;
}

const modifiedCreateNewCardService = async (cardData: CardData & { img_front_link: string; img_back_link: string }) => {
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

    // Check if required fields are present
    if (card_name && email && phone) {
      const createCard = await Cards.create({
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
      });

      const createdCardId = createCard.get('card_id');
      console.log(`New card created: ${createCard.toJSON()}`);

      // Return the created card_id
      return {
        status: true,
        message: 'Card created successfully',
        data: { cardId: createdCardId },
      };
    } else {
      return { status: false, message: 'Card creation failed', data: { error: 'Missing required fields' } };
    }
  } catch (error) {
    console.error(error);
    return { status: false, message: error.message, data: {} };
  }
};

export default modifiedCreateNewCardService;
