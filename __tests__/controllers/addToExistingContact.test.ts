// import { Request, Response } from 'express';
// import * as sinon from 'sinon';
// import * as addToExistingContactServiceModule from '../../src/services/cardServices/addToExistingContactService';
// import addToExistingContactController from '../../src/controllers/cardControllers/addToExistingCardController';
// const req: Partial<Request> = {
//   body: {},
// };

// const jsonSpy = sinon.spy();
// const res: Partial<Response> = {
//   status: sinon.stub().returnsThis(),
//   json: jsonSpy,
// };
// describe('add to existing card controller', () => {
//   afterEach(() => {
//     sinon.restore();
//   });

//   it('parent card id not found error', async () => {
//     const addToExtstingContactSpy = sinon.spy(addToExistingContactController);
//     const addToExistingContactServiceStub = sinon.stub().resolves({
//       status: false,
//       message: 'Parent Card Id Not Received',
//       data: {},
//     });
//     sinon.replace(
//       addToExistingContactServiceModule,
//       'default',
//       addToExistingContactServiceStub,
//     );
//     await addToExtstingContactSpy(req as Request, res as Response);
//     sinon.assert.called(addToExtstingContactSpy);
//     sinon.assert.calledWith(jsonSpy, {
//       status: false,
//       message: 'Parent Card Id Not Received',
//       data: {},
//     });
//   });

//   it('missing required fields error', async () => {
//     const addToExtstingContactSpy = sinon.spy(addToExistingContactController);
//     const createNewCardServiceStub = sinon
//       .stub()
//       .resolves({ status: false, message: 'Card creation failed', data: {} });
//     sinon.replace(
//       addToExistingContactServiceModule,
//       'default',
//       createNewCardServiceStub,
//     );
//     await addToExtstingContactSpy(req as Request, res as Response);
//     sinon.assert.called(addToExtstingContactSpy);
//     sinon.assert.calledWith(jsonSpy, {
//       status: false,
//       message: 'Card creation failed',
//       data: {},
//     });
//   });

//   it('Successful card creation', async () => {
//     const responseMock = {
//       status: true,
//       message: 'Successfull',
//       data: {
//         cardId: '',
//       },
//     };
//     const createNewCardSpy = sinon.spy(createNewCardController);
//     const createNewCardServiceStub = sinon.stub().resolves(responseMock);
//     sinon.replace(
//       createNewCardServiceModule,
//       'default',
//       createNewCardServiceStub,
//     );
//     await createNewCardSpy(req as Request, res as Response);
//     sinon.assert.called(createNewCardSpy);
//     sinon.assert.calledWith(jsonSpy, responseMock);
//   });
// });
