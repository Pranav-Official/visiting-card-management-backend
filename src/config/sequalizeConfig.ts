import { Dialect, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { HOST, DATABASE, USER, PASSWORD } = process.env;

if (!HOST || !DATABASE || !USER || !PASSWORD) {
  throw new Error(
    'Please provide values for HOST, DATABASE, USER, PASSWORD, and PORT in the .env file.',
  );
}
console.log('Current Env', process.env.NODE_ENV);
const prodConfig = {
  dialect: 'mysql' as Dialect,
  host: HOST,
  database: DATABASE,
  username: USER,
  password: PASSWORD,
  logging: process.env.NODE_ENV === 'test' ? false : console.log,
  // port: parseInt(PORT),
  // This is only for online DB's
  //   dialectOptions: {
  //     ssl: {
  //       require: true,
  //       rejectUnauthorized: true,
  //       ca: CA,
  //     },
  //   },
};

export const sequelize = new Sequelize(prodConfig);

export default sequelize;
