import Cards from '../../models/cards';

export const editCardService = async (
  card_id: string,
  updatedCardDetails,
): Promise<number> => {
  const result = await Cards.update(updatedCardDetails, {
    where: { card_id },
  });

  //result will be no of rows updated,like [0],[1] so we return that value
  return result[0];
};
