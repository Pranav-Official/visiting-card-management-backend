import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as shareCardModule from '../../src/services/cardServices/shareCardService';
import shareCardController from '../../src/controllers/cardControllers/shareCardController';

const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('shareCard Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Card Id Missing', async () => {
    const req: Partial<Request> = {
      body: {},
    };

    const shareCardControllerSpy = sinon.spy(shareCardController);
    await shareCardControllerSpy(req as Request, res as Response);
    sinon.assert.called(shareCardControllerSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Card ID not found in request body',
      data: {},
    });
  });

  it('Receiver user Ids missing', async () => {
    const req: Partial<Request> = {
      body: {
        card_id: '0c07871d-c9ac-49bb-8a87-5167f18d24a2',
      },
    };

    const shareCardControllerSpy = sinon.spy(shareCardController);
    await shareCardControllerSpy(req as Request, res as Response);
    sinon.assert.called(shareCardControllerSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Receiver User IDs must be provided as an array',
      data: {},
    });
  });
  it('Receiver user Ids empty', async () => {
    const req: Partial<Request> = {
      body: {
        card_id: '0c07871d-c9ac-49bb-8a87-5167f18d24a2',
        receiver_user_ids: [
          '04cc23e4-4a74-4765-9565-52c61e386878',
          '08124c0b-0ab3-4702-9d08-a0dc42a51ed8',
        ],
      },
    };
    const shareCardControllerSpy = sinon.spy(shareCardController);
    const shareCardServiceStub = sinon
      .stub()
      .resolves({
        status: true,
        message: `Card sent to user IDs:[${'04cc23e4-4a74-4765-9565-52c61e386878'},${'08124c0b-0ab3-4702-9d08-a0dc42a51ed8'}]`,
        data: {
          sentUserIds: [
            '04cc23e4-4a74-4765-9565-52c61e386878',
            '08124c0b-0ab3-4702-9d08-a0dc42a51ed8',
          ],
        },
      });
    sinon.replace(shareCardModule, 'default', shareCardServiceStub);
    await shareCardControllerSpy(req as Request, res as Response);
    sinon.assert.called(shareCardControllerSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: true,
      message: `Card sent to user IDs:[${'04cc23e4-4a74-4765-9565-52c61e386878'},${'08124c0b-0ab3-4702-9d08-a0dc42a51ed8'}]`,
      data: {
        sentUserIds: [
          '04cc23e4-4a74-4765-9565-52c61e386878',
          '08124c0b-0ab3-4702-9d08-a0dc42a51ed8',
        ],
      },
    });
  });
});
