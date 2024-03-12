import Cards from '../../src/models/cards';
import createNewCardService from '../../src/services/cardServices/createNewCardService';
import * as sinon from 'sinon';

describe('createNewCardService', () => {
  afterEach(() => {
    sinon.reset();
  });

  const cards: Partial<Cards> = {
    card_name: 'shreya',
    img_front_link: 'www',
    img_back_link: 'www.com',
    job_title: 'trainer',
    email: 's@A.com',
    phone: '000000',
    company_name: 'experion',
    company_website: 'experion.com',
    contact_name: 'shreya',
    user_id: '22086d22-b149-4739-b176-ef370eca802e',
  };

  it('Testing Card creation', async () => {
    const createNewCardServiceSpy = sinon.spy(createNewCardService);
    const result = await createNewCardServiceSpy(cards as Cards);
    sinon.assert.calledWith(createNewCardServiceSpy, cards);
    sinon.assert.match(result.status, true);
  });
});
