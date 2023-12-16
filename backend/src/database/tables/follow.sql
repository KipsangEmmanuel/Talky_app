CREATE TABLE followers (
    follower_user_id VARCHAR(100) NOT NULL,
    followed_user_id VARCHAR(100) NOT NULL,
    PRIMARY KEY (follower_user_id, followed_user_id),
    FOREIGN KEY (follower_user_id) REFERENCES users(user_id),
    FOREIGN KEY (followed_user_id) REFERENCES users(user_id)
);

drop table followers