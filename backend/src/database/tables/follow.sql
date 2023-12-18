CREATE TABLE user_followers (
    follower_id varchar(100) NOT NULL,
    following_id varchar(100) NOT NULL,
    PRIMARY KEY (follower_id, following_id),
    FOREIGN KEY (follower_id) REFERENCES users(user_id),
    FOREIGN KEY (following_id) REFERENCES users(user_id)
);

drop table followers

select* from user_followers