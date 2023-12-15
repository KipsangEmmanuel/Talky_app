CREATE OR ALTER PROCEDURE unfollowUser(
    @following_user_id VARCHAR(500),
    @followed_user_id VARCHAR(500)
)
AS
BEGIN
    DELETE FROM follower
    WHERE following_user_id = @following_user_id
      AND followed_user_id = @followed_user_id;
END