

CREATE OR ALTER PROCEDURE [dbo].[getPosts]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        p.post_id,
        p.created_by_user_id,
        u.fullName ,
        u.user_name,
        u.profileImage,
		u.user_id,
        p.caption,
        p.postImage,
        p.created_at

    FROM
        posts p
        INNER JOIN users u ON p.created_by_user_id = u.user_id

    WHERE
        p.isDeleted = 0
END;
