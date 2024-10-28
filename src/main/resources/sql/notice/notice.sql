create table tbl_notice(
    id bigint unsigned primary key,
    constraint fk_notice_post foreign key (id)
    references tbl_post(id)
);

select * from tbl_notice;

drop table tbl_notice;


-- `tbl_notice` 테이블의 외래 키 제약 조건 확인
show create table tbl_notice;
