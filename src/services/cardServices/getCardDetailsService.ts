import Cards from "../../models/cards";

type ReturnObject = {
  status: boolean;
  message: Object;
};

const getCardDetailsService = async (card_id: string): Promise<ReturnObject> => {
  try {
    const card = await Cards.findOne({
      where: { card_id: card_id },
      attributes: ['card_name', 'img_front_link', 'img_back_link', 'job_title', 'email', 'phone', 'company_name', 'company_website', 'description'],
      raw: true 
    });

    if (card === null) {
      return { status: false, message: { error: "Card ID not found" } };
    } else {
      return { status: true, message: card };
    }
  } catch (error) {
    
    return { status: false, message: { error: "Unable to fetch card details" } };
  }
};

export default getCardDetailsService;
