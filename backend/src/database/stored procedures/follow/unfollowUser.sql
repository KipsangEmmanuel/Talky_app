CREATE OR ALTER PROCEDURE UnfollowUser
    @follower_id varchar(100),
    @following_id varchar(100)
AS
BEGIN
    DELETE FROM user_followers
    WHERE follower_id = @follower_id AND following_id = @following_id;
END