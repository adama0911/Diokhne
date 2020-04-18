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

	let tab__container = document.querySelector('.tab__container');
	let new_product = document.querySelector('.new_product');
	let tab__containerItems = null;
	if (tab__container != null && tab__container != undefined){
       tab__containerItems = tab__container.querySelectorAll(".product");
	}

	let src = '';
	let prixOld = 0;
	let prix = 0;
	let titreProd = '';
	let descriptionProd = '';

	url = link + 'home/produits';

	http(url,'POST',dt).then(
			function(response) {
				datas = (JSON.parse(response)).datas;
				(new_product.querySelector(".product_img")).setAttribute('src',(datas[0]).image);
				for (let i = 0 ; i < tab__containerItems.length ; i++) {
						src = (datas[i]).image;
						prixOld = (datas[i]).prixOld;
						prix = (datas[i]).prix;
						titreProd = (datas[i]).titreProd;
						descriptionProd = (datas[i]).descriptionProd;

						if(tab__containerItems[i].querySelector(".old_prize") != null){
							((tab__containerItems[i]).querySelector(".old_prize")).textContent = prixOld.toString() + " CFA";
							((tab__containerItems[i]).querySelector(".new_prize")).textContent = prix.toString() + " CFA";
							
						}

						if(tab__containerItems[i].querySelector(".img_produit") != null){
							
							img = (tab__containerItems[i]).querySelectorAll(".img_produit");
							
							for (let j = 0; j < img.length; j++) {
								img[j].setAttribute('src',src);
								img[j].addEventListener("click", function(e){
									e.preventDefault();
									window.location.href = "single-product.html?prod="+(datas[i]).idProd;
	
								},false);

							}																							
						}

						if((tab__containerItems[i]).querySelector(".title_product") != null){
							((tab__containerItems[i]).querySelector(".title_product")).textContent = titreProd;
						}

						if((tab__containerItems[i]).querySelector(".cart") != null){
							((tab__containerItems[i]).querySelector(".cart")).addEventListener("click", function(e){
								e.preventDefault();
								url = link+ 'home/cart';
								dt = "params="+ JSON.stringify({opt:"cart",idProd: parseInt((datas[i]).idProd)})
								http(url,'POST',dt).then(
									function(response) {
										console.log(response);
										window.location.href = "cart.html";
									},

									function(error) {
									  	console.error("Failed!", error);
									}
								);	
								console.log('cart');
							},false);
						}
						
						if((tab__containerItems[i]).querySelector(".wishlist") != null){
							((tab__containerItems[i]).querySelector(".wishlist")).addEventListener("click", function(e){
								e.preventDefault();
								url = link+ 'home/wishlist';
								dt = "params="+ JSON.stringify({opt:"wishlist",idProd: parseInt((datas[i]).idProd)})
								http(url,'POST',dt).then(
									function(response) {
										console.log(response);
										window.location.href = "wishlist.html";
									},

									function(error) {
									  	console.error("Failed!", error);
									}
								);
								console.log('wishlist');
							},false);
						}

						if((tab__containerItems[i]).querySelector(".compare") != null){
							((tab__containerItems[i]).querySelector(".compare")).addEventListener("click", function(e){
								e.preventDefault();
								url = link+ 'home/wishlist';
								dt = "params="+ JSON.stringify({opt:"wishlist",idProd: parseInt((datas[i]).idProd)})
								http(url,'POST',dt).then(
									function(response) {
										console.log(response);
										// window.location.href = "compare.html";
									},

									function(error) {
									  	console.error("Failed!", error);
									}
								);
								console.log('compare');
							},false);
						}

						if((tab__containerItems[i]).querySelector(".modal-view") != null){
							((tab__containerItems[i]).querySelector(".modal-view")).addEventListener("click", function(){
								src = (datas[i]).image;
								prixOld = (datas[i]).prixOld;
								prix = (datas[i]).prix;
								titreProd = (datas[i]).titreProd;
								(productmodal.querySelector(".prodName")).textContent = titreProd;
								(productmodal.querySelector(".new-price")).textContent = prix.toString() + " CFA";
								(productmodal.querySelector(".old-price")).textContent = prixOld.toString() + " CFA";
								(productmodal.querySelector(".quick-desc")).textContent  = descriptionProd;
								(productmodal.querySelector(".img_modal")).setAttribute('src',src);
								(productmodal.querySelector(".addtocart-btn")).addEventListener("click", function(e){
									e.preventDefault();
									url = link+ 'home/vendre';
									dt = "email="+(productmodal.querySelector(".email_prod")).value+"&tel="+(productmodal.querySelector(".telephone_prod")).value+"&quantite="+ (productmodal.querySelector(".quantite_prod")).value+"&idProd="+ parseInt((datas[i]).idProd);
									http(url,'POST',dt).then(
										function(response) {
											if ((JSON.parse(response)).datas.message=="OK") {
												(productmodal.querySelector(".reponseOK")).textContent = 'Bien enrengisté , nous vous contacterons pour la confirmation';
											}else{
												(productmodal.querySelector(".reponseNO")).textContent = 'Erreur lors de l\'enregistrement.'

											}
										},

										function(error) {
										  	console.error("Failed!", error);
										}
									);
								});

													
								
							});
						}
				}
			},

			function(error) {
			  	console.error("Failed!", error);
			}
	);


})(this);




