CREATE OR ALTER PROCEDURE createPost(
    @post_id VARCHAR(500),
    @created_by_user_id VARCHAR(100),
    @caption VARCHAR(255),
    @postImage VARCHAR(500)
    
)
AS
BEGIN
    INSERT INTO posts (post_id, created_by_user_id, caption, postImage )
    VALUES (@post_id, @created_by_user_id, @caption, @postImage)
END