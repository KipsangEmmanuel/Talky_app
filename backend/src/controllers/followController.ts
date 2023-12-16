import { Request, Response } from "express";
import { execute } from "../services/dbconnect";

const TOGGLE_FOLLOW_USER_PROCEDURE = "toggleFollowUser";
const GET_FOLLOWERS_PROCEDURE = "getFollowers";
const GET_FOLLOWINGS_PROCEDURE = "getFollowings";
const FOLLOWING_POSTS_PROCEDURE = "followingPosts";

const GET_FOLLOWERS_COUNT_PROCEDURE = "getFollowersCount";
const GET_FOLLOWINGS_COUNT_PROCEDURE = "getFollowingsCount";

export const followUser = async (
  req: Request,
  res: Response
)=> {
  try {
      const { follower_user_id, followed_user_id } = req.body;
      
      if (!followed_user_id || !follower_user_id) {
         return res.json({error : "no ids available!"})
     }

    const result = await execute(TOGGLE_FOLLOW_USER_PROCEDURE, {
      p_follower_user_id: follower_user_id,
      p_followed_user_id: followed_user_id,
    });
      
      console.log(result);
      

    res.status(200).json({ message: "Toggle follow success" });
  } catch (error) {
    console.error("Error toggling follow:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFollowers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { followed_user_id } = req.params;

    const followers = await execute(GET_FOLLOWERS_PROCEDURE, {
      p_followed_user_id: followed_user_id,
    });

    res.status(200).json({ followers });
  } catch (error) {
    console.error("Error getting followers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFollowings = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { follower_user_id } = req.params;

    const followings = await execute(GET_FOLLOWINGS_PROCEDURE, {
      p_follower_user_id: follower_user_id,
    });

    res.status(200).json({ followings });
  } catch (error) {
    console.error("Error getting followings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const followingPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { following_user_id } = req.params;

    const posts = await execute(FOLLOWING_POSTS_PROCEDURE, {
      p_following_user_id: following_user_id,
    });

    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error getting following posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFollowersCount = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const result = await execute(GET_FOLLOWERS_COUNT_PROCEDURE, {
      p_user_id: user_id,
    });

    res.status(200).json({ followers_count: result });
  } catch (error) {
    console.error("Error getting followers count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFollowingsCount = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;

    const result = await execute(GET_FOLLOWINGS_COUNT_PROCEDURE, {
      p_user_id: user_id,
    });

    res.status(200).json({ result });
  } catch (error) {
    console.error("Error getting followings count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
