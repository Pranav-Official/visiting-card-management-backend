import Cards from '../../models/cards'; // Assuming you have a model defined for Cards
import SharedCards from '../../models/sharedCards';

const sharedCardAcceptService = async (
  card_id: string,
  user_id: string,
  new_created_card_id: string,
) => {
  try {
    const sharedCard = await SharedCards.findOne({
      where: { card_id: card_id, user_id: user_id, status: 'Pending' },
    });
    if (sharedCard) {
      sharedCard.update({ status: 'accepted' });
    }
    const new_created_card = await Cards.findOne({
      where: { card_id: new_created_card_id },
    });
    if (new_created_card) {
      new_created_card.update(
        { shared_or_not: 1 },
        { where: { card_id: new_created_card_id } },
      );
    }
    return {
      status: true,
      message: 'Shared card accepted successfully',
      data: [],
    };
  } catch (error) {
    return {
      status: false,
      message: 'error in accepting shared card',
      data: error,
    };
  }
};

export default sharedCardAcceptService;
