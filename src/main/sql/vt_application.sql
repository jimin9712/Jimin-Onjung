use test2;

create table tbl_vt_application(
                        id bigint unsigned auto_increment primary key,
                        created_date datetime default current_timestamp,
                        updated_date datetime default current_timestamp,
                        constraint fk_vt_application_volunteer foreign key (id)
                        references tbl_volunteer(id)
);


