create table tbl_payment(
    id bigint unsigned auto_increment primary key,
    payment_cancel_status varchar(255) not null,
    payment_amount varchar(255) not null,
    member_id bigint unsigned not null,
    created_date datetime default current_timestamp,
    updated_date datetime default current_timestamp,
    constraint fk_payment_member foreign key (member_id)
    references tbl_member(id)
);

select * from tbl_payment;