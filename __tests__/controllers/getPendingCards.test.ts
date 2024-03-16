import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as getPendingCardsModule from '../../src/services/cardServices/getPendingCardService';
import getPendingCardsController from '../../src/controllers/cardControllers/getPendingCardsController';

const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('getPendingCards Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Pending cards not present', async () => {
    const req: Partial<Request> = {
      query: {
        user_id: '891f8cd0-c369-452e-b514-583d86cb0d0c',
      },
    };

    const getPendingCardsStub = sinon.stub().resolves({
      status: true,
      message: 'No pending cards found',
      data: [],
    });

    sinon.replace(getPendingCardsModule, 'default', getPendingCardsStub);
    const getPendingCardsSpy = sinon.spy(getPendingCardsController);

    await getPendingCardsSpy(req as Request, res as Response);

    sinon.assert.called(getPendingCardsStub);
    sinon.assert.calledWith(jsonSpy, {
      status: true,
      message: 'No pending cards found',
      data: [],
    });
  });

  it('Pending cards present', async () => {
    const req: Partial<Request> = {
      query: {
        user_id: '891f8cd0-c369-452e-b514-583d86cb0d0c',
      },
    };
  
    const getPendingCardsStub = sinon.stub().resolves({
      status: true,
      message: 'Pending cards found',
      data: [],
    });
  
    sinon.replace(getPendingCardsModule, 'default', getPendingCardsStub);
    const getPendingCardsSpy = sinon.spy(getPendingCardsController);

    await getPendingCardsSpy(req as Request, res as Response);

    sinon.assert.called(getPendingCardsSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: true,
      message: 'Pending cards found',
      data: [],
    });
  });
});
