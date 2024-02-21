import UserTable from '../../models/userTable';

//User Registration Service
const userRegistrationService = async (
  user_fullname,
  user_email,
  password,
): Promise<boolean> => {
  //To Check if a user with same Email ID Exists
  const existingUser = await UserTable.findOne({
    where: { user_email: user_email },
    raw: true,
  });

  if (existingUser != null) {
    return false;
  }

  try {
    //to Create a new User
    const createUser = await UserTable.create(
      { user_fullname, user_email, password_hash: password },
      { raw: true },
    );
    if (createUser) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export default userRegistrationService;
