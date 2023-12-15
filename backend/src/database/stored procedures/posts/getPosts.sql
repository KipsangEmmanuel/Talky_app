CREATE OR ALTER  PROCEDURE [dbo].[getPosts]
as

set nocount on;

begin
	select	*	

	from posts 
    
    where isDeleted = 0 
end;