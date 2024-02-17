import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  database: 'card_management',
  username: 'root',
  password: 'rosejohn@13',
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
