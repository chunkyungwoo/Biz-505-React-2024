CREATE DATABASE iolistDB;

USE iolistDB;

CREATE TABLE tbl_iolist(
	seq	BIGINT	PRIMARY KEY AUTO_INCREMENT,
	io_date	VARCHAR(10)	NOT NULL,
	io_time	VARCHAR(10)	NOT NULL	,
	io_input	VARCHAR(2)	NOT NULL	,
	io_pname	VARCHAR(30)	NOT NULL	,
	io_price	INT	,
	io_quan	INT	,
	io_total INT
);

DROP TABLE tbl_iolist;

SELECT * FROM tbl_iolist;

INSERT INTO tbl_iolist(
seq , io_date,io_time,
io_pname,io_input,io_price,io_quan,io_total
)
VALUES
('1','2020-03-22','09:30:00','후드티','매입','12000','5','60000'),
('2','2020-03-24','12:00:00','롱팬츠','매입','49000','5','245000'),
('3','2020-03-29','11:22:30','후드티','매출','20000','1','20000'),
('4','2020-04-01','15:23:12','카디건','매입','59000','10','590000'),
('5','2020-04-01','17:10:22','롱팬츠','매출','68000','1','68000'),
('6','2020-04-02','11:10:11','패딩자켓','매입','115000','6','690000'),
('7','2020-04-10','09:10:22','롱패딩','매입','299000','3','897000'),
('8','2020-04-10','12:00:01','패딩자켓','매출','190000','1','190000'),
('9','2020-04-11','15:12:00','프린트T','매입','15000','20','300000');
