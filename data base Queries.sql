create database CURD_Application

use CURD_Application

create table classRoom(
	classroom_id	int primary key identity(1,1),
	classroom_name	varchar(50) not null
);

create table student(
	student_id	int Primary key Identity(1,1),
	first_name	varchar(30) not null,
	last_name	varchar(30) not null,
	contact_person	varchar(50) not null,
	contact_no	int not null,
	email		varchar(50) not null,
	date_of_birth	Date not null,
	age			int not null,
	classroom_id	int not null,

	foreign key (classroom_id) references  classRoom (classroom_id)
);

create table teacher(
	teacher_id	int primary key identity(1,1),
	first_name	varchar(30) not null,
	last_name	varchar(30) not null,
	contact_no	int not null,
	email		varchar(50) not null
);

create table subject(
	subject_id	int primary key identity(1,1),
	subject_name	varchar(50) not null
);

create table allocatedSubjects(
	allocate_id	int primary key identity(1,1),
	teacher_id  int not null,
	subject_id	int not null,

	foreign key (teacher_id) references teacher (teacher_id),
	foreign key (subject_id) references subject (subject_id)
);

create table allocatedClassRoom(
	allocate_id	int primary key identity(1,1),
	teacher_id  int not null,
	classroom_id	int not null,

	foreign key (teacher_id) references teacher (teacher_id),
	foreign key (classroom_id) references classRoom (classroom_id)
);

select * from classRoom
select * from student
select * from teacher
select * from subject
select * from allocatedSubjects
select * from allocatedClassRoom
