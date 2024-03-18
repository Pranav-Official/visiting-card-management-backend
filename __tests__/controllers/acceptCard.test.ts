import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as acceptCardsModule from '../../src/services/cardServices/acceptCardService';
import acceptCardsController from '../../src/controllers/cardControllers/acceptCard';
import { error } from 'console';

const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('acceptCards Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Required fields missing', async () => {
    const req: Partial<Request> = {
      body: {},
    };

    const acceptCardsServiceStub = sinon
      .stub(acceptCardsModule, 'default')
      .resolves({
        status: false,
        message: 'Missing required parameters',
        data: error,
      });

    await acceptCardsController(req as Request, res as Response);

    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Missing required parameters',
      data: error,
    });

    acceptCardsServiceStub.restore(); // Restore the stub after the test
  });

  it('Accepts cards successfully', async () => {
    const req: Partial<Request> = {
      body: {
        card_id: '172b7b4b-22b2-4132-b92b-7ccc5c30c6bb',
        user_id: 'd5a24142-f851-49b0-9d6a-681e35a387b4',
        contact_name: 'Devapriya',
      },
    };

    const acceptCardsServiceStub = sinon
      .stub(acceptCardsModule, 'default')
      .resolves({
        status: true,
        message: 'Shared card accepted successfully',
        data: [],
      });

    await acceptCardsController(req as Request, res as Response);

    sinon.assert.calledWith(jsonSpy, {
      status: true,
      message: 'Shared card accepted successfully',
      data: [],
    });

    acceptCardsServiceStub.restore(); // Restore the stub after the test
  });

  it('Does not accept cards', async () => {
    const req: Partial<Request> = {
      body: {
        card_id: '172b7b4b-22b2-4132-b92b-7ccc5c30c6bb',
        user_id: 'd5a24142-f851-49b0-9d6a-681e35a387b4',
        contact_name: 'Devapriya',
      },
    };

    const acceptCardsServiceStub = sinon
      .stub(acceptCardsModule, 'default')
      .resolves({
        status: false,
        message: 'Error in accepting shared card',
        data: {},
      });

    await acceptCardsController(req as Request, res as Response);

    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Error in accepting shared card',
      data: {},
    });

    acceptCardsServiceStub.restore(); // Restore the stub after the test
  });
});
