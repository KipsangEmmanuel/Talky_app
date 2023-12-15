CREATE OR ALTER PROCEDURE addToPostTaggedTable
    @post_user_tag_id VARCHAR(500),
    @post_id VARCHAR(255),
    @user_id VARCHAR(500),
    @created_at VARCHAR(20)
AS
BEGIN
    INSERT INTO post_user_tag (post_user_tag_id, post_id, user_id, created_at)
    VALUES (@post_user_tag_id, @post_id, @user_id, @created_at);
END