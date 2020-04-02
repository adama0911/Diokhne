(function(global){
	'stric'
	
	let link = 'http://localhost/test-backend-slim/index.php/';
	let url = '';
	let dt = '';
	let datas = null;
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

	let addprodForm = getEl("addprodForm");
	let listcommades = document.querySelector('#listcommades');
	let title_prod = null;
	let prix_prod = null;
	let image_prod = null;
	let quantite = null;
	let categorie_prod = null;
	let description_prod = null;
	let detail_prod = null;
	let submit = null;

	let formData = new FormData();

	if(addprodForm){
		title_prod = addprodForm.querySelector("#title_prod");
		prix_prod = addprodForm.querySelector("#prix_prod");
		image_prod = addprodForm.querySelector("#image_prod");
		quantite = addprodForm.querySelector("#quantite");
		categorie_prod = addprodForm.querySelector("#categorie_prod");
		description_prod = addprodForm.querySelector("#description_prod");
		detail_prod = addprodForm.querySelector("#detail_prod");
		submit = addprodForm.querySelector("#submit");

		submit.addEventListener("click", function(e){
			e.preventDefault();
			formData.append("uploads",(image_prod.files)[0]);
			/*formData.append("prix",prix_prod.value);
			formData.append("titre",title_prod.value);
			formData.append("quantite",quantite.value);
			formData.append("categorie",categorie_prod.value);
			formData.append("description",description_prod.value);
			formData.append("detail",detail_prod.value);*/

			//dt = "params="+ JSON.stringify({opt:"ajouter produit",titre: title_prod.value ,prix: prix_prod.value,image: image_prod.files[0], quantite: quantite.value, categorie: categorie_prod.value , description:description_prod.value, detail:detail_prod.value});
			//console.log(formData);
			//window.location.href = "single-product.html?prod="+(datas[i]).idProd;
			url = link + 'file/onUploadfile';

			// $.ajax({
			// 	url:url,
			// 	data: formData,
			// 	ContentType:false,
			// 	cache:false,
			// 	processData:false,
			// 	success: function (response){
			// 		console.log(response);
			// 	}
			// });


			// http(url,'POST',formData).then(
			// 	function(response) {
			// 		console.log(response);
			// 	},

			// 	function(error) {
			// 		console.error("Failed!", error);
			// 	}
			// );
		},false);

		url = link + 'admin/add-produit';

		image_prod.addEventListener("change", function(e) {
		    // Get the selected file from the input element
		    /*let formData = new FormData();
		    formData.append('uploads',image_prod.files[0]);
		    http(url,'POST',formData).then(
					function(response) {
						console.log(response);
					},

					function(error) {
					  	console.error("Failed!", error);
					}
			);*/
		   	
		})
	}

	let prix = 0;
	let telephone = 0;
	let src = 0;
	let name = "";

	if(listcommades){
		let trs = listcommades.querySelectorAll("tr");
		

		for (let i =  0; i < trs.length; i++) {
			console.log(trs[i]);
		}

		url = link + 'home/produits';

		http(url,'POST',dt).then(
			function(response) {
				datas = (JSON.parse(response)).datas;

				for (let i =  0; i < trs.length; i++) {

					prix = datas[i].prix;
					quantite = datas[i].quantite;
					telephone = datas[i].prix;
					src = datas[i].image;
					name = datas[i].titreProd;

					((trs[i]).querySelector("#img_produits")).setAttribute('src',src);
					((trs[i]).querySelector("#amount")).textContent = prix.toString() + " CFA";
					((trs[i]).querySelector("#wishlist-in-stock")).textContent = quantite.toString() ;
					// ((trs[i]).querySelector("#telephone")).textContent = telephone.toString();
					((trs[i]).querySelector("#product-name")).textContent = name.toString();
					// ((trs[i]).querySelector("#product-add-to-cart")).addEventListener("click", function(e){
					// 	// e.preventDefault();
					// 	// url = link+ 'home/cart';
					// 	// dt = "params="+ JSON.stringify({opt:"cart",idProd: parseInt((datas[i]).idProd)})
					// 	// http(url,'POST',dt).then(
					// 	// 	function(response) {
					// 	// 		console.log(response);
					// 	// 		window.location.href = "cart.html";
					// 	// 	},

					// 	// 	function(error) {
					// 	// 	  	console.error("Failed!", error);
					// 	// 	}
					// 	// );	
					// 	console.log('cart');
					// },false);
				}
			},

			function(error) {
			  	console.error("Failed!", error);
			}
		);
	}




	



})(this);