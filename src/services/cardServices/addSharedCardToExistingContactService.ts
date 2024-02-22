import Cards from '../../models/cards';
import SharedCards from '../../models/sharedCards';

//function to add card to existing contact
const addSharedCardToExistingContactService = async (
  user_id,
  shared_card_id,
  parent_card_id,
) => {
  try {
    // Retrieve details of the shared card
    const sharedCardDetails = await Cards.findOne({
      where: { card_id: shared_card_id },
      raw: true,
    });

    if (sharedCardDetails != null) {
      // Create a new card with the shared card details
      const createCard = await Cards.create({
        card_name: sharedCardDetails.card_name,
        img_front_link: sharedCardDetails.img_front_link,
        img_back_link: sharedCardDetails.img_back_link,
        job_title: sharedCardDetails.job_title,
        email: sharedCardDetails.email,
        phone: sharedCardDetails.phone,
        company_name: sharedCardDetails.company_name,
        company_website: sharedCardDetails.company_website,
        description: sharedCardDetails.description,
        parent_card_id: parent_card_id,
        user_id: user_id,
        shared_or_not: 1,
      });

      if (createCard != null) {
        // To Update the status of the shared card
        const updateCardStatus = await SharedCards.update(
          { status: 'Accepted' },
          { where: { card_id: shared_card_id, user_id: user_id } },
        );

        if (updateCardStatus == null) {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export default addSharedCardToExistingContactService;
