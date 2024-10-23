create table tbl_attachment(
    id bigint unsigned auto_increment primary key,
    attachment_file_name varchar(255) not null,
    attachment_file_path varchar(255) not null,
    attachment_file_size varchar(255) not null,
    attachment_file_type varchar(255) not null,
    post_id bigint unsigned not null,
    created_date datetime default current_timestamp,
    constraint fk_attachment_post foreign key (post_id)
    references tbl_post(id)
);

select * from tbl_attachment;

show databases;

select * from tbl_vt;