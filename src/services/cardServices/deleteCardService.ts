
import Cards from '../../models/cards'; // Assuming you have a model defined for Cards
import { Op } from 'sequelize';




const deleteCardService = async (card_id: string): Promise<responseType> => {

  try {
    // Find the card with the provided card_id and user_id
    const cardToDelete = await Cards.findOne({
      where: { card_id: card_id },
      raw: true,
    });

    if (!cardToDelete) {

      return {status:false,message:"Card Id not found in cards table",data:{}}
    }

    // Update user_id to null
    await Cards.update({ user_id: null }, { where: { card_id: card_id } });

    // If parent_card_id of the updated card is null, find the next card with the same user_id
    if (!cardToDelete.parent_card_id) {
      const nextCard = await Cards.findOne({
        where: {
          user_id: cardToDelete.user_id,
          parent_card_id: card_id,
        },
        raw: true,
      });

      if (nextCard) {
        // set the parent_card_id as null in the next card of deleted card
        await Cards.update(
          { parent_card_id: null },
          {
            where: {
              user_id: cardToDelete.user_id,
              card_id: nextCard.card_id,
              parent_card_id: card_id,
            },
          },
        );

        // Update the parent_card_id of other cards under the same user
        await Cards.update(
          { parent_card_id: nextCard.card_id },
          {
            where: {
              user_id: cardToDelete.user_id,
              card_id: { [Op.ne]: nextCard.card_id },
              parent_card_id: card_id,
            },
          },
        );
      }
    }

    return {status:true,message:"Card deleted successfully",data:{}}; // Success
  } catch (error) {
    console.error('Error deleting card:', error);
    return {status:false,message:"Error in deleting card",data:{}}; // Failure
  }
};

export default deleteCardService;
