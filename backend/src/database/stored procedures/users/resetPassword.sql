
CREATE OR ALTER  PROCEDURE [dbo].[resetPassword]
	(@user_id varchar(100),@password varchar(100))
as

set nocount on;

begin
	UPDATE users
	SET 
	password = @password
	WHERE user_id = @user_id 
end;