create table tbl_support(
    id bigint unsigned primary key ,
    goal_point int default 0,
    current_point int default 0,
    support_s_date date not null,
    support_e_date date not null,
    constraint fk_support_post foreign key (id)
                        references tbl_post(id)
);

select * from tbl_support;

insert into tbl_support(id, goal_point, support_s_date, support_e_date)
VALUES(142,30000,'2024-12-02', '2025-06-03');

alter table tbl_support add column current_point int default 0;