create table tbl_review(
    id bigint unsigned primary key,
    vt_group_name varchar(255) not null,
    review_star_rate decimal(3, 2) default 0.00,
    constraint fk_review_post foreign key (id)
    references tbl_post(id)
);

select * from tbl_review;

delete from tbl_review
where id = 606