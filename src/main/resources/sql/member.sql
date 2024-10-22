use test2;

CREATE TABLE tbl_member (
                            id bigint unsigned AUTO_INCREMENT PRIMARY KEY,
                            kakao_email VARCHAR(255) NOT NULL,
                            kakao_profile_url VARCHAR(255) NOT NULL,
                            kakao_nickname VARCHAR(255) NOT NULL,
                            member_email VARCHAR(255) NOT NULL,
                            member_name VARCHAR(255) NOT NULL,
                            member_phone VARCHAR(255) NOT NULL,
                            member_password VARCHAR(255) NOT NULL,
                            member_type VARCHAR(255) NOT NULL,
                            member_nickname VARCHAR(255) NOT NULL,
                            member_jung VARCHAR(255),
                            member_point VARCHAR(255),
                            member_login_type INT DEFAULT 0,
                            member_star_rate DECIMAL(3, 2) DEFAULT 0.00,
                            member_introduction VARCHAR(1000),
                            created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                            updated_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE tbl_member;
