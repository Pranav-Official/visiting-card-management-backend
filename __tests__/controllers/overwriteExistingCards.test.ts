import { Request, Response } from 'express';
import * as sinon from 'sinon';
import overWriteCardController from '../../src/controllers/cardControllers/overWriteExistingCard';
import * as getCardDetailsServiceModule from '../../src/services/cardServices/getCardDetailsService';
const jsonSpy = sinon.spy();
const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};
describe('overwriteExistingCard controller', () => {
  afterEach(() => {
    sinon.restore();
  });
  const req: Partial<Request> = {
    body: {},
  };

  it('missing required fields error', async () => {
    const overWriteCardSpy = sinon.spy(overWriteCardController);
    await overWriteCardSpy(req as Request, res as Response);
    sinon.assert.called(overWriteCardSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Not all necessary parameters passed',
      data: {},
    });
  });

  it('wrong card id passed', async () => {
    const req: Partial<Request> = {
      body: { shared_card_id: 'shared_id', card_to_overWrite: 'card_id' },
    };
    const overWriteCardSpy = sinon.spy(overWriteCardController);
    const getCardDetailsServiceStub = sinon.stub().resolves({ status: false });
    sinon.replace(
      getCardDetailsServiceModule,
      'default',
      getCardDetailsServiceStub,
    );
    await overWriteCardSpy(req as Request, res as Response);
    sinon.assert.called(overWriteCardSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Card You Shared couldnt be found',
      data: {},
    });
  });

  it('Internal server Error on DB error', async () => {
    const req: Partial<Request> = {
      body: { shared_card_id: 'shared_id', card_to_overWrite: 'card_id' },
    };
    const overWriteCardSpy = sinon.spy(overWriteCardController);
    const getCardDetailsServiceStub = sinon
      .stub()
      .rejects(new Error('Test error'));
    sinon.replace(
      getCardDetailsServiceModule,
      'default',
      getCardDetailsServiceStub,
    );
    await overWriteCardSpy(req as Request, res as Response);
    sinon.assert.called(overWriteCardSpy);
    sinon.assert.calledWithMatch(jsonSpy, {
      status: false,
      message: 'Internal Server Error',
    });
  });
});
