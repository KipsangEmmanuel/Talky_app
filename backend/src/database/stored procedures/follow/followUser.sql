CREATE OR ALTER PROCEDURE toggleFollowUser
    @p_follower_user_id VARCHAR(100),
    @p_followed_user_id VARCHAR(100)
AS
BEGIN
    IF EXISTS (
        SELECT 1
        FROM followers
        WHERE follower_user_id = @p_follower_user_id
          AND followed_user_id = @p_followed_user_id
    )
    BEGIN
        
        DELETE FROM followers
        WHERE follower_user_id = @p_follower_user_id
          AND followed_user_id = @p_followed_user_id;
    END
    ELSE
    BEGIN
        
        INSERT INTO followers (follower_user_id, followed_user_id)
        VALUES (@p_follower_user_id, @p_followed_user_id);
    END
END;