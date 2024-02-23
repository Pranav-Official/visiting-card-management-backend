import UserTable from '../../models/userTable';

//User Registration Service
const userRegistrationService = async (user_fullname, user_email, password) => {
  //To Check if a user with same Email ID Exists
  const existingUser = await UserTable.findOne({
    where: { user_email: user_email },
    raw: true,
  });

  if (existingUser != null) {
    return { error: 'User Already Exists', status: false };
  }

  try {
    //to Create a new User
    const createUser = await UserTable.create(
      { user_fullname, user_email, password_hash: password },
      { raw: true },
    );
    if (createUser) {
      return { message: 'User Registered Successfully', status: true };
    } else {
      return { error: 'Unable to Create User', status: false };
    }
  } catch (error) {
    return { error: error };
  }
};

export default userRegistrationService;
