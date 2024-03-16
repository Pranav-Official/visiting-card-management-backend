
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as getContactListModule from '../../src/services/cardServices/getContactListService';
import getContactListController from '../../src/controllers/cardControllers/getContactList';
import { error } from 'console';
const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('get contact list controller', () => {
  afterEach(() => {
    sinon.restore();
  }); 

  it('if user id is missing', async () => {
    const req: Partial<Request> = {
      query: {},
    };

    const createNewUserSpy = sinon.spy(getContactListController);
    await createNewUserSpy(req as Request, res as Response);
    sinon.assert.called(createNewUserSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'user_id not entered',
      data: {},
    });
  });

  it('if user id given and contact list is returned', async () => {
    const req: Partial<Request> = {
      query: { user_id: 'e3dba47f-1f82-4c23-bb9d-213a6062333' },
    };

    const createNewUserSpy = sinon.spy(getContactListController);
    const createNewUserServiceStub = sinon.stub().resolves({
      status:false,
      message:'List not found',
      data:{error},
    })
    sinon.replace(getContactListModule, 'default', createNewUserServiceStub);
    await createNewUserSpy(req as Request, res as Response);
    sinon.assert.called(createNewUserSpy);
    sinon.assert.calledWithMatch(jsonSpy, {
      status: false,
      message: 'List not found',
    });
  });
});
