CREATE TABLE post_user_tag (
    post_user_tag_id VARCHAR(500) PRIMARY KEY NOT NULL,
    post_id VARCHAR(100),
    user_id VARCHAR(100),
    sent INT Default 0,
     created_at DATETIME DEFAULT GETDATE() 

 FOREIGN KEY (post_id) REFERENCES posts(post_id),
 FOREIGN KEY (user_id) REFERENCES users(user_id)
);

drop table post_user_tag