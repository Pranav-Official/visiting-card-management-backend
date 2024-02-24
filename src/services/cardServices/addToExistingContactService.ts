import Cards from '../../models/cards';

//function to add card to existing contact
const addToExistingContactService = async (
  parent_card_id,
  card_name,
  img_front_link,
  img_back_link,
  job_title,
  email,
  phone,
  company_name,
  company_website,
  description,
  user_id,
  shared_or_not,
) => {
  try {
    //to check if the parent card exists in the database
    const findParentCard = await Cards.findOne({
      where: { card_id: parent_card_id },
      raw: true,
    });

    //to add card to and existing contact if parent card is found
    if (findParentCard != null) {
      const createdCard = await Cards.create({
        card_name,
        img_front_link,
        img_back_link,
        job_title,
        email,
        phone,
        company_name,
        company_website,
        description,
        parent_card_id: parent_card_id,
        user_id,
        shared_or_not,
      });

      if (createdCard) {
        return { message: 'Card Added Successfully!', status: true };
      } else {
        return { error: 'Failed To Add Card', status: false };
      }
    } else {
      return { error: 'Parent Card Not Found!', status: false };
    }
  } catch (error) {
    return { error: error, status: false };
  }
};

export default addToExistingContactService;
