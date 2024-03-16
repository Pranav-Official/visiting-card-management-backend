import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as deleteCardModule from '../../src/services/cardServices/deleteCardService';
import deleteCardController from '../../src/controllers/cardControllers/deleteCardController';

const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('deleteCard Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('CardId Missing', async () => {
    const req: Partial<Request> = {
      body: {},
    };

    const deleteCardControllerSpy = sinon.spy(deleteCardController);
    await deleteCardControllerSpy(req as Request, res as Response);
    sinon.assert.called(deleteCardControllerSpy);
    sinon.assert.calledWith(jsonSpy, 
        {
        status:false,
        message:'Card ID not found in request body',
        data:{}});
  });

 
  it('Delete Card Response', async () => {
    const req: Partial<Request> = {
      body: {
        card_id: 
        '0c07871d-c9ac-49bb-8a87-5167f18d24a2',
        },
    };
    const deleteCardControllerSpy = sinon.spy(deleteCardController);
    const getUserListServiceStub = sinon
      .stub()
      .resolves({
        status:true,
        message:"Card deleted successfully",
        data:{}});
    sinon.replace(deleteCardModule, 'default', getUserListServiceStub);
    await deleteCardControllerSpy(req as Request, res as Response);
    sinon.assert.called(deleteCardControllerSpy);
    sinon.assert.calledWith(jsonSpy,
         {status:true,
            message:"Card deleted successfully",
            data:{}});
  });
});
