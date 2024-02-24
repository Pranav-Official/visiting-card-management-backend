import Cards from '../../models/cards';

//function to get complete contact list in home page
const getContactListService = async (user_id: string) => {
  try {
    const list = await Cards.findAll({
      where: { user_id: user_id, parent_card_id: null },
      attributes: ['contact_name', 'card_id'],
      raw:true,
    });
    return list;
  } catch (error) {
    return 'Error fetching contact list: Cannot return contact list';
  }
};
export default getContactListService;
