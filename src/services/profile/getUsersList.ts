
import { Op } from 'sequelize';
import UserTable from '../../models/userTable';


const getUserListService = async (user_id: string): Promise<responseType>  => {
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
    
      // Extracting details from users List
      const response = usersList.map((user:any) => ({
        user_id: user.user_id,
        user_fullname: user.user_fullname,
        user_email: user.user_email,
        
      }));
      return {status:true,message:"Users list found",data:{response}}
      
    }
   catch (error) {
    console.error(error);
    return {status:false,message:"Error in fetching user list",data:{}}; // Failure
  }
};
export default getUserListService;
