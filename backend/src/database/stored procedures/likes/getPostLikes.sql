CREATE OR ALTER PROCEDURE [dbo].[getPostLikes]
	(@post_id varchar(250))
as

set nocount on;

begin
	SELECT user_id, created_at
      FROM likes
      WHERE post_id = @post_id
end;

 