import { Router } from "express";

import { verifyToken } from "../middleware/verifyToken";
import {
  createComment,
  deleteComment,
  editComment,
  getCommentsOfPost,
} from "../controllers/commentController";

const comment_router = Router();

comment_router.post("/", verifyToken, createComment);
comment_router.put("/", verifyToken, editComment);
comment_router.get("/:post_id", verifyToken, getCommentsOfPost);
comment_router.delete("/:comment_id", verifyToken, deleteComment);

export default comment_router;
