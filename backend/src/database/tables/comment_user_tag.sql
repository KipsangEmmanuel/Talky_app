CREATE TABLE comment_user_tag (
    comment_user_tag_id VARCHAR(100) PRIMARY KEY NOT NULL,
    comment_id VARCHAR(500),
    user_id VARCHAR(100),
    sent INT Default 0,
    created_at DATETIME DEFAULT GETDATE() ,
 FOREIGN KEY (comment_id) REFERENCES comment(comment_id),
 FOREIGN KEY (user_id) REFERENCES users(user_id)
);

drop table comment_user_tag