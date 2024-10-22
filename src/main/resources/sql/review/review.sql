create table tbl_review(
    id bigint unsigned not null,
    review_star_rate decimal(3, 2) default 0.00,
    constraint fk_review_post foreign key (id)
    references tbl_post(id)
);

select * from tbl_review;