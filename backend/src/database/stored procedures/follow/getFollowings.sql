CREATE OR ALTER PROCEDURE GetFollowingUsers
    @current_user_id VARCHAR(100)
AS
BEGIN
    SELECT
        u.user_id,
        u.profileImage,
        u.fullName,
        u.user_name,
        u.email,
        u.isDeleted,
        u.isAdmin,
        u.resetPassword,
        u.justRegistered
    FROM
        users u
    JOIN
        user_followers f ON u.user_id = f.following_id
    WHERE
        f.follower_id = @current_user_id 
        --  AND u.user_id != @current_user_id
END;
