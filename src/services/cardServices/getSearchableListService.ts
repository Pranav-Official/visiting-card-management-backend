import Cards from '../../models/cards';

//service to get searchable list
const getSearchableListService = async (user_id: string) => {
  try {
    const mainCards = await Cards.findAll({
      where: { user_id: user_id, parent_card_id: null },
      raw: true,
    });

    const mainCardDetails = await Promise.all(mainCards.map(async (mainCard) => {
      const relatedCardIds = new Set();
      const emails = new Set();
      const phoneNumbers = new Set();
      const companyName = new Set();

      if (mainCard.card_id) {
        emails.add(mainCard.email);
        phoneNumbers.add(mainCard.phone);
        companyName.add(mainCard.company_name);
        
        const relatedCards = await Cards.findAll({ where: { parent_card_id: mainCard.card_id }, raw: true });
        relatedCards.forEach((card) => {
          relatedCardIds.add(card.card_id);
          emails.add(card.email);
          phoneNumbers.add(card.phone);
          companyName.add(card.company_name);
        });
      }

      ///extra
      const emailArray = Array.from(emails).filter(email => email !== null);
      const phoneNumberArray = Array.from(phoneNumbers).filter(phone => phone !== null);
      const companyNameArray = Array.from(companyName).filter(company => company !== null);

      return {
        card_id: mainCard.card_id,
        email: emailArray,
        phone_number: phoneNumberArray,
        // related_cards: Array.from(relatedCardIds),
        company_names: companyNameArray
      };
    }));

    return { status: 'success', message: 'Searchable list retrieved successfully.', data: mainCardDetails };
  } catch (error) {
    return { status: 'error', message: 'Failed to retrieve searchable list.', error: error };
  }
};

export default getSearchableListService;



