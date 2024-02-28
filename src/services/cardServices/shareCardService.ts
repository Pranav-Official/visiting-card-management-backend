import Cards from '../../models/cards'; // Assuming you have a model defined for Cards
import SharedCards from '../../models/sharedCards';




const shareCardService = async (card_id: string,receiver_user_id:string): Promise<responseType> => {

  try {
    // Find the card with the provided card_id 
    const cardToShare = await Cards.findOne({
      where: { card_id: card_id },
      raw: true,
    });

    if (!cardToShare) {

      return {status:false,message:"Card Id not found",data:{}}
    }

    // To create a new entry in SharedCards table
    await SharedCards.create({ card_id:card_id,user_id:receiver_user_id });

   return {status:true,message:"Card shared successfully",data:{}}; // Success
  } catch (error) {
    console.error('Error in sharing card:', error);
    return {status:false,message:"Error in sharing card",data:{}}; // Failure
  }
};

export default shareCardService;
