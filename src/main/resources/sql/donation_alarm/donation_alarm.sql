create table tbl_donation_alarm(
    id bigint unsigned auto_increment primary key,
    alarm_content varchar(1000) not null,
    member_id bigint unsigned not null,
    donation_id bigint unsigned not null,
    created_date datetime default current_timestamp,
    constraint fk_donation_alarm_member foreign key (member_id)
    references tbl_member(id),
    constraint fk_donation_alarm_donation foreign key (donation_id)
    references tbl_donation(id)
);


use test2;


