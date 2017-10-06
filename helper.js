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

function Timer(callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function() {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
    };

    this.resume = function() {
        start = new Date();
        window.clearTimeout(timerId);
        timerId = window.setTimeout(callback, remaining);
    };

    this.resume();
}

document.getElementById('bitofile').addEventListener('change', readSingleFile, false);