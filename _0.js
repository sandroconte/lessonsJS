console.log("New file js")
const $footDx = $("#path133");
const $footSx = $("#path132");

const delaytm = 250
const tm = 800;


const showmeDx = function(){	
	$footDx.delay(delaytm);
	$footDx.show(tm, hidemeDx);
}


const hidemeDx = function(){	
	$footDx.delay(delaytm);
	$footDx.hide(tm, showmeDx);	
}

const showmeSx = function(){	
	$footSx.delay(delaytm);
	$footSx.show(tm, hidemeSx);
}


const hidemeSx = function(){	
	$footSx.delay(delaytm);
	$footSx.hide(tm, showmeSx);	
}

$footDx.hide(tm, function(){
	$footDx.delay(delaytm);
	$footSx.hide(tm, showmeSx);
	$footDx.show(tm, hidemeDx)
})