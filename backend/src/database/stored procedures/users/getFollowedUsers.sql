CREATE OR ALTER PROCEDURE GetFollowedUsers
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
        u.justRegistered,
        -- Exclude the details of the current user
        CASE
            WHEN f.following_id IS NOT NULL THEN 1
            ELSE 0
        END AS have_followed,
        -- Count the number of followers
        (SELECT COUNT(*) FROM user_followers WHERE following_id = u.user_id) AS followersCount,
        -- Count the number of users the current user is following
        (SELECT COUNT(*) FROM user_followers WHERE follower_id = u.user_id) AS followingCount
    FROM
        users u
    LEFT JOIN
        user_followers f ON u.user_id = f.following_id AND f.follower_id = @current_user_id
    WHERE
        u.user_id != @current_user_id;
END;
