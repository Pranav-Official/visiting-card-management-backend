// import Cards from '../../models/cards';
import createNewCardService from './createNewCardService';

const acceptCardService = async () =>{

    try {
        // Create a new card
        const success = await createNewCardService(cardData);
    
        // If card creation is successful, change status in sharedCards table
        if (success) {
          // Call your function to update the card status
          await updateCardStatus(cardData.id, 'accepted');
        } else {
          console.error('Error creating new card');
        }
      } catch (error) {
        console.error('Error accepting card:', error);
      }

}
export default acceptCardService;