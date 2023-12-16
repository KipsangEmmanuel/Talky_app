import Joi from "joi";

export const createPostSchema = Joi.object({
  created_by_user_id: Joi.string().required(),
  caption: Joi.string().required(),
  
  postImage : Joi.string().optional()
});
