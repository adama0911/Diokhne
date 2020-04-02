(function(global){
	'stric'
	
	let link = 'http://localhost/test-backend-slim/index.php/';
	let url = '';
	let dt = '';

	let http = function (url,method,datas) {
	  // Return a new promise.
	  return new Promise(function(resolve, reject) {
	    // Do the usual XHR stuff
	    let req = new XMLHttpRequest();
	    req.open(method, url,true);
	    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	    req.onload = function() {
	      // This is called even on 404 etc
	      // so check the status
	      if (req.status == 200) {
	        // Resolve the promise with the response text
	        resolve(req.response);
	      }
	      else {
	        // Otherwise reject with the status text
	        // which will hopefully be a meaningful error
	        reject(Error(req.statusText));
	      }
	    };

	    // Handle network errors
	    req.onerror = function() {
	      reject(Error("Network Error"));
	    };

	    // Make the request
	    req.send(datas);

	  });
	}

//======================== Nouveaux produits ==================
	
	
	let getEl = function(id){
		return global.document.getElementById(id);
	}

	let getELByClass = function(tagName){
		return global.document.getElementsByClassName(tagName);
	}


	http(url,'POST',dt).then(
			function(response) {

			},

			function(error) {
			  	console.error("Failed!", error);
			}
	);

})(this);




