import { Request, Response } from "express";
import { execute, handleTVP, query } from "../services/dbconnect";
import { v4 as uuidv4 } from "uuid";

import { isEmpty } from "lodash";
import { Post } from "../types/postInterface";

export const toggleFollowUser = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    let follower_id = uuidv4();

    let { following_user_id, followed_user_id } = req.body;
    let created_at = new Date().toISOString();

    const relationsexists = (
      await execute("getfollowStatus", {
        following_user_id,
        followed_user_id,
      })
    ).recordset;

    if (!isEmpty(relationsexists)) {
      const result = await execute("unfollowUser", {
        following_user_id,
        followed_user_id,
      });

      // console.log(result);

      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({
          message: "Something went wrong, user not followed",
        });
      } else {
        return res.status(200).json({
          message: "User Unfollowed",
        });
      }
    } else {
      let result = await execute("followUser", {
        follower_id,
        following_user_id,
        followed_user_id,
        created_at,
      });

      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({
          message: "Something went wrong, user not followed",
        });
      } else {
        return res.status(200).json({
          message: "User Followed",
        });
      }
    }
  } catch (error) {
    console.log(error);

    return res.json({
      error,
    });
  }
};

export const getFollowers = async (req: Request, res: Response) => {
  try {
    let { followed_user_id } = req.params;

    let followers = (
      await execute("getFollowers", {
        followed_user_id,
      })
    ).recordset;

    return res.status(200).json({
      followers: followers,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      error: error,
    });
  }
};

export const getFollowings = async (req: Request, res: Response) => {
  try {
    let { following_user_id } = req.params;

    let followings = (
      await execute("getFollowings", {
        following_user_id,
      })
    ).recordset;

    return res.status(200).json({
      followings: followings,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      error: error,
    });
  }
};


export const followingPosts = async (req: Request, res: Response) => {
  try {
    const { following_user_id } = req.params;
    const followers = (
      await execute("getFollowings", {
        following_user_id,
      })
    ).recordset;

    const posts: any[] = [];

    if (followers.length > 0) {
      for (const follower of followers) {
        const user_id = follower.following_user_id;
        const result = await execute("getFollowerPost", {
          user_id,
        });

        if (result.rowsAffected[0] !== 0) {
          posts.push(...result.recordset);
        }
      }

      return res.status(200).json({
        posts,
      });
    } else {
      return res.status(200).json({
        posts: [],
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      error: error,
    });
  }
};
