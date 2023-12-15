CREATE OR ALTER PROCEDURE likePost
    @like_id VARCHAR(500),
    @user_id VARCHAR(500),
    @post_id VARCHAR(500),
    @created_at DATETIME
AS
BEGIN
    INSERT INTO likes (like_id, user_id, post_id, created_at)
    VALUES (@like_id, @user_id, @post_id,  @created_at);
END;