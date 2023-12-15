CREATE OR ALTER PROCEDURE [dbo].[getLike]
	(@user_id varchar(250),@post_id varchar(250))
as

set nocount on;

begin
	select	*						
		
	from likes  where user_id= @user_id and post_id = @post_id ;
end;

 