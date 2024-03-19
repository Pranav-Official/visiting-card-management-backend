import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as userLoginService from '../../src/services/authentication/userLoginService';
import userLoginController from '../../src/controllers/authentication/userLoginController';

const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('userLogin Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('If email and password is missing', async () => {
    const req: Partial<Request> = {
      body: {},
    };

    await userLoginController(req as Request, res as Response);

    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Please Enter All the Details',
      data: [],
    });
  });

  it('If email is not valid', async () => {
    const req: Partial<Request> = {
      body: {
        user_email: 'kpvipin.me',
        password: '12345678',
      },
    };

    const loginController = sinon.spy(userLoginController);
    await loginController(req as Request, res as Response);
    sinon.assert.called(loginController);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Please Enter a Valid Email',
      data: [],
    });

    // userLoginServiceStub.restore(); // Restore the stub after the test
  });

  it('Successful login', async () => {
    const req = {
      body: {
        user_email: 'kpvipin@pm.me',
        password: '12345678',
      },
    };
    const responseMock = {
      status: true,
      message: 'Login successful',
      data: {
        user_id: '',
        token: '',
      },
    };
    const loginControllerSpy = sinon.spy(userLoginController);
    const loginServiceMock = sinon.stub().resolves(responseMock);
    sinon.replace(userLoginService, 'default', loginServiceMock);
    await loginControllerSpy(req as Request, res as Response);
    sinon.assert.called(loginControllerSpy);
    sinon.assert.calledWith(jsonSpy, responseMock);
  });
});
