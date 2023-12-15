CREATE OR ALTER PROCEDURE EditPost(
    @post_id VARCHAR(500),    
    @updatedCaption VARCHAR(255),
    @updatedPostImage VARCHAR(500),
    @updated_at  VARCHAR(20)
)
AS
BEGIN
    UPDATE posts 
    
    SET 
        
        postImage = @updatedPostImage,
        caption = @updatedCaption, 
        created_at = @updated_at 

        WHERE post_id = @post_id
    
END