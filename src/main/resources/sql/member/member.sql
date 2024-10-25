use test2;

show databases ;

create database test2;

create table tbl_member (
    id bigint unsigned auto_increment primary key,
    kakao_email varchar(255),
    kakao_profile_url varchar(255),
    kakao_nickname varchar(255),
    member_email varchar(255),
    member_name varchar(255),
    member_phone varchar(255),
    member_password varchar(255),
    member_type varchar(100) default 'NORMAL',
    member_nickname varchar(255),
    member_jung int default 0,
    member_point int default 0,
    member_login_type varchar(100) default 'NORMAL',
    member_star_rate decimal(3, 2) default 0.00,
    member_introduction varchar(1000),
    created_date datetime default current_timestamp,
    updated_date datetime default current_timestamp
);
select * from tbl_member;

insert into tbl_member(id,member_nickname)
values(2,"닉네임2");

# alter table tbl_member
#     modify column member_type smallint not null;
#
# alter table tbl_member
#     modify column member_jung int default 0;
#
# alter table tbl_member
#     modify column member_point int default 0;
#
# DROP TABLE tbl_member;

select * from tbl_member;


alter table tbl_member
add column reset_uuid varchar(255) unique;

delete from tbl_member
where id = 9;


