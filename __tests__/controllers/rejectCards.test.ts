import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as rejectCardsServiceModule from '../../src/services/cardServices/rejectCardsService';
import rejectCardsController from '../../src/controllers/cardControllers/rejectCardsController';

const req: Partial<Request> = {
  body: {
    user_id: '4c338c2a-14de-47b2-9fb8-072077b86606',
    card_ids: [
      '2596b78e-bd9d-490e-8caf-713c57f9345d',
      'c1909a3b-6a0f-4117-aa6d-42ff4549720f',
    ],
  },
};

const jsonSpy = sinon.spy();
const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('rejectCardsController', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Valid card IDs provided', async () => {
    const rejectCardsSpy = sinon.spy(rejectCardsController);
    const rejectCardsServiceStub = sinon.stub().resolves({
      status: true,
      message: 'Cards rejected successfully',
      data: {},
    });
    sinon.replace(rejectCardsServiceModule, 'default', rejectCardsServiceStub);
    await rejectCardsSpy(req as Request, res as Response);
    sinon.assert.called(rejectCardsSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: true,
      message: 'Cards rejected successfully',
      data: {},
    });
  });

  it('Empty card IDs provided', async () => {
    const req: Partial<Request> = {
      body: {
        user_id: '4c338c2a-14de-47b2-9fb8-072077b86606',
        card_ids: [],
      },
    };

    const rejectCardsSpy = sinon.spy(rejectCardsController);
    await rejectCardsSpy(req as Request, res as Response);
    sinon.assert.called(rejectCardsSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Card IDs must be provided as a non-empty array',
      data: {},
    });
  });
});
