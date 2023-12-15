import * as sql from "mssql";
import { execute, query } from "../services/dbconnect"; // Replace with the correct path to your file

// Mock the mssql library
jest.mock("mssql");

describe("query function", () => {
  it("should execute a SQL query", async () => {
    
    const mockRequestQuery = jest.fn().mockResolvedValue({ recordset: [] });
    (sql.Request as any).mockImplementation(
      () => {
        return {
          query: mockRequestQuery,
        } as any;
      }
    );

   
    const queryString = "SELECT * FROM users";

   
    const result = await query(queryString);

    // Assertions
    expect(sql.ConnectionPool).toHaveBeenCalledTimes(1); 
    expect(mockRequestQuery).toHaveBeenCalledWith(queryString); 
    expect(result).toEqual({ recordset: [] }); 
  });

 
});


describe("execute function", () => {
  it("should execute a stored procedure", async () => {
    
    const mockRequestExecute = jest.fn().mockResolvedValue({ recordset: [] });
    (sql.Request as any).mockImplementation(
      () => {
        return {
          execute: mockRequestExecute,
          input: jest.fn(), 
        } as any;
      }
    );

   
    const procedureName = "YourProcedureName";
    const params = {
      Param1: "Value1",
      Param2: "Value2",
    };

    
    const result = await execute(procedureName, params);

    // Assertions
    expect(sql.ConnectionPool).toHaveBeenCalledTimes(1); 
    expect(mockRequestExecute).toHaveBeenCalledWith(procedureName); 
   
    // expect(mockRequestInput).toHaveBeenCalledWith("Param1", "Value1");
    // expect(mockRequestInput).toHaveBeenCalledWith("Param2", "Value2");

    
    expect(result).toEqual({ recordset: [] }); 
  });


});