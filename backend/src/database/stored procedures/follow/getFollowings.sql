CREATE OR ALTER PROCEDURE getFollowings
    @p_follower_user_id VARCHAR(100)
AS
BEGIN
    SELECT followed_user_id
    FROM followers
    WHERE follower_user_id = @p_follower_user_id;
END;