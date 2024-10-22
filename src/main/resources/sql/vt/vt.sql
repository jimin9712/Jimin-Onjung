create table tbl_vt(
    id bigint unsigned auto_increment primary key ,
    constraint fk_vt_post foreign key(id)
                   references tbl_post(id)
);