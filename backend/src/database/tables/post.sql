CREATE TABLE posts (
    post_id VARCHAR(100) PRIMARY KEY,
    created_by_user_id VARCHAR(100) ,
    caption VARCHAR(500) ,   
    postImage VARCHAR(500) ,
    created_at VARCHAR(500) NOT NULL,
    isDeleted BIT Default 0,

    FOREIGN KEY (created_by_user_id) REFERENCES users(user_id)   
);

drop TABLE posts

ALTER TABLE posts
ADD isDeleted BIT Default 0;