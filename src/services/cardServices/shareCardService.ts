import Cards from '../../models/cards'; // Assuming you have a model defined for Cards
import SharedCards from '../../models/sharedCards';

const shareCardService = async (card_id: string, receiver_user_ids: string[] | undefined): Promise<responseType> => {
  try {
    // Check if receiver_user_ids is defined and is an array
    if (!Array.isArray(receiver_user_ids)) {
      return { status: false, message: "Receiver User IDs must be provided as an array", data: {} };
    }

    // Find the card with the provided card_id 
    const cardToShare = await Cards.findOne({
      where: { card_id: card_id },
      raw: true,
    });

    if (!cardToShare) {
      return { status: false, message: "Card Id not found", data: {} };
    }

    // Check if receiver_user_ids array is empty
    if (receiver_user_ids.length === 0) {
      return { status: false, message: "Receiver User IDs array is empty", data: {} };
    }

    const sentUserIds: string[] = []; // Array to store user IDs to which the card is sent

    // Check if each receiver user has already received the card with status pending
    for (const receiver_user_id of receiver_user_ids) {
      const existingSharedCard = await SharedCards.findOne({
        where: {
          card_id: card_id,
          user_id: receiver_user_id,
          status: 'pending'
        }
      });

      if (!existingSharedCard) {
        // Create a new entry in SharedCards table only if an entry with the same card_id and user_id with status pending does not exist
        await SharedCards.create({ card_id: card_id, user_id: receiver_user_id, status: 'pending' });
        sentUserIds.push(receiver_user_id); // Add the user ID to the sentUserIds array
      }
    }

    // Include the sentUserIds in the success message
    const message = sentUserIds.length > 0 ? `Card sent to user IDs: ${sentUserIds.join(', ')}` : "No new cards sent";

    return { status: true, message: message, data: { sentUserIds } }; // Success
  } catch (error) {
    console.error('Error in sharing card:', error);
    return { status: false, message: "Error in sharing card", data: {} }; // Failure
  }
};

export default shareCardService;













