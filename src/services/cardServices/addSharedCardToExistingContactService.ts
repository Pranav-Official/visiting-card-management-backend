import SharedCards from '../../models/sharedCards';
import createNewCardService from './createNewCardService';
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

    console.log('\n\nShared Card Details: ', sharedCardDetails);

    if (sharedCardDetails.status === true) {
      // Create a new card with the shared card details
      const createCard = await createNewCardService(
        sharedCardDetails.data + parent_card_id,
      );

      if (createCard.status === true) {
        // To Update the status of the shared card
        const updateCardStatus = await SharedCards.update(
          { status: 'Accepted' },
          { where: { card_id: shared_card_id, user_id: user_id } },
        );

        if (updateCardStatus == null) {
          return {
            error: 'Failed to Update Shared Card Status',
            status: false,
          };
        }
      } else {
        return { error: 'Failed To Create Card!', status: false };
      }

      return { message: 'Card Added Successfully', status: true };
    } else {
      return { error: 'Cannot Find Card!', status: false };
    }
  } catch (error) {
    return { status: false, message: error, data: {} };
  }
};

export default addSharedCardToExistingContactService;
