import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as addToExistingContactModule from '../../src/services/cardServices/addToExistingContactService';
import addToExistingContactController from '../../src/controllers/cardControllers/addToExistingCardController';

const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('add to existing card controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Parent Card Id Missing', async () => {
    const req: Partial<Request> = {
      body: {},
    };

    await addToExistingContactController(req as Request, res as Response);

    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Parent Card Id Not Received',
      data: {},
    });
  });

  it('Failed to update card details', async () => {
    const req: Partial<Request> = {
      body: {
        user_id: '1234',
        shared_card_id: '23456',
        parent_card_id: '234567890',
      },
    };

    const addToExistingContactServiceStub = sinon.stub().resolves({
      status: false,
      message: 'Failed To Add Card',
      data: {},
    });

    sinon.replace(
      addToExistingContactModule,
      'default',
      addToExistingContactServiceStub,
    );

    await addToExistingContactController(req as Request, res as Response);

    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Failed To Add Card',
      data: {},
    });
  });

  it('Parent Card Found and Card Added Successfully', async () => {
    const req: Partial<Request> = {
      body: {
        user_id: '1234',
        shared_card_id: '23456',
        parent_card_id: 'existing_parent_card_id',
        cardData: {},
      },
    };

    const addToExistingContactServiceStub = sinon.stub().resolves({
      status: true,
      message: 'Card Added Successfully!',
      data: {
        cardId: 'card001',
      },
    });

    sinon.replace(
      addToExistingContactModule,
      'default',
      addToExistingContactServiceStub,
    );

    await addToExistingContactController(req as Request, res as Response);

    sinon.assert.calledWith(jsonSpy, {
      status: true,
      message: 'Card Added Successfully!',
      data: {
        cardId: 'card001',
      },
    });
  });
});
