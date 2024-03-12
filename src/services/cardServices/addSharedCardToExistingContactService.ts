import Cards from '../../models/cards';
import addToExistingContactService from './addToExistingContactService';
import getCardDetailsService from './getCardDetailsService';
import sharedCardAcceptService from './sharedCardAcceptService';

//function to add card to existing contact
const addSharedCardToExistingContactService = async (
  user_id: string,
  shared_card_id: string,
  parent_card_id: string,
) => {
  try {
    // Retrieve details of the shared card
    const sharedCardDetails = await getCardDetailsService(
      shared_card_id,
      false,
    );

    if (sharedCardDetails.status === true) {
      // Create a new card with the shared card details
      const createCard = await addToExistingContactService(
        parent_card_id,
        sharedCardDetails.data,
      );

      try {
        if (createCard.status === true) {
          // To Update the status of the shared card
          const updateCardDetails = await sharedCardAcceptService(
            shared_card_id,
            user_id,
            createCard.data.cardId,
          );

          //to update the user_id of the newly created card
          const updateCardUserID = await Cards.update(
            {
              user_id: user_id,
              shared_or_not: 1,
            },
            { where: { card_id: createCard.data.cardId } },
          );

          if (updateCardDetails.status === true && updateCardUserID[0] == 1)
            return {
              status: true,
              message: 'Card Added Successfully',
              data: createCard.data,
            };
          else {
            return {
              status: false,
              message: 'Failed To Update Card Details!',
              data: {},
            };
          }
        } else {
          return { status: false, message: 'Failed To Create Card!', data: {} };
        }
      } catch (error) {
        return { status: false, message: 'Error Occured: ' + error, data: {} };
      }
    } else {
      return { status: false, message: 'Cannot Find Card!', data: {} };
    }
  } catch (error) {
    return { status: false, message: error, data: {} };
  }
};

export default addSharedCardToExistingContactService;
