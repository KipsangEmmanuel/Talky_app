
   CREATE OR ALTER PROCEDURE createComment
    @comment_id VARCHAR(500),
    @created_by_user_id VARCHAR(500),
    @post_id VARCHAR(255),
    @comment VARCHAR(500),
    @comment_replied_to_id VARCHAR(255)    
AS
BEGIN
    INSERT INTO comment (comment_id, created_by_user_id, post_id, comment, comment_replied_to_id)
    VALUES (@comment_id, @created_by_user_id, @post_id, @comment, @comment_replied_to_id);
END

select * from comment