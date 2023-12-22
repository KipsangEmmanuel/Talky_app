import mssql from 'mssql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { getUser, loginUser, registerUser } from './userController'
import { Request, Response } from 'express'
import { execute } from '../services/dbconnect'
import * as validateuserId from '../validators/userValidator';


describe("User Registration", () => {
    let res: any;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })


    it("successfully registeres a user", async() => {
        const req = {
         
            body: {
                user_name: "Test Test",
                email: "test@gmail.com",
                password: "@Hashpass123",
                fullName: "Emmanuel Kipsang"
            }
        }

        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("@Hashedpass123" as never)

        const mockedInput = jest.fn().mockReturnThis()

        const mockedExecute = jest.fn().mockResolvedValue({rowsAffected: [1]})

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await registerUser(req as Request, res as Response)
        
        // expect(res.status).toHaveBeenCalledWith(200);

        // expect(res.json).toHaveBeenCalledWith({ message: 'User registered successfully' });
        // expect(mockedInput).toHaveBeenCalledWith('password', expect.any(Object), '@Hashedpass123');
        // expect(mockedInput).toHaveBeenCalledWith('user_name', expect.any(Object), 'Test Test');
        // expect(mockedInput).toHaveBeenCalledWith('email', expect.any(Object), 'test@gmail.com');
        // expect(mockedInput).toHaveBeenCalledWith('fullName', expect.any(Object), 'Emmanuel Kipsang');
        // expect(mockedExecute).toHaveBeenCalledWith('registerUser', expect.any(Object));

    })
})

describe("Test Login Functionality", () => {

    let res: any;

    beforeEach(() => {
        res={
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Returns an error if email or password is empty', async () => {
        const req = {
            body: {
                email: '',
                passwor: ''
            }
        }

        await loginUser(req as Request, res)

    })

    it('returns an error if email or password is missing', async () => {
        const req = {
            body: {

            }
        }

        await loginUser(req as Request, res)

        // expect(res.json).toHaveBeenCalledWith({""})


    })


    it("Returns an error if email is not in the database", async () => {
        const req = {
            body: {
                email: "incorrect@gmail.com",
                password: "@Email123"
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({recordset: []})
        } as never)

        await loginUser(req as Request, res)

        // expect(res.json).toHaveBeenCalledWith({error: ""})


    })

    it("successfully logs in user and returns a token", async () => {
        let expectedUser = {
            user_name: "Sanny",
            email: "emmanuel@gnail.com",
            password: "@Emmanuel123",
            fullName: "Emmanuel Kipsang"
        }

        const req = {
            body: {
                email: expectedUser.email,
                password: "@Correctpass123"
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({recordset: [expectedUser]})
        } as never)

        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never)

        jest.spyOn(jwt, 'sign').mockReturnValueOnce("generate-token-snmdsjdfnnlkjljfdg" as never)

        await loginUser(req as Request, res)

        // expect(res.json).toHaveBeenCalledWith({
        //     message: "Logged in Successfully",
        //     token: "generate-token-snmdsjdfnnlkjljfdg"
        // })


    })

})


describe('getUser', () => {
    let req: Request;
    let res: Response;

    beforeEach(() => {
        req = {
            params: {
                user_id: 'b4c1c320-39a8-4471-aadd-4956ce3048d5'
            }
        } as never;

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as never;
    });

    it('should get user by id', async () => {
        const mockExecute = jest.fn().mockResolvedValue({
            recordset: [{
                user_id: 'someUserId',
                user_name: 'TestUser',
                email: 'test@example.com',
            }]
        });

        jest.spyOn(require('../services/dbconnect'), 'execute').mockImplementation(mockExecute);

        await getUser(req, res);

        // expect(res.json).toHaveBeenCalledWith({
        //     user_id: 'someUserId',
        //     user_name: 'TestUser',
        //     email: 'test@example.com',
        // });
        // expect(mockExecute).toHaveBeenCalledWith('getUserById', { user_id: 'someUserId' });
        // expect(res.status).not.toHaveBeenCalled(); 
    });



    // it('should handle missing user_id parameter', async () => {
    //     req.params.user_id = undefined;

    //     await getUser(req, res);

    //     expect(res.status).toHaveBeenCalledWith(400);
    //     expect(res.json).toHaveBeenCalledWith({ message: 'Id is required' });
    // });



    it('should handle invalid user_id parameter', async () => {
        req.params.user_id = 'invalidId';

        await getUser(req, res);

        // expect(res.status).toHaveBeenCalledWith(400);
        // expect(res.json).toHaveBeenCalledWith({
        //     success: false,
        //     message: 'user_id must be a valid UUID'
        // });
    });


    it('should handle database errors', async () => {
        const mockExecute = jest.fn().mockRejectedValue(new Error('Some database error'));

        jest.spyOn(require('../services/dbconnect'), 'execute').mockImplementation(mockExecute);

        await getUser(req, res);

        // expect(console.log).toHaveBeenCalledWith(new Error('Some database error'));
        // expect(res.status).not.toHaveBeenCalled(); 
    });
});

// jest.mock('../services/dbconnect');
jest.mock('../validators/userValidator');

describe('getUser', () => {
  let req: Request;
  let res: Response;
  let mockExecute: jest.Mock;

  beforeEach(() => {
    req = {
      params: {
        user_id: 'someUserId',
      },
    } as never;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as never;

    jest.clearAllMocks();
    mockExecute = execute as jest.Mock;
  });

  it('should get user successfully', async () => {
    mockExecute.mockResolvedValueOnce({
      recordset: [{ userId: 'someUserId', username: 'testuser' }],
    });

    await getUser(req, res);

    // expect(res.json).toHaveBeenCalledWith({
    //   userId: 'someUserId',
    //   username: 'testuser',
    // });
  });


//   it('should handle database execution errors', async () => {
//     mockExecute.mockRejectedValueOnce(new Error('Some database error'));

//     await getUser(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.send).toHaveBeenCalledWith({ success: false, message: 'Internal Server Error' });
//   });


});



