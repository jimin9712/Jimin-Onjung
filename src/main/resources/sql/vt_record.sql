use test2;


create table tbl_vt_record(
    id bigint unsigned AUTO_INCREMENT PRIMARY KEY,
    vt_time smallint default 0,
    CONSTRAINT tbl_vt_record_application foreign key(id)
                          references tbl_vt_application(id)

);