import Cards from '../../models/cards';

//function to get complete contact list in home page
const getContactListService = async (user_id: string) => {
  try {
    const list = await Cards.findAll({
      where: { user_id: user_id, parent_card_id: null },
      attributes: ['contact_name', 'card_id'],
      raw:true,
    });
    // return list;
    return { status: true, message:"List found", data:list};
  } catch (error) {
    return { status: false, message:"List not found"+ error.message , data:error};
  }
};
export default getContactListService;
