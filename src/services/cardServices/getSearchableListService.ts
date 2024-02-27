import Cards from '../../models/cards';

//function to get complete searchable list
const getSearchableListService = async (user_id:string) => {
  try {
    const mainCards = await Cards.findAll({
      where: { user_id: user_id, parent_card_id: null },
      raw: true,
    });

    const mainCardDetails = await Promise.all(mainCards.map(async (mainCard) =>{
        let relatedCardIds = new Set();
        let emails = new Set();
        let phoneNumbers = new Set();
        let companyName = new Set();

        // Check if mainCard has a valid card_id
        if (mainCard.card_id) {
          emails.add(mainCard.email);
          phoneNumbers.add(mainCard.phone);
          companyName.add(mainCard.company_name)
          
          const relatedCards = await Cards.findAll({where: { parent_card_id: mainCard.card_id },raw: true,});
          relatedCards.forEach((card) => {
            relatedCardIds.add(card.card_id);
            emails.add(card.email);
            phoneNumbers.add(card.phone);
            companyName.add(card.company_name);
          });
        }

        return {
          card_id: mainCard.card_id,
          email: Array.from(emails),
          phone_number: Array.from(phoneNumbers),
          related_cards: Array.from(relatedCardIds),
          company_Names: Array.from(companyName)
        };
      }),
    );
    

    return(mainCardDetails);
  } 
  catch (error) {
    return(error);    
  }
};

export default getSearchableListService;

