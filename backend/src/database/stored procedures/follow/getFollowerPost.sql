CREATE OR ALTER PROCEDURE getFollowerPost
    @user_id VARCHAR(100)
AS
BEGIN
    SELECT
        *
    
    FROM
        posts
    
    WHERE
        created_by_user_id = @user_id;
END;