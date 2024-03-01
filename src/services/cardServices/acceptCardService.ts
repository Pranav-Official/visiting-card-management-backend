// To accept the shared cards
import createNewCardService from './createNewCardService';
import getCardDetailsService from './getCardDetailsService';
import sharedCardAcceptService from './sharedCardAcceptService';

interface AcceptCardParams {
  card_id: string;
  user_id: string;
  contact_name: string;
}

const acceptCardService = async ({
  card_id,
  user_id,
  contact_name,
}: AcceptCardParams) => {
  try {
    const oldCardId = card_id;
    const receiverId = user_id;
    const newContactName = contact_name;

    const cardDetailsResponse = await getCardDetailsService(oldCardId);

    if (!cardDetailsResponse) {
      console.error('Error retrieving card details from Cards table');
      return { error: 'Error retrieving card details from Cards table' };
    }

    const cardDetails = cardDetailsResponse.data;

    if (!cardDetails) {
      console.error('Card details are undefined or null');
      return { error: 'Card details are undefined or null' };
    }

    // Add user_id to CardDetails
    cardDetails.user_id = receiverId;
    cardDetails.contact_name = newContactName;

    const success = await createNewCardService(cardDetails);

    if(success.status == true){
      const cardId = success.data.cardId;
      const updatedCard = await sharedCardAcceptService(
        oldCardId,
        receiverId,
         cardId,
      );

      return {
        status: updatedCard.status,
        message: updatedCard.message,
        data: updatedCard.data,
      };
    }

    else{
      return{status: false, message:'error in accepting shared card', data:Error}
    }
      
  } catch (error) {
    console.error('Error accepting card:', error);
    return {
      status: false,
      message: 'Error in accepting shared card',
      data: error,
    };
  }
};

export default acceptCardService;
