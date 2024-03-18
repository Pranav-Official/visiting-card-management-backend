import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as getUserModule from '../../src/services/profile/getUsersList';
import getUserListController from '../../src/controllers/profileControllers/getUserListController';

const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('getUsersList Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('UserId Missing', async () => {
    const req: Partial<Request> = {
      query: {},
    };

    const getUserListControllerSpy = sinon.spy(getUserListController);
    await getUserListControllerSpy(req as Request, res as Response);
    sinon.assert.called(getUserListControllerSpy);
    sinon.assert.calledWith(jsonSpy, {
        status:false,
        message:' User ID not found in request body',
        data:{}});
  });

 
  it('Get users List Response', async () => {
    const req: Partial<Request> = {
      query: {
        user_id: 
          '04cc23e4-4a74-4765-9565-52c61e386878',
        },
    };
    const getUserListControllerSpy = sinon.spy(getUserListController);
    const getUserListServiceStub = sinon
      .stub()
      .resolves({
        status:true,
        message:"Users list found",
        data:{}});
    sinon.replace(getUserModule, 'default', getUserListServiceStub);
    await getUserListControllerSpy(req as Request, res as Response);
    sinon.assert.called(getUserListControllerSpy);
    sinon.assert.calledWith(jsonSpy, {
        status:true,
        message:"Users list found",
        data:{}});
  });
});
