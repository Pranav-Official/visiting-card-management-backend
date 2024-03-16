import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as getCardDetailsModule from '../../src/services/cardServices/getCardDetailsService';
import getCardDetailsController from '../../src/controllers/cardControllers/getCardDetails';
import { error } from 'console';
const jsonSpy = sinon.spy();

const res: Partial<Response> = {
    status: sinon.stub().returnsThis(),
    json:jsonSpy,
};

describe('get card details controller',() =>{
    afterEach(() => {
        sinon.restore();
    });

    it('if card id is missing', async () => {
        const req: Partial<Request> = {
            query : {}
        };
        const createNewUserSpy = sinon.spy(getCardDetailsController);
        await createNewUserSpy(req as Request, res as Response);
        sinon.assert.called(createNewUserSpy);
        sinon.assert.calledWith(jsonSpy, {
          status: false,
          message: 'card id not given',
          data: {},
        });
    });

    it('if card id is given and returned with',async() =>{
        const req: Partial<Request> = {
            query : {card_id:'3cc20bdd-ac16-487a-9e90-cfeaf6862fbf'}
        };
        
    const createNewUserSpy = sinon.spy(getCardDetailsController);
    const createNewUserServiceStub = sinon.stub().resolves({
      status:false,
      message:'List not found',
      data:{error},
    })
    sinon.replace(getCardDetailsModule, 'default', createNewUserServiceStub);
    await createNewUserSpy(req as Request, res as Response);
    sinon.assert.called(createNewUserSpy);
    sinon.assert.calledWithMatch(jsonSpy, {
      status: false,
      message: 'List not found',
    });
    })


})
