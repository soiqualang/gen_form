function switch_map_event(id,state){
	//alert(state);
	//document.getElementById(div).style.display = "block";
	if(id=='switch_loc_input'){
		switch(state){
			case true:
				document.getElementById('getlocdiv').style.display = "block";
				break;
			case false:
				document.getElementById('getlocdiv').style.display = "none";
				break;
			default:
				document.getElementById('getlocdiv').style.display = "block";
		}
	}
	if(id=='switch_map'){
		switch(state){
			case true:
				document.getElementById('mapdiv').style.display = "block";
				break;
			case false:
				document.getElementById('mapdiv').style.display = "none";
				break;
			default:
				document.getElementById('mapdiv').style.display = "block";
		}
	}	
}

function previewForm(){
	var fromrendered=document.getElementById('render').value;
	console.log(fromrendered);
	document.getElementById('frm_preview').innerHTML=fromrendered;
}

function saveForm(){
	(function() {
		function toJSONString( form ) {
			var obj = {};
			var elements = form.querySelectorAll( "input, select, textarea" );
			for( var i = 0; i < elements.length; ++i ) {
				var element = elements[i];
				var name = element.name;
				var value = element.value;

				if( name ) {
					obj[ name ] = value;
				}
			}

			return JSON.stringify( obj );
		}

		document.addEventListener( "DOMContentLoaded", function() {
			var form = document.getElementById( "test" );
			var output = document.getElementById( "output" );
			form.addEventListener( "submit", function( e ) {
				e.preventDefault();
				var json = toJSONString( this );
				output.innerHTML = json;

			}, false);

		});

	})();
}