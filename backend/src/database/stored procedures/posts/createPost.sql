CREATE OR ALTER PROCEDURE createPost(
    @post_id VARCHAR(500),
    @created_by_user_id VARCHAR(100),
    @caption VARCHAR(255),
    @postImage VARCHAR(500),
    @created_at VARCHAR(20)
)
AS
BEGIN
    INSERT INTO posts (post_id, created_by_user_id, caption, postImage, created_at)
    VALUES (@post_id, @created_by_user_id, @caption, @postImage, @created_at)
END