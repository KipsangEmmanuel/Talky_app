CREATE TABLE comment (
    comment_id VARCHAR(500) PRIMARY KEY,
    created_by_user_id VARCHAR(100) NOT NULL,
    post_id VARCHAR(100) NOT NULL,
    comment VARCHAR(500) NOT NULL,  
    comment_replied_to_id VARCHAR(500), -- THIS IS THE PARENT COMMENT BEING REFERENCED
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (created_by_user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id),
    FOREIGN KEY (comment_replied_to_id) REFERENCES comment(comment_id)
);


drop table comment