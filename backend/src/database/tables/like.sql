CREATE TABLE likes (
    like_id VARCHAR(500) PRIMARY KEY,
    user_id VARCHAR(100) ,
    post_id VARCHAR(100) ,
    created_at DATETIME DEFAULT GETDATE() ,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

drop table likes