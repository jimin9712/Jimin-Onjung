use test2;

create table tbl_support(
                            id bigint unsigned auto_increment primary key ,
                            constraint fk_support_post foreign key (id)
                                references tbl_post(id)
)