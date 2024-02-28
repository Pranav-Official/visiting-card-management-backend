import UserTable from '../../models/userTable';
import bcrypt from 'bcrypt';
// Function to change password
const changePasswordService = async (email: string, new_password: string) => {
  try {
    // Finding user details
    const user = await UserTable.findOne({
      where: {
        user_email: email,
      },
      raw: true,
    });
    // Check if the user exists
    if (!user) {
      return {
        status: false,
        message: 'User not found!',
      };
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);

    // Updating the password in UserTable
    await UserTable.update(
      { password_hash: hashedPassword },
      {
        where: {
          user_email: email,
        },
      },
    );
    return {
      user_email: email,
      message: 'Password changed successfully',
      status: true,
    };
  } catch (error) {
    console.error(error);
    return { status: false, data: error, message: error.message };
  }
};

export default changePasswordService;
