import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as getAcceptedCardsService from './../../src/services/cardServices/getAcceptedCardsService';
import getAcceptedCards from '../../src/controllers/cardControllers/getAcceptedCards';

const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('acceptCards Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Successful accepted cards retrieval', async () => {
    const req: Partial<Request> = {
      query: {
        user_id: '891f8cd0-c369-452e-b514-583d86cb0d0c',
      },
    };
    const responseMock = {
      status: true,
      message: 'Accepted cards retrieved successfully',
      data: [],
    };

    const getAcceptedCardsControllerSpy = sinon.spy(getAcceptedCards);
    const getAcceptedCardsServiceMock = sinon.stub().resolves(responseMock);
    sinon.replace(
      getAcceptedCardsService,
      'default',
      getAcceptedCardsServiceMock,
    );
    await getAcceptedCardsControllerSpy(req as Request, res as Response);
    sinon.assert.called(getAcceptedCardsControllerSpy);
    sinon.assert.calledWith(jsonSpy, responseMock);
  });

  it('No user ID provided', async () => {
    const req: Partial<Request> = {
      query: {},
    };
    const responseMock = {
      status: false,
      message: 'Unable to fetch card details',
      data: [],
    };

    const getAcceptedCardsControllerSpy = sinon.spy(getAcceptedCards);
    const getAcceptedCardsServiceMock = sinon.stub().resolves(responseMock);
    sinon.replace(
      getAcceptedCardsService,
      'default',
      getAcceptedCardsServiceMock,
    );
    await getAcceptedCardsControllerSpy(req as Request, res as Response);
    sinon.assert.called(getAcceptedCardsControllerSpy);
    sinon.assert.calledWith(jsonSpy, responseMock);
  });
});
