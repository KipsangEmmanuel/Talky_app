CREATE PROCEDURE getFollowersCount
    @p_user_id VARCHAR(100)
AS
BEGIN
    SELECT COUNT(*) AS followers_count
    FROM followers
    WHERE followed_user_id = @p_user_id;
END;