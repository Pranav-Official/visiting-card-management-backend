import { Op } from 'sequelize';
import Cards from '../../models/cards';

// Function to retrieve similar cards from the user's contact list
const getSimilarCardsService = async (
  user_id: string,
  card_name: string,
  phone: string,
  email: string,
) => {
  try {
    // Query the 'Cards' model to find similar cards
    const contacts = await Cards.findAll({
      where: {
        [Op.or]: [
          // Use the 'Op.or' operator to search for any of the specified conditions
          { card_name: card_name },
          { contact_name: card_name },
          { phone: phone },
          { email: email },
        ],
        user_id: user_id,
      },
      // Select specific attributes to return
      attributes: ['card_id', 'contact_name', 'card_name', 'email', 'phone'],
    });

    // Return the list of similar contacts
    return contacts;
  } catch (error) {
    console.error(error);
    throw new Error('No similar cards found');
  }
};

export default getSimilarCardsService;
