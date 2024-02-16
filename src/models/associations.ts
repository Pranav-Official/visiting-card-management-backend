import Cards from './cards';
import SharedCards from './sharedCards';
import UserTable from './userTable';

const associations = (): void => {
  UserTable.hasMany(Cards, {
    foreignKey: 'user_id',
    sourceKey: 'user_id',
  });

  Cards.belongsTo(UserTable, {
    foreignKey: 'user_id',
    targetKey: 'user_id',
  });

  Cards.hasMany(Cards, {
    foreignKey: 'parent_card_id',
    sourceKey: 'card_id',
  });

  Cards.belongsTo(Cards, {
    foreignKey: 'parent_card_id',
    targetKey: 'card_id',
  });

  UserTable.hasMany(SharedCards, {
    foreignKey: 'user_id',
    sourceKey: 'user_id',
  });
  SharedCards.belongsTo(UserTable, {
    foreignKey: 'user_id',
    targetKey: 'user_id',
  });

  Cards.hasMany(SharedCards, {
    foreignKey: 'card_id',
    sourceKey: 'card_id',
  });
  SharedCards.belongsTo(Cards, {
    foreignKey: 'card_id',
    targetKey: 'card_id',
  });
};

export default associations;
