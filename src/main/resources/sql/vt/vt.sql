create table tbl_vt(
    id bigint unsigned primary key ,
    recruitment_count smallint not null ,
    vt_s_date date not null,
    vt_e_date date not null,
    constraint fk_vt_post foreign key(id)
                   references tbl_post(id)
);


drop table tbl_vt;