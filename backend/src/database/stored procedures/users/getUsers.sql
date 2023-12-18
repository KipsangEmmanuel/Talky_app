CREATE OR ALTER  PROCEDURE [dbo].[getUsers]
as

set nocount on;

begin
	select	u.[user_id],
			u.user_name,
			u.fullName,
			u.email,
			u.profileImage		

	from	[users] u where isDeleted = 0 ORDER BY created_at DESC;
end;