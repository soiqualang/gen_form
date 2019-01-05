function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
//wait(7000);
//sql process
function processQuery(db, i, queries, dbname) {
    if(i < queries.length -1) {
      //console.log(i +' of '+queries.length);
      if(!queries[i+1].match(/(INSERT|CREATE|DROP|PRAGMA|BEGIN|COMMIT)/)) {
        queries[i+1] = queries[i]+ ';\n' + queries[i+1];
         return processQuery(db, i+1, queries, dbname);
      }
      //console.log('------------>', queries[i]);
      db.transaction( function (query){ 
        query.executeSql(queries[i]+';', [], function(tx, result) {
          processQuery(db, i +1, queries,dbname);  
        });          
      }, function(err) { 
      //console.log("Query error in ", queries[i], err.message);                          
      processQuery(db, i +1, queries, dbname);   
      });
  } else {
      console.log("Done importing!");
	  dongbotbl();
	  genform();
	  queryAndUpdateOverview();
  }
  //dongbotbl();
}

function loadJson(url){
	//http://localhost/angiang/angiang_v2_truongedit/manager/manage/thucdia/service_dongbo/syn.php
    $.getJSON( url, function( data ) { 
        localDB.transaction(function (transaction) {
            var len = data.length;
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


function dongbotbl(){
	//load_users();
	load_angiang_thucdia_giaidoansinhtruong();
	load_angiang_thucdia_giongcaycon();
	load_angiang_thucdia_linhvuc();
	load_angiang_thucdia_loaibenh();
	load_angiang_thucdia_loaicaycon();
}
function genform(){
	selectbox('idlinhvuc','Lĩnh vực','angiang_thucdia_linhvuc','1=1');
	selectbox('idloaicaycon','Loại cây/con','angiang_thucdia_loaicaycon','1=1');
	selectbox('idgiongcaycon','Giống cây/con','angiang_thucdia_giongcaycon','1=1');
	selectbox('idgiaidoansinhtruong','Giai đoạn sinh trưởng','angiang_thucdia_giaidoansinhtruong','1=1');
	selectbox('idloaibenh','Loại bệnh','angiang_thucdia_loaibenh','1=1');
	//console.log('gen form');
}


function loadapp(){
	var login_cookie=getCookie('login');
	//var login_cookie=true;
	if(login_cookie=='true'){
		initDB();
		$.get('angiang_app.sql', function(response) {
		  processQuery(localDB, 0, response.split(';\n'), 'angiang_v3'); 
		  //processQuery(localDB, 0, response.split(';\n'), 'angiang_v3'); 
		});
		//dongbotbl();
		//genform();
		//queryAndUpdateOverview();
		//menu_click('thuthap');
		FULLNAME=getCookie('fullname');
		EMAIL=getCookie('email');
		IDUSERS=getCookie('id');
		LOGIN_STAT=getCookie('login');
		document.getElementById('idusers').value = IDUSERS;
		page_default();
		document.getElementById("menu_thuthap").style.display = "block";
		document.getElementById("menu_dulieu").style.display = "block";
		document.getElementById("user_info").style.display = "block";
		document.getElementById("menu_dangnhap").style.display = "none";
		var loadapp_count=Number(getCookie('loadapp_count'))+1;
		setCookie('loadapp_count', loadapp_count, 30);
		$('#user_info_div').html('<div style="font-size: 18px;">'+FULLNAME+'</div><div style="font-size: 15px;">'+EMAIL+'</div>');
	}else{
		//w3_open();
		menu_click('dangnhap');
		//alert('hahaha');
		document.getElementById("menu_thuthap").style.display = "none";
		document.getElementById("menu_dulieu").style.display = "none";
		document.getElementById("user_info").style.display = "none";
		document.getElementById("menu_dangnhap").style.display = "block";
	}
}




function today(){
	var currentdate = new Date(); 
	var datetime = currentdate.getFullYear() + "-"
				+ (currentdate.getMonth()+1)  + "-" 
				+ currentdate.getDate() + " "  
				+ currentdate.getHours() + ":"  
				+ currentdate.getMinutes() + ":" 
				+ currentdate.getSeconds();
	document.getElementById('ngaythunhan').value = datetime;
	document.getElementById('idusers').value = IDUSERS;
}
//1. initialization

localDB = null;

function onInit(){
    try {
        if (!window.openDatabase) {
            updateStatus("Error: DB not supported");
        }
        else {
            loadapp();
        }
    } 
    catch (e) {
        if (e == 2) {
            updateStatus("Error: Invalid database version.");
        }
        else {
            updateStatus("Error: Unknown error " + e + ".");
        }
        return;
    }
	//menu_click('thuthap');
}

function initDB(){
    var shortName = 'angiang_v3';
    var version = '3.0';
    var displayName = 'angiang_v3';
    var maxSize = 65536; // in bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}

function createTables(){
    var query = 'CREATE TABLE IF NOT EXISTS angiang_thucdia(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, idusers VARCHAR, lat VARCHAR, lon VARCHAR, idgiaidoansinhtruong VARCHAR, idloaibenh VARCHAR, ghichu VARCHAR, ngaythunhan VARCHAR, hinh1 VARCHAR, hinh2 VARCHAR, hinh3 VARCHAR);';
    try {
        localDB.transaction(function(transaction){
            transaction.executeSql(query, [], nullDataHandler, errorHandler);
            updateStatus("Sẵn sàng");
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to create table 'angiang_thucdia' " + e + ".");
        return;
    }
}




//2. query db and view update

// event handler start with on*


function onUpdate(){
    var id = document.itemForm.id.value;
	var lat = document.itemForm.lat.value;
	var lon = document.itemForm.lon.value;
	var hinh1 = document.itemForm.hinh1.value;
	var hinh2 = document.itemForm.hinh2.value;
	var hinh3 = document.itemForm.hinh3.value;
	var idlinhvuc = document.itemForm.idlinhvuc.value;
	var idloaicaycon = document.itemForm.idloaicaycon.value;
	var idgiongcaycon = document.itemForm.idgiongcaycon.value;
	var idgiaidoansinhtruong = document.itemForm.idgiaidoansinhtruong.value;
	var idloaibenh = document.itemForm.idloaibenh.value;
    var idusers = document.itemForm.idusers.value;
	var ghichu = document.itemForm.ghichu.value;
	var ngaythunhan = document.itemForm.ngaythunhan.value;
	
    if (idusers == "") {
        updateStatus("Bạn chưa đăng nhập");
    }
    else {
        var query = "update angiang_thucdia set idusers=?, lat=?, lon=?, idgiaidoansinhtruong=?, idloaibenh=?, ghichu=?, ngaythunhan=?, hinh1=?, hinh2=?, hinh3=?, idlinhvuc=?, idloaicaycon=?, idgiongcaycon=? where id=?;";
        try {
            localDB.transaction(function(transaction){
                //transaction.executeSql(query, [ten, lat, id], function(transaction, results){
				transaction.executeSql(query, [idusers, lat,lon,idgiaidoansinhtruong,idloaibenh,ghichu,ngaythunhan,hinh1,hinh2,hinh3,idlinhvuc,idloaicaycon,idgiongcaycon, id], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Error: No rows affected");
                    }
                    else {
                        updateForm("", "", "","","","","","","","","","","","",true);
                        updateStatus("Updated rows:" + results.rowsAffected);
                        queryAndUpdateOverview();
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            updateStatus("Error: Unable to perform an UPDATE " + e + ".");
        }
    }
}

function onDelete(){
    var id = document.itemForm.id.value;
    
    var query = "delete from angiang_thucdia where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
                if (!results.rowsAffected) {
                    updateStatus("Error: No rows affected.");
                }
                else {
                    updateForm("", "", "","","","","","","",true);
                    updateStatus("Deleted rows:" + results.rowsAffected);
                    queryAndUpdateOverview();
					removemark();
                }
            }, errorHandler);
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to perform an DELETE " + e + ".");
    }
    
}

function onCreate(){
	today();
    var idusers = document.itemForm.idusers.value;
	var lat = document.itemForm.lat.value;
	var lon = document.itemForm.lon.value;
	var idgiaidoansinhtruong = document.itemForm.idgiaidoansinhtruong.value;
	var idloaibenh = document.itemForm.idloaibenh.value;
	var ghichu = document.itemForm.ghichu.value;
	var ngaythunhan = document.itemForm.ngaythunhan.value;
	var hinh1 = document.itemForm.hinh1.value;
	var hinh2 = document.itemForm.hinh2.value;
	var hinh3 = document.itemForm.hinh3.value;
	var idlinhvuc = document.itemForm.idlinhvuc.value;
	var idloaicaycon = document.itemForm.idloaicaycon.value;
	var idgiongcaycon = document.itemForm.idgiongcaycon.value;
    if ((lat=='')||(lon=="")) {
        //updateStatus("Lỗi: 'Tên' là bắt buộc!");
		updateStatus("Lỗi: Chưa nhập tọa độ vị trí!");
    }else if(idlinhvuc==''){
		updateStatus("Lỗi: Tên lĩnh vực là bắt buộc!");
	}else if(idloaicaycon==''){
		updateStatus("Lỗi: Tên loại cây/con là bắt buộc!");
	}else if(idgiongcaycon==''){
		updateStatus("Lỗi: Tên giống cây/con là bắt buộc!");
	}else if(idgiaidoansinhtruong==''){
		updateStatus("Lỗi: Tên giai đoạn sinh trưởng là bắt buộc!");
	}else if(idloaibenh==''){
		updateStatus("Lỗi: Loại bệnh là bắt buộc!");
	}else{
        var query = "insert into angiang_thucdia (idusers, lat, lon, idgiaidoansinhtruong, idloaibenh, ghichu, ngaythunhan, hinh1, hinh2, hinh3,idlinhvuc,idloaicaycon,idgiongcaycon) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        try {
            localDB.transaction(function(transaction){				
				console.log(lon);
                transaction.executeSql(query, [idusers,lat,lon,idgiaidoansinhtruong,idloaibenh,ghichu,ngaythunhan,hinh1,hinh2,hinh3,idlinhvuc,idloaicaycon,idgiongcaycon], function(transaction, results){
                    if (!results.rowsAffected) {
                        updateStatus("Error: No rows affected.");
                    }
                    else {
                        updateForm("", "", "","","","","","","","","","","","",true);
						
                        updateStatus("Inserted row with id " + results.insertId);
                        queryAndUpdateOverview();
						removemark();
                    }
                }, errorHandler);
            });
        } 
        catch (e) {
            updateStatus("Error: Unable to perform an INSERT " + e + ".");
        }
    }
}

function onSelect(htmlLIElement){
	var id = htmlLIElement.getAttribute("id");
	
	query = "SELECT * FROM angiang_thucdia where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
            
                var row = results.rows.item(0);
                
                updateForm(row['id'], row['idusers'], row['lat'], row['lon'], row['idgiaidoansinhtruong'], row['idloaibenh'], row['ghichu'], row['ngaythunhan'], row['hinh1'], row['hinh2'], row['hinh3'], row['idlinhvuc'], row['idloaicaycon'], row['idgiongcaycon'],false);
                
            }, function(transaction, error){
                updateStatus("Error: " + error.code + "<br>Message: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to select data from the db " + e + ".");
    }
   
}
function onSelectbtn(id){
	
	query = "SELECT * FROM angiang_thucdia where id=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [id], function(transaction, results){
            
                var row = results.rows.item(0);
                
                updateForm(row['id'], row['idusers'], row['lat'], row['lon'], row['idgiaidoansinhtruong'], row['idloaibenh'], row['ghichu'], row['ngaythunhan'], row['hinh1'], row['hinh2'], row['hinh3'], row['idlinhvuc'], row['idloaicaycon'], row['idgiongcaycon'],false);
				loc2mark(row['lat'],row['lon']);
                
            }, function(transaction, error){
                updateStatus("Error: " + error.code + "<br>Message: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to select data from the db " + e + ".");
    }
   //document.getElementById('thuthap').scrollIntoView();
   menu_click('thuthap');
}

function queryAndUpdateOverview(){

	//remove old table rows
    var dataRows = document.getElementById("tbody").getElementsByTagName("tr");
	
    while (dataRows.length > 0) {
        row = dataRows[0];
        document.getElementById("tbody").removeChild(row);
    };
    
	//read db data and create new table rows
    //var query = "SELECT * FROM angiang_thucdia;";
	var query = "SELECT * FROM angiang_thucdia where idusers=?;";
    try {
        localDB.transaction(function(transaction){
        
            transaction.executeSql(query, [IDUSERS], function(transaction, results){
                for (var i = 0; i < results.rows.length; i++) {
                
                    var row = results.rows.item(i);
                    var li = document.createElement("li");
					li.setAttribute("id", row['id']);
                    li.setAttribute("class", "data");
                    li.setAttribute("onclick", "onSelect(this)");
                    
                    var liText = document.createTextNode(row['idusers'] + " da duoc them vao <<<Click vào để xem");
                    li.appendChild(liText);
					
					//console.log(row['idloaibenh']);
					//var tenbenh=getE('ten','angiang_thucdia_loaibenh','id',row['idloaibenh'],getKqquerry);
					
					/*getE('ten','angiang_thucdia_loaibenh','id',row['idloaibenh'],getKqquerry(kq){
						console.log(kq);
					});*/
					
					getE('ten','angiang_thucdia_loaibenh','id',row['idloaibenh'], function(getKqquerry){
						console.log(getKqquerry);
						tenbenh=getKqquerry;
						
						//console.log(tenbenh);
						var str='<tr>';
						str+='<td>'+tenbenh+'</td>';
						str+='<td>'+row['ngaythunhan']+'</td>';
						str+='<td><input type="button" name="view" value="Xem" onclick="onSelectbtn('+row['id']+')" class="btn btn-default"/></td>';
						str+='</tr>';
						
						//document.getElementById("itemData").appendChild(li);
						document.getElementById("tbody").innerHTML+=str;
					});
					
					
					
                }
            }, function(transaction, error){
                updateStatus("Error: " + error.code + "<br>Message: " + error.message);
            });
        });
    } 
    catch (e) {
        updateStatus("Error: Unable to select data from the db " + e + ".");
    }
}

// 3. misc utility functions

// db data handler

errorHandler = function(transaction, error){
    updateStatus("Error: " + error.message);
    return true;
}

nullDataHandler = function(transaction, results){
}

// update view functions

function updateForm(id, idusers, lat,lon,idgiaidoansinhtruong,idloaibenh,ghichu,ngaythunhan,hinh1,hinh2,hinh3,idlinhvuc,idloaicaycon,idgiongcaycon,isempty){
    document.itemForm.id.value = id;
	//document.itemForm.idusers.value = idusers;
    document.itemForm.lat.value = lat;
    document.itemForm.lon.value = lon;
	document.itemForm.idgiaidoansinhtruong.value = idgiaidoansinhtruong;
	document.itemForm.idloaibenh.value = idloaibenh;
	document.itemForm.ghichu.value = ghichu;
	document.itemForm.ngaythunhan.value = ngaythunhan;
	document.itemForm.hinh1.value = hinh1;
	document.itemForm.hinh2.value = hinh2;
	document.itemForm.hinh3.value = hinh3;
	document.itemForm.idlinhvuc.value = idlinhvuc;
	document.itemForm.idloaicaycon.value = idloaicaycon;
	document.itemForm.idgiongcaycon.value = idgiongcaycon;
	if(isempty==true){
		document.getElementById('imgshowhinh1').innerHTML='';
		document.getElementById('imgshowhinh2').innerHTML='';
		document.getElementById('imgshowhinh3').innerHTML='';
	}else{
		document.getElementById('imgshowhinh1').innerHTML='<img src="'+hinh1+'" width="300px">';
		document.getElementById('imgshowhinh2').innerHTML='<img src="'+hinh2+'" width="300px">';
		document.getElementById('imgshowhinh3').innerHTML='<img src="'+hinh3+'" width="300px">';
	}
}

function updateStatus(status){
    document.getElementById('status').innerHTML = status;
}

/*----------------
base64 form upload
-----------------*/
function readURL(input,oput) 
{
    input.style.display = "block";

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            input.src =  e.target.result;
			//console.log(document.getElementById('hinh3upload').src);
			var src=e.target.result;
			document.getElementById(oput).value=src;
			document.getElementById('imgshow'+oput).innerHTML='<img src="'+src+'" width="300px">';
        }

        reader.readAsDataURL(input.files[0]);
    }
}
/*-----------
Post Data
----------*/
function ajaxpost(){
	var idusers = document.itemForm.idusers.value;
	var lat = document.itemForm.lat.value;
	var lon = document.itemForm.lon.value;
	var idgiaidoansinhtruong = document.itemForm.idgiaidoansinhtruong.value;
	var idloaibenh = document.itemForm.idloaibenh.value;
	var ghichu = document.itemForm.ghichu.value;
	var ngaythunhan = document.itemForm.ngaythunhan.value;
	var hinh1 = document.itemForm.hinh1.value;
	var hinh2 = document.itemForm.hinh2.value;
	var hinh3 = document.itemForm.hinh3.value;
	var idlinhvuc = document.itemForm.idlinhvuc.value;
	var idloaicaycon = document.itemForm.idloaicaycon.value;
	var idgiongcaycon = document.itemForm.idgiongcaycon.value;
	if ((lat=='')||(lon=="")) {
        //updateStatus("Lỗi: 'Tên' là bắt buộc!");
		updateStatus("Lỗi: Chưa nhập tọa độ vị trí!");
    }else if(idlinhvuc==''){
		updateStatus("Lỗi: Tên lĩnh vực là bắt buộc!");
	}else if(idloaicaycon==''){
		updateStatus("Lỗi: Tên loại cây/con là bắt buộc!");
	}else if(idgiongcaycon==''){
		updateStatus("Lỗi: Tên giống cây/con là bắt buộc!");
	}else if(idgiaidoansinhtruong==''){
		updateStatus("Lỗi: Tên giai đoạn sinh trưởng là bắt buộc!");
	}else if(idloaibenh==''){
		updateStatus("Lỗi: Loại bệnh là bắt buộc!");
	}else{
		today();
		var frm = document.getElementById("itemForm");
		var urlparam = '';
		var i;
		for (i = 0; i < frm.length; i++){
			urlparam+='&'+frm.elements[i].name+'='+encodeURIComponent(frm.elements[i].value)
		}
		//document.getElementById("status").innerHTML = urlparam;
		document.getElementById("status").innerHTML = '<img src="loading.gif" width="100px">';
		
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
			document.getElementById("status").innerHTML=xmlhttp.responseText;
			}
		  }
		xmlhttp.open("POST",urlpost,true);
		//xmlhttp.open("POST","../angianfrm.php",true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(encodeURI(urlparam));
		//document.getElementById("statjs").innerHTML=encodeURI(urlparam)+'<hr>';
	}	
}

function clearall(){
	document.itemForm.id.value='';
    //document.itemForm.idusers.value='';
	document.itemForm.lat.value='';
	document.itemForm.lon.value='';
	//document.itemForm.idgiaidoansinhtruong.value='';
	//document.itemForm.idloaibenh.value='';
	document.itemForm.ghichu.value='';
	//document.itemForm.ngaythunhan.value='';
	document.itemForm.hinh1.value='';
	document.itemForm.hinh2.value='';
	document.itemForm.hinh3.value='';
	//document.itemForm.idlinhvuc.value='';
	//document.itemForm.idloaicaycon.value='';
	//document.itemForm.idgiongcaycon.value='';
	document.getElementById('imgshowhinh1').innerHTML='';
	document.getElementById('imgshowhinh2').innerHTML='';
	document.getElementById('imgshowhinh3').innerHTML='';
	//document.getElementById('thuthap').scrollIntoView();
	menu_click('thuthap');
	removemark();
}

function menu_click(div){
	var thuthapdiv = document.getElementById("thuthap");
	var dulieudiv = document.getElementById("dulieu");
	var huongdandiv = document.getElementById("huongdan");
	var dangnhapdiv = document.getElementById("dangnhap");
	
	thuthapdiv.style.display = "none";
	dulieudiv.style.display = "none";
	huongdandiv.style.display = "none";
	dangnhapdiv.style.display = "none";
	
	document.getElementById(div).style.display = "block";
	
	/*
	var apptitle=document.getElementById('menu_'+div).innerHTML;
	//console.log(apptitle);
	$('#apptitle').html(apptitle);
	*/
	switch(div) {
		case 'thuthap':
			var apptitle='Thu thập';
			//alert('thuthap');
			break;
		case 'dulieu':
			var apptitle='Dữ liệu';
			break;
		case 'huongdan':
			var apptitle='Trợ giúp';
			break;
		case 'dangnhap':
			var apptitle='Đăng nhập';
			break;
		default:
			var apptitle='Nông nghiệp An Giang';
	}
	$('#apptitle').html(apptitle);
}
function page_default(){
	var thuthapdiv = document.getElementById("thuthap");
	var dulieudiv = document.getElementById("dulieu");
	var huongdandiv = document.getElementById("huongdan");
	var dangnhapdiv = document.getElementById("dangnhap");
	
	thuthapdiv.style.display = "none";
	dulieudiv.style.display = "none";
	huongdandiv.style.display = "none";
	dangnhapdiv.style.display = "none";
	
	//loadapp_count
	if(getCookie('loadapp_count')==0){
		document.getElementById("dangnhap").style.display = "block";
		var login_cookie=getCookie('login');
		if(login_cookie=='true'){
			//thuthapdiv.style.display = "none";
			//thuthapdiv = document.getElementById("thuthap")
			document.getElementById('login_fieldset').style.display = "none";
			$('#messdiv').fadeIn();
			var login_success_txt='Đăng nhập thành công.';
			FULLNAME=getCookie('fullname');
			EMAIL=getCookie('email');
			IDUSERS=getCookie('id');
			var login_classdiv=getCookie('login_classdiv');
			//login_success_txt+=readCookie('fullname').'<br>';
			//login_success_txt+=readCookie('email').'<br>';
			$('#messdiv').html(login_success_txt);
			$('#messdiv2').html('<h3>'+FULLNAME+'<br>'+EMAIL+'</h3>');
			document.getElementById('messdiv').className=login_classdiv;
			$('#user_info_div').html('<div style="font-size: 18px;">'+FULLNAME+'</div><div style="font-size: 15px;">'+EMAIL+'</div>');
		}
	}else{
		document.getElementById("thuthap").style.display = "block";
	}
	
}