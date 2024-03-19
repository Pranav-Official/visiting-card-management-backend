import { Request, Response } from 'express';
import * as sinon from 'sinon';
import * as getSearchListModule from '../../src/services/cardServices/getSearchableListService';
import getSearchListController from '../../src/controllers/cardControllers/getSearchableList';
const jsonSpy = sinon.spy();

const res:Partial<Response> = {
    status:sinon.stub().returnsThis(),
    json:jsonSpy,
};

describe('get search list controller', () =>{
    afterEach(() => {
        sinon.restore();
    });

    it('if user id is missing',async () =>{
        const req:Partial<Request> = {
            query:{}
        };

        const createNewUserSpy = sinon.spy(getSearchListController);
        await createNewUserSpy(req as Request, res as Response);
        sinon.assert.called(createNewUserSpy);
        sinon.assert.calledWith(jsonSpy, {
          status: false,
          message: 'user_id is missing',
          data: {},
        });
    });

    it('if user id is given',async () =>{
        const req:Partial<Request> = {
            query:{user_id:'7a16a0b0-2a1d-4665-a58f-68ebbb432f4c'}
        };

        const createNewUserSpy = sinon.spy(getSearchListController);
        const createNewUserServiceStub = sinon.stub().resolves({
          status:true,
          message:'Searchable list retrieved successfully',
        })
        sinon.replace(getSearchListModule, 'default', createNewUserServiceStub);
        await createNewUserSpy(req as Request, res as Response);
        sinon.assert.called(createNewUserSpy);
        sinon.assert.calledWithMatch(jsonSpy, {
          status: true,
          message: 'Searchable list retrieved successfully',
        });
        })
    });
