use test2;

create table tbl_donation_record(
                                    id bigint unsigned auto_increment primary key,
                                    donation_amount int not null,
                                    created_date datetime default current_timestamp,
                                    constraint fk_donation_record_member foreign key (id)
                                        references tbl_member(id),
                                    constraint fk_donation_record_donation foreign key (id)
                                        references tbl_donation(id)
);