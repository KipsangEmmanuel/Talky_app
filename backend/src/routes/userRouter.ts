import { Router } from "express";
import {
  checkUserDetails,
  deleteUser,
  forgotPassword,
  getUser,
  getUsers,
  loginUser,
  registerUser,
  resetPassword,
  updateUser,
} from "../controllers/userController";
import { verifyToken } from "../middleware/verifyToken";

const user_router = Router();

user_router.post("/register", registerUser);
user_router.post("/login", loginUser);
user_router.post("/forgot", forgotPassword);
user_router.post("/reset", resetPassword);
user_router.get("/check_user_details", verifyToken, checkUserDetails);
user_router.get("/", verifyToken, getUsers);
user_router.put("/", verifyToken, updateUser);
user_router.get("/:user_id", verifyToken, getUser);
user_router.delete("/:user_id", verifyToken, deleteUser);

// Here is a reference snippet of code from client\src\app\services\user.service.ts:

export default user_router;
