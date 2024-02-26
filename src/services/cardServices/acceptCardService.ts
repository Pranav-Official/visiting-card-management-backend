//To accept the shared cards

import Cards from '../../models/cards';
import SharedCards from '../../models/sharedCards';
import createNewCardService from './createNewCardService';

interface AcceptCardParams {
  card_id: string;
  user_id: string;
}

const acceptCardService = async ({
  card_id,
  user_id,
}: AcceptCardParams) => {
  try {
    const oldCardId = card_id;
    const receiverId = user_id;
    const CardDetails = await Cards.findOne({ where: { card_id: oldCardId },attributes: {exclude: ['user_id']},raw:true });

    if (!CardDetails) {
      console.error('Error retrieving card details from Cards table');
      return { error: 'Error retrieving card details from Cards table' };
    }

    CardDetails.user_id=receiverId;
    console.log('cardData;',CardDetails);
    console.log('user_id:',CardDetails.user_id);
    console.log('New cardData;',CardDetails);
 const success = await createNewCardService(CardDetails);

    if (success.success) {
      const cardId = success.card_id;
      console.log('cardId:', cardId);
      const newStatus = 'accepted';

      //Change the shared_or_not status in cards table
      await Cards.update({ shared_or_not: 1 }, { where: { card_id: cardId } });

        //Update the pending status in sharedCard table
        const updatedCard = await SharedCards.update(
          { status: newStatus, modifiedAt: new Date() },
          { where: { card_id: oldCardId } },
        );
        console.log(updatedCard);

        return updatedCard;
      } else {
        console.error('Error retrieving user_id from SharedCards');
        return { error: 'Error retrieving user_id from SharedCards' };
      }
    } 
   catch (error) {
    console.error('Error accepting card:', error);
    return { error: error.message };
  }
};

export default acceptCardService;
