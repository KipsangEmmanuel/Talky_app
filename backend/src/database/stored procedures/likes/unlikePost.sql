CREATE OR ALTER PROCEDURE unLikePost
    @user_id VARCHAR(500),
    @post_id VARCHAR(500)
AS
BEGIN
    DELETE FROM likes
    WHERE user_id = @user_id AND post_id = @post_id ;
END;