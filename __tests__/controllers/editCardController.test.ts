import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as editCardServiceModule from '../../src/services/cardServices/editCardService';
import editCardController from '../../src/controllers/cardControllers/editCardDetails';

const jsonSpy = sinon.spy();
const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};
describe('edit card controller', () => {
  afterEach(() => {
    sinon.restore();
  });
  const req: Partial<Request> = {
    body: {},
  };

  it('missing required fields error', async () => {
    const editCardSpy = sinon.spy(editCardController);
    await editCardSpy(req as Request, res as Response);
    sinon.assert.called(editCardSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Card id is required, but not passed',
      data: {},
    });
  });

  it('Successful card editing', async () => {
    const req: Partial<Request> = {
      body: { card_id: 'abcd' },
    };
    const editCardSpy = sinon.spy(editCardController);
    const editCardServiceStub = sinon.stub().resolves(1);
    sinon.replace(
      editCardServiceModule,
      'editCardService',
      editCardServiceStub,
    );
    await editCardSpy(req as Request, res as Response);
    sinon.assert.called(editCardSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: true,
      message: 'card edit successfull',
      data: {},
    });
  });
});
