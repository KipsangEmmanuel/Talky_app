CREATE TABLE comment_user_tag (
    comment_user_tag_id VARCHAR(500) PRIMARY KEY NOT NULL,
    comment_id VARCHAR(500),
    user_id VARCHAR(500),
    sent INT Default 0,
    created_at VARCHAR(500) NOT NULL,
 FOREIGN KEY (comment_id) REFERENCES comment(comment_id),
 FOREIGN KEY (user_id) REFERENCES user(user_id)
);

drop table comment_user_tag