// import Cards from '../../models/cards';

// //Function to create a new card
// const createNewCardService = async(cardData: Cards) => {
//   try {
//     const {
//       card_name,
//       img_front_link,
//       img_back_link,
//       job_title,
//       email,
//       phone,
//       company_name,
//       company_website,
//       contact_name,
//       user_id,
//     } = cardData;

//     if (card_name && email && phone) {
//       const createCard = await Cards.create({
//         card_name,
//         img_front_link,
//         img_back_link,
//         job_title,
//         email,
//         phone,
//         company_name,
//         company_website,
//         description: null,
//         contact_name,
//         parent_card_id: null,
//         user_id,
//         shared_or_not: 0,
//       }, { raw: true });

    //  // const createdCardId = createCard.get('card_id');
    //  // return { success: true, card_id: createdCardId };

//       console.log(`New card created: ${createCard.toJSON()}`);
//       return true; // Indicates success
//     } else {
//       return false; // Indicates failure
//     }
//   } catch (error) {
//     console.error(error);
//     return false; // Indicates failure
//   }
// };

// export default createNewCardService;


///////////////////////////////////////
import Cards from '../../models/cards';

// Function to create a new card
const createNewCardService = async(cardData: Cards) => {
  try {
    const {
      card_name,
      img_front_link,
      img_back_link,
      job_title,
      email,
      phone,
      company_name,
      company_website,
      contact_name,
      user_id,
    } = cardData;

    if (card_name && email && phone) {
      const createCard = await Cards.create({
        card_name,
        img_front_link,
        img_back_link,
        job_title,
        email,
        phone,
        company_name,
        company_website,
        description: null,
        contact_name,
        parent_card_id: null,
        user_id,
        shared_or_not: 0,
      }, { raw: true });

      const createdCardId = createCard.get('card_id');
      console.log(`New card created: ${createCard.toJSON()}`);

      // Return the created card_id
      return { success: true, card_id: createdCardId };
    } else {
      return { success: false }; // Indicates failure
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: error.message }; // Indicates failure
  }
};

export default createNewCardService;
