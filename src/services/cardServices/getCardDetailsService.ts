import Cards from "../../models/cards";

type ReturnObject = {
  status: boolean;
  message: Object;
};

const getCardDetailsService = async (card_id: string): Promise<ReturnObject> => {
  try {
    const list = await Cards.findOne({
      where: { card_id: card_id },
      attributes: ['card_name', 'img_front_link', 'img_back_link', 'job_title', 'email', 'phone', 'company_name', 'company_website', 'description'],
      raw: true 
    });

    if (list === null) {
      return { status: false, message: { error: "Card ID not found" } };
    } else {
      return { status: true, message: list };
    }
  } catch (error) {
    console.error("Error in getCardDetailsService:", error);
    return { status: false, message: { error: "Unable to fetch card details" } };
  }
};

export default getCardDetailsService;
