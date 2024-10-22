create table tbl_donation(
    id bigint unsigned primary key ,
    goal_point int default 0,
    constraint fk_donation_post foreign key (id)
                         references tbl_post(id)

);

drop table tbl_donation;
