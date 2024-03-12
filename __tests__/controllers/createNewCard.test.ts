import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as createNewCardServiceModule from '../../src/services/cardServices/createNewCardService';
import createNewCardController from '../../src/controllers/cardControllers/createNewCard';
const req: Partial<Request> = {
  body: {},
};

const jsonSpy = sinon.spy();
const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};
describe('create new card controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('missing required fields error', async () => {
    const createNewCardSpy = sinon.spy(createNewCardController);
    const createNewCardServiceStub = sinon.stub().resolves(undefined);
    sinon.replace(
      createNewCardServiceModule,
      'default',
      createNewCardServiceStub,
    );
    await createNewCardSpy(req as Request, res as Response);
    sinon.assert.called(createNewCardSpy);
    sinon.assert.calledWith(jsonSpy, {
      error: 'Missing required fields or internal error',
    });
  });

  it('Successful card creation', async () => {
    const responseMock = {
      status: true,
      message: 'Successfull',
      data: {
        cardId: '',
      },
    };
    const createNewCardSpy = sinon.spy(createNewCardController);
    const createNewCardServiceStub = sinon.stub().resolves(responseMock);
    sinon.replace(
      createNewCardServiceModule,
      'default',
      createNewCardServiceStub,
    );
    await createNewCardSpy(req as Request, res as Response);
    sinon.assert.called(createNewCardSpy);
    sinon.assert.calledWith(jsonSpy, {
      message: 'New card creation is successful',
    });
  });
});
