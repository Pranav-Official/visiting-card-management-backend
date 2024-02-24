import UserTable from '../../models/userTable';
import userLoginService from './userLoginService';

//User Registration Service
const userRegistrationService = async (user_fullname, user_email, password) => {
  //To Check if a user with same Email ID Exists
  const existingUser = await UserTable.findOne({
    where: { user_email: user_email },
    raw: true,
  });

  if (existingUser != null) {
    return {
      status: false,
      message: 'user with same email id already exists, please login',
      user_id: null,
    };
  }

  try {
    //to Create a new User
    const createUser = await UserTable.create(
      { user_fullname, user_email, password_hash: password },
      { raw: true },
    );
    if (createUser) {
      const returnedValue = await userLoginService(user_email, password);
      returnedValue.message = 'user registration successful';
      return returnedValue;
    } else {
      return {
        status: false,
        message: 'user registration failed',
        user_id: null,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: 'user registration failed' + error,
      user_id: null,
    };
  }
};

export default userRegistrationService;
