CREATE PROCEDURE getFollowingsCount
    @p_user_id VARCHAR(100)
AS
BEGIN
    SELECT COUNT(*) AS followings_count
    FROM followers
    WHERE follower_user_id = @p_user_id;
END;