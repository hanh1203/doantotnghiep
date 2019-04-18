jQuery(document).ready(function($) {
	function validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(String(email).toLowerCase());
	}
	function SortByName(a, b){
	  var aName = a.name.toLowerCase();
	  var bName = b.name.toLowerCase(); 
	  return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
	}
	$("#mail-box").children('input').keydown(function(event) {
		if(event.keyCode===13||event.key==="Enter"){
			$(".btn.btn-default").click()
		}
	});
	$("#mail-box").submit(function(event) {
		if(validateEmail($("#mail-box").children('input').val())){
			$("#mail-box").submit();
		}else{
			event.preventDefault();
			$("#mail-box").children('input').addClass('bd-danger');
		}
	});
	$("#searchInput").keyup(function(event) {
		var keyword = $(this).val().toLowerCase();
		$.each($(".product-name"), function(index, val) {
			if($(this).text().toLowerCase().indexOf(keyword)===-1){
				$(this).parent().parent().hide()
			}else{
				$(this).parent().parent().fadeIn("slow");
			}
		});
	});
	$(".sort-product").children('select').change(function(event) {
		if($(this).val()==="name"){
			
		}else{
			
		}
	});
	$("a.compare").click(()=>{
		console.log(this)
	})
	
});