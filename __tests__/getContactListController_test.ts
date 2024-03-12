import sinon, { SinonStub } from 'sinon';
import getContactListService from '../src/services/cardServices/getContactListService'; // Import the service function
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

// Import the controller function
import getContactListController from '../src/controllers/cardControllers/getContactList';

describe('Get Contact List Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let statusStub: SinonStub<any[], any>;
  let jsonStub: SinonStub<any[], any>;
  let getContactListServiceStub: SinonStub<any[], any>; // Corrected type

  beforeEach(() => {
    req = {};
    statusStub = sinon.stub();
    jsonStub = sinon.stub();
    res = { status: statusStub, json: jsonStub } as Partial<Response>;
    getContactListServiceStub = sinon.stub(getContactListService as any); // Cast to any to avoid type mismatch
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return contact list when user_id is provided', async () => {
    const contactList = [
      { contact_name: 'John Doe', card_id: '1' },
      { contact_name: 'Jane Doe', card_id: '2' },
    ];

    // Stub the getContactListService and resolve with data
    (getContactListServiceStub as any).resolves({ status: true, message: 'List found', data: contactList });

    req.query = { user_id: '123' };
    await getContactListController(req as Request, res as Response);

    sinon.assert.calledWith(statusStub, StatusCodes.OK);
    sinon.assert.calledWith(jsonStub, { status: true, message: 'List found', data: contactList });
  });

  // Add other test cases as needed
});









// // Import necessary modules and functions for testing
// import { expect } from 'chai';
// import sinon, { SinonSpy } from 'sinon';
// import { Request, Response } from 'express';
// import { StatusCodes } from 'http-status-codes';
// import getContactListService from '../src/services/cardServices/getCardListService';
// import getContactListController from '../src/controllers/cardControllers/getContactList';

// describe('getContactListController', () => {
//   let req: Partial<Request>;
//   let res: Partial<Response>;
//   let jsonSpy: SinonSpy;

//   beforeEach(() => {
//     // Initialize req and res objects for each test case
//     req = { query: { user_id: 'sample_user_id' } } as Partial<Request>;
//     jsonSpy = sinon.spy();
//     res = {
//       status: sinon.stub().returns({ json: jsonSpy }),
//     } as Partial<Response>;
//   });

//   afterEach(() => {
//     sinon.restore(); // Restore all spies after each test
//   });

//   it('should return contact list when user_id is provided', async () => {
//     const fakeContactList = [
//       { contact_name: 'John Doe', card_id: '123' },
//       { contact_name: 'Jane Smith', card_id: '456' },
//     ];
//     sinon.stub(getContactListService, 'default').resolves({
//       status: true,
//       message: 'List found',
//       data: fakeContactList,
//     });

//     // Call the controller function
//     await getContactListController(req as Request, res as Response);

//     // Verify the response
//     expect(res.status?.calledWith(StatusCodes.OK)).to.be.true;
//     expect(jsonSpy.calledOnce).to.be.true;
//     expect(jsonSpy.firstCall.args[0]).to.deep.equal({
//       status: true,
//       message: 'List found',
//       data: fakeContactList,
//     });
//   });

//   it('should return UNAUTHORIZED status when user_id is missing', async () => {
//     req.query = {}; // Simulate missing user_id

//     // Call the controller function
//     await getContactListController(req as Request, res as Response);

//     // Verify the response
//     expect(res.status?.calledWith(StatusCodes.UNAUTHORIZED)).to.be.true;
//     expect(jsonSpy.calledOnce).to.be.true;
//     expect(jsonSpy.firstCall.args[0]).to.deep.equal({
//       status: false,
//       message: 'user_id not entered',
//       data: {},
//     });
//   });

//   // Add more test cases as needed
// });

