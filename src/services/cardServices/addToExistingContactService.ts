import Cards from '../../models/cards';

//function to add card to existing contact
const addToExistingContactService = async (parent_card_id,
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
  shared_or_not) => {

  try {
    const findParentCard = await Cards.findOne({
      where: { parent_card_id: parent_card_id },
      raw: true,
    });

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
        return true
      }
      else {
        return false
      }
}
else {
  return false;
}}
catch {
  return false
}};

export default addToExistingContactService;
