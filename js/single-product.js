(function(global){
	'stric'
	
	let link = 'http://localhost/test-backend-slim/index.php/';
	let url = '';
	let dt = '';
	let datas  = null;

	url = link + 'home/produits';


	function getUrlVars() {
	    let vars = {};
	    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	        vars[key] = value;
	    });
	    return vars;
	}

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

	let autresProduits = getEl("autresProduits");
	let produitsAssocies = getEl("produitsAssocies");
	let autresProduitsItems = null;
	let produitsAssociesItems = null;
	let wn__single__product =  document.querySelector(".wn__single__product")


	if (autresProduits != null && autresProduits != undefined){
       autresProduitsItems = (autresProduits).querySelectorAll(".product");
	}

	if (produitsAssocies != null && produitsAssocies != undefined){
       produitsAssociesItems = (produitsAssocies).querySelectorAll(".product");
	}

	url = link + 'home/produits';

	http(url,'POST',dt).then(
			function(response) {
				let img = null;
				let src = '';
				let prix = 0;
				let prixOld = 0;
				let titreProd = '';
				let descriptionProd = '';
				let dt =  '';
				datas = (JSON.parse(response)).datas;
				console.log(datas);

				if(datas!='' && datas!= undefined  && datas!= null ){

					for (let i = 0 ; i < autresProduitsItems.length ; i++) {
						src = (datas[i]).image;
						prixOld = (datas[i]).prixOld;
						prix = (datas[i]).prix;
						titreProd = (datas[i]).titreProd;
						descriptionProd = (datas[i]).descriptionProd;

						if(autresProduitsItems[i].querySelector(".old_prize") != null){
							((autresProduitsItems[i]).querySelector(".old_prize")).textContent = prixOld.toString() + " CFA";
							((autresProduitsItems[i]).querySelector(".new_prize")).textContent = prix.toString() + " CFA";
							
						}

						if(autresProduitsItems[i].querySelector(".img_produit") != null){
							
							img = (autresProduitsItems[i]).querySelectorAll(".img_produit");
							
							for (let j = 0; j < img.length; j++) {
								img[j].setAttribute('src',src);
								img[j].addEventListener("click", function(e){
									e.preventDefault();
									window.location.href = "single-product.html?prod="+(datas[i]).idProd;	
								},false);

							}																							
						}

						if((autresProduitsItems[i]).querySelector(".title_product") != null){
							((autresProduitsItems[i]).querySelector(".title_product")).textContent = titreProd;
						}

						if((autresProduitsItems[i]).querySelector(".cart") != null){
							((autresProduitsItems[i]).querySelector(".cart")).addEventListener("click", function(e){
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
						
						if((autresProduitsItems[i]).querySelector(".wishlist") != null){
							((autresProduitsItems[i]).querySelector(".wishlist")).addEventListener("click", function(e){
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

						if((autresProduitsItems[i]).querySelector(".compare") != null){
							((autresProduitsItems[i]).querySelector(".compare")).addEventListener("click", function(e){
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
					}


					for (let i = 0 ; i < produitsAssociesItems.length ; i++) {
						src = (datas[i]).image;
						prixOld = (datas[i]).prixOld;
						prix = (datas[i]).prix;
						titreProd = (datas[i]).titreProd;
						descriptionProd = (datas[i]).descriptionProd;

						if(produitsAssociesItems[i].querySelector(".old_prize") != null){
							((produitsAssociesItems[i]).querySelector(".old_prize")).textContent = prixOld.toString() + " CFA";
							((produitsAssociesItems[i]).querySelector(".new_prize")).textContent = prix.toString() + " CFA";
							
						}

						if(produitsAssociesItems[i].querySelector(".img_produit") != null){
							
							img = (produitsAssociesItems[i]).querySelectorAll(".img_produit");
							
							for (let j = 0; j < img.length; j++) {
								img[j].setAttribute('src',src);
								img[j].addEventListener("click", function(e){
									e.preventDefault();
									window.location.href = "single-product.html?prod="+(datas[i]).idProd;
									// url = link+ 'home/singleProduct';
									// dt = "params="+ JSON.stringify({opt:"singleProduct",idProd: parseInt((datas[i]).idProd)})
									// http(url,'POST',dt).then(
									// 	function(response) {
									// 		console.log(response);
											
									// 	},

									// 	function(error) {
									// 	  	console.error("Failed!", error);
									// 	}
									// );	
								},false);

							}																							
						}

						if((produitsAssociesItems[i]).querySelector(".title_product") != null){
							((produitsAssociesItems[i]).querySelector(".title_product")).textContent = titreProd;
						}

						if((produitsAssociesItems[i]).querySelector(".cart") != null){
							((produitsAssociesItems[i]).querySelector(".cart")).addEventListener("click", function(e){
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
						
						if((produitsAssociesItems[i]).querySelector(".wishlist") != null){
							((produitsAssociesItems[i]).querySelector(".wishlist")).addEventListener("click", function(e){
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

						if((produitsAssociesItems[i]).querySelector(".compare") != null){
							((produitsAssociesItems[i]).querySelector(".compare")).addEventListener("click", function(e){
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
					}
				}
			},

			function(error) {
			  	console.error("Failed!", error);
			}
	);

	url = link + 'singleProduct/singleProduct';
	let  urlParams = getUrlVars();
	dt = 'params='+JSON.stringify({opt:"singleProduct",idProd: urlParams['prod']});
	http(url,'POST',dt).then(
			function(response) {
				let imgs = (wn__single__product).querySelectorAll(".img_produit");
				let rep = (JSON.parse(response)).message;

				let src = rep.image;
				let pro_prise = rep.prix;
				let prod_desc = rep.descriptionProd;
				let title_prod = rep.titreProd;
				let details_prod = rep.detailsProd;
				let email = null;
				let tel = null;
				let qty = null;
				for (let j = 0; j < imgs.length; j++) {
					imgs[j].setAttribute('src',src);
				}

				((wn__single__product).querySelector(".pro_prise")).textContent = pro_prise + " CFA";
				((wn__single__product).querySelector(".prod_desc")).textContent = prod_desc;
				((wn__single__product).querySelector(".title_prod")).textContent = title_prod;
				(document.querySelector(".details_prod")).textContent = details_prod;
				((wn__single__product).querySelector(".tocart")).addEventListener("click", function(e){
					e.preventDefault();
					url = link+ 'home/achat';
					dt = "params="+ JSON.stringify({opt:"cart",idProd: parseInt(rep.idProd), tel: ((wn__single__product).querySelectorAll(".tel")).value, email: ((wn__single__product).querySelectorAll(".email")).value, qty: ((wn__single__product).querySelectorAll(".qty")).value})
					http(url,'POST',dt).then(
						function(response) {
							console.log(response);
							// window.location.href = "cart.html";
						},

						function(error) {
						  	console.error("Failed!", error);
						}
					);	
					console.log('cart');
				},false);
				
				

			},

			function(error) {
			  	console.error("Failed!", error);
			}
	);

})(this);




