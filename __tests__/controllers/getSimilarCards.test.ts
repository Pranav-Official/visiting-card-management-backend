import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as getSimilarCardModule from '../../src/services/cardServices/getSimilarCardsService';
import getSimilarCardController from '../../src/controllers/cardControllers/getSimilarCardController';

const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('getSimilarCard Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Required Parameters Missing', async () => {
    const req: Partial<Request> = {
      query: {},
    };

    const getSimilarCardSpy = sinon.spy(getSimilarCardController);
    await getSimilarCardSpy(req as Request, res as Response);
    sinon.assert.called(getSimilarCardSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Please provide all the necessary credentials',
      data: {},
    });
  });

  it('Get similar Cards if similar cards exist', async () => {
    const req: Partial<Request> = {
      query: {
        user_id: '4f0e2a3b-8929-41fe-a60e-3914f8ba4bd1',
        card_name: 'Rose Mathew',
        phone: '9325678989',
        email: 'r@gmail.com',
      },
    };

    const getSimilarCardSpy = sinon.spy(getSimilarCardController);
    const getSimilarCardServiceStub = sinon.stub().resolves({
      status: true,
      message: 'Similar cards found',
      data: {},
    });
    sinon.replace(getSimilarCardModule, 'default', getSimilarCardServiceStub);
    await getSimilarCardSpy(req as Request, res as Response);
    sinon.assert.called(getSimilarCardSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: true,
      message: 'Similar cards found',
      data: {},
    });
  });

  it('No similar cards found', async () => {
    const req: Partial<Request> = {
      query: {
        user_id: '4f0e2a3b-8929-41fe-a60e-3914f8ba4bd1',
        card_name: 'Rose',
        phone: '9325678989',
        email: 'rose@gmail.com',
      },
    };

    const getSimilarCardSpy = sinon.spy(getSimilarCardController);
    const getSimilarCardServiceStub = sinon.stub().resolves({
      status: false,
      message: 'No similar cards found',
      data: {},
    });
    sinon.replace(getSimilarCardModule, 'default', getSimilarCardServiceStub);
    await getSimilarCardSpy(req as Request, res as Response);
    sinon.assert.called(getSimilarCardSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'No similar cards found',
      data: {},
    });
  });
});
