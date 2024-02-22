import UserTable from '../../models/userTable';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

//User Registration Service
const userLoginService = async (user_email, password) => {
  //To Check if a user with same Email ID Exists
  try {
    const existingUser = await UserTable.findOne({
      where: { user_email: user_email },
      raw: true,
    });

    if (
      existingUser &&
      bcrypt.compareSync(password, existingUser.password_hash)
    ) {
      const token = jwt.sign(
        {
          user_id: existingUser.user_id,
        },
        process.env.JWT_SECRET_KEY || '',
        {
          expiresIn: '2w',
        },
      );
      return {
        status: true,
        token: token,
      };
    } else {
      return {
        status: false,
        message: 'Invalid credentials',
      };
    }
  } catch (error) {
    return {
      status: false,
      message: error.message,
    };
  }
};

export default userLoginService;
