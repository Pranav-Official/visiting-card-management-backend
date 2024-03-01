// import { Sequelize } from 'sequelize';
import Cards from '../../models/cards';
import SharedCards from '../../models/sharedCards';
import UserTable from '../../models/userTable';

//Function to get the pending card list and its details

const getPendingCardsService = async (userId: string): Promise<responseType> => {
  try {
    if (!userId) {
      throw new Error('User ID is missing in the request.');
    }

    const pendingCards = await SharedCards.findAll({
      where: { status: 'pending', user_id: userId },
      include: [
        {
          model: Cards,
          attributes: [
            'card_name',
            'img_front_link',
            'img_back_link',
            'job_title',
            'email',
            'phone',
            'company_name',
            'company_website',
            'contact_name',
            'user_id',
          ],
          include: [
            {
              model: UserTable,
              attributes: ['user_id', 'user_fullname', 'user_email'],
            },
          ],
        },
      ],
      attributes: [],
      raw: true, // Exclude all attributes from SharedCards
    });

    // Grouping cards by 'Card.UserTable.user_id'
    const groupedByUserId = pendingCards.reduce((acc, card) => {
      const userId = card['Card.UserTable.user_id'];
      if (!acc[userId]) {
        acc[userId] = [];
      }
      acc[userId].push(card);
      return acc;
    }, {});

    // Printing cards for each group
    for (const userId in groupedByUserId) {
      console.log(`User ID: ${userId}`);
      groupedByUserId[userId].forEach((card) => {
        console.log(`Card Name: ${card['Card.card_name']}`);
      });
    }

    const formattedResponse = [];
    
    for (const userId in groupedByUserId) {
      const userCards = groupedByUserId[userId].map((card) => ({
        card_name: card['Card.card_name'],
        img_front_link: card['Card.img_front_link'],
        img_back_link: card['Card.img_back_link'],
        job_title: card['Card.job_title'],
        email: card['Card.email'],
        phone: card['Card.phone'],
        company_name: card['Card.company_name'],
        company_website: card['Card.company_website'],
        contact_name: card['Card.contact_name'],
        user_id: card['Card.user_id'],
      }));

      formattedResponse.push({
        user_id: userId,
        user_fullname:
          groupedByUserId[userId][0]['Card.UserTable.user_fullname'],
        user_email: groupedByUserId[userId][0]['Card.UserTable.user_email'],
        cards: userCards,
      });
    }

    return {
      status: true,
      message:
        pendingCards.length > 0
          ? 'Pending cards found'
          : 'No pending cards found',
      data: formattedResponse,
    };
  } catch (error) {
    console.error('Error fetching pending cards:', error);
    return { status: false, message: 'Error fetching pending cards',data:Error };
  }
};

export default getPendingCardsService;
