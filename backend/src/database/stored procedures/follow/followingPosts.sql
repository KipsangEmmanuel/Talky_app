CREATE OR ALTER PROCEDURE followingPosts
    @p_following_user_id VARCHAR(100)
AS
BEGIN
    SELECT posts.*, 
           users.profileImage AS user_profile_image,
           users.fullName AS user_full_name,
           users.user_name AS user_username,
           users.email AS user_email
    FROM posts
    JOIN followers ON followers.followed_user_id = posts.created_by_user_id
    JOIN users ON users.user_id = posts.created_by_user_id
    WHERE followers.follower_user_id = @p_following_user_id;
END;