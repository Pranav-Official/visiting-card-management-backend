import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as getCardListModule from '../../src/services/cardServices/getCardListService';
import getCardlistController from '../../src/controllers/cardControllers/getCardListController';

const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('getCardList Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Card ID Missing', async () => {
    const req: Partial<Request> = {
      query: {},
    };

    const getCardListControllerSpy = sinon.spy(getCardlistController);
    await getCardListControllerSpy(req as Request, res as Response);
    sinon.assert.called(getCardListControllerSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Card ID not found in request body',
      data: {},
    });
  });

  it('Duplicate User error', async () => {
    const req: Partial<Request> = {
      query: {
        card_id: '0c07871d-c9ac-49bb-8a87-5167f18d24a2',
        //user_id:"ccccbc21-4726-48fa-9769-03b61cac5d65"
      },
    };

    const getCardListControllerSpy = sinon.spy(getCardlistController);
    const getCardListServiceStub = sinon.stub().resolves({
      status: true,
      message: 'Card List found with given card id',
      data: {},
    });
    sinon.replace(getCardListModule, 'default', getCardListServiceStub);
    await getCardListControllerSpy(req as Request, res as Response);
    sinon.assert.called(getCardListControllerSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: true,
      message: 'Card List found with given card id',
      data: {},
    });
  });
});
