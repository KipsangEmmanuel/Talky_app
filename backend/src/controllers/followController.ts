import { Request, Response } from "express";
import { execute, query } from "../services/dbconnect";
import { isEmpty } from "lodash";

const TOGGLE_FOLLOW_USER_PROCEDURE = "toggleFollowUser";
const GET_FOLLOWERS_PROCEDURE = "getFollowers";
const GET_FOLLOWINGS_PROCEDURE = "getFollowings";
const FOLLOWING_POSTS_PROCEDURE = "followingPosts";

const GET_FOLLOWERS_COUNT_PROCEDURE = "getFollowersCount";
const GET_FOLLOWINGS_COUNT_PROCEDURE = "getFollowingsCount";

export const followUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { follower_id, following_id } = req.body;

    const relationsexists = (
      await query(
        `SELECT * FROM user_followers WHERE follower_id = '${follower_id}' AND following_id= '${following_id}'`
      )
    ).recordset;
    if (!isEmpty(relationsexists)) {
      return res.status(404).json({
        error: "user already followed",
      });
    } else {
      await execute("FollowUser", { follower_id, following_id });

      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    // console.error(error);
    console.log(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const unfollowUser = async (req: Request, res: Response) => {
  try {
    const { follower_id, following_id } = req.body;

    console.log(req.body);

    const relationsexists = (
      await query(
        `SELECT * FROM user_followers WHERE follower_id = '${follower_id}' AND following_id= '${following_id}'`
      )
    ).recordset;
    if (!isEmpty(relationsexists)) {
      await execute("UnfollowUser", { follower_id, following_id });

      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      return res.status(404).json({
        error: "user already unfollowed",
      });
    }
  } catch (error) {
    // console.error(error);
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getFollowedUsers = async (req: Request, res: Response) => {
  try {
    const current_user_id = req.params.user_id;

    const procedureName = "GetFollowedUsers";
    const result = await execute(procedureName, { current_user_id });

    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};

export const getFollowers = async (
  req: Request,
  res: Response
) => {
  try {
    const current_user_id = req.params.user_id;

    const procedureName = "GetFollowers";
    const result = await execute(procedureName, { current_user_id });

    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};

export const getFollowings = async (
  req: Request,
  res: Response
)=> {
  try {
    const current_user_id = req.params.user_id;

    const procedureName = "GetFollowingUsers";
    const result = await execute(procedureName, { current_user_id });

    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
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
