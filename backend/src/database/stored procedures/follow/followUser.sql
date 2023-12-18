CREATE OR ALTER PROCEDURE FollowUser
    @follower_id varchar(100),
    @following_id varchar(100)
AS
BEGIN
    INSERT INTO user_followers (follower_id, following_id)
    VALUES (@follower_id, @following_id);
END