
import Cards from '../../models/cards';

//function to get complete contact list in home page
const getContactListService = async (user_id:string) => {
  try {
    const list = await Cards.findAll({
      where: { user_id: user_id, parent_card_id: null },
      attributes: ['card_name', 'ph'],
    });
    return list;
  } catch (error) {
    throw new Error('Cannot return contact list');    
  }
};

export default getContactListService;
