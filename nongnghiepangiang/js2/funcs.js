function getKqquerry(kq){
	//console.log(kq);
	return kq;
}
function getE(elem,tbl,dk,dk_val,callback){
	var query = 'SELECT * FROM '+tbl+' where '+dk+'='+dk_val+';';
	//console.log(query);
	//var tmpval=document.getElementById('tmpval');
	localDB.transaction(function(transaction){
		transaction.executeSql(query, [], function(transaction, results){
			for (var i = 0; i < results.rows.length; i++) {
				var row = results.rows.item(i);
				//tmpval.value=row[elem];
				//console.log(tmpval.value);
			}
			callback(row[elem]);
		}, function(transaction, error){
			updateStatus("Error: " + error.code + "<br>Message: " + error.message);
		});
	});
}