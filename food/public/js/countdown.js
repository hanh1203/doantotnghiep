var x = 10;
function redirectNow(){
	window.location.href = "/"
}
setInterval(()=>{
	x--;
	$("#countTime").text(`Return to the home page (after ${x} seconds)`)
	if(x===0){
		redirectNow()
	}
},1000)