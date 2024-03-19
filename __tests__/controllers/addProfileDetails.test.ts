import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as addProfileDetailsModule from '../../src/services/profile/addProfileDetailsService';
import addProfileDetailsController from '../../src/controllers/profileControllers/addProfileDetailsController';

const jsonSpy = sinon.spy();

const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};

describe('Add Profile Details Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('User Not Found', async () => {
    const req: Partial<Request> = {
      body: { user_id: '123' },
    };

    const addProfileDetailsStub = sinon.stub().resolves({
      status: false,
      message: 'User Not Found',
      data: {},
    });

    sinon.replace(addProfileDetailsModule, 'default', addProfileDetailsStub);

    await addProfileDetailsController(req as Request, res as Response);

    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'User Not Found',
      data: {},
    });
  });

  it('Failed To Update Details', async () => {
    const req: Partial<Request> = {
      body: {},
    };

    const addProfileDetailsStub = sinon.stub().resolves({
      status: false,
      message: 'Failed To Update Details',
      data: {},
    });

    sinon.replace(addProfileDetailsModule, 'default', addProfileDetailsStub);

    await addProfileDetailsController(req as Request, res as Response);

    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Failed To Update Details',
      data: {},
    });
  });

  it('Successful Update', async () => {
    const req: Partial<Request> = {
      body: {
        user_id: '1234',
        profileDetails: {
          phone: '1234567890',
          job_title: 'Software Engineer',
          company_name: 'Company',
        },
      },
    };

    const addProfileDetailsStub = sinon.stub().resolves({
      status: true,
      message: 'Details Updated Successfully!',
      data: {},
    });

    sinon.replace(addProfileDetailsModule, 'default', addProfileDetailsStub);

    await addProfileDetailsController(req as Request, res as Response);

    sinon.assert.calledWith(jsonSpy, {
      status: true,
      message: 'Details Updated Successfully!',
      data: {},
    });
  });
});
