import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();

import jwt from "jsonwebtoken";
import { checkDetailsUser,  updatUser,} from "../types/userInterfaces";


export interface extendedUser extends Request {
  info?: updatUser;
}
export const verifyToken = (
  request: extendedUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = request.headers["token"] as string;
    // console.log(token);
    
    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string
    ) as checkDetailsUser;
    request.info = decoded;
  } catch (error) {
    return res.json((error as Error).message);
  }

  next();
};