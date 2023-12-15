import { execute, query } from "../services/dbconnect";
import { comparePass, hashPass } from "../services/passwordHash";
import {
  deleteUser,
  forgotPassword,
  getUser,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
} from "./userController";

// Mock the hashPass function
jest.mock("../services/passwordHash.ts", () => ({
  hashPass: jest.fn(),
  comparePass: jest.fn(),
}));

// Mock the execute function
jest.mock("../services/dbconnect.ts", () => ({
  execute: jest.fn(),
  query: jest.fn(),
}));

// Mock the generateToken function
jest.mock("../services/tokenGenerator.ts", () => ({
  generateToken: jest.fn().mockReturnValue("mockedToken"),
}));

describe("users controller", () => {
  it("should register a user", async () => {
    // Arrange
    const req: any = {
      body: {
        user_name: "diana",
        email: "dianaaberi12@gmail.com",
        password: "@Santa2023",
      },
    } as any;

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    // Mock the hashPass function to return a mock password
    (hashPass as jest.Mock).mockResolvedValue("hashedPassword");

    // Mock the execute function to simulate a successful registration
    (execute as jest.Mock).mockResolvedValue({});

    // Act
    await registerUser(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully",
    });
  });

  it(" should login a user ", async () => {
    const reqLogin: any = {
      body: {
        email: "caleb.baraka@thejitu.com",
        password: "@Santa2023",
      },
    };

    const resLogin: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the comparePass function to return true (valid password)
    (comparePass as jest.Mock).mockResolvedValue(true);

    // Mock the execute function to simulate a successful login
    (execute as jest.Mock).mockResolvedValue({
      recordset: [
        { id: "123", email: "john@example.com", password: "hashedPassword" },
      ],
    });

    // Act
    await loginUser(reqLogin, resLogin);

    // Assert
    expect(resLogin.status).toHaveBeenCalledWith(200);
    expect(resLogin.json).toHaveBeenCalledWith({
      message: "Logged in successfully",
      token: "mockedToken",
    });
  });

  it("should handle registration failure - email already exists", async () => {
    // Arrange
    const reqRegister: any = {
      body: {
        user_name: "diana",
        email: "dianaaberi12@gmail.com",
        password: "@Santa2023",
      },
    };

    const resRegister: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the hashPass function to return a mock password
    (hashPass as jest.Mock).mockResolvedValue("hashedPassword");

    // Mock the execute function to simulate an existing user with the same email
    (execute as jest.Mock).mockResolvedValue({
      recordset: [
        { id: "123", email: "john@example.com", password: "hashedPassword" },
      ],
    });

    // Act
    await registerUser(reqRegister, resRegister);

    // Assert
    expect(resRegister.status).toHaveBeenCalledWith(404);
    expect(resRegister.json).toHaveBeenCalledWith({
      error: "Account exists with the given email",
    });
  });

  it("should handle registration failure - validation error", async () => {
    // Arrange
    const reqRegister: any = {
      body: {
        user_name: "diana",
        email: "dianaaberi12@gmail.com",
        password: "shortpassword",
      },
    };

    const resRegister: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Act
    await registerUser(reqRegister, resRegister);

    // Assert
    expect(resRegister.status).toHaveBeenCalledWith(400);
    expect(resRegister.json).toHaveBeenCalledWith({
      error:
        "check email or password ! password should be atleast 8 characters long with letters symbols and uppercase letters",
    });
  });

  it("should handle login failure - invalid password", async () => {
    // Arrange for login with invalid password
    const reqLoginInvalidPass: any = {
      body: {
        email: "caleb.baraka@thejitu.com",
        password: "InvalidPassword",
      },
    };

    const resLoginInvalidPass: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the comparePass function to return false (invalid password)
    (comparePass as jest.Mock).mockResolvedValue(false);

    // Mock the execute function to simulate a successful login
    (execute as jest.Mock).mockResolvedValue({
      recordset: [
        { id: "123", email: "john@example.com", password: "hashedPassword" },
      ],
    });

    // Act
    await loginUser(reqLoginInvalidPass, resLoginInvalidPass);

    // Assert
    expect(resLoginInvalidPass.status).toHaveBeenCalledWith(404);
    expect(resLoginInvalidPass.json).toHaveBeenCalledWith({
      error: "Invalid password",
    });
  });

  it("should handle login failure - email not in the database", async () => {
    // Arrange for login with email not in the database
    const reqLoginInvalidEmail: any = {
      body: {
        email: "john.doe@thejitu.com",
        password: "@ValidPass123",
      },
    };

    const resLoginInvalidEmail: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the execute function to simulate an email not in the database
    (execute as jest.Mock).mockResolvedValue({ recordset: [] });

    // Act
    await loginUser(reqLoginInvalidEmail, resLoginInvalidEmail);

    // Assert
    expect(resLoginInvalidEmail.status).toHaveBeenCalledWith(404);
    expect(resLoginInvalidEmail.json).toHaveBeenCalledWith({
      error: "Account does not exist",
    });
  });

  it("update user successfully", async () => {
    const request = {
      body: {
        user_id: "28e61f6e-e838-41c7-a155-380a84d78871",
        user_name: "caleb",
        email: "baraka606@student.mmarau.ac.ke",
      },
    };

    const response = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await updateUser(request as any, response as any);

    expect(execute).toHaveBeenCalledWith("updateUser", {
      user_id: "28e61f6e-e838-41c7-a155-380a84d78871",
      user_name: "caleb",
      email: "baraka606@student.mmarau.ac.ke",
    });

    expect(response.send).toHaveBeenCalledWith({
      message: "User updated successfully",
    });
  });

  it("handle validation error", async () => {
    const request = {
      body: {
        // Invalid data to trigger validation error
      },
    };

    const response = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await updateUser(request as any, response as any);

    // Ensure the response is sent with the correct error message and status code
    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledWith({
      error: "check full name & email if they are correct",
    });
  });

  test("delete user successfully", async () => {
    const request = {
      params: {
        user_id: "1a913633-c923-4228-8efd-a77512565eb1",
      },
    };

    const response = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await deleteUser(request as any, response as any);

    expect(execute).toHaveBeenCalledWith("deleteUser", {
      user_id: "1a913633-c923-4228-8efd-a77512565eb1",
    });

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.send).toHaveBeenCalledWith({
      message: "User deleted Successfully",
    });
  });

  test("handle validation error", async () => {
    const request = {
      params: {
        // Invalid data to trigger validation error
      },
    };

    const response = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await deleteUser(request as any, response as any);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledWith({ error: "Id is required" });
  });

  test("handle missing id & ", async () => {
    const request = {
      params: {
        // No club_id provided to trigger missing id error
      },
    };

    const response = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await deleteUser(request as any, response as any);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledWith({ error: "Id is required" });
  });
  test("get users successfully", async () => {
    // Mock the query function to return a sample result
    const mockResult = {
      recordset: [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
      ],
    };
    (query as jest.Mock).mockResolvedValueOnce(mockResult);

    const request = {} as any;
    const response = {
      json: jest.fn(),
    } as any;

    await getUsers(request, response);

    expect(query).toHaveBeenCalledWith("EXEC getUsers");

    // Ensure the response is sent with the correct user data
    expect(response.json).toHaveBeenCalledWith(mockResult.recordset);
  });

  test("get user successfully", async () => {
    // Mock the execute function to return a sample result
    const mockResult = {
      recordset: [
        { id: "1a913633-c923-4228-8efd-a77512565eb1", name: "User 1" },
      ],
    };
    (execute as jest.Mock).mockResolvedValueOnce(mockResult);
    const request = {
      params: {
        user_id: "1a913633-c923-4228-8efd-a77512565eb1",
      },
    } as any;
    const response = {
      json: jest.fn(),
    } as any;
    await getUser(request, response);
    expect(execute).toHaveBeenCalledWith("getUserById", {
      user_id: "1a913633-c923-4228-8efd-a77512565eb1",
    });
    expect(response.json).toHaveBeenCalledWith(mockResult.recordset[0]);
  });
  test("initiate password reset successfully", async () => {
    (execute as jest.Mock).mockResolvedValueOnce({
      recordset: [{ user_id: "28e61f6e-e838-41c7-a155-380a84d78871" }],
    });

    const request = {
      body: {
        email: "dianaaberi12@gmail.com",
      },
    } as any;
    const response = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as any;

    await forgotPassword(request, response);

    // expect(execute).toHaveBeenCalledWith("getUserByEmail", {
    //   email: "test@example.com",
    // });
    expect(execute).toHaveBeenCalledWith("forgotPassword", {
      user_id: "28e61f6e-e838-41c7-a155-380a84d78871",
    });

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.send).toHaveBeenCalledWith({
      message: "check your email for a password reset link",
    });
  });
});
