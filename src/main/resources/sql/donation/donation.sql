create table tbl_donation(
    id bigint unsigned primary key ,
    goal_point int default 0,
    donation_s_date date not null,
    donation_e_date date not null,
    constraint fk_donation_post foreign key (id)
                         references tbl_post(id)

);

drop table tbl_donation;
