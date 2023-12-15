CREATE OR ALTER PROCEDURE editComment
    @comment_id VARCHAR(500),
    @updated_comment VARCHAR(500)
    
AS
BEGIN
    UPDATE comment
    SET
        comment = @updated_comment
        
    WHERE
        comment_id = @comment_id;
END;