create table tbl_reply_alarm(
    id bigint unsigned auto_increment primary key,
    alarm_content varchar(1000) not null,
    member_id bigint unsigned not null,
    reply_id bigint unsigned not null,
    created_date datetime default current_timestamp,
    constraint fk_reply_alarm_member foreign key (member_id)
    references tbl_member(id),
    constraint fk_reply_alarm_reply foreign key (reply_id)
    references tbl_reply(id)
);

select * from tbl_alarm;

use test2;

drop table tbl_alarm;

