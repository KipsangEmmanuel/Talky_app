CREATE OR ALTER  PROCEDURE [dbo].[deleteUser]
	@user_id varchar(100)
as

set nocount on;

begin
	UPDATE dbo.users
	SET 
	isDeleted=1
	WHERE user_id = @user_id;
end;