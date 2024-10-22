create table tbl_vt_alarm(
    id bigint unsigned auto_increment primary key,
    alarm_content varchar(1000) not null,
    member_id bigint unsigned not null,
    vt_id bigint unsigned not null,
    created_date datetime default current_timestamp,
    constraint fk_vt_alarm_member foreign key (member_id)
    references tbl_member(id),
    constraint fk_vt_alarm_vt foreign key (vt_id)
    references tbl_vt(id)
);

select * from tbl_alarm;

use test2;

drop table tbl_alarm;

