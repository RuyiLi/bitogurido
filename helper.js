function getData(audioFile, callback) {
    var reader = new FileReader();
    reader.onload = function(event) {
        var data = event.target.result.split(',')
         , decodedImageData = btoa(data[1]);                    // the actual conversion of data from binary to base64 format
        callback(decodedImageData);        
    };
    reader.readAsDataURL(audioFile);
}

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

document.getElementById('bitofile').addEventListener('change', readSingleFile, false);