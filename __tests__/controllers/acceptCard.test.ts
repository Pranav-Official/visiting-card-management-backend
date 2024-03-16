import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as acceptCardsModule from '../../src/services/cardServices/acceptCardService';
import acceptCardsController from '../../src/controllers/cardControllers/acceptCard';

const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('acceptCards Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Accepts cards successfully', async () => {
    const req: Partial<Request> = {
      body: {
        card_id: '1626aeea-6355-40f8-a141-5a58d2dd420b',
        user_id: '891f8cd0-c369-452e-b514-583d86cb0d0c',
        contact_name: 'Jane Doe',
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
        card_id: '1626aeea-6355-40f8-a141-5a58d2dd420b',
        user_id: '891f8cd0-c369-452e-b514-583d86cb0d0c',
        contact_name: 'Jane Doe',
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
