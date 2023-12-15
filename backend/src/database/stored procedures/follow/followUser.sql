CREATE OR ALTER PROCEDURE followUser(
    @follower_id VARCHAR(500),
    @following_user_id VARCHAR(100),
    @followed_user_id VARCHAR(100),
    @created_at VARCHAR(20)
)
AS
BEGIN
    INSERT INTO follower (follower_id, following_user_id,followed_user_id,  created_at)
    VALUES (@follower_id, @following_user_id,@followed_user_id, @created_at)
END