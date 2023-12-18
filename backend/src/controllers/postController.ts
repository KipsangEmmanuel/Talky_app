import { Request, Response } from "express";
import { execute, handleTVP, query } from "../services/dbconnect";
import { v4 as uuidv4 } from "uuid";
import { isEmpty } from "lodash";
import { createPostSchema } from "../validators/postValidator";
import { Post } from "../types/postInterface";

export const createPost = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    let { postImage, created_by_user_id, caption } = req.body;

    let { error } = createPostSchema.validate(req.body);

    if (error) {
      return res.status(404).json({ error: error.details });
    }

    let post_id = uuidv4();

    let result = await execute("createPost", {
      post_id,
      created_by_user_id,
      caption,
      postImage,
    });

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: "Something went wrong, Post not created",
      });
    }

    // Check for tagged users in the caption
    if (caption.includes("@")) {
      const usernamesTagged = caption.match(/@(\S+)/g) || [];

      const taggedUserPromises = usernamesTagged.map(
        async (usernameTagged: string) => {
          const user_name = usernameTagged.substring(1); // Remove the @ symbol

          const userExists = (await execute("getUserByUsername", { user_name }))
            .recordset;

          if (!isEmpty(userExists)) {
            const user_id = userExists[0].user_id;
            const post_user_tag_id = uuidv4();

            let result = await execute("addToPostTaggedTable", {
              post_user_tag_id,
              post_id,
              user_id,
            });

            if (result.rowsAffected[0] === 0) {
              throw new Error("Something went wrong, user not added to tags");
            }
          }
        }
      );

      // Wait for all tagged user promises to resolve
      await Promise.all(taggedUserPromises);
    }

    // Send the response after all media is created and tagged users are processed
    return res.status(200).json({
      message: "Post created successfully",
      post_id,
      postImage,
    });
  } catch (error) {
    console.log(error);

    return res.status(404).json({
      error: error,
    });
  }
};

export const editPost = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    let { post_id, updatedCaption, updatedPostImage, updated_at } = req.body;

    // Check if the post_id is provided
    if (!post_id) {
      return res.status(400).json({
        message: "Post ID is required for editing",
      });
    }

    if (!updatedPostImage) {
      updatedPostImage = null;
    }

    // Perform a database update to edit the post
    let result = await execute("editPost", {
      post_id,
      updatedCaption,
      updatedPostImage,
      updated_at,
    });

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: "Something went wrong, Post not updated",
      });
    } else {
      return res.status(200).json({
        message: "Post updated successfully",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    let { post_id } = req.params;

    // Check if the post_id is provided
    if (!post_id) {
      return res.status(400).json({
        message: "Post ID is required for deletion",
      });
    }

    // Perform a database delete to remove the post
    let result = await execute("deletePost", {
      post_id,
    });

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: "Something went wrong, Post not deleted",
      });
    } else {
      return res.status(200).json({
        message: "Post deleted successfully",
      });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const procedureName = "getPosts";
    const result = await query(`EXEC ${procedureName}`);
    return res.json(result.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const post_id = req.params.post_id;
    // console.log(post_id);
    if (!post_id) return res.status(400).send({ message: "Id is required" });

    const procedureName = "getPostById";
    const result = await execute(procedureName, { post_id });

    res.json(result.recordset[0]);
  } catch (error) {
    console.log(error);
  }
};

export const toggleLikePost = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    let like_id = uuidv4();

    let { user_id, post_id } = req.body;
    let created_at = new Date().toISOString();
    const likeexists = (await execute("getlike", { user_id, post_id }))
      .recordset;

    if (!isEmpty(likeexists)) {
      let result = await execute("unLikePost", {
        user_id,
        post_id,
      });

      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({
          message: "Something went wrong, Posts not unliked",
        });
      } else {
        return res.status(200).json({
          message: "Post Unliked",
        });
      }
    } else {
      let result = await execute("likePost", {
        like_id,
        user_id,
        post_id,
        created_at,
      });

      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({
          message: "Something went wrong, Post not lked",
        });
      } else {
        return res.status(200).json({
          message: "Post Liked",
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

export const getPostLikes = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params;

    const likes = await execute("getPostLikes", { post_id });

    // Check if there are any likes for the post
    if (likes.recordset.length === 0) {
      return res.status(404).json({
        message: "No likes found for the specified post",
      });
    }

    // Return the likes information
    return res.status(200).json({
      likes: likes.recordset,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
// Add this to your post controller
export const getPostDetails = async (req: Request, res: Response) => {
  try {
    const post_id = req.params.post_id;

    // Retrieve post details including likes and comments
    const postDetails = await execute("getPostById", { post_id });

    if (!postDetails.recordset || postDetails.recordset.length === 0) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const post = postDetails.recordset[0];
    const likes = await execute("getPostLikes", { post_id });
    const comments = await execute("getCommentsOfPost", { post_id });

    return res.status(200).json({
      post,
      likes: likes.recordset.length,
      comments: comments.recordset.length,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
