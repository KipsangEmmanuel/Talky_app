CREATE OR ALTER PROCEDURE [dbo].[getPostById]
	@post_id varchar(250)
as



begin
	select	*						
		
	from posts  where post_id= @post_id and isDeleted = 0;
end;

exec getPostById 