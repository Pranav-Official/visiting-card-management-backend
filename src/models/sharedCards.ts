import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequalizeConfig';
import SharedCards from '../types/modelTypes/sharedCards';

// Import the Sequelize instance

SharedCards.init(
  {
    shared_card_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    card_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: 'pending',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
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
    modelName: 'SharedCard',
    tableName: 'SharedCard',
    timestamps: false,
  },
);

export default SharedCards;
