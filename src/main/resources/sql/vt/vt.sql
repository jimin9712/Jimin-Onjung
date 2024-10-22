create table tbl_vt(
    id bigint unsigned primary key ,
    constraint fk_vt_post foreign key(id)
                   references tbl_post(id)
);

drop table tbl_vt;