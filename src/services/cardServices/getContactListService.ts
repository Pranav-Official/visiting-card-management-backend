import Cards from '../../models/cards';
import getCardListService from './getCardListService';
//function to get complete contact list in home page
const getContactListService = async (user_id: string) => {
  try {
    const list = await Cards.findAll({
      where: { user_id: user_id, parent_card_id: null },
      attributes: ['contact_name', 'card_id'],
      raw: true,
    });
    // Array to hold promises for fetching card lists
    const cardListPromises = list.map((contact) =>
      getCardListService(contact.card_id, user_id),
    );
    const cardLists = await Promise.all(cardListPromises);
    // Combine contact and card list data
    const result = list.map((contact, index) => {
      const card_list = cardLists[index].data;
      const cardListCount = Array.isArray(card_list) ? card_list.length : 0; // Add cardListCount
      return {
        ...contact,
        cardListCount,
      };
    });
    return { status: true, message: 'List found', data: result };
  } catch (error) {
    return {
      status: false,
      message: 'List not found' + error.message,
      data: error,
    };
  }
};
export default getContactListService;
