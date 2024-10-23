create table tbl_support(
    id bigint unsigned primary key ,
    goal_point int default 0,
    support_s_date date not null,
    support_e_date date not null,
    constraint fk_support_post foreign key (id)
                        references tbl_post(id)
);


