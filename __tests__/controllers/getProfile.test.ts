import { Request, Response } from 'express';
import * as sinon from 'sinon';
import getProfileController from '../../src/controllers/profileControllers/getProfileController';
import * as getProfileModule from '../../src/services/profile/getProfileService';

const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('getProfileController', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Required parameters are missing', async () => {
    const req: Partial<Request> = {
      query: {},
    };

    const getProfileSpy = sinon.spy(getProfileController);
    await getProfileSpy(req as Request, res as Response);
    sinon.assert.called(getProfileSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Please provide all the necessary credentials',
      data: {},
    });
  });

  it('if profile details are not found', async () => {
    const user_id = '4f0e2a3b-8929-41fe-a60e-3914f8ba';
    const req: Partial<Request> = {
      query: {
        user_id,
      },
    };

    const getProfileSpy = sinon.spy(getProfileController);
    const getProfileServiceStub = sinon.stub().resolves({
      status: false,
      message: 'Profile details not found',
      data: {},
    });
    sinon.replace(getProfileModule, 'default', getProfileServiceStub);
    await getProfileSpy(req as Request, res as Response);
    sinon.assert.called(getProfileSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Profile details not found',
      data: {},
    });
  });

  it('if profile details found', async () => {
    const user_id = '4f0e2a3b-8929-41fe-a60e-3914f8ba4bd1';
    const req: Partial<Request> = {
      query: {
        user_id,
      },
    };

    const getProfileSpy = sinon.spy(getProfileController);
    const getProfileServiceStub = sinon.stub().resolves({
      status: true,
      message: 'Profile details found',
      data: {},
    });
    sinon.replace(getProfileModule, 'default', getProfileServiceStub);
    await getProfileSpy(req as Request, res as Response);
    sinon.assert.called(getProfileSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: true,
      message: 'Profile details found',
      data: {},
    });
  });
});
