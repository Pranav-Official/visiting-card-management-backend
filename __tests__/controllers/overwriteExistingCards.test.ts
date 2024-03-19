import { Request, Response } from 'express';
import * as sinon from 'sinon';
import overWriteCardController from '../../src/controllers/cardControllers/overWriteExistingCard';

const jsonSpy = sinon.spy();
const res: Partial<Response> = {
  status: sinon.stub().returnsThis(),
  json: jsonSpy,
};
describe('edit card controller', () => {
  afterEach(() => {
    sinon.restore();
  });
  const req: Partial<Request> = {
    body: {},
  };

  it('missing required fields error', async () => {
    const editCardSpy = sinon.spy(overWriteCardController);
    await editCardSpy(req as Request, res as Response);
    sinon.assert.called(editCardSpy);
    sinon.assert.calledWith(jsonSpy, {
      status: false,
      message: 'Not all necessary parameters passed',
      data: {},
    });
  });
});
