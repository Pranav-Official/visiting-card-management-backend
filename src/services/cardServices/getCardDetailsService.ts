import Cards from "../../models/cards";


const getCardDetailsService = async (card_id: string,full:boolean) => {
  try {
    let attributes:string[] | {exclude: string[]}
    if (!full) {
      // Include all attributes
      attributes = ['card_name', 'img_front_link', 'img_back_link', 'job_title', 'email', 'phone', 'company_name', 'company_website', 'description'];
    } else {
      // Exclude createdAt and modifiedAt fields
      attributes = {
        exclude: ['createdAt', 'modifiedAt']
      };
    }

    const card = await Cards.findOne({
      where: { card_id: card_id },
      attributes: attributes,
      raw: true 
    });

    if (card === null) {
      return { status: false, message:"Card ID not found", data:{} };
    } else {
      return { status: true, message: "Card found", data: card};
    }
  } catch (error) {
    
    return { status: false, message:"Unable to fetch card details" ,data: error };
  }
};

export default getCardDetailsService;
