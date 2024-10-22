create table tbl_inquiry(
    id bigint unsigned primary key,
    inquiry_status varchar(100) default '답변 대기',
    constraint fk_inquiry_post foreign key (id)
    references tbl_post(id)
);

select * from tbl_inquiry;

drop table tbl_inquiry;