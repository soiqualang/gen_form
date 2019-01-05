-- Adminer 4.3.1 SQLite 3 dump

--DROP TABLE IF EXISTS "angiang_thucdia";
CREATE TABLE 'angiang_thucdia' ( 'id' INTEGER PRIMARY KEY, 'lat' VARCHAR(255), 'lon' VARCHAR(255), 'hinh1' VARCHAR(255), 'hinh2' VARCHAR(255), 'hinh3' VARCHAR(255), 'idlinhvuc' INTEGER, 'idloaicaycon' INTEGER, 'idgiongcaycon' INTEGER, 'idgiaidoansinhtruong' INTEGER, 'idloaibenh' INTEGER, 'idusers' INTEGER, 'ghichu' VARCHAR(255), 'ngaythunhan' DATE);


--DROP TABLE IF EXISTS "angiang_thucdia_giaidoansinhtruong";
CREATE TABLE 'angiang_thucdia_giaidoansinhtruong' ( 'id' INTEGER PRIMARY KEY, 'ten' VARCHAR(255), 'mota' VARCHAR(255), 'idloaicaycon' INTEGER, 'idlinhvuc' INTEGER);


--DROP TABLE IF EXISTS "angiang_thucdia_giongcaycon";
CREATE TABLE 'angiang_thucdia_giongcaycon' ( 'id' INTEGER PRIMARY KEY, 'ten' VARCHAR(255), 'idloaicaycon' INTEGER, 'idlinhvuc' INTEGER, 'mota' VARCHAR(255));


--DROP TABLE IF EXISTS "angiang_thucdia_linhvuc";
CREATE TABLE 'angiang_thucdia_linhvuc' ( 'id' INTEGER PRIMARY KEY, 'ten' VARCHAR(255), 'mota' VARCHAR(255));


--DROP TABLE IF EXISTS "angiang_thucdia_loaibenh";
CREATE TABLE 'angiang_thucdia_loaibenh' ( 'id' INTEGER PRIMARY KEY, 'ten' VARCHAR(255), 'mota' VARCHAR(255), 'idloaicaycon' INTEGER, 'idlinhvuc' INTEGER, 'idgiongcaycon' INTEGER);


--DROP TABLE IF EXISTS "angiang_thucdia_loaicaycon";
CREATE TABLE 'angiang_thucdia_loaicaycon' ( 'id' INTEGER PRIMARY KEY, 'ten' VARCHAR(255), 'idlinhvuc' INTEGER, 'mota' VARCHAR(255));


DROP TABLE IF EXISTS "users";
CREATE TABLE 'users' ( 'id' INTEGER PRIMARY KEY, 'username' VARCHAR(50), 'password' VARCHAR(255), 'fullname' VARCHAR(255), 'email' VARCHAR(100), 'tel' VARCHAR(30), 'usertype' VARCHAR(10), 'idphongban' INTEGER, 'img' VARCHAR(255));


-- 
CREATE TABLE 'users' ( 'id' INTEGER PRIMARY KEY, 'username' VARCHAR(50), 'password' VARCHAR(255), 'fullname' VARCHAR(255), 'email' VARCHAR(100), 'tel' VARCHAR(30), 'usertype' VARCHAR(10), 'idphongban' INTEGER, 'img' VARCHAR(255));
