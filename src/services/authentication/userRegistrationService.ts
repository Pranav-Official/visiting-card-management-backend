import UserTable from '../../models/userTable';
import userLoginService from './userLoginService';

//User Registration Service
const userRegistrationService = async (
  user_fullname: string,
  user_email: string,
  password: string,
) => {
  //To Check if a user with same Email ID Exists
  const existingUser = await UserTable.findOne({
    where: { user_email: user_email },
    raw: true,
  });

  if (existingUser != null) {
    return {
      status: false,
      message: 'User with same Email Id exists, Please Login!',
      data: {},
    };
  }

  try {
    //to Create a new User
    const createUser = await UserTable.create(
      { user_fullname, user_email, password_hash: password },
      { raw: true },
    );
    if (createUser) {
      // Using the Login Service
      const loginStatus = await userLoginService(user_email, password);
      return {
        status: true,
        message: 'User Registration Successful',
        data: loginStatus.data,
      };
    } else {
      return {
        status: false,
        message: 'User Registration Failed',
        data: {},
      };
    }
  } catch (error) {
    return {
      status: false,
      message: 'User Registration Failed' + error,
      data: {},
    };
  }
};

export default userRegistrationService;
