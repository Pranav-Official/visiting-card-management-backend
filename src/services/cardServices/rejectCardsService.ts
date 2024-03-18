import SharedCards from '../../models/sharedCards';

const rejectCardsService = async (
  user_id: string,
  card_ids: string[] | undefined,
): Promise<responseType> => {
  try {
    // Check if card_ids is defined and is an array
    if (!Array.isArray(card_ids) || card_ids.length === 0) {
      return {
        status: false,
        message: 'Invalid card IDs provided',
        data: {},
      };
    }

    // Update the status of cards with the provided card_ids
    const [rejectedCards] = await SharedCards.update(
      { status: 'rejected' },
      {
        where: {
          user_id: user_id,
          card_id: card_ids,
          status: 'pending',
        },
      },
    );

    if (rejectedCards !== card_ids.length) {
      return {
        status: false,
        message: 'Card IDs were not found or already rejected',
        data: {},
      };
    }

    return {
      status: true,
      message: 'Cards rejected successfully',
      data: { rejectedCardIds: card_ids },
    };
  } catch (error) {
    console.error('Error in rejecting cards:', error);
    return {
      status: false,
      message: 'Error in rejecting cards',
      data: {},
    };
  }
};

export default rejectCardsService;
