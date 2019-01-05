function load_users(){
	var url=urlsyn+'?tbl=users';
    $.getJSON( url, function( data ) { 
        localDB.transaction(function (transaction) {
            var len = data.length;
			transaction.executeSql('DELETE FROM users',[]);
            for(var i = 0; i < len; i++) {
                var id=data[i].id;
				var username=data[i].username;
                var password=data[i].password;
				var fullname=data[i].fullname;
				var email=data[i].email;
				var tel=data[i].tel;
				var usertype=data[i].usertype;
				var idphongban=data[i].idphongban;
				var img=data[i].img;
                //var img=data[i].imgurl;
                //imgName = imgurl.substring(imgurl.lastIndexOf('/'));
                //console.log('we insert ' + username); // It works, display me the two different title
                transaction.executeSql('INSERT INTO users (id,username,password,fullname,email,tel,usertype,idphongban,img) VALUES (?,?,?,?,?,?,?,?,?)',[id,username,password,fullname,email,tel,usertype,idphongban,img]);
            }
        });
    });
}
function load_angiang_thucdia_giaidoansinhtruong(){
	var url=urlsyn+'?tbl=angiang_thucdia_giaidoansinhtruong';
    $.getJSON( url, function( data ) { 
        localDB.transaction(function (transaction) {
            var len = data.length;
			transaction.executeSql('DELETE FROM angiang_thucdia_giaidoansinhtruong',[]);
            for(var i = 0; i < len; i++) {
                var id=data[i].id;
				var ten=data[i].ten;
                var mota=data[i].mota;
				var idloaicaycon=data[i].idloaicaycon;
				var idlinhvuc=data[i].idlinhvuc;
                //console.log('we insert ' + ten);
                transaction.executeSql('INSERT INTO angiang_thucdia_giaidoansinhtruong (id,ten,mota,idloaicaycon,idlinhvuc) VALUES (?,?,?,?,?)',[id,ten,mota,idloaicaycon,idlinhvuc]);
            }
        });
    });
}
function load_angiang_thucdia_giongcaycon(){
	var url=urlsyn+'?tbl=angiang_thucdia_giongcaycon';
    $.getJSON( url, function( data ) { 
        localDB.transaction(function (transaction) {
            var len = data.length;
			transaction.executeSql('DELETE FROM angiang_thucdia_giongcaycon',[]);
            for(var i = 0; i < len; i++) {
                var id=data[i].id;
				var ten=data[i].ten;
                var mota=data[i].mota;
				var idloaicaycon=data[i].idloaicaycon;
				var idlinhvuc=data[i].idlinhvuc;
                //console.log('we insert ' + ten);
                transaction.executeSql('INSERT INTO angiang_thucdia_giongcaycon (id,ten,mota,idloaicaycon,idlinhvuc) VALUES (?,?,?,?,?)',[id,ten,mota,idloaicaycon,idlinhvuc]);
            }
        });
    });
}
function load_angiang_thucdia_linhvuc(){
	var url=urlsyn+'?tbl=angiang_thucdia_linhvuc';
    $.getJSON( url, function( data ) { 
        localDB.transaction(function (transaction) {
            var len = data.length;
			transaction.executeSql('DELETE FROM angiang_thucdia_linhvuc',[]);
            for(var i = 0; i < len; i++) {
                var id=data[i].id;
				var ten=data[i].ten;
                var mota=data[i].mota;
                //console.log('we insert ' + ten);
                transaction.executeSql('INSERT INTO angiang_thucdia_linhvuc (id,ten,mota) VALUES (?,?,?)',[id,ten,mota]);
            }
        });
    });
}
function load_angiang_thucdia_loaibenh(){
	var url=urlsyn+'?tbl=angiang_thucdia_loaibenh';
    $.getJSON( url, function( data ) { 
        localDB.transaction(function (transaction) {
            var len = data.length;
			transaction.executeSql('DELETE FROM angiang_thucdia_loaibenh',[]);
            for(var i = 0; i < len; i++) {
                var id=data[i].id;
				var ten=data[i].ten;
                var mota=data[i].mota;
				var idloaicaycon=data[i].idloaicaycon;
				var idlinhvuc=data[i].idlinhvuc;
				var idgiongcaycon=data[i].idgiongcaycon;
                //console.log('we insert ' + ten);
                transaction.executeSql('INSERT INTO angiang_thucdia_loaibenh (id,ten,mota,idloaicaycon,idlinhvuc,idgiongcaycon) VALUES (?,?,?,?,?,?)',[id,ten,mota,idloaicaycon,idlinhvuc,idgiongcaycon]);
            }
        });
    });
}
function load_angiang_thucdia_loaicaycon(){
	var url=urlsyn+'?tbl=angiang_thucdia_loaicaycon';
    $.getJSON( url, function( data ) { 
        localDB.transaction(function (transaction) {
            var len = data.length;
			transaction.executeSql('DELETE FROM angiang_thucdia_loaicaycon',[]);
            for(var i = 0; i < len; i++) {
                var id=data[i].id;
				var ten=data[i].ten;
                var mota=data[i].mota;
				var idlinhvuc=data[i].idlinhvuc;
                //console.log('we insert ' + ten);
                transaction.executeSql('INSERT INTO angiang_thucdia_loaicaycon (id,ten,mota,idlinhvuc) VALUES (?,?,?,?)',[id,ten,mota,idlinhvuc]);
            }
        });
    });
}