show databases;

create database test2;

use test2;

create table tbl_post (
  id bigint unsigned auto_increment primary key,
  post_title varchar(255) not null,
  post_summary varchar(255),
  post_content varchar(1000) not null,
  post_view_count bigint default 0,
  post_type varchar(100) not null,
  post_status varchar(100) default 'VISIBLE',
  created_date datetime default current_timestamp,
  updated_date datetime default  current_timestamp,
  member_id bigint unsigned not null ,
  constraint tbl_post_member foreign key (member_id)
      references tbl_member (id)
);

select * from tbl_post;

insert into tbl_post(id, post_title, post_summary, post_content,post_view_count, post_type, post_status, member_id)
    values(1,'봉사활동구인테스트제목1','봉사활동테스트요약1','봉사활동테스트내용1',1,1,0,1);


drop table tbl_post;
