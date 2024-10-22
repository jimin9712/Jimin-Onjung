create table tbl_support_alarm(
    id bigint unsigned auto_increment primary key,
    alarm_content varchar(1000) not null,
    member_id bigint unsigned not null,
    support_id bigint unsigned not null,
    created_date datetime default current_timestamp,
    constraint fk_support_alarm_member foreign key (member_id)
    references tbl_member(id),
    constraint fk_support_alarm_support foreign key (support_id)
    references tbl_support(id)
);

select * from tbl_alarm;

use test2;

drop table tbl_alarm;

