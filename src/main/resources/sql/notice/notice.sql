create table tbl_notice(
    id bigint unsigned not null,
    constraint fk_notice_post foreign key (id)
    references tbl_post(id)
);