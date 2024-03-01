import Cards from '../../models/cards';
import SharedCards from '../../models/sharedCards';
import addToExistingContactService from './addToExistingContactService';
import getCardDetailsService from './getCardDetailsService';

//function to add card to existing contact
const addSharedCardToExistingContactService = async (
  user_id,
  shared_card_id,
  parent_card_id,
) => {
  try {
    // Retrieve details of the shared card
    const sharedCardDetails = await getCardDetailsService(
      shared_card_id,
      false,
    );

    console.log('\n\nShared Card Details: ', sharedCardDetails.data);

    if (sharedCardDetails.status === true) {
      // Create a new card with the shared card details
      const createCard = await addToExistingContactService(
        parent_card_id,
        sharedCardDetails.data,
      );

      console.log('\n\nCreate Card IS: ', createCard);
      try {
        if (createCard.status === true) {
          // To Update the status of the shared card
          const updateSharedCardStatus = await SharedCards.update(
            { status: 'Accepted' },
            { where: { card_id: shared_card_id, user_id: user_id } },
          );

          console.log('\n\nCreatedCard. Data = ', createCard.data);
          const updateCardDetails = await Cards.update(
            {
              user_id: user_id,
              shared_or_not: 1,
            },
            { where: { card_id: createCard.data.cardId } },
          );

          console.log('\n\nUpdate Card Details: ', updateCardDetails);

          if (updateSharedCardStatus[0] == 1 && updateCardDetails[0] == 1) {
            return {
              status: true,
              message: 'Card Added Successfully',
              data: createCard.data,
            };
          } else {
            return {
              status: false,
              message: 'Failed To Update Card Details',
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
