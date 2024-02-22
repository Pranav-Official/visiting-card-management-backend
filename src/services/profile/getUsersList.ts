
import { Op } from 'sequelize';
import UserTable from '../../models/userTable';

type returnObjectType = {
  status: boolean;
  message: Object;
};
const getUserListService = async (user_id: string): Promise<returnObjectType>  => {
  try {
    
    
    
    const usersList = await UserTable.findAll({
        where: {
            user_id: {
                [Op.ne]: user_id // Assuming user_id is a variable containing the specific user ID
            }
        },
        attributes: [
            'user_id',
            'user_fullname',
            'user_email'
        ],
        raw: true
    });
    
      // Extracting properties from each card
      const response = usersList.map((user:any) => ({
        user_id: user.user_id,
        user_fullname: user.user_fullname,
        user_email: user.user_email,
        
      }));
      return {status:true,message:response}
      
    }
   catch (error) {
    console.error(error);
    return {status:false,message:{error:"Error in fetching user list"}}; // Failure
  }
};
export default getUserListService;
