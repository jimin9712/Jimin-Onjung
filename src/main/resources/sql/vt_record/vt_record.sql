use test2;


create table tbl_vt_record(
    id bigint unsigned primary key ,
    vt_time smallint default 0,
    constraint tbl_vt_record_application foreign key(id)
                          references tbl_vt_application(id)

);

drop table tbl_vt_record;