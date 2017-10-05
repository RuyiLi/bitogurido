function readSingleFile(evt) {
	let f = evt.target.files[0]; 
    if (f) {
      	let r = new FileReader();
      	r.onload = function(e) { 
	      	start(e.target.result);
      	}
      	r.readAsText(f);
    } else { 
	    alert("Failed to load file");
    }
}

function readBlob(b){
	let x = new XMLHttpRequest();
	console.log('ok')
	x.onload = function() {
	    alert(x.responseText);
	};
	x.open('get', b);
	x.send();
}

document.getElementById('bitofile').addEventListener('change', readSingleFile, false);