create table tbl_vt(
    id bigint unsigned primary key ,
    vt_recruitment_count smallint not null,
    constraint fk_vt_post foreign key(id)
                   references tbl_post(id)
);


drop table tbl_vt;