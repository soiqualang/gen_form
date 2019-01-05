function writeCookie(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
//var sId = 's234543245';
//writeCookie('sessionId', sId, 3);

function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}
//var sId = readCookie('sessionId')


function getCookie(c_name) {
    return localStorage.getItem(c_name);
}

function setCookie(c_name, value, expiredays) {
    return localStorage.setItem(c_name, value);
}


function dologout(){
	setCookie('login', false, 30);
	setCookie('email', '', 30);
	setCookie('fullname', '', 30);
	setCookie('id', '', 30);
	setCookie('loadapp_count', '', 30);
	var thuthapdiv = document.getElementById("thuthap");
	var dulieudiv = document.getElementById("dulieu");
	
	thuthapdiv.style.display = "none";
	dulieudiv.style.display = "none";
	w3_close();
	menu_click('dangnhap');
	checklogin();
	
	document.getElementById("menu_thuthap").style.display = "none";
	document.getElementById("menu_dulieu").style.display = "none";
	document.getElementById("user_info").style.display = "none";
	document.getElementById("menu_dangnhap").style.display = "block";
	
	
}


function checklogin(){
	var login_cookie=getCookie('login');
	if(login_cookie=='true'){
		//thuthapdiv.style.display = "none";
		//thuthapdiv = document.getElementById("thuthap")
		document.getElementById('login_fieldset').style.display = "none";
		$('#messdiv').fadeIn();
		$('#messdiv2').fadeIn();
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
	}else{
		document.getElementById("menu_thuthap").style.display = "none";
		document.getElementById("menu_dulieu").style.display = "none";
		document.getElementById("user_info").style.display = "none";
		document.getElementById("menu_dangnhap").style.display = "block";
		
		
		document.getElementById('login_fieldset').style.display = "block";
		$('#messdiv').hide();
		$('#messdiv2').hide();
		$('#messdiv').html('');
		$('#messdiv2').html('');
	}
}

$(document).ready(function(){
	// Validate form
	$("#form_dangnhap").validate({
		errorElement: "span", // Định dạng cho thẻ HTML hiện thông báo lỗi
		submitHandler: function(form) {
		
			// Validate thành công sẽ lấy dữ liệu từ form và gởi đến test.php
			//var password= $('#password').attr('value');
			var password=document.getElementById('password').value;
			//var email= $('#email').attr('value');
			var email=document.getElementById('email').value;
			//alert(password);
		 
			$.ajax({
				type: "POST", // phương thức gởi đi
				url: urllogin, // nơi mà dữ liệu sẽ chuyển đến khi submit
				data: "password="+ password +"&email="+ email, // giá trị post
				success: function(answer){ // if everything goes well
					//alert(answer);					
					var user_info = JSON.parse(answer);
					//alert(user_info.login);
					if(user_info.login==true){
						//$('form#form_dangnhap').hide(); // ẩn form đi
						setCookie('login', true, 30);
						setCookie('email', user_info.email, 30);
						setCookie('fullname', user_info.fullname, 30);
						setCookie('id', user_info.id, 30);
						setCookie('login_classdiv', user_info.login_classdiv, 30);
						setCookie('loadapp_count', 0, 30);
						loadapp();
						//menu_click('thuthap');
						FULLNAME=user_info.fullname;
						EMAIL=user_info.email;
						$('#messdiv2').html('<h3>'+FULLNAME+'<br>'+EMAIL+'</h3>');
					}
					$('#messdiv').fadeIn();
					$('#messdiv2').fadeIn();
					document.getElementById('messdiv').className=user_info.login_classdiv;					
					var login_success_txt=user_info.login_mess;
					$('#messdiv').html(login_success_txt);
				}
			});
			return false;  // Form sẽ không chuyển đến trang test.php
			 
		 }
	});
});