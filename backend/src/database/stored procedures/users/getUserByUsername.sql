CREATE OR ALTER PROCEDURE [dbo].[getUserByUsername]
	(@user_name varchar(250))
as

set nocount on;

begin
	select	* 
	FROM	users  WHERE user_name = @user_name AND isDeleted = 0;
end;