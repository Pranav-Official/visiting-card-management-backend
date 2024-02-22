import Cards from '../../models/cards'; // Assuming you have a model defined for Cards
import SharedCards from '../../models/sharedCards';


type returnObjectType = {
    status: boolean;
    message: string;
  };

const shareCardService = async (card_id: string,user_id:string): Promise<returnObjectType> => {

  try {
    // Find the card with the provided card_id 
    const cardToShare = await Cards.findOne({
      where: { card_id: card_id },
      raw: true,
    });

    if (!cardToShare) {

      return {status:false,message:"Card Id not found"}
    }

    // To create a new entry in SharedCards table
    await SharedCards.create({ card_id:card_id,user_id:user_id });

   return {status:true,message:"Card shared successfully"}; // Success
  } catch (error) {
    console.error('Error in sharing card:', error);
    return {status:false,message:"Error in sharing card"}; // Failure
  }
};

export default shareCardService;
