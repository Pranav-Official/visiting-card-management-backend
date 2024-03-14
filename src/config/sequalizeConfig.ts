import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { HOST, DATABASE, USER, PASSWORD } = process.env;

if (!HOST || !DATABASE || !USER || !PASSWORD) {
  throw new Error(
    'Please provide values for HOST, DATABASE, USER, PASSWORD, and PORT in the .env file.',
  );
}

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: HOST,
  database: DATABASE,
  username: USER,
  password: PASSWORD,

  // port: parseInt(PORT),
  // This is only for online DB's
  //   dialectOptions: {
  //     ssl: {
  //       require: true,
  //       rejectUnauthorized: true,
  //       ca: CA,
  //     },
  //   },
});

export default sequelize;
