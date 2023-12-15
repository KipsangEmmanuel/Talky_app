CREATE OR ALTER  PROCEDURE getfollowStatus
@following_user_id VARCHAR(500),
 @followed_user_id VARCHAR(500)

as

set nocount on;

begin
	SELECT * FROM follower 
    WHERE following_user_id  = following_user_id AND followed_user_id = followed_user_id
end;