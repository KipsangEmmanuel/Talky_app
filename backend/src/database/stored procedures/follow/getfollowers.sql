CREATE OR ALTER PROCEDURE getFollowers
   @p_followed_user_id VARCHAR(100)
AS
BEGIN
    SELECT follower_user_id
    FROM followers
    WHERE followed_user_id = @p_followed_user_id;
END;