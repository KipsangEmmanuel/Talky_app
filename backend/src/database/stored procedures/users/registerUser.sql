CREATE OR ALTER  PROCEDURE [dbo].[registerUser]
	@user_id varchar(100),
	@user_name varchar(100),
	@profileImage VARCHAR(500),
    @fullName VARCHAR(250),	
	@email varchar(250),
	@password varchar(250)
	
	
as

set nocount on;

begin
	INSERT INTO dbo.users
	(user_id, profileImage, fullName, email, password, user_name )
	VALUES
	(@user_id, @profileImage, @fullName, @email, @password, @user_name );
end;