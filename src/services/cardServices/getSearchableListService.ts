import Cards from '../../models/cards';
const getSearchableListService = async (user_id:string) => {
  try {
    const mainCards = await Cards.findAll({
      where: { user_id: user_id, parent_card_id: null },
      raw: true,
    });

    const mainCardDetails = await Promise.all(mainCards.map(async (mainCard) =>{
        let relatedCardIds = [];
        let emails = [];
        let phoneNumbers = [];

        // Check if mainCard has a valid card_id
        if (mainCard.card_id) {
          emails.push(mainCard.email);
          phoneNumbers.push(mainCard.phone);
          
          const relatedCards = await Cards.findAll({where: { parent_card_id: mainCard.card_id },raw: true,});
          relatedCardIds = relatedCards.map((card) => card.card_id);
          emails = [...emails,...relatedCards.map((card) => card.email)];
          phoneNumbers = [...phoneNumbers,...relatedCards.map((card) => card.phone)];
        }

        return {
          card_id: mainCard.card_id,
          email: emails,
          phone_number: phoneNumbers,
          related_cards: relatedCardIds,
        };
      }),
    );

    return(mainCardDetails);
  } 
  catch (error) {
    throw new Error('Cannot return contact list');    
  }
};

export default getSearchableListService;
