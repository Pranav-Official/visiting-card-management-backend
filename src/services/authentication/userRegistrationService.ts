
import UserTable from '../../models/userTable';

const userRegistrationService = async (user_fullname, user_email, password): Promise<boolean> => {
  const existingUser = await UserTable.findOne({
    where: { user_email: user_email },
    raw: true,
  });

  if (existingUser != null) {
    return false;
  }

  try {
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
