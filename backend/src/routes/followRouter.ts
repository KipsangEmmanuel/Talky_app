import { Router } from "express";

import { verifyToken } from "../middleware/verifyToken";
import {
  followUser,
  followingPosts,
  getFollowedUsers,
  getFollowers,
  getFollowings,
  unfollowUser,
} from "../controllers/followController";

const follow_router = Router();

follow_router.post("/follow", verifyToken, followUser);
follow_router.post("/unfollow", verifyToken, unfollowUser);
follow_router.get("/followed/:user_id", verifyToken, getFollowedUsers);
follow_router.get("/getFollowers/:user_id", verifyToken, getFollowers);
follow_router.get("/getFollowings/:user_id", verifyToken, getFollowings);
follow_router.get("/followingPosts/:following_user_id", followingPosts);

export default follow_router;
