CREATE OR ALTER PROCEDURE [dbo].[getCommentsOfPost]
    @post_id varchar(250)
AS
BEGIN
    SELECT
        c.comment_id,
        c.created_by_user_id AS comment_user_id,
        u.fullName AS comment_user_name,
		u.profileImage AS comment_user_profile_image,
        p.post_id,
        p.created_by_user_id AS post_user_id,
        u2.fullName AS post_user_name,
        p.caption AS post_caption,
        p.postImage AS post_image,
        c.comment,
        c.comment_replied_to_id,
        c.created_at
    FROM
        comment c
    JOIN
        users u ON c.created_by_user_id = u.user_id
    JOIN
        posts p ON c.post_id = p.post_id
    LEFT JOIN
        users u2 ON p.created_by_user_id = u2.user_id
    WHERE
        c.post_id = @post_id;
END;
