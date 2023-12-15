CREATE OR ALTER PROCEDURE getFollowings
    @following_user_id VARCHAR(100)
AS
BEGIN
    SELECT *
    FROM follower
    WHERE following_user_id = @following_user_id;
END