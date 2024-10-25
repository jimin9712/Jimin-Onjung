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

# select v.id, v.recruitment_count, p.post_title, m.member_nickname, p.post_status,
#        pf.profile_file_name, pf.profile_file_path, pf.profile_file_size, pf.profile_file_type,
#        v.vt_s_date, v.vt_e_date,p.post_view_count, p.post_type, p.post_summary, p.created_date
# from tbl_vt v
#          join tbl_post p on v.id = p.id
#          join tbl_member m on p.member_id = m.id
#          join tbl_profile pf on p.member_id = pf.id
# order by v.id desc;

SELECT recruitment_Count FROM tbl_vt ;

alter table tbl_vt add now_recruitment smallint not null;

