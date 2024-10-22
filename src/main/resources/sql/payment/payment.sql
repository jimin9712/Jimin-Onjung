create table tbl_payment(
    id bigint unsigned auto_increment primary key,
    payment_status varchar(100) default '결제 완료',
    payment_amount int default 0,
    member_id bigint unsigned not null,
    created_date datetime default current_timestamp,
    updated_date datetime default current_timestamp,
    constraint fk_payment_member foreign key (member_id)
    references tbl_member(id)
);

select * from tbl_payment;


alter table tbl_payment
    modify column payment_cancel_status smallint default 0;


alter table tbl_payment
    modify column payment_amount int default 0;