import Cards from '../../models/cards';
import createNewCardService from './createNewCardService';

//function to add card to existing contact
const addToExistingContactService = async (
  parent_card_id: string,
  cardData: Cards,
) => {
  try {
    //To check if the parent card exists in the database
    const findParentCard = await Cards.findOne({
      where: { card_id: parent_card_id },
      raw: true,
    });

    //to add card to and existing contact if parent card is found
    if (findParentCard != null) {
      cardData.contact_name = '';
      //uses the createNewCardService to create a new card with details
      const createdCard = await createNewCardService(cardData);

      if (createdCard.status === true) {
        //sets the parent_card_id of the newly created card
        const setParentCard = await Cards.update(
          { parent_card_id: parent_card_id },
          { where: { card_id: createdCard.data.cardId } },
        );

        if (setParentCard[0] === 1) {
          return {
            status: true,
            message: 'Card Added Successfully!',
            data: createdCard.data,
          };
        } else {
          return {
            status: false,
            message: 'Couldnt Update Parent Card ID',
            data: {},
          };
        }
      } else {
        return { status: false, message: 'Unable To Add Card', data: {} };
      }
    } else {
      return { status: false, message: 'Parent Card Not Found', data: {} };
    }
  } catch (error) {
    return { status: false, message: 'Failed To Add Card', data: {} };
  }
};

export default addToExistingContactService;
