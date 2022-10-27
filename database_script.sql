set names utf8mb4;
set foreign_key_checks = 0;

drop table if exists subjects;
create table subjects (
    subjectid int not null auto_increment,
    subjectname varchar(20) not null,
    start date not null,
    end date not null,
    primary key (subjectid)
);

insert into subjects (subjectname, start, end) values ('English', '2023-01-01', '2023-12-31');
insert into subjects (subjectname, start, end) values ('Maths', '2023-01-01', '2023-12-31');
insert into subjects (subjectname, start, end) values ('Digital Technology', '2023-01-01', '2023-12-31');
insert into subjects (subjectname, start, end) values ('Robotics', '2023-01-01', '2023-12-31');
insert into subjects (subjectname, start, end) values ('Accounting', '2023-01-01', '2023-12-31');
insert into subjects (subjectname, start, end) values ('Hospitality', '2023-01-01', '2023-12-31');
insert into subjects (subjectname, start, end) values ('Fabrics', '2023-01-01', '2023-12-31');
insert into subjects (subjectname, start, end) values ('Chemestry', '2023-01-01', '2023-12-31');
insert into subjects (subjectname, start, end) values ('Physics', '2023-01-01', '2023-12-31');
insert into subjects (subjectname, start, end) values ('Business Studies', '2023-01-01', '2023-12-31');
insert into subjects (subjectname, start, end) values ('Science', '2023-01-01', '2023-12-31');
insert into subjects (subjectname, start, end) values ('Biology', '2023-01-01', '2023-12-31');

drop table if exists users;
create table users (
    userid int not null auto_increment,
    email varchar(50) not null,
    password varchar(255) not null,
    firstname varchar(20) not null,
    lastname varchar(20) not null,
    role varchar(20) not null default 'user',
    primary key (userid)
);

insert into users (email, password, firstname, lastname) values ('jacirving@student.pakuranga.school.nz', '$pbkdf2-sha256$29000$BECo9V4rhXAuZax1DmEM4Q$aPU6CKDCAidDi3VtH.E2YYtRLtNhVRT.ipX1iOhRAJ0', 'Jacob', 'Irving');
insert into users (email, password, firstname, lastname) values ('frachiplin@student.pakuranga.school.nz', '$pbkdf2-sha256$29000$771XKiWEUGoNgTBGqFXKGQ$L9pZcVbu2yU//AdcaQi85CSvYrvns4RbYfNMc/pY5Yw', 'Frank', 'Chiplin');
insert into users (email, password, firstname, lastname) values ('finbremner@student.pakuranga.school.nz', '$pbkdf2-sha256$29000$DOGcc85Zq3VuTUmJMWYsZQ$7OjrBWfZxRE0IXZUlyx6dtmJkUoXGFA6JckjInWbi4E', 'Finley', 'Bremner');
insert into users (email, password, firstname, lastname, role) values ('jacobirving@admin.pakuranga.school.nz', '$pbkdf2-sha256$29000$zRkDoLSWkjLmfG8N4XzvPQ$zjxngR6dB3wqoUA4o7eTACK17bWivTsvQFxEsoUMvo4', 'Jacob', 'Irving', 'admin');

drop table if exists usersubjects;
create table usersubjects (
    userid int not null,
    subjectid int not null,
    primary key (userid, subjectid),
    foreign key (userid) references users (userid),
    foreign key (subjectid) references subjects (subjectid)
);

insert into usersubjects values (1, 1);
insert into usersubjects values (1, 2);
insert into usersubjects values (2, 11);
insert into usersubjects values (3, 11);
insert into usersubjects values (3, 12);

set foreign_key_checks = 1;