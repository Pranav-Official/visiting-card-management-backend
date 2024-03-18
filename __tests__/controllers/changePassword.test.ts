import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as changePasswordServiceModule from '../../src/services/authentication/changePasswordService';
import changePasswordController from '../../src/controllers/authentication/changePasswordController';
const req: Partial<Request> = {
  body: {},
};

const jsonSpy = sinon.spy();
const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};
describe('change password controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Required parameters missing', async () => {
    const changePasswordSpy = sinon.spy(changePasswordController);
    const changePasswordServiceStub = sinon.stub().resolves({
      status: false,
      message: 'Please provide all the necessary credentials',
      data: {},
    });
    sinon.replace(
      changePasswordServiceModule,
      'default',
      changePasswordServiceStub,
    );
    await changePasswordSpy(req as Request, res as Response);
    sinon.assert.called(changePasswordSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Please provide all the necessary credentials',
      data: {},
    });
  });

  it('Required parameters provided', async () => {
    const req: Partial<Request> = {
      body: {
        email: 'anly@gmail.com',
        new_password: 'Anly#123',
      },
    };

    const responseMock = {
      user_email: 'anly@gmail.com',
      message: 'Password changed successfully',
      status: true,
    };
    const changePasswordSpy = sinon.spy(changePasswordController);
    const changePasswordServiceStub = sinon.stub().resolves(responseMock);
    sinon.replace(
      changePasswordServiceModule,
      'default',
      changePasswordServiceStub,
    );
    await changePasswordSpy(req as Request, res as Response);
    sinon.assert.called(changePasswordSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: true,
      message: 'Password changed successfully',
      data: undefined,
    });
  });
});
