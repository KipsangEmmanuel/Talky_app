
   CREATE OR ALTER PROCEDURE createComment
    @comment_id VARCHAR(500),
    @created_by_user_id VARCHAR(500),
    @post_id VARCHAR(255),
    @comment VARCHAR(500),
    @comment_replied_to_id VARCHAR(255),
    @created_at VARCHAR(20)
AS
BEGIN
    INSERT INTO comment (comment_id, created_by_user_id, post_id, comment, comment_replied_to_id, created_at)
    VALUES (@comment_id, @created_by_user_id, @post_id, @comment, @comment_replied_to_id, @created_at);
END

select * from comment