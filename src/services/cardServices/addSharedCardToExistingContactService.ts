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
    const sharedCardDetails = await getCardDetailsService(shared_card_id);

    if (sharedCardDetails != null) {
      // Create a new card with the shared card details
      const createCard = await addToExistingContactService(sharedCardDetails);

      if (createCard != null) {
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
