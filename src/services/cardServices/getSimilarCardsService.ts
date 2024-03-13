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
        [Op.or]: [{ card_name: card_name }, { phone: phone }, { email: email }],
        user_id: user_id,
      },
      attributes: [
        'contact_name',
        'card_id',
        'card_name',
        'email',
        'phone',
        'parent_card_id',
        'job_title',
        'company_name',
        'company_website',
      ],
      raw: true,
    });
    type itemProps = {
      card_id: string;
      card_name: string;
      email: string;
      phone: string;
      job_title: string;
      company_name: string;
      company_website: string;
    };

    type keyProps = {
      parent_card_id: string;
      contact_name: string;
      cards: itemProps[];
    };
    // Grouping similar cards by parent card ID
    const groupedContacts: Record<string, keyProps> = {};

    //group by parent card ID and collect child cards with null contact name
    for (const contact of contacts) {
      const parentCardId = contact.parent_card_id;
      if (parentCardId === null) {
        // Parent card found
        const cardId = contact.card_id;
        groupedContacts[cardId] = {
          parent_card_id: cardId,
          contact_name: contact.contact_name,
          cards: [
            {
              card_id: contact.card_id,
              card_name: contact.card_name,
              email: contact.email,
              phone: contact.phone,
              job_title: contact.job_title,
              company_name: contact.company_name,
              company_website: contact.company_website,
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
            // If parent card found, update contact name in groupedContacts
            groupedContacts[parentCardId] = {
              parent_card_id: parentCard.card_id,
              contact_name: parentCard.contact_name,
              cards: [],
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
            job_title: contact.job_title,
            company_name: contact.company_name,
            company_website: contact.company_website,
          });
        }
      }
    }

    // Converting the groupedContacts object to the desired format
    const similarCards = Object.keys(groupedContacts).map((key) => {
      return {
        parent_card_id: groupedContacts[key].parent_card_id,
        contact_name: groupedContacts[key].contact_name,
        cards: groupedContacts[key].cards,
      };
    });
    // Return the list of similar contacts with cards grouped under their respective contacts.
    if (similarCards.length != 0)
      return {
        status: true,
        message: 'Similar cards found',
        data: similarCards,
      };
    else
      return {
        status: false,
        message: 'No similar cards found',
      };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      message: 'Unable to find similar cards' + error.message,
      data: error,
    };
  }
};

export default getSimilarCardsService;
