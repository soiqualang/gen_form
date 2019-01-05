function showselectbox(divid,id){
	if(divid=='idlinhvuc'){
		selectbox('idloaicaycon','Loại cây/con','angiang_thucdia_loaicaycon','idlinhvuc='+id);
	}
	if(divid=='idloaicaycon'){
		selectbox('idgiongcaycon','Giống cây/con','angiang_thucdia_giongcaycon','idloaicaycon='+id);
		selectbox('idgiaidoansinhtruong','Giai đoạn sinh trưởng','angiang_thucdia_giaidoansinhtruong','idloaicaycon='+id);
		selectbox('idloaibenh','Loại bệnh','angiang_thucdia_loaibenh','idloaicaycon='+id);
	}
	
	/*	
	selectbox('idgiaidoansinhtruong','Giai đoạn sinh trưởng','angiang_thucdia_giaidoansinhtruong','1=1');
	selectbox('idloaibenh','Loại bệnh','angiang_thucdia_loaibenh','1=1');
	*/
}

function selectbox(name,label,tbl,dk){
	var str='';
	var opt='';
	var divobj=document.getElementById('div_'+name);
	var query = 'SELECT * FROM '+tbl+' where '+dk+';';
	divobj.innerHTML='';
	//alert(query);
	localDB.transaction(function(transaction){
		transaction.executeSql(query, [], function(transaction, results){
			//console.log(results);
			str+='<div class="form-group">';
			str+='<label class="control-label col-sm-2" for="'+name+'">'+label+':</label>';
			str+='<div class="col-sm-10">';
			str+='<select name="'+name+'" id="'+name+'" class="form-control" onchange="showselectbox(this.name,this.value);">';
			str+='<option value="">--Chọn '+label+'--</option>';
			for (var i = 0; i < results.rows.length; i++) {                
				var row = results.rows.item(i);
				//alert(row['ten']);
				str+='<option value="'+row['id']+'">'+row['ten']+'</option>';
			}
			str+='</select>';
			str+='</div>';
			str+='</div>';
			divobj.innerHTML+=str;
		}, function(transaction, error){
			updateStatus("Error: " + error.code + "<br>Message: " + error.message);
		});
	});
	
	//document.write(str);
	//document.getElementById(name).innerHTML+=str;
}