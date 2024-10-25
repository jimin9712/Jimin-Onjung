create table tbl_vt(
    id bigint unsigned primary key ,
    recruitment_count smallint not null ,
    vt_s_date date not null,
    vt_e_date date not null,
    constraint fk_vt_post foreign key(id)
                   references tbl_post(id)
);

select *from tbl_vt;

DESCRIBE tbl_vt;

INSERT INTO tbl_vt (id, recruitment_count, vt_s_date, vt_e_date)
VALUES (2, 10, '2024-10-23', '2024-11-25');



drop table tbl_vt;

select v.id, v.recruitment_count, p.post_title, m.member_nickname,
       v.vt_s_date, v.vt_e_date,p.post_view_count, p.post_type, p.post_summary, p.created_Date
from tbl_vt v
         join tbl_post p on v.id = p.id
         join tbl_member m on p.member_id = m.id
order by v.id desc;

insert into tbl_vt(post_type, post_title, post_summary, recruitment_Count, vt_s_date, vt_e_date, post_id, post_content,
                   attachment_file_name,attachment_file_path,attachment_file_size,attachment_file_type)
values('1','테스트 제목인디','테스트 요약인디',10,'2024-10-23','2025-01-01',1,'테스트내용인디');


