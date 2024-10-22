create table tbl_alarm(
    id bigint unsigned auto_increment primary key,
    alarm_content varchar(1000) not null,
    member_id bigint unsigned not null,
    post_id bigint unsigned not null,
    vt_application_id bigint unsigned not null,
    created_date datetime default current_timestamp,
    constraint fk_alarm_member foreign key (member_id)
    references tbl_member(id),
    constraint fk_alarm_post foreign key (post_id)
    references tbl_post(id),
    constraint fk_alarm_vt_application foreign key (vt_application_id)
    references tbl_vt_application(id)
);

select * from tbl_alarm;

use test2;

drop table tbl_alarm;

