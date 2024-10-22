create table tbl_support(
    id bigint unsigned primary key ,
    goal_point int default 0,
    constraint fk_support_post foreign key (id)
                        references tbl_post(id)
);