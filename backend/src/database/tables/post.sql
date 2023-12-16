CREATE TABLE posts (
    post_id VARCHAR(100) PRIMARY KEY,
    created_by_user_id VARCHAR(100) ,
    caption VARCHAR(500) ,   
    postImage VARCHAR(500) ,
    created_at DATETIME DEFAULT GETDATE(),
    isDeleted BIT Default 0,
    FOREIGN KEY (created_by_user_id) REFERENCES users(user_id)   
);

drop TABLE posts


