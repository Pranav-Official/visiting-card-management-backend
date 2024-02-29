import Cards from '../../models/cards';
import createNewCardService from './createNewCardService';

//function to add card to existing contact
const addToExistingContactService = async (cardData: Cards) => {
  try {
    //to check if the parent card exists in the database
    const findParentCard = await Cards.findOne({
      where: { card_id: cardData.parent_card_id },
      raw: true,
    });

    //to add card to and existing contact if parent card is found
    if (findParentCard != null) {
      //uses the createNewCardService to create a new card with details
      const createdCard = await createNewCardService(cardData);

      if (createdCard.success === true) {
        //sets the parent_card_id of the newly created card
        const setParentCard = await Cards.update(
          { parent_card_id: cardData.parent_card_id },
          { where: { card_id: cardData.card_id } },
        );

        if (setParentCard) {
          return {
            status: true,
            message: 'Card Added Successfully!',
            data: {},
          };
        } else {
          return { status: false, message: 'Unable To Update', data: {} };
        }
      } else {
        return { status: false, message: 'Parent Card Not Found!', data: {} };
      }
    } else {
      return { status: false, message: 'Parent Card Not Found!', data: {} };
    }
  } catch (error) {
    return { status: false, message: error, data: {} };
  }
};

export default addToExistingContactService;
