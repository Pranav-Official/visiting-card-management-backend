import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as addSharedCardToExistingContactModule from '../../src/services/cardServices/addSharedCardToExistingContactService';
import addSharedCardToExistingContactController from '../../src/controllers/cardControllers/addSharedCardToExistingContactController';

const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('addSharedCardToExistingContact Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Neccessary details Missing', async () => {
    const req: Partial<Request> = {
      body: {},
    };

    await addSharedCardToExistingContactController(req as Request, res as Response);

    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Necessary Details Not Found!!!',
      data: {},
    });
  });

  it('Failed to update card details', async () => {
    const req: Partial<Request> = {
      body: {user_id: '1234',
        shared_card_id: '23456',
        parent_card_id: '234567890',},
    };

    const addSharedCardToExistingContactServiceStub = sinon.stub().resolves({
      status: false,
      message: 'Failed To Update Card Details!',
      data: {},
    });

    sinon.replace(
      addSharedCardToExistingContactModule,
      'default',
      addSharedCardToExistingContactServiceStub
    );

    await addSharedCardToExistingContactController(req as Request, res as Response);

    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Failed To Update Card Details!',
      data: {},
    });
  });
});
