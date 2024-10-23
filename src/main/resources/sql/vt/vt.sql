create table tbl_vt(
    id bigint unsigned primary key ,
    recruitment_count smallint not null ,
    vt_s_date date not null,
    vt_e_date date not null,
    constraint fk_vt_post foreign key(id)
                   references tbl_post(id)
);

select *from tbl_vt;


drop table tbl_vt;

select v.id, v.recruitmentCount, p.postTitle, m.memberNickName,
       v.vtSDate, v.vtEDate,p.postViewCount, p.postType, p.postSummary, p.createdDate
from tbl_vt v
         join tbl_post p on v.id = p.id
         join tbl_member m on p.member_id = m.id
order by v.id desc;