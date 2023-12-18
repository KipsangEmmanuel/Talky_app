CREATE OR ALTER PROCEDURE [dbo].[getPosts]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        p.post_id,
        p.created_by_user_id,
        u.fullName,
        u.user_name,
        u.profileImage,
        u.user_id,
        p.caption,
        p.postImage,
        p.created_at,
        COUNT(DISTINCT l.user_id) AS likeCount,
        (SELECT STRING_AGG(DISTINCT l.user_id, ', ') FROM likes l WHERE l.post_id = p.post_id) AS likedBy,
        COUNT(c.comment_id) AS commentCount,
        STRING_AGG(c.created_by_user_id, ', ') AS commentedBy
    FROM
        posts p
        INNER JOIN users u ON p.created_by_user_id = u.user_id
        LEFT JOIN likes l ON p.post_id = l.post_id
        LEFT JOIN comment c ON p.post_id = c.post_id

    WHERE
        p.isDeleted = 0

    GROUP BY
        p.post_id,
        p.created_by_user_id,
        u.fullName,
        u.user_name,
        u.profileImage,
        u.user_id,
        p.caption,
        p.postImage,
        p.created_at;
END;
