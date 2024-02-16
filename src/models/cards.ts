import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequalizeConfig';
import Cards from '../types/modelTypes/cards';
// Import the Sequelize instance

Cards.init(
  {
    card_id: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    card_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    img_front_link: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    img_back_link: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    job_title: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    company_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    company_website: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    contatact_name: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    parent_card_id: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    shared_or_not: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    modifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'Cards',
    tableName: 'Cards',
    timestamps: false,
  },
);

export default Cards;
