jQuery(document).ready(function() {
    $("#checkout-page").submit(function(event) {
        event.preventDefault();
    });
    $("#btn-remove-all-item").click(e=>{
        window.location.href = "/payment";
    })
    $(".ip-pay").hover(function() {
        $(this).next("span").css('width', '100%')
    }, function() {
        $(this).next("span").css('width', '0%')
    });
    $(".ip-pay").focusin(function(event) {
        $(this).next("span").css('width', '100%')
        $(this).attr('placeholder', '');
        $(this).prev("span").css('bottom',"5.5em")
        $(this).unbind('hover')
    });
    $(".ip-pay").focusout(function(event) {
        if($(this).val()===""){
            $(this).next("span").css('width', '0%')
            $(this).prev("span").css('bottom',"3.1em")
        }
    });
    $("#button-confirm").click(function(event) {
        alert("Please allow access to your location to be able to order!")
    })
    $(".fName").focusout(function(event) { 
        let real = $(this).val().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        $(this).val(real)
    });
    $(".lName").focusout(function(event) { 
        let real = $(this).val().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        $(this).val(real)
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            $.get( "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCe1F9nnU_h75yopZAOtHw-atE4Ix54YcM&latlng="+ position.coords.latitude + "," + position.coords.longitude +"&sensor=false", function(data) {
                $("#address1").val(data.results[0].formatted_address)
            })
            $("#button-confirm").unbind("click")
            $("#button-confirm").click(function(event) {
                var arrErr = []
                $.each($("form#checkout-page input"), function(index, val) {
                    if($(this).val()===""){
                       arrErr.push($(this)) 
                    }
                });
                if(arrErr.length!==0){
                    $.each(arrErr, function(index, val) {
                        val.addClass("bd-danger");
                        $(".accordion-toggle.collapsed:contains('Step 1: Your Personal Details')").removeClass('collapsed').attr("aria-expanded",true)
                        $("#payment-address-content").attr("aria-expanded",true).css("height","424px").addClass('in')
                    });
                    if(/#payment-address/.test(window.location.href)){
                        window.location.href = window.location.href;
                    }else{
                        window.location.href = window.location.href+"#payment-address"
                    }
                }else{
                    $("#checkout-page").unbind('submit').submit()
                }
            });
        },(err)=>{
            alert("Please allow access to your location to be able to order!")
        });   
    }else{
        alert("Your web browser is not supported online ordering")
    }
});