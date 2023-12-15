CREATE OR ALTER PROCEDURE deleteComment
    @comment_id VARCHAR(500)
AS
BEGIN
    DELETE FROM comment
    WHERE comment_id = @comment_id;
END;

select * from comment