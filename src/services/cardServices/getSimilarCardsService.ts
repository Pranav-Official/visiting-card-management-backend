import { Op } from 'sequelize';
import Cards from '../../models/cards';

const getSimilarCardsService = async (
  user_id: string,
  card_name: string,
  phone: string,
  email: string,
) => {
  try {
    //Finding cards with any of the given details similar in 'Cards' model under the given user.
    const contacts = await Cards.findAll({
      where: {
        [Op.or]: [
          { card_name: { [Op.like]: `%${card_name}%` } },
          { phone: phone },
          { email: email },
        ],
        user_id: user_id,
      },
      attributes: [
        'contact_name',
        'card_id',
        'card_name',
        'email',
        'phone',
        'parent_card_id',
      ],
      raw: true,
    });

    // Grouping similar cards by parent card ID
    let groupedContacts: Record<string, any> = {};

    //group by parent card ID and collect child cards with null contact name
    for (const contact of contacts) {
      const parentCardId = contact.parent_card_id;
      if (parentCardId === null) {
        // Parent card found
        const cardId = contact.card_id;
        groupedContacts[cardId] = {
          contact_name: contact.contact_name,
          cards: [
            {
              card_id: contact.card_id,
              card_name: contact.card_name,
              email: contact.email,
              phone: contact.phone,
            },
          ], // Initialize cards array, includes parent card
        };
      } else {
        // find parent card for child cards without contact name found
        if (!groupedContacts[parentCardId]) {
          // find parent card from the 'Cards' table
          const parentCard = await Cards.findOne({
            where: { card_id: parentCardId, user_id: user_id },
            raw: true,
          });
          if (parentCard) {
            // If parent card found, initialize it in groupedContacts
            groupedContacts[parentCardId] = {
              contact_name: parentCard.contact_name,
              cards: [
                {
                  card_id: parentCard.card_id,
                  card_name: parentCard.card_name,
                  email: parentCard.email,
                  phone: parentCard.phone,
                },
              ],
            };
          }
        }
        // Add the child card to the parent card's cards array
        if (groupedContacts[parentCardId]) {
          groupedContacts[parentCardId].cards.push({
            card_id: contact.card_id,
            card_name: contact.card_name,
            email: contact.email,
            phone: contact.phone,
          });
        }
      }
    }

    // Converting the groupedContacts object to the desired format
    const response = Object.keys(groupedContacts).map((key) => {
      return {
        contact_name: groupedContacts[key].contact_name,
        cards: groupedContacts[key].cards,
      };
    });
    console.log(response);
    // Return the list of similar contacts with cards grouped under their respective contacts.
    if (response.length != 0) return { response: response, status: true };
    else
      return {
        error: 'No similar cards found',
        status: false,
      };
  } catch (error) {
    console.error(error);
    return { error: error, status: false };
  }
};

export default getSimilarCardsService;
