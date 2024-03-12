import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as userRegistrationModule from '../../src/services/authentication/userRegistrationService';
import userResgistrationController from '../../src/controllers/authentication/userRegistrationController';

const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('userRegistration Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Required Parameters Missing', async () => {
    const req: Partial<Request> = {
      body: {},
    };

    const createNewUserSpy = sinon.spy(userResgistrationController);
    await createNewUserSpy(req as Request, res as Response);
    sinon.assert.called(createNewUserSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Please Enter All the Details',
      data: {},
    });
  });

  it('Invalid Email Passed', async () => {
    const req: Partial<Request> = {
      body: {
        user_fullname: 'VIPIN K P',
        user_email: 'kpvipin.me',
        password: '12345678',
      },
    };

    const createNewUserSpy = sinon.spy(userResgistrationController);
    await createNewUserSpy(req as Request, res as Response);
    sinon.assert.called(createNewUserSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Please Enter a Valid Email',
      data: {},
    });
  });

  it('Duplicate User error', async () => {
    const req: Partial<Request> = {
      body: {
        user_fullname: 'VIPIN K P',
        user_email: 'kpvipin@pm.me',
        password: '12345678',
      },
    };

    const createNewUserSpy = sinon.spy(userResgistrationController);
    const createNewUserServiceStub = sinon.stub().resolves({
      status: false,
      message: 'User with same Email Id exists, Please Login!',
      data: {},
    });
    sinon.replace(userRegistrationModule, 'default', createNewUserServiceStub);
    await createNewUserSpy(req as Request, res as Response);
    sinon.assert.called(createNewUserSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'User with same Email Id exists, Please Login!',
      data: {},
    });
  });
});
