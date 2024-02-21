import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/sequalizeConfig';
import UserTable from '../types/modelTypes/userTable';
import bcrypt from 'bcrypt';
// Import the Sequelize instance

UserTable.init(
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_fullname: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    user_email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    modifiedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'UserTable',
    tableName: 'UserTable',
    timestamps: false,
    hooks: {
      beforeCreate: async (user: UserTable) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(
          user.dataValues.password_hash,
          salt,
        );
        user.dataValues.password_hash = hashedPassword;
      },
    },
  },
);

export default UserTable;
