//To accept the shared cards
import createNewCardService from './createNewCardService';
import getCardDetailsService from './getCardDetailsService';
import sharedCardAcceptService from './sharedCardAcceptService';

interface AcceptCardParams {
  card_id: string;
  user_id: string;
}

const acceptCardService = async ({ card_id, user_id }: AcceptCardParams) => {
  try {
    const oldCardId = card_id;
    const receiverId = user_id;

    let CardDetails = await getCardDetailsService(oldCardId);
    console.log('card details:',CardDetails);

    if (!CardDetails) {
      console.error('Error retrieving card details from Cards table');
      return { error: 'Error retrieving card details from Cards table' };
    }
    // Add user_id to CardDetails
    CardDetails.data = {
      ...CardDetails,
      user_id: receiverId,
    };
    // if(CardDetails) {
    //  CardDetails.data.update({user_id:receiverId});
    // }

   // CardDetails.user_id = receiverId;
    console.log('cardData;', CardDetails);
   // console.log('user_id:', CardDetails.user_id);
    console.log('New cardData;', CardDetails);
    
    const success = await createNewCardService(CardDetails.data);
    // card_id of the newly created card
    const cardId = success.card_id;

    const updatedCard = await sharedCardAcceptService(oldCardId, cardId, receiverId);

    console.log(updatedCard);
    return updatedCard;
  } catch (error) {
    console.error('Error accepting card:', error);
    return { error: error.message };
  }
};

export default acceptCardService;
