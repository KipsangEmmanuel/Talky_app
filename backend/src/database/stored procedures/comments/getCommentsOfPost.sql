CREATE OR ALTER PROCEDURE [dbo].[getCommentsOfPost]
	@post_id varchar(250)
as



begin
	select	*						
		
	from comment  where post_id= @post_id 
end;

