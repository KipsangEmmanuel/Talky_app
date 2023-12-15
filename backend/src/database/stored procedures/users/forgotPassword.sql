CREATE OR ALTER  PROCEDURE [dbo].[forgotPassword]
	(@user_id varchar(100))
as

set nocount on;

begin
	UPDATE users
	SET 
	resetPassword = 1
	WHERE user_id = @user_id;
end;