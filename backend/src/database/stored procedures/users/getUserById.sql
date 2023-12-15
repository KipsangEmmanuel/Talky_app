CREATE OR ALTER PROCEDURE [dbo].[getUserById]
	(@user_id varchar(250))
as

set nocount on;

begin
	select	*						
		
	from users  where user_id= @user_id and isDeleted = 0;
end;

exec getUserById 