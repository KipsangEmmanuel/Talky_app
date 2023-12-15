CREATE OR ALTER PROCEDURE getFollowers
    @followed_user_id VARCHAR(500)
AS
BEGIN
    SELECT *
    FROM follower
    WHERE followed_user_id = @followed_user_id;
END