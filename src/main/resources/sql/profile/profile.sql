create table tbl_profile(
    id bigint unsigned auto_increment primary key,
    profile_file_name varchar(255),
    profile_file_path varchar(255),
    profile_file_size varchar(255),
    profile_file_type varchar(255),
    member_id bigint unsigned not null,
    created_date datetime default current_timestamp,
    constraint fk_profile_member foreign key (member_id)
    references tbl_member(id)
);

# alter table tbl_profile modify profile_file_type varchar(255);

select * from tbl_profile;

insert into tbl_profile(profile_file_name,profile_file_path, profile_file_size,profile_file_type,member_id)
values ('테스트파일이름2','테스트파일패스2', '테스트파일사이즈2','테스트파일타입2',2)
