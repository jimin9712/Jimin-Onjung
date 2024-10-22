create table tbl_report(
    id bigint unsigned auto_increment primary key not null,
    report_reason varchar(1000) not null,
    post_id bigint unsigned not null,
    member_id bigint unsigned not null,
    constraint fk_report_post foreign key (post_id)
    references tbl_post(id),
    constraint fk_report_member foreign key (member_id)
    references tbl_member(id)
);