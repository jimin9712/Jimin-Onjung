create table tbl_profile(
    id bigint unsigned auto_increment primary key,
    profile_file_name varchar(255) not null,
    profile_file_path varchar(255) not null,
    profile_file_size varchar(255) not null,
    profile_file_type varchar(255) not null,
    member_id bigint unsigned not null,
    created_date datetime default current_timestamp,
    constraint fk_profile_member foreign key (member_id)
    references tbl_member(id)
);

select * from tbl_profile;
