use test2;
create table tbl_volunteer(
                              id bigint unsigned auto_increment primary key,
                              constraint fk_volunteer_post foreign key (id)
                                  references tbl_post(id)
);