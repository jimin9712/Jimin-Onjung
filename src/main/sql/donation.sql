use test2;
create table tbl_donation
(
    id bigint unsigned auto_increment primary key,
    constraint tbl_donation_post foreign key (id)
        references tbl_post (id)
);