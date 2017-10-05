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

function previewFile(file) {
  	var reader = new FileReader();

  	reader.addEventListener("load", function () {
    	preview.src = reader.result;
  	}, false);

  	if (file) {
    	return reader.readAsDataURL(file);
  	}
}

document.getElementById('bitofile').addEventListener('change', readSingleFile, false);