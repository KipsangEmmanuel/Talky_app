CREATE OR ALTER  PROCEDURE [dbo].[deletePost]
	@post_id varchar(100)
as

set nocount on;

begin
	UPDATE dbo.posts
	SET 
	isDeleted=1
	WHERE post_id = @post_id;
end;