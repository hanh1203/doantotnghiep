jQuery(document).ready(function($) {
	$("#formAddArea").submit(function(event) {
		$("#date").val(Date.now());
		$(this).attr('action', `${window.location.href}`);
	});
	$(".btn-danger").click(function(event) {
		var id = $(this).attr('id');
		$.post(`/remove/${window.location.href.split("admin-set/")[1]}`, {_id: id}, function(data, textStatus, xhr) {
			if(typeof data==="string"){
				location.reload();
			}
		});
	});
});		