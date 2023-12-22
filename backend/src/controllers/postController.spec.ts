import { Request, Response } from 'express';
import { createPost } from './postController';
import { execute } from '../services/dbconnect';

jest.mock('../services/dbconnect', () => ({
  execute: jest.fn(),
}));

describe('createPost', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should create a post successfully', async () => {
    (execute as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [1],
    });

    req.body = {
      postImage: 'https://res.cloudinary.com/drkjise3u/image/upload/v1703003946/wk6jn2cx7sxo2rruc7hi.jpg',
      created_by_user_id: '04c1e054-f384-4fe0-bae1-e5b465a65ce2',
      caption: 'Woza!',
    };

    await createPost(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Post created successfully',
      post_id: expect.any(String),
      postImage: 'https://res.cloudinary.com/drkjise3u/image/upload/v1703003946/wk6jn2cx7sxo2rruc7hi.jpg',
    });
  });

  it('should handle validation errors', async () => {
    req.body = {
    };

    await createPost(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: expect.any(Array),
    });
  });

  it('should handle database errors', async () => {
    (execute as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [0],
    });

    req.body = {
      postImage: 'https://res.cloudinary.com/drkjise3u/image/upload/v1703003946/wk6jn2cx7sxo2rruc7hi.jpg',
      created_by_user_id: 'b4c1c320-39a8-4471-aadd-4956ce3048d5',
      caption: 'Hapo sawa!',
    };

    await createPost(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
        "error": expect.any(Error),
    });
  });

  it('should handle errors when adding tagged users to the database', async () => {
    (execute as jest.Mock).mockResolvedValueOnce({
      rowsAffected: [0],
    });

    req.body = {
      postImage: 'https://res.cloudinary.com/drkjise3u/image/upload/v1703003825/ffoehk9rt7g2z0fnkty6.jpg',
      created_by_user_id: 'b4c1c320-39a8-4471-aadd-4956ce3048d5',
      caption: 'Nice',
    };

    await createPost(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: expect.any(Error),
    });
  });

});
