CREATE OR ALTER PROCEDURE GetFollowers
    @current_user_id VARCHAR(100)
AS
BEGIN
    SELECT
        u.user_id,
        u.profileImage,
        u.fullName,
        u.user_name,
        u.email,
       
        CASE
            WHEN f.following_id IS NOT NULL THEN 1
            ELSE 0
        END AS have_followed,
        (SELECT COUNT(*) FROM user_followers uf WHERE uf.following_id = u.user_id) AS followersCount,
        (SELECT COUNT(*) FROM user_followers uf WHERE uf.follower_id = u.user_id) AS followingCount
    FROM
        users u
    LEFT JOIN
        user_followers f ON u.user_id = f.follower_id
    WHERE
        f.following_id = @current_user_id
        AND u.user_id != @current_user_id;
END;
