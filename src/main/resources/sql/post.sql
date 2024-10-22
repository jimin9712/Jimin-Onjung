use test2;

CREATE TABLE tbl_post (
                          id bigint unsigned AUTO_INCREMENT PRIMARY KEY,
                          post_title VARCHAR(255) NOT NULL,
                          post_summary VARCHAR(255),
                          post_goal_point INT,
                          post_content TEXT NOT NULL,
                          post_view_count INT DEFAULT 0,
                          post_type VARCHAR(255) NOT NULL,
                          created_date DATE,
                          updated_date DATE,
                          member_id BIGINT,
                          constraint tbl_post_member foreign key(id)
                            references tbl_member(id)
);

drop table tbl_post;
