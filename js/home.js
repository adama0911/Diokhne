(function(global){
	'stric'
	
	let nvpList = null;



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

	let indexNvProd = 0 , indexProd = 0;

	let getELByClass = function(tagName){
		return global.document.getElementsByClassName(tagName);
	}

	function nextIndexNvProd(){
		if(indexNvProd + 1 > 6 ) indexNvProd = 0;
		else indexNvProd++;
		return indexNvProd;
	}
	
	let nvpItems = getELByClass("nvpItem");
	let allProducts = getEl("allProducts");
	let bestSeller =  getEl("bestSeller");
	let productmodal = getEl("productmodal");

	let allProductsItems = null;
	let bestSellerItems = null; 

	if (allProducts != null && allProducts != undefined){
       allProductsItems = (allProducts).querySelectorAll(".allProductsItems");
	}

	if (bestSeller != null && bestSeller != undefined){
       bestSellerItems = (bestSeller).querySelectorAll(".bestSeller");
	}

	function precIndexNvProd(){
		return (6 - indexNvProd);
	}

	function nextProd(){
		indexProd = (indexProd == datas.length) ? 0 : (indexProd + 1);
		indexNvProd = nextIndexNvProd();
	}

	let link = 'http://localhost/test-backend-slim/index.php/';

	let url = link + 'home/produits';
	let datas = '';
	http(url,'POST',datas).then(
			function(response) {
				let datas = (JSON.parse(response)).datas;
				console.log(datas)
				let img = null;
				nvpList = datas;
				let src = '';
				let prix = 0;
				let prixOld = 0;
				let titreProd = '';
				let descriptionProd = '';
				let dt =  '';

			
				if(datas!='' && datas!= undefined  && datas!= null ){
					let item = null;
					for (let i = 0 ; i < nvpItems.length ; i++) {
						src = (nvpList[i]).image;
						prixOld = (nvpList[i]).prixOld;
						prix = (nvpList[i]).prix;
						titreProd = (nvpList[i]).titreProd;
						descriptionProd = (nvpList[i]).descriptionProd;

						if(nvpItems[i].querySelector(".old_prize") != null){
							((nvpItems[i]).querySelector(".old_prize")).textContent = prixOld.toString() + " CFA";
							((nvpItems[i]).querySelector(".new_prize")).textContent = prix.toString() + " CFA";
							
						}

						if(nvpItems[i].querySelector(".img_produit") != null){
							
							img = (nvpItems[i]).querySelectorAll(".img_produit");
							
							for (let j = 0; j < img.length; j++) {
								img[j].setAttribute('src',src);
								img[j].addEventListener("click", function(e){
									e.preventDefault();
									window.location.href = "single-product.html?prod="+(datas[i]).idProd;
	
								},false);

							}																							
						}

						if((nvpItems[i]).querySelector(".title_product") != null){
							((nvpItems[i]).querySelector(".title_product")).textContent = titreProd;
						}

						if((nvpItems[i]).querySelector(".cart") != null){
							((nvpItems[i]).querySelector(".cart")).addEventListener("click", function(e){
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
						
						if((nvpItems[i]).querySelector(".wishlist") != null){
							((nvpItems[i]).querySelector(".wishlist")).addEventListener("click", function(e){
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

						if((nvpItems[i]).querySelector(".compare") != null){
							((nvpItems[i]).querySelector(".compare")).addEventListener("click", function(e){
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

						if((nvpItems[i]).querySelector(".modal-view") != null){
							((nvpItems[i]).querySelector(".modal-view")).addEventListener("click", function(){
								console.log(datas[i]);
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
									url = link+ 'home/achat';
									dt = "params="+ JSON.stringify({opt:"cart",quantite: (productmodal.querySelector(".quantite_prod")).value,idProd: parseInt((datas[i]).idProd)})
									http(url,'POST',dt).then(
										function(response) {
											if (datas[i].message=="OK") {
												(productmodal.querySelector(".reponseOK")).textContent = 'Bien enrengisté , nous vous contacterons pour la confirmation';
											}else{
												(productmodal.querySelector(".reponseNO")).textContent = 'Erreur lors de l\'enregistrement.'

											}
										},

										function(error) {
										  	console.error("Failed!", error);
										}
									);
									console.log(datas[i]);
								});

													
								
							});
						}
						indexProd = 5;
					}



					for (let i = 0 ;  i < allProductsItems.length ;i++) {
						src = (datas[i]).image;
						prixOld = (datas[i]).prixOld;
						prix = (datas[i]).prix;
						titreProd = (datas[i]).titreProd;
						if(allProductsItems[i].querySelector(".old_prize") != null){
							((allProductsItems[i]).querySelector(".old_prize")).textContent = prixOld.toString() + " CFA";
							((allProductsItems[i]).querySelector(".new_prize")).textContent = prix.toString() + " CFA";
														
						}

						if(allProductsItems[i].querySelector(".img_produit") != null){
														
							img = (allProductsItems[i]).querySelectorAll(".img_produit");
														
							for (let j = 0; j < img.length; j++) {
								img[j].setAttribute('src',src);
								img[j].addEventListener("click", function(e){
									e.preventDefault();
									window.location.href = "single-product.html?prod="+(datas[i]).idProd;
	
								},false);
							}																							
						}

						if((allProductsItems[i]).querySelector(".title_product") != null){
							((allProductsItems[i]).querySelector(".title_product")).textContent = titreProd;
						}

						if((allProductsItems[i]).querySelector(".cart") != null){
							((allProductsItems[i]).querySelector(".cart")).addEventListener("click", function(e){
								e.preventDefault();
								url = link+ 'home/cart';
								dt = "params="+ JSON.stringify({opt:"cart",idProd: parseInt((datas[i]).idProd)})
								http(url,'POST',dt).then(
									function(response) {
										console.log(response);
									},

									function(error) {
									  	console.error("Failed!", error);
									}
								);
								console.log('cart');
							},false);
						}
						
						if((allProductsItems[i]).querySelector(".wishlist") != null){
							((allProductsItems[i]).querySelector(".wishlist")).addEventListener("click", function(e){
								e.preventDefault();
								url = link+ 'home/wishlist';
								dt = "params="+ JSON.stringify({opt:"wishlist",idProd: parseInt((datas[i]).idProd)})
								http(url,'POST',dt).then(
									function(response) {
										console.log(response);
									},

									function(error) {
									  	console.error("Failed!", error);
									}
								);
								console.log('wishlist');
							},false);
						}

						if((allProductsItems[i]).querySelector(".compare") != null){
							((allProductsItems[i]).querySelector(".compare")).addEventListener("click", function(e){
								e.preventDefault();
								url = link+ 'home/compare';
								dt = "params="+ JSON.stringify({opt:"compare",idProd: parseInt((datas[i]).idProd)})
								http(url,'POST',dt).then(
									function(response) {
										console.log(response);
									},

									function(error) {
									  	console.error("Failed!", error);
									}
								);									
								console.log('compare');
							},false);
						}

						if((allProductsItems[i]).querySelector(".modal-view") != null){
							((allProductsItems[i]).querySelector(".modal-view")).addEventListener("click", function(e){
								console.log(datas[i]);
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
									url = link+ 'home/achat';
									dt = "params="+ JSON.stringify({opt:"cart",quantite: (productmodal.querySelector(".quantite_prod")).value,idProd: parseInt((datas[i]).idProd)})
									http(url,'POST',dt).then(
										function(response) {
											console.log(response);
											(productmodal.querySelector(".reponseOK")).textContent = 'Bien enrengisté , nous vous contacterons pour la confirmation';
											(productmodal.querySelector(".reponseNO")).textContent = 'Erreur lors de l\'enregistrement.'
										},

										function(error) {
										  	console.error("Failed!", error);
										}
									);
									console.log(datas[i]);
								});					
								
							});
						}
					}

					

					
					for (let i = 0 ;  i < bestSellerItems.length ;i++) {
						src = (datas[i]).image;
						prixOld = (datas[i]).prixOld;
						prix = (datas[i]).prix;
						titreProd = (datas[i]).titreProd;
						if(bestSellerItems[i].querySelector(".old_prize") != null){
							((bestSellerItems[i]).querySelector(".old_prize")).textContent = prixOld.toString() + " CFA";
							((bestSellerItems[i]).querySelector(".new_prize")).textContent = prix.toString() + " CFA";
														
						}

						if(bestSellerItems[i].querySelector(".img_produit") != null){
														
							img = (bestSellerItems[i]).querySelectorAll(".img_produit");
														
							for (let j = 0; j < img.length; j++) {
								img[j].setAttribute('src',src);
								img[j].addEventListener("click", function(e){
									e.preventDefault();
									window.location.href = "single-product.html?prod="+(datas[i]).idProd;
	
								},false);
							}																							
						}

						if((bestSellerItems[i]).querySelector(".title_product") != null){
							((bestSellerItems[i]).querySelector(".title_product")).textContent = titreProd;
						}

						if((bestSellerItems[i]).querySelector(".cart") != null){
							((bestSellerItems[i]).querySelector(".cart")).addEventListener("click", function(e){
								e.preventDefault();
								url = link+ 'home/cart';
								dt = "params="+ JSON.stringify({opt:"cart",idProd: parseInt((datas[i]).idProd)})
								http(url,'POST',dt).then(
									function(response) {
										console.log(response);
									},

									function(error) {
									  	console.error("Failed!", error);
									}
								);	
								console.log('cart');
							},false);
						}

						if((bestSellerItems[i]).querySelector(".wishlist") != null){
							((bestSellerItems[i]).querySelector(".wishlist")).addEventListener("click", function(e){
								e.preventDefault();
								url = link+ 'home/wishlist';
								dt = "params="+ JSON.stringify({opt:"wishlist",idProd: parseInt((datas[i]).idProd)})
								http(url,'POST',dt).then(
									function(response) {
										console.log(response);
									},

									function(error) {
									  	console.error("Failed!", error);
									}
								);	
								console.log('wishlist');
							},false);
						}

						if((bestSellerItems[i]).querySelector(".compare") != null){
							((bestSellerItems[i]).querySelector(".compare")).addEventListener("click", function(e){
								e.preventDefault();
								url = link+ 'home/compare';
								dt = "params="+ JSON.stringify({opt:"compare",idProd: parseInt((datas[i]).idProd)})
								http(url,'POST',dt).then(
									function(response) {
										console.log(response);
									},

									function(error) {
									  	console.error("Failed!", error);
									}
								);	
								console.log('compare');
							},false);
						}

						if((bestSellerItems[i]).querySelector(".modal-view") != null){
							((bestSellerItems[i]).querySelector(".modal-view")).addEventListener("click", function(e){
								console.log(datas[i]);
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
									url = link+ 'home/achat';
									dt = "params="+ JSON.stringify({opt:"cart",tel:(productmodal.querySelector(".telephone_prod")).value,email: (productmodal.querySelector(".email_prod")).value,quantite: (productmodal.querySelector(".quantite_prod")).value,idProd: parseInt((datas[i]).idProd)})
									http(url,'POST',dt).then(
										function(response) {
											console.log(response);
											(productmodal.querySelector(".reponseOK")).textContent = 'Bien enrengisté , nous vous contacterons pour la confirmation';
										},

										function(error) {
										  	console.error("Failed!", error);
										}
									);
									console.log(datas[i]);
								});					
								 (productmodal.querySelector(".quantite_prod")).value
							});
						}

					}
				}

			}, 
			function(error) {
			  	console.error("Failed!", error);
			}
		)
	
	let zoomSingleProduit = function (prodObject){
		console.log(prodObject)
	}


	//======================== Tous les produits ==================



})(this);




