/*!
 LivelyCart-2
 version: 2.2.0
 --------------------------------------------------------------------- 
 Build Timestamp: 1502367828
 Build Date: Thu Aug 10 2017 17:53:48 GMT+0530 (IST)
--------------------------------------------------------------------- */
(function() {
'use strict';

    angular.module('PublicApp', [
        'ngMessages',
        'ngAnimate',
        'ngSanitize',
        'ui.router',
        'ngNotify',
        'ngDialog',
        'angular-loading-bar',
        'selectize',
        'lw.core.utils',
        'lw.security.main',
        'lw.auth',
        'lw.data.datastore',
        'lw.data.datatable',
        'NgSwitchery',
        'lw.form.main',
        'app.service',
        'app.http',
        'app.notification',
        'app.form',
        'app.menu.directive',
        'app.directives',
        'PublicApp.master',
        'UserApp.login',
        'UserApp.logout',
        'UserApp.forgotPassword',
        'UserApp.resendActivationEmail',
        'UserApp.resetPassword',
        'UserApp.changePassword',
        'UserApp.changeEmail',
        'UserApp.register',
        'UserApp.contact',
        'UserApp.profile',
        'UserApp.profileEdit',
        'UserApp.address',
        'UserApp.Addresslist',
        'UserApp.editAddress',
        'PublicApp.display.products',
        'PublicApp.display.featured.products',
        'PublicApp.productDetails',
        'PublicApp.productDetailsDialog',
        'PublicApp.page.details',
        'PublicApp.ShoppingCart.cart',
        'PublicApp.ShoppingCart.orderSummary',
        'PublicApp.Order.list',
        'PublicApp.Order.details',
        'PublicApp.Order.cancel',
        'PublicApp.Order.log',
        'PublicApp.address'
    ]).
    //constant('__ngSupport', window.__ngSupport).
    run([
        '__Auth', '$state', '$rootScope', function(__Auth, $state, $rootScope) {

        // Verify Route Permissions
        __Auth.verifyRoute($state);

        $rootScope.__ngSupport = window.__ngSupport;

    }
    ]).
    config([ 
        '$stateProvider', '$urlRouterProvider', '$interpolateProvider', routes
    ]);

  
    /**
      * Application Routes Configuration
      *
      * @inject $stateProvider
      * @inject $urlRouterProvider
      * @inject $interpolateProvider
      *
      * @return void
      *---------------------------------------------------------------- */

    function routes($stateProvider, $urlRouterProvider, $interpolateProvider) {

        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');

    };

})();;
(function() {
'use strict';
	
	/*
	 PublicController
	-------------------------------------------------------------------------- */
	
	angular
        .module('PublicApp.master', [])
        .controller('PublicController', 	[
			'$rootScope', 
            '$scope', 
            '__Auth', 
            'appServices', 
            'appNotify', 
            '__DataStore',
            '$state',
            PublicController 
	 	]);

	/**
	 * PublicController for main page application
	 *
	 * @inject __Auth
	 * @inject $rootScope
	 * @inject appServices
	 * @inject $scope
	 * 
	 * @return void
	 *-------------------------------------------------------- */

	 function PublicController($rootScope, $scope, __Auth,  appServices
	 	, appNotify,  __DataStore, $state) {

	 	var scope 	= this;

	 	__Auth.refresh(function(authInfo) {
	 		scope.auth_info = authInfo;
	 	});

        scope.unhandledError = function() {

              appNotify.error(__globals.getReactionMessage(19)); // Unhandled errors

        };

	 	$rootScope.$on('lw.events.state.change_start', function () {
	 		appServices.closeAllDialog();    
        });

	 	$rootScope.$on('lw.auth.event.reset', function (event, authInfo) {
	 		scope.auth_info = authInfo;             
        });

	 	$rootScope.$on('lw.form.event.process.started', function (event, data) {
	 		$('button.lw-btn-process span').addClass('fa fa-spinner fa-spin');
        	$('button.lw-btn-process').prop("disabled", true);

    	});

	 	$rootScope.$on('lw.form.event.process.finished', function (event, data) {

        	$('button.lw-btn-process span').removeClass('fa fa-spinner fa-spin');
        	$('button.lw-btn-process').prop("disabled", false);

    	} );

        $rootScope.$on('lw.form.event.fetch.started', __globals.showFormLoader );

        $rootScope.$on('lw.datastore.event.fetch.finished', __globals.hideFormLoader );

        $rootScope.$on('lw.form.event.process.error', scope.unhandledError );

        $rootScope.$on('lw.datastore.event.fetch.error', scope.unhandledError );

        $rootScope.$on('lw.update.cart.string', function (event, data) {

        	scope.cart_string = data.cart_string;
        	scope.status      = data.status;
        	
        	if (scope.status == true) {

	            $('.lw-shopping-cart-btn').fadeIn("highlight", '#FFF',5000
	                    );
        	}

    	});

    	scope.breadcrumbs      = {};
    	scope.store_info       = window.store_info;
    	$rootScope.isPublicApp = window.__appImmutables.publicApp;


        scope.formatAmount = function(amount, currencySymbol, currency, decimalValue) {
                    
           return __globals.priceFormat(amount, currencySymbol, currency);

        };

        /**
        * set page title 
        *
        * @param title
        *
        * @return string
        *---------------------------------------------------------------- */

    	scope.setDocumentPageTitle = function(title) {

	        var newTitle;

	        if (_.isEmpty(scope.store_info.value)) {

	            newTitle = title;

	        } else {
	            newTitle = scope.store_info.value+' - '+title;
	        }

	        angular.element(document).prop('title', newTitle);
        
    	};

	    // define breadcrumb array
    	scope.breadcrumbs.items = [{
        	item : 'Home',
        	url  : $state.href('display_products')
        }];

    	scope.store_info   = window.store_info;

    	// BreadCrumb update event 
	    $rootScope.$on('lw.breadcrumb.update.event', function (event, breadcrumbsArrg) {

	    	// reset on state chage breadcrumb array
       		$rootScope.$on('$stateChangeStart', 
			function(event, toState, toParams, fromState, fromParams){ 
				
       			scope.breadcrumbs.items = [{
		        	item : 'Home',
		        	url  : $state.href('display_products')
		        }];
			});
	    	
	    	// push multilevel breadcrumb
       		if (!_.isEmpty(breadcrumbsArrg[0].items)) {
       			_.forEach(breadcrumbsArrg[0].items, function(item, key) {
			   	    scope.breadcrumbs.items.push(item);	
		    	});	
       		}

       		scope.breadcrumbs.last_item = breadcrumbsArrg[0]['last_item'];
	    });


        $rootScope.$on('lw.current.route.name', function(event, result){ 
            scope.routeStatus = result.routeStatus;
        });

        /**
        * open cart model
        *
        * @param object param1 type 
        *
        * @return void
        *---------------------------------------------------------------- */
        
        scope.openCartDialog  =  function(status) 
        { 	
        	$rootScope.$broadcast('lw.isCart.dialog', { dialog: status });

        	if (status == true) {

          		$('html, body').animate({
			        scrollTop: $("#elementtoScrollToID").offset().top
			    }, 200);

          	} else {

                appServices.showDialog(scope,
                {
                    templateUrl : __globals.getTemplateURL(
                            'shoppingCart.cart-view'
                        )
                },
                function(promiseObj) {
                		
                });

                $rootScope.$on('ngDialog.opened', function (e, $dialog) {
                   
                    if ($('div.lw-shopping-cart-dialog-content').length) {
                        $('div.ngdialog-content').addClass('lw-shopping-cart-dialog');
                    }

                });
          	
          	}
        };


        /**
	    * get cart btn string
	    *
	    * @return void
	    *------------------------------------------------------------------------ */
	    scope.loadCartStatus = false;

	    scope.getCartString = function() {

	        // get data using angular $http.get() method
	        __DataStore.fetch('cart.update.cart.string')
	        		.success(function(responseData) {

				appServices.processResponse(responseData, null,
                    function(reactionCode) {

		            	scope.cart_string 	 = responseData.data.cartString;
		            	scope.loadPage 	 	 = responseData.reaction;
		            	scope.loadCartStatus = true;
		            	if (scope.status === true) {

				            $('.shopping-cart-btn').effect(
				                        "highlight", 
				                        '#FFF',
				                        5000
				                    );
			        	}
                    }
                ); 
	            
    	    });

	    };
	    scope.getCartString();

        /**
          * Check if user logged in
          *
          * @return boolean 
          *---------------------------------------------------------------- */
        
        scope.isLoggedIn = function() {
            return scope.auth_info.authorized;     // is looged in
        };

        /**
          * Check if user logged in
          *
          * @return boolean 
          *---------------------------------------------------------------- */
        
        scope.isAdmin = function() {
            return scope.isLoggedIn() && scope.auth_info.designation === 1;   //check if is admin
        };

        /**
          * Get the logged in user full name
          *
          * @return string 
          *---------------------------------------------------------------- */
        
        scope.getUserFullName = function() {

            if (scope.isLoggedIn()) {
                return scope.auth_info.profile.first_name+' '+scope.auth_info.profile.last_name;
            }

        };
         
    };

})();;
(function() {
'use strict';
	
	/*
	 ProductsController
	-------------------------------------------------------------------------- */
	
	angular
        .module('PublicApp.display.products', [])
        .controller('ProductsController', 	[
            '$scope', 
            '__DataStore', 
            'appServices',
            '__Utils',
            '$state',
            '$compile',
            'appNotify', 
            ProductsController 
	 	]).controller('ProductsFilterController', 	[
            '$scope', '$compile', '__Utils', '$rootScope',
            ProductsFilterController 
	 	]);

	/**
	 * ProductsController for show products
	 * @inject $scope
	 * @inject __DataStore
	 * @inject appServices
	 * @inject __Utils
	 * @inject state
	 * @inject $compile
     * @inject appNotify
	 * 
	 * @return void
	 *-------------------------------------------------------- */

	 function ProductsController($scope, __DataStore, appServices,
	  __Utils, $state, $compile, appNotify) {

	 	var scope = this,
            requestURL;

	 	scope.pageData  	= {};
	 	scope.pageStatus  	= false;
	 	scope.products  	= [];
	 	scope.catID 		= $state.params.categoryID;

        scope.showPagination = false;

        scope.paginationData = __globals.getAppJSItem('productPaginationData');
        scope.remainingItems = scope.paginationData.remainingItems;
        scope.hasMorePages   = scope.paginationData.hasMorePages; 
        scope.categoryData   = __globals.getAppJSItem('categoryData');
        scope.sortOrderUrl   = __globals.getAppJSItem('sortOrderUrl');
        scope.productPrices  = __globals.getAppJSItem('productPrices');
        scope.filterPrices   = __globals.getAppJSItem('filterPrices');
        scope.currentRoute   = __globals.getAppJSItem('currentRoute');
        scope.searchTerm   	 = __globals.getAppJSItem('searchTerm');
		scope.categoryID   	 = __globals.getAppJSItem('categoryID');
        scope.pageType   	 = __globals.getAppJSItem('pageType');
        scope.selectedBrandID= __globals.getAppJSItem('brandID');
        scope.currenCode 	 = __globals.getAppJSItem('currenSymbol');
        scope.filterUrl 	 = __globals.getAppJSItem('filterUrl');
        scope.itemLoadType	 = __globals.getAppJSItem('itemLoadType');
					        
       // scope.productExistOrNot = false;
        
        /**
		 * ProductsController for show products
		 * @inject $scope
		 * @inject __DataStore
		 * @inject appServices
		 * @inject __Utils
		 * @inject state
		 * @inject $stateParams
		 * 
		 * @return void
		 *-------------------------------------------------------- */
        scope.showPagination = function(requestURL) {


            scope.isRequestInProcessing = true;

			__DataStore.fetch(requestURL)
			.success(function(responseData) {

				appServices.processResponse(responseData, null, function(reactionCode) {
					
					var requestData = responseData.data;

					scope.productExistOrNot = requestData.productExistOrNot;
					//scope.productExistOrNot = requestData;

                    scope.endOfList = requestData.paginationData.currentPage == requestData.paginationData.lastPage; 
					scope.remainingItems = requestData.paginationData.remainingItems; 
					scope.hasMorePages   = requestData.paginationData.hasMorePages; 
                    scope.paginationData = requestData.paginationData;
					scope.pageType = requestData.pageType;
                    
					if (!_.isEmpty(requestData.products)) {

					_.forEach(requestData.products, function(product, key) {
						
                        var $items = $compile(__Utils.template('#productListItemTemplate', product))($scope);

                         	// append items to grid                          
                            $masonryInstance.append( $items );

                          	$masonryInstance.imagesLoaded( function() {

                            // add and lay out newly appended items
                                $masonryInstance.masonry( 'appended', $items );

                                scope.isRequestInProcessing = false; 
                            });

						});
					}

                    $('.lw-product-list-popover').popover({
                        html: true, 
                        content: function() {
                            return __globals.getJSString('addon_option_affect_string')
                        }
                    });
										                              
				});
			}).error(function() {

                 scope.isRequestInProcessing = false;

                  appNotify.error(__globals.getReactionMessage(19)); // Unhandled errors
            });
		};

		/**
          * scroll pagination
          *
          * @return void
          *---------------------------------------------------------------- */


        scope.isRequestInProcessing = false;
        scope.scrollPagination = function() {
        	$(window).scroll(function() {
				 
                if ((scope.paginationData.currentPage < scope.paginationData.lastPage && $(window).scrollTop() + $(window).height() > $(document).height() - 300) && scope.isRequestInProcessing == false) {
					scope.paginationData.currentPage = scope.paginationData.currentPage + 1;
					scope.productExistOrNot = true;

					var requestURL = scope.sortOrderUrl+'page='+scope.paginationData.currentPage;

					scope.showPagination(requestURL);
				}
			});
		};
		
		if (scope.itemLoadType === 1) {
			scope.scrollPagination();
		}
		
		scope.loadProductsOnBtnClick = function() {

			if (scope.paginationData.currentPage < scope.paginationData.lastPage) {

				scope.paginationData.currentPage = scope.paginationData.currentPage + 1;
				
				var requestURL = scope.sortOrderUrl+'page='+scope.paginationData.currentPage;
				
				scope.showPagination(requestURL);

			}

		};
	
		
        /**
          * Show details dialog
          *
          * @param object eventObj
          * @return void
          *---------------------------------------------------------------- */
        scope.dialogStatus = false;
        scope.showDetailsDialog   = function(eventObj, pID, pageType) {
        	
            appServices.showDialog({
            		categoryID 	: scope.categoryID,
            		productID 	: pID,
            		pageType 	: pageType,
            		dialogStatus: scope.dialogStatus
            	},
                {
                    templateUrl : __globals.getTemplateURL(
                            'product.details-dialog'
                        )
                },
            function(promiseObj) {
            });

        };

         /**
          * filter dialog product
          *
          * @param brandID
          * @param resultedProudctIds
          *
          * @return void
          *---------------------------------------------------------------- */
		scope.filterDailogProduct = function(filterUrl) {
			
			scope.brandPageType = false;

			__DataStore.fetch(filterUrl)
					   .success(function(responseData) {
				
				scope.brandsData  = responseData.data.productRelatedBrand;
				scope.selectedIDs = scope.brandsData;	

				appServices.showDialog(scope,
                {
                    templateUrl : __globals.getTemplateURL(
                            'product.filter-dialog'
                        )
                },
		        function(promiseObj) {

		        });

			});
        };

    };

    /**
	 * ProductsFilterController for show products
	 *
	 * @inject $scope
	 * @inject $compile
	 * @inject __Utils
	 * @inject $rootScope
	 * 
	 * @return void
	 *-------------------------------------------------------- */

	 function ProductsFilterController($scope, $compile, __Utils, $rootScope) {

	 	var scope 				= this;

	 	scope.dialogData 		= $scope.ngDialogData;
	 	scope.brandsData 		= scope.dialogData.brandsData;
	 	scope.pageType 			= $scope.ngDialogData.pageType;
	 	scope.currentUrl 		= scope.dialogData.currentRoute;
	 	scope.productPrices 	= scope.dialogData.productPrices;
	 	scope.filterPrices 		= scope.dialogData.filterPrices;
	 	scope.selectedBrandID 	= scope.dialogData.selectedBrandID
	 	scope.searchTerm     	= scope.dialogData.searchTerm;
	 	scope.brandPageType     = scope.dialogData.brandPageType;
	 	scope.selectedIDs       = scope.dialogData.selectedIDs;
	 	scope.currenCode        = scope.dialogData.currenCode;

	 	scope.brandExistStatus = false;
	 	if (!_.isEmpty(scope.brandsData)) {
	 		scope.brandExistStatus = true;
	 	};

	 	scope.priceStatus		   = false;
	 	scope.all_brands_selected  = false
	 	scope.unSelectedBrandCount = 0;
	 	
	 	// select brand
	 	angular.forEach(scope.selectedBrandID, function(value, index) {
	 		
	 		if (!_.isEmpty(scope.selectedIDs)) {

	 			scope.unSelectedBrandCount++;

				angular.forEach(scope.selectedIDs, function(brand, bIndex) {

					if (scope.selectedIDs[bIndex]['brandID'] == value) {
						
						scope.selectedIDs[bIndex]['exist'] = true;
					}
					
				});

	 		}

        	
        });

		
	 	// select all brands
        if (!_.isEmpty(scope.brandsData) && scope.unSelectedBrandCount == scope.brandsData.length) {
        	scope.all_brands_selected    = true;
        } else {
        	scope.all_brands_selected    = false;
        }

	 	$scope.$on('ngDialog.opened', function (e, $dialog) {

	 		scope.priceStatus =	false;
	 		// check product price
	 		if (scope.productPrices.min_price != scope.productPrices.max_price) {

		 		scope.priceStatus =	true;
		 		var slider = document.getElementById('lwPriceSlider');

		 		noUiSlider.create(slider, {

							start: [scope.filterPrices.min_price, scope.filterPrices.max_price],
							connect: true,
							behaviour: 'snap', // Move handle on tap, bar is draggable
							tooltips: true,
							range: {
								'min': scope.productPrices.min_price,
								'max': scope.productPrices.max_price
							},
							pips: { // Show a scale with the slider
								mode: 'range',
								density: 5,
								format: wNumb({
									decimals: 0,
									prefix: scope.currenCode+' '
								})
							},
							format: {
							  to: function ( value ) {
								return   scope.currenCode+' '+Math.round(value);
							  },
							  from: function ( value ) {
								return value.replace(scope.currenCode, '');
							  },
							  decimals: 1

						}
				});
			   	// change slider price
				slider.noUiSlider.on('update', function( values, handle) {
					var minValue = values[0];
					minValue = minValue.split(" ");

					var maxValue = values[1];
					maxValue = maxValue.split(" ");

					$('.lw-min-price').prop('value', minValue[1]).prop('name', 'min_price');
		            $('.lw-max-price').prop('value', maxValue[1]).prop('name', 'max_price');
				});
			}
		});


	 	/**/


	 	/**
          * Select or unselect all brands
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.selectAll  = function() {

            // Check if all brands selected 
             if (scope.all_brands_selected) {

                scope.any_brand_selected    = true;
                scope.unSelectedBrandCount = 0;
                
            } else {

                scope.any_brand_selected    = false;
                scope.unSelectedBrandCount = scope.brandsData.length;

            }

            angular.forEach(scope.brandsData, function(value, index) {
            	scope.brandsData[index]['exist'] = scope.all_brands_selected;
            });

        };

        /**
          * Select any brand
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.select = function() {

            scope.unSelectedBrandCount = 0;

            _.forEach(scope.brandsData, function(value) {

                if (value.exist == true) {
                    scope.unSelectedBrandCount++;
                } 

            });

			if (scope.unSelectedBrandCount == scope.brandsData.length) {
            	scope.all_brands_selected    = true;
            } else {
            	scope.all_brands_selected    = false;
            }
        };

         /**
	  	  * Close dialog
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */
        scope.close = function() {

        	$scope.closeThisDialog();
        }

        /**
	  	  * Clear Filter
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */
        scope.clearFilter = function() {

        	$scope.closeThisDialog({close : true});
        	
        }

    };

})();;
(function() {
'use strict';
	
	/*
	 DisplayFeaturedProductsController
	-------------------------------------------------------------------------- */
	
	angular
        .module('PublicApp.display.featured.products', [])
        .controller('DisplayFeaturedProductsController', 	[
            '$scope', 
            '__DataStore', 
            'appServices',
            '__Utils',
            DisplayFeaturedProductsController 
	 	]);

	/**
	 * DisplayFeaturedProductsController for displau products application
	 *
	 * @inject $scope
	 * @inject __DataStore
	 * @inject appServices
	 * @inject __Utils
	 * 
	 * @return void
	 *-------------------------------------------------------- */

	 function DisplayFeaturedProductsController($scope, __DataStore, appServices, __Utils) {

	 	var scope 			= this;
	 	scope.pageData  	= {};
	 	scope.pageStatus  	= false;
	 	scope.products  	= [];

	 	// inject breadcrumb service
	 	appServices.updateBreadcrumbs([ 
			{   items     : '',
				last_item : __globals.getJSString('featured_products') 
			}
 		], $scope);

        /**
        * display all active featured products list
        *
        * @return void
        *---------------------------------------------------------------- */

        scope.getFeaturedProducts  =  function(url) 
        {   
        	 var requestURL = url ? url : 'display.featured.products.list';

         	// send http request to server
         	__DataStore.fetch(requestURL)
            	   .success(function(responseData) {

            	appServices.processResponse(
            		responseData,
            		null, 
            		function(reactionCode) {

	               	var requestData = responseData.data;

            		_.forEach(requestData.data, function(product, key){

                        scope.products.push(product);

                    });
            		
            		scope.pageData  = {
            			"total"         : requestData.total,
			            "per_page"      : requestData.per_page,
			            "current_page"  : requestData.current_page,
			            "last_page"     : requestData.last_page,
			            "next_page_url" : requestData.next_page_url,
			            "prev_page_url" : requestData.prev_page_url,
			            "from"          : requestData.from,
			            "to"            : requestData.to
            		};

            		scope.pageStatus  		= true;
            		scope.mediaURL    		= requestData.product_assets;
            		scope.totalProductCount = requestData.count;

	            });
     		});
        };
        scope.getFeaturedProducts();

	    $(window).scroll( getFeaturedNewProducts );

	    /**
	    * get on scroll products list
	    *
	    * @return void
	    *---------------------------------------------------------------- */
	    
        function getFeaturedNewProducts() {

        	if (scope.pageData.current_page < scope.pageData.last_page 
            && scope.pageStatus 
            && $(window).scrollTop() +1 >= $(document).height() - $(window).height()) {

                scope.pageData.current_page += 1;

                var url = __Utils.apiURL('display.featured.products.list')+'?page='
                            +scope.pageData.current_page;

                scope.getFeaturedProducts(url);
        	}
        
        };

    };

})();;
(function() {
'use strict';
	
	/*
	 ProductDetailsController
	-------------------------------------------------------------------------- */
	
	angular
        .module('PublicApp.productDetails', [])
        .controller('ProductDetailsController', 	[
            '$scope', 
            '__DataStore', 
            'appServices',
            '$stateParams',
            '__Form',
            '$rootScope',
            '$state',
            '__Utils',
            ProductDetailsController 
	 	]);

	/**
	 * ProductDetailsController for product details application
	 * 
	 * @inject __DataStore
	 * @inject appServices
	 * @inject $scope
	 * @inject $stateParams
	 * @inject __Form
	 * @inject $state
	 * @inject $rootScope
	 * 
	 * @return void
	 *-------------------------------------------------------- */

	function ProductDetailsController($scope, __DataStore, appServices,
	$stateParams, __Form, $rootScope, $state, __Utils) {

		var scope = this;

			scope.productID  = __globals.getAppJSItem('productID');
			scope.categoryID = __globals.getAppJSItem('categoryID');
            scope.currencySymbol   = __globals.getAppJSItem('currencySymbol');
            scope.currencyValue    = __globals.getAppJSItem('currencyValue');

			scope = __Form.setup(scope, 'add_product_in_cart_form', 'productData', {
	            modelUpdateWatcher:false
	        });
	        
			scope.pageStatus 	= false;
	 		scope.optionLength 	= false;

    	/**
        * display all active products list
        *
        * @return void
        *---------------------------------------------------------------- */
         	
        scope.getProductDetails  =  function() {

	        // send http request to server
         	__DataStore.fetch({
	                'apiURL'      : 'product.quick.view.details.support_data',
	                'productID'   : scope.productID,
	                'categoryID?' : scope.categoryID
	            }).success(function(responseData) {
            	  
            	appServices.processResponse(responseData, null, function(reactionCode) {
            			
					var requestData   = responseData.data.details;

					scope.productDetails = requestData;

					scope.productData = {
						'name'       : scope.productDetails.name, 
						'quantity'   : 3, 
						'isCartExist': false
					};

					scope = __Form.updateModel(scope, scope.productData);

		          	scope.productDetails.basePriceWithAddonPrice = requestData.newTotalPrice;

					scope.newTotalPriceCount = requestData.newTotalPriceCount;

					scope.productDetails.selectedOptions = requestData.getSelectedOptions;

					if (scope.productDetails) {
			        	scope.productData.name = requestData.name;
			        }
					
					if(!_.isEmpty(scope.productDetails.getSelectedOptions)) {
						scope.optionLength = true;
					}

					scope.productDetails.priceDetails = {
            			'option' 	 : requestData.getSelectedOptions,
            			'total' 	 : requestData.getPrice.total,
            			'base_price' : requestData.getPrice.base_price
                	};

                	// product quantity
					if (requestData.qtyCart > 0) {

						scope.productData.quantity = requestData.qtyCart;
						scope.checkNumber          = true;
						
					} else {
						scope.productData.quantity = 1;
					}

					scope.btnQuantity = requestData.qtyCart;
					scope.productData.isCartExist = requestData.isCartExist;

					scope.pageStatus = true;
					
		        });
     		});
        };
        scope.getProductDetails();


        /**
        * increment decrement quantity
        *
        * @param boolean status 
        * @param int quantity
        *
        * @return void
        *---------------------------------------------------------------- */
	 	scope.getQtyAction = function(status, quantity) {

			// if product status is true 
			if (status == true) {
				(quantity == undefined || isNaN(quantity)) 
				? scope.productData.quantity = 1 
				: scope.productData.quantity = quantity + 1;

			} else {
				// product quantity must be greterThan -1
				var newValue = (quantity - 1);
				(newValue <= 0) 
				? scope.productData.quantity = 1 
				: scope.productData.quantity = newValue;
			}

		};
		

		/**
	  * Add product as a cart item
	  *
	  * @return void
	  *---------------------------------------------------------------- */
	scope.cartAction = false;

	scope.addToCart  =  function() { 
		
	    __Form.process({
	        apiURL      : 'cart.add.item',
	        productID   : scope.productID
	    }, scope).success(function(responseData) {
	    	
	    	scope.cartAction = true;

	    	var requestData = responseData.data;

	        appServices.processResponse(
	            responseData,
	            null, 
	            function() {
	            	
	            	scope.data = {
	                  'cart_string': responseData.data.cartItems,
	                  'status'     : true
	                }
	                scope.updateCartRow(scope.productID, true);
	                $scope.$emit('lw.update.cart.string', scope.data);
	            }
	        );

	    });
	};

    // when the cart item remove from to cart
    $rootScope.$on('remove.cart.row',function(events,resposeData) {

    	if (resposeData.status) {
    		//scope.getProductDetails();
    		scope.updateCartRow(scope.productID, true);
    	};
           
    });

	/**
	  * Add product as a cart item
	  *
	  * @return void
	  *---------------------------------------------------------------- */

	scope.updateCartRow  =  function(productID, option) { 

		var checkOption    = true;

		scope.addonPrices  = [];
		
		if (scope.productData.options != undefined) {
	    	// hold option of addon_price related data 
	    	scope.productDetails.selectedOptions = scope.productData.options[productID];
	    	angular.forEach(scope.productData.options[productID], 
	    		function( value, key ) {
	    			
			    	this.push({
			    			option_name:key,
			    		 	value_name :value.name,
			    		  	addon_price:value.addon_price_format
			    	});
			}, scope.addonPrices );

	    	// hold empty options data 
			angular.forEach(scope.productData.options[productID], 
				function( value, key ) {

					if (value == '' ) {
						checkOption = false;
					}
					
			}, checkOption );
		} 

		__Form.process({
	    	apiURL      :'cart.product.qty.update',
	    	productID   : productID
	    }, scope).success(function(responseData) {

	        appServices.processResponse(
	            responseData,
	            null, 
	            function(reactionCode) {

	            	var requestData = responseData.data;

	            	scope.productDetails.basePriceWithAddonPrice = requestData.formatedTotalPrice;
                    
	            	scope.productDetails.priceDetails         = {
	        			'option' 	 : scope.productDetails.selectedOptions,
	        			'total' 	 : requestData.totalPrice,
	        			'base_price' : requestData.base_price
	            	}

					scope.productData.isCartExist = requestData.isCartExist;

	            	if (requestData.qtyCart > 0 ) {
						scope.productData.quantity = requestData.qtyCart;
						scope.btnQuantity          = requestData.qtyCart;
					} else {
						scope.btnQuantity = 0;
						scope.productData.quantity = 1;
					}
	            }
	        );


	    });

	};

	}
	 	
})();;
(function() {
'use strict';
	
	/*
	 ProductDetailsDialogController
	-------------------------------------------------------------------------- */
	
	angular
        .module('PublicApp.productDetailsDialog', [])
        .controller('ProductDetailsDialogController', 	[
            '$scope', 
            '__DataStore', 
            'appServices',
            '$stateParams',
            '__Form',
            '__Utils',
            ProductDetailsDialogController 
	 	]);

	/**
	 * ProductDetailsDialogController for product details application
	 * 
	 * @inject $scope
	 * @inject __DataStore
	 * @inject appServices
	 * @inject $stateParams
	 * @inject __Form
	 * @inject __Utils
	 * 
	 * @return void
	 *-------------------------------------------------------- */

	function ProductDetailsDialogController($scope, __DataStore, appServices,
	  $stateParams, __Form, __Utils) {

		var scope = this;

        	scope.categoryID 	= $scope.ngDialogData.categoryID;
        	scope.productID 	= $scope.ngDialogData.productID;
        	scope.pageType 		= $scope.ngDialogData.pageType;
        	scope.dialogStatus  = $scope.ngDialogData.dialogStatus;

			scope = __Form.setup(scope, 'add_product_in_cart_form', 'productData', {
	            modelUpdateWatcher:false
	        });
	        
			scope.pageStatus 	= false;
	 		scope.optionLength 	= false;

        	/**
	        * display all active products list
	        *
	        * @return void
	        *---------------------------------------------------------------- */
	         	
	        scope.details  =  function() {

		        // send http request to server
	         	__DataStore.fetch({
		                'apiURL'      : 'product.quick.view.details.support_data',
		                'productID'   : scope.productID,
		                'categoryID?' : scope.categoryID
		            }).success(function(responseData) {
	            	  
	            	appServices.processResponse(responseData, null, function(reactionCode) {
	            			
						var requestData   = responseData.data.details;

						scope.productDetails = requestData;

						// hold product related categories data & make comma Separate
						scope.productDetails.categories = requestData.categories;

			          	scope.productDetails.basePriceWithAddonPrice = requestData.newTotalPrice;

						scope.newTotalPriceCount = requestData.newTotalPriceCount;

						scope.productDetails.selectedOptions = requestData.getSelectedOptions;

						scope.oldPrice = scope.productDetails.old_price;

						if (scope.productDetails) {
				        	scope.productData.name = requestData.name;
				        }
						
						if(!_.isEmpty(scope.productDetails.selectedOptions)) {
							scope.optionLength = true;
						}

						scope.productDetails.priceDetails = {
                			'option' 	 : requestData.getSelectedOptions,
                			'total' 	 : requestData.getPrice.total,
                			'base_price' : requestData.getPrice.base_price
                    	};

                    	// product quantity
						if (requestData.qtyCart > 0) {

							scope.productData.quantity = requestData.qtyCart;
							scope.checkNumber          = true;
							
						} else {
							scope.productData.quantity = 1;
						}

						scope.btnQuantity = requestData.qtyCart;
						scope.productData.isCartExist = requestData.isCartExist;

						scope.pageStatus = true;
						
			        });
	     		});
	        };
	        scope.details();

	         /**
			* Take product quantity action.
			*
			* @param {Number} status
			* @param {Number} qty
			* @return void
			*
			*------------------------------------------------------------------------ */

			scope.getQtyAction = function(status, quantity) {

				// if product status is true 
				if (status == true) {
					(quantity == undefined || isNaN(quantity)) 
					? scope.productData.quantity = 1 
					: scope.productData.quantity = quantity + 1;

				} else {
					// product quantity must be greterThan -1
					var newValue = (quantity - 1);
					(newValue <= 0) 
					? scope.productData.quantity = 1 
					: scope.productData.quantity = newValue;
				}

			};

			/**
			  * Add product as a cart item
			  *
			  * @return void
			  *---------------------------------------------------------------- */
			scope.cartAction = false;

			scope.addToCart  =  function() { 
				
			    __Form.process({
			        apiURL      : 'cart.add.item',
			        productID   : scope.productID
			    }, scope).success(function(responseData) {
			    	
			    	scope.cartAction = true;

			    	var requestData = responseData.data;

			        appServices.processResponse(
			            responseData,
			            null, 
			            function() {
			            	
			            	scope.data = {
			                  'cart_string': responseData.data.cartItems,
			                  'status'     : true
			                }
			                scope.updateCartItem(scope.productID, true);
			                $scope.$emit('lw.update.cart.string', scope.data);
			            }
			        );

			    });
			};

			/**
			  * Add product as a cart item
			  *
			  * @return void
			  *---------------------------------------------------------------- */

			scope.updateCartItem  =  function(productID, option) { 

				var checkOption    = true;

				scope.addonPrices  = [];
				
				if (scope.productData.options != undefined) {
			    	// hold option of addon_price related data 
			    	scope.productDetails.selectedOptions = scope.productData.options[productID];
			    	angular.forEach(scope.productData.options[productID], 
			    		function( value, key ) {
					    	this.push({
					    			option_name:key,
					    		 	value_name :value.name,
					    		  	addon_price:value.addon_price_format
					    	});
					}, scope.addonPrices );

			    	// hold empty options data 
					angular.forEach(scope.productData.options[productID], 
						function( value, key ) {

							if (value == '' ) {
								checkOption = false;
							}
							
					}, checkOption );
				} 

				__Form.process({
			    	apiURL      :'cart.product.qty.update',
			    	productID   : productID
			    }, scope).success(function(responseData) {

			        appServices.processResponse(
			            responseData,
			            null, 
			            function(reactionCode) {

			            	var requestData = responseData.data;

			            	scope.productDetails.basePriceWithAddonPrice = requestData.totalPrice;
			            	scope.productDetails.priceDetails         = {
			        			'option' 	 : scope.productDetails.selectedOptions,
			        			'total' 	 : requestData.totalPrice,
			        			'base_price' : requestData.base_price
			            	}

							scope.productData.isCartExist = requestData.isCartExist;

			            	if (requestData.qtyCart > 0 ) {
								scope.productData.quantity = requestData.qtyCart;
								scope.btnQuantity          = requestData.qtyCart;
							} else {
								scope.btnQuantity = 0;
								scope.productData.quantity = 1;
							}
			            }
			        );


			    });

			};
	};

})();;
(function() {
'use strict';
    
    /*
     DisplayPageDetailsController
    -------------------------------------------------------------------------- */
    
    angular
        .module('PublicApp.page.details', [])
        .controller('DisplayPageDetailsController',   [
        	'$scope',
        	'$state',
            'appServices',
            '__DataStore',
            DisplayPageDetailsController 
        ]);

    /**
      * DisplayPageDetailsController handle add pages form
      * @inject $scope
      * @inject $state
      * @inject appServices
      * @inject __DataStore
      * 
      * @return void
      *-------------------------------------------------------- */

    function DisplayPageDetailsController($scope, $state, appServices, __DataStore) {
    	
        var scope   = this,
        	URL     = {	
        			'apiURL' :'display.page.details',
        			'pageID' : $state.params.pageID
        		};


	 	var activepages = __globals.getActivePagesData(),
	 			pages   = __globals.findParents(activepages, $state.params.pageID),
		    allPages    = pages.reverse(),
			totalPages  = allPages.length - 1;
			
			// get last page 
			_.forEach(pages, function(value, index) {

				if (index == totalPages) {
					scope.last_page = value.title;
				}
			});

			if (totalPages === 0) {

					// inject breadcrumb service
				 	appServices.updateBreadcrumbs([ 
						{   items     : '',
							last_item : scope.last_page 
						}
			 		], $scope);

			} else {

				// initial function remove last index and return remaining indexes
				_.forEach(_.initial(allPages), function(value, index) {

					//inject breadcrumb service
				 	appServices.updateBreadcrumbs([ 
						{   items     : [{
								item: value.title,
								url : value.link 
										? value.link 
										: $state.href('display_page_details',
											{
												'pageID'   :value.key,
												'pageTitle':__globals.slug(value.title)
											})
							}],
							last_item : scope.last_page 
						}
			 		], $scope);
				});
			}

      	/**
      	* get pages info
      	* 
      	* @return void
      	*-------------------------------------------------------- */

        scope.getPageInfo = function() {

        	__DataStore.fetch(URL, scope)
            	.success(function(responseData) {

            	appServices.processResponse(responseData, null, function() {

            		var requestData    = responseData.data;
            		
            	 	scope.pageDetails = requestData;
            	});    

     		});
        };
        scope.getPageInfo();
        
    };

})();;
(function() {
'use strict';
    
    /*
     CartController
    -------------------------------------------------------------------------- */
    
    angular
        .module('PublicApp.ShoppingCart.cart', [])
        .controller('CartController',   [
        	'$rootScope',
        	'$scope',
            'appServices',
            '__DataStore',
            '__Form',
            '__Auth',
            CartController 
        ]);

    /**
      * CartController handle add pages form
      *
      * @inject $rootScope
      * @inject $scope
      * @inject appServices
      * @inject __DataStore
      * @inject __Form
      * @inject 
      * 
      * @return void
      *-------------------------------------------------------- */

    function CartController($rootScope, $scope, appServices, __DataStore, __Form, __Auth) {
    	
        var scope   	= this;
        
        scope.userInfo  = __Auth.authInfo();
        //authorized
        scope = __Form.setup(scope, 'update_cart_form', 'cartData', {
        	modelUpdateWatcher : false
        });

        scope.cartDataStatus = false;

      	/**
	    * Take cart content action action
	    *
	    * @return void
	    *------------------------------------------------------------------------ */

	    scope.cartData = {};
	    scope.disabledStatus = false;
	    scope.dataExistStatus = false;

	    scope.getContentCart = function() {

	        __DataStore
	        	.fetch('cart.get.data')
            	.success(
            	function(responseData) {

            		appServices.processResponse(
            			responseData,
            			null, 
            		function(reactionCode) {

            			var requestData 	 		= responseData.data;
            			scope.anyCartItemInvalid 	= requestData.isValidItem; // any cart item invalid
            			scope.cartData.items 		= requestData.cartItems;
            			scope.cartData.totalPrice  	= requestData.total;
            			scope.cartItemStatus  		= requestData.cartItemStatus;
            			scope.currentRoute			= requestData.currentRoute;
            			scope   = __Form.updateModel(scope, scope.cartData);


            			if (scope.currentRoute == document.location.href) {
	        				var pageType	 	= true;
	        			} else {
	        				var pageType	 	= false;

	        			}
	        			
	        			scope.pageType = pageType;

            			scope.data = {
		                  'routeStatus' : pageType
		                }

            			if (_.isEmpty(requestData.cartItems) || requestData.isValidItem == false) {
            				scope.disabledStatus = false;
            			} else {
            				scope.disabledStatus = true;
            			}

            			scope.cartDataStatus = true;
            			$scope.$emit('lw.current.route.name', scope.data);
            		});
     		});
	    };
	    scope.getContentCart();


	    /**
	    * update product cart quantity in cart
	    *
	    * @return void
	    * 
	    *------------------------------------------------------------------------ */
	    var timer;
	    scope.updateQuantity = function(status, rowID, qty, newPrice) 
	    {	
	        // filter quantity
	        var filterQty = Number(Math.round(qty));
	        scope.cartData.items[rowID].qtyStatus  = false;

	        if (status == 'eventUp') {

	        	
	            if (filterQty > 1) {

	            	if (filterQty > 99999) {
		        		scope.cartData.items[rowID].qty = filterQty;
		        	};
		        	
	            } else {
	            	
	                scope.cartData.items[rowID].qty = 1;
	                scope.cartData.items[rowID].qtyStatus  = true;
	            }

	        } else {

	          if (status == true) {
	                scope.cartData.items[rowID].qty = filterQty + 1;
	            } else {
	                var newValue = (filterQty - 1);
	                  (newValue <= 0) 
	                  ? scope.cartData.items[rowID].qty = 1 
	                  : scope.cartData.items[rowID].qty = newValue;
	          }

	        }

	        if (rowID) {
	        	// clear time
	            window.clearTimeout(timer);

	            // in cart table change quantity fire request per 3 sec
	            timer = window.setTimeout(function(){
	            	
			        __Form.process({
			        		'apiURL'  : 'cart.update.qty',
			        		'itemID'  : rowID
			        	}, scope)
			        	  .success(function(responseData) {

			                appServices.processResponse(
			                    responseData,
			                    null, 
			                    function() {

			                    	var requestData = responseData.data;

			                    	// for new price scope
			                    	scope.cartData.items[rowID].new_price    = requestData.new_price;
			                    	scope.cartData.items[rowID].new_subTotal = requestData.new_subTotal;
			                    	scope.cartData.items[rowID].qty          = requestData.qty;
			                    	scope.cartData.items[rowID].price        = requestData.price;
			                    	scope.cartData.totalPrice  = requestData.total;
			                    	scope.cartData.items[rowID].qtyStatus  = true;

			                    	scope.data = {
					                  'cart_string': requestData.cartItems,
					                  'status'     : true
					                }
					                scope.qtyStatus = true;
					               // scope.getContentCart();
					                $scope.$emit('lw.update.cart.string', scope.data);
					                $rootScope.$emit('remove.cart.row', {'status':true});
			                    }
			                );
		            });
              
		        },500); 
            }												
	    };

	    /**
	  	  * Close dialog and return promise object
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */
	  	
  	  	scope.cancel = function() {
  	  		$scope.closeThisDialog();
  	  	};

  	  	/**
	  	  * remove cart item action
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */
	  	scope.removeCartItem = function(itemID) {

	  		// get data using angular $http.get() method
			__DataStore.post({
			          'apiURL' : 'cart.remove.item',
			          'itemID' : itemID
			}, scope).success(function(responseData) {
			  
			  	appServices.processResponse(responseData, null,
			        function(reactionCode) {

		               	$rootScope.$emit('changeItems',{
		                   status: true
		               	});

		              	scope.data = {
			                'cart_string': responseData.data.cartItems,
			                'status'     : true
		              	}

		              	$scope.$emit('lw.update.cart.string', scope.data);

		              	$( '#rowid_'+itemID ).fadeOut('slow',function() {
		                    //$(this).remove();
		                });

		              	scope.getContentCart();
			        }
			  	); 
			  
			});
	  	};

  	  	/**
	    * remove all items from cart item action
	    *
	    * @return void
	    *------------------------------------------------------------------------ */
	    scope.removeAllItemsItem = function() {

	        // get data using angular $http.get() method

	        __DataStore.post('cart.remove.all.items',scope).success(function(responseData) {
	        	
				appServices.processResponse(responseData, null,
                        function(reactionCode) {

                    	scope.cartData.items = '';
			 			
						scope.data = {
		                  'cart_string': responseData.data.cartItems,
		                  'status'     : true
		                }

		                $scope.$emit('lw.update.cart.string', scope.data);

		                $rootScope.$emit('remove.cart.row', {'status':true});
		                
		                $rootScope.$emit('changeItems',{
			 				status: true
			 			});
			 			
                    	scope.getContentCart();
                    }
                ); 
	            
    	    });

	    };
        
    };

})();;
(function() {
'use strict';
    
    /*
     OrderSummaryController
    -------------------------------------------------------------------------- */
    
    angular
        .module('PublicApp.ShoppingCart.orderSummary', [])
        .controller('OrderSummaryController',   [
        	'$scope',
            '__Form',
            '__DataStore',
            'appServices',
            '__Utils',
            '$rootScope',
            'appNotify',
            OrderSummaryController 
        ])
        .controller('AlertDialogController',   [
            '$scope',
            AlertDialogController 
        ]);

    /**
      * OrderSummaryController handle cart order
      *
      * @inject $scope
      * @inject __Form
      * @inject __DataStore
      * @inject appServices
      * @inject __Utils
      * @inject $rootScope
      * 
      * @return void
      *-------------------------------------------------------- */

    function OrderSummaryController($scope, __Form, __DataStore,
    	appServices, __Utils, $rootScope, appNotify) {
    	
        var scope   			= this;
        	scope 				= __Form.setup(scope, 'cart_order_form', 'orderData', {
        		modelUpdateWatcher : false
        	});
        	scope.couponMessage 		= false;
        	scope.orderData.addressID   = null;
        	scope.orderData.addressID1  = null;
        	scope.pageStatus  			= false; 
        
      /**
        * get cart order detail.
        *
        * @return void
        *------------------------------------------------------------------------ */

        scope.getCartOrderDetails = function(addressID, addressID1, couponCode) {
        	
        	//  Check if country is exist
        	if (!_.isUndefined(addressID)) {
        		scope.addressID = addressID;
        	} else {
        		scope.addressID = null;
        	}

        	if (!_.isUndefined(addressID1)) {
        		scope.addressID1 = addressID1;
        	} else {
        		scope.addressID1 = null;
        	}

        	if (!_.isUndefined(couponCode)) {
        		scope.couponCode = couponCode;
        	} else {
        		scope.couponCode = null;
        	}
        	
        	__DataStore.fetch({
                'apiURL' 		: 'order.summary.details',
                'addressID' 	:  scope.addressID,
                'addressID1' 	:  scope.addressID1,
                'couponCode'	:  scope.couponCode
            },{fresh:true}).success(
            	function(responseData) {
            		appServices.processResponse(
            			responseData,
            			null, 
            		function(reactionCode) {
            			
            			var requestData  = responseData.data.orderSummaryData.data;

                    	scope.orderSupportData = {
                    		'cartItems' 	 			 : requestData.cartItems,
                    		'itemIsInvalid' 	 	     : requestData.itemIsInvalid,
                    		'shippingAddress' 			 : requestData.shippingAddress,
                    		'sameAddress' 			 	 : requestData.sameAddress,
                    		'billingAddress' 			 : requestData.billingAddress,
                    		'shipping' 		 			 : requestData.shipping.info,
                    		'formatedCartTotalPrice'	 : requestData.total.cartTotal,
                    		'cartTotalPrice' 			 : requestData.total.totalBasePrice,
                    		'currency' 		 			 : requestData.total.currency,
                    		'afterAddShipingTotal' 		 : requestData.shipping.totalPrice,
                    		'taxses' 					 : requestData.taxses.info,
                            'formatedTotalTaxAmount'     : requestData.taxses.formatedTotalTaxAmount,
                    		'afterAddTaxTotal' 			 : requestData.taxses.totalPrice,
                    		'totalPayableAmount' 		 : requestData.totalPayableAmount, 
                            'totalPayableAmountForStripe': requestData.totalPayableAmountForStripe,
                    		'totalPayableAmountFormated' : requestData.totalPayableAmountFormated,
                    		'fullName' 					 : requestData.user.fullName,
                    		'couponData' 				 : !_.isEmpty(requestData.couponData)
                    										? requestData.couponData.couponData
                    										: null,
                    		'subtotalPrice' 			 : requestData.shipping.formettedDiscountPrice,
                    		'checkoutMethod' 			 : requestData.checkoutMethod,
                    		'checkoutMethodInfo' 		 : requestData.checkoutMethodInfo
                    	};
                    
                    	var shippingAddess = !_.isEmpty(scope.addressID) 
				                    		? scope.addressID 
				                    		: !_.isEmpty(scope.orderSupportData.shippingAddress) ? scope.orderSupportData.shippingAddress.id :null,

				        	billingAddess = !_.isEmpty(scope.addressID1) 
				                    		? scope.addressID 
				                    		: !_.isEmpty(scope.orderSupportData.billingAddress) ? scope.orderSupportData.billingAddress.id :null;

                    	scope.orderData = {
                    		'fullName' 			  : requestData.user.fullName,
                            'userEmail'           : requestData.user.userEmail,
                            'stripeKey'           : requestData.stripeKey,
                            'description'         : requestData.description,
                    		'addressID' 		  : shippingAddess,
							'checkout_method'	  : scope.orderData.checkout_method,
							'sameAddress'         : scope.orderSupportData.sameAddress,
							'addressID1'		  : billingAddess,
							'totalPayableAmount'  : scope.orderSupportData.totalPayableAmount,
                            'totalPayableAmountForStripe': requestData.totalPayableAmountForStripe,
							'couponCode' 		  : scope.couponCode,
							'currency' 		 	  : requestData.total.currency,
                            'totalTaxAmount'      : requestData.taxses.totalTaxAmount,
                            'totalShippingAmount' : requestData.shipping.totalShippingAmount
                    	};

                        scope.couponData = !_.isEmpty(requestData.couponData)
                                                            ? requestData.couponData
                                                            : null;


						scope = __Form.updateModel(scope, scope.orderData);

	            		scope.isValidItem  = requestData.isValidItem;
                        
                        if (_.isUndefined(scope.orderData.checkout_method)) {
                            scope.disabledStatus  = false;
                        }
                        
                        if (!scope.orderSupportData.shippingAddress
                            || scope.orderSupportData.shipping.type === 4) {
                            scope.disabledStatus  = false;
                        }
                        
	        			// check if current route is order summary
	        			if (requestData.orderRoute == document.location.href) {
	        				scope.showCartBtn = true;
	        			} else {
	        				scope.showCartBtn = false;
	        			}

	        			// send object data to shopping cart button
	        			scope.data = {
		                  'routeStatus' : scope.showCartBtn
		                };

	        			$scope.$emit('lw.current.route.name', scope.data);

	                    scope.pageStatus  = true;
	                    
            	});
     		});
        };
        scope.getCartOrderDetails();

      /**
        * Terms and conditions dialog
        *
        * @return void
        *-----------------------------------------------------------------------*/
        scope.checkValidDataForSubmit = function(paymentData) {
            
            if (scope.isValidItem
                && scope.orderSupportData.shippingAddress
                && scope.orderSupportData.shipping.type !== 4) {
                
                scope.disabledStatus  = true;
            }
        };


      /**
        * apply coupon submit method
        *
        * @param string couponCode
        * @param number orderTotalPrice
        *
        * @return void
        *---------------------------------------------------------------- */
        scope.orderData.coupon = '';
       
        scope.applyCoupon = function(couponCode) {

        	__DataStore.post({
                'apiURL' : 'order.coupon.apply'
            }, scope).success(function(responseData) {

				appServices.processResponse(responseData, function(reactionCode) {
					
                    scope.couponData 	   			    = responseData.data.couponData;
                    scope.couponStatus 				    = reactionCode;
                    scope.invalidCouponCode			    = responseData.data.couponCode;
                    scope.couponMessage 			    = true;
                    scope.orderData.subtotalPrice       = responseData.data.totalPrice;

                    var shippingAddress = !_.isEmpty(scope.orderData.addressID) 
				                    		? scope.orderData.addressID
				                    		: !_.isEmpty(scope.orderSupportData.shippingAddress) ? scope.orderSupportData.shippingAddress.id :null,

						billingAddress  = !_.isEmpty(scope.orderData.addressID1) 
					                    	? scope.orderData.addressID1
					                    	: !_.isEmpty(scope.orderSupportData.billingAddress) ? scope.orderSupportData.billingAddress.id :null;

                    scope.getCartOrderDetails(shippingAddress, billingAddress, scope.couponData.couponCode);

                    scope.validCouponAmtMessage = __ngSupport.getText(
                    							 __globals.getJSString('order_coupon_amount_text'), {
                    							 	'__amount__' : scope.couponData
                    							 });

                    scope.orderData.code = "";
            	});

            });

        };

        scope.disabledStatus = true;

      /**
		* Remove coupon 
		*
		* @return void
		*---------------------------------------------------------------- */

        scope.removeCoupon = function() {

        	//scope.orderData.addressID  = scope.orderSupportData.shippingAddress.id;
        	//scope.orderData.addressID1 = scope.orderSupportData.billingAddress.id;

        	scope.getCartOrderDetails(scope.orderData.addressID, scope.orderData.addressID1, null);
        	scope.couponMessage = false;
        	scope.couponStatus  = null;

        	// Check if discount amount exist 
        	// if exist then remove discount amount
        	if (!_.isEmpty(scope.couponData.discountFormate)) {
        		scope.couponData.discountFormate = '';
        	}
        	
        }



	    /**
	    * remove invalid item in the cart
	    *
	    * @param {Number} itemID - cart item row id.
	    * @return void
	    * 
	    *------------------------------------------------------------------------ */

	    scope.removeAllInvlidCartItem = function(status) {

	        // get data using angular $http.get() method
	        __DataStore.post('cart.remove.invalid.item', scope)
	        	.success(function(responseData) {
					appServices.processResponse(responseData, null,
                        function(reactionCode) {

                        	scope.data = {
			                  'cart_string': responseData.data.cartItems,
			                  'status'     : true
			                }

			                $scope.$emit('lw.update.cart.string', scope.data);
			                $rootScope.$emit('remove.cart.row', {'status':true});
				 			scope.getCartOrderDetails(scope.orderData.addressID, scope.orderData.addressID1, scope.couponCode);
						}
                	); 
	            
    	    });

	    };

	    /**
	    * call function if any items is invalid on process time 
	    *
	    * @param object param 1 type 
	    *
	    * @return void
	    *---------------------------------------------------------------- */
	    
	    scope.updatOrderSummary = function(responseData) {
            			
			var requestData  = responseData.orderSummaryData;
			
        	scope.orderSupportData = {
        		'cartItems' 	 			 : requestData.cartItems,
        		'itemIsInvalid' 	 	     : requestData.itemIsInvalid,
        		'shippingAddress' 			 : requestData.shippingAddress,
        		'sameAddress' 			 	 : requestData.sameAddress,
        		'billingAddress' 			 : requestData.billingAddress,
        		'shipping' 		 			 : requestData.shipping.info,
        		'formatedCartTotalPrice'	 : requestData.total.cartTotal,
                'formatedTotalTaxAmount'     : requestData.taxses.formatedTotalTaxAmount,
        		'cartTotalPrice' 			 : requestData.total.totalBasePrice,
        		'currency' 		 			 : requestData.total.currency,
        		'afterAddShipingTotal' 		 : requestData.shipping.totalPrice,
        		'taxses' 					 : requestData.taxses.info,
        		'afterAddTaxTotal' 			 : requestData.taxses.totalPrice,
        		'totalPayableAmount' 		 : requestData.totalPayableAmount,
        		'totalPayableAmountFormated' : requestData.totalPayableAmountFormated,
        		'fullName' 					 : requestData.user.fullName,
        		'couponData' 				 : !_.isEmpty(requestData.couponData)
        										? requestData.couponData.couponData
        										: null,
        		'subtotalPrice' 			 : requestData.shipping.formettedDiscountPrice,
        		'checkoutMethod' 			 : requestData.checkoutMethod,
                'checkoutMethodInfo' 		 : requestData.checkoutMethodInfo
        	};

        	var shippingAddress = !_.isEmpty(scope.orderData.addressID) 
				                    		? scope.orderData.addressID
				                    		: !_.isEmpty(scope.orderSupportData.shippingAddress) ? scope.orderSupportData.shippingAddress.id :null,

				billingAddress  = !_.isEmpty(scope.orderData.addressID1) 
			                    	? scope.orderData.addressID1
			                    	: !_.isEmpty(scope.orderSupportData.billingAddress) ? scope.orderSupportData.billingAddress.id :null;

        	scope.orderData = {
        		'fullName' 			 : requestData.user.fullName,
                'userEmail'          : requestData.user.userEmail,
                'description'         : requestData.description,
                'stripeKey'          : requestData.stripeKey,
        		'addressID' 		 : shippingAddress,
				'checkout_method'	 : scope.orderData.checkout_method,
				'sameAddress'        : scope.orderSupportData.sameAddress,
				'addressID1'		 : billingAddress,
				'totalPayableAmount' : scope.orderSupportData.totalPayableAmount,
                'totalPayableAmountForStripe': requestData.totalPayableAmountForStripe,
				'couponCode' 		 : scope.couponCode,
				'currency' 		 	 : requestData.total.currency,
                'totalTaxAmount'     : requestData.taxses.totalTaxAmount,
                'totalShippingAmount': requestData.shipping.totalShippingAmount
        	};
        	
			scope = __Form.updateModel(scope, scope.orderData);

    		if (requestData.isValidItem == false) {
                scope.isValidItem = false;
    			scope.disabledStatus = false;
			} else {
				scope.disabledStatus = true;
			}

			// check if current route is order summary
			if (requestData.orderRoute == document.location.href) {
				scope.showCartBtn = true;
			} else {
				scope.showCartBtn = false;
			}

			// send object data to shopping cart button
			scope.data = {
              'routeStatus' : scope.showCartBtn
            };

			$scope.$emit('lw.current.route.name', scope.data);

            scope.pageStatus  = true;
	                    
        };

	  /**
		* order submit process
		*
		* @return void
		*---------------------------------------------------------------- */
		scope.orderData.totalDiscountAmount = 0;

        scope.handleOrderValidationErrors = function(reaction, responseData) {

            // call function when any invalid data to display to user
            if (reaction == 3) {
                //scope.updatOrderSummary(responseData.data);
                
                appServices.showDialog(responseData,
                {   
                    templateUrl : __globals.getTemplateURL('order.user.alert-dialog')
                },
                function(promiseObj) {

                    if (_.has(promiseObj, 'value') 
                        && promiseObj.value.is_submit_order === true) {

                        //scope.updatOrderSummary(responseData.data);
                        var shippingAddress = !_.isEmpty(scope.orderData.addressID) 
                            ? scope.orderData.addressID
                            : !_.isEmpty(scope.orderSupportData.shippingAddress) ? scope.orderSupportData.shippingAddress.id :null,

                            billingAddress  = !_.isEmpty(scope.orderData.addressID1) 
                                                ? scope.orderData.addressID1
                                                : !_.isEmpty(scope.orderSupportData.billingAddress) ? scope.orderSupportData.billingAddress.id :null;
                        var couponCode = _.isEmpty(scope.couponData) ? null : scope.couponData.couponCode                       
                        scope.getCartOrderDetails(shippingAddress, billingAddress, couponCode);

                    } else {

                        __globals.redirectBrowser(__Utils.apiURL('cart.view')); 

                    }

                   

                });
            }

        };

		scope.orderSubmit  =  function() 
		{ 
            __globals.showProcessingDialog();

			if (!$scope.$parent.publicCtrl.isLoggedIn()) {
        		__globals.redirectBrowser(__Utils.apiURL('user.login'));
        	} 

            if (_.has(scope, 'couponData') 
                && !_.isUndefined(scope.couponData)
                && !_.isEmpty(scope.couponData)) {
                scope.orderData.totalDiscountAmount = scope.couponData.discount;
            }

            if(scope.orderData.checkout_method === 6) {

                var orderData   = scope.orderData, 
                    dataRecieved = null,
                    tokenRecieved = null,
                     handler = StripeCheckout.configure({
                      key: orderData.stripeKey,
                     // image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
                      locale: 'auto',
                      description: orderData.description,
                      email: orderData.userEmail,
                      amount: orderData.totalPayableAmountForStripe,
                      currency: orderData.currency,
                      allowRememberMe: false,
                      token: function(token) {

                        tokenRecieved = token.id;

                        // Token is ready lets go and charge the card
                        __DataStore.post('order.stripe.checkout', _.assign({
                            'stripeToken' : token.id,
                            'checkout_method' : 6,                                
                        }, scope.orderData), scope)
                        .success(function(responseData) {  

                            dataRecieved = responseData.data;                                

                            appServices.processResponse(responseData, function(reaction) {

                                // check response has other error
                                if((responseData.reaction !== 1) && dataRecieved.orderPaymentToken) {
                                        __globals.redirectBrowser(__Utils.apiURL('order.payment_cancelled', {
                                        'orderToken' : dataRecieved.orderPaymentToken
                                    }));
                                } else if(responseData.reaction !== 1) {

                                    scope.handleOrderValidationErrors(reaction, responseData);
                                    
                                    if (reaction == 2 && _.has(responseData.data, 'orderSummaryData')) {
                                        scope.updatOrderSummary(responseData.data);
                                    }
                                }
                                
                            }, function() {
                                // if found ok redirect customer to thank you page
                                __globals.redirectBrowser(__Utils.apiURL('order.thank_you_stripe', {
                                    'orderToken' : dataRecieved.orderPaymentToken
                                }));

                            }); 

                        });

                      },
                      opened: function() {
                        __globals.hideProcessingDialog();
                      },
                      closed: function() {

                        // check if opted token if then show process dialog
                        if(tokenRecieved) {
                            __globals.showProcessingDialog();
                        } else if(!_.isEmpty(dataRecieved) && dataRecieved.orderPaymentToken) {
                            __globals.redirectBrowser(__Utils.apiURL('order.payment_cancelled', {
                                'orderToken' : dataRecieved.orderPaymentToken
                            }));
                        }
                      }
                    }).open();

                    // Close Checkout on page navigation:
                    window.addEventListener('popstate', function() {
                      handler.close();
                    });


            } else { // NOT Stripe

                __Form.process('order.process', scope)
                .success(function(responseData) {

                    appServices.processResponse(responseData, {
                        then: function(reaction) {
                            
                            scope.handleOrderValidationErrors(reaction, responseData);

                            if (reaction == 2 && _.has(responseData.data, 'orderSummaryData') ) {
                                scope.updatOrderSummary(responseData.data);
                            }     
                        }

                    }, function() {
                    
                        if (responseData.reaction == 1 && (responseData.data.ckMethod == 1)) {
                            __globals.redirectBrowser(__Utils.apiURL('order.paypal.checkout', {
                                'orderUID' : responseData.data.orderID
                            }));

                        } else if (responseData.reaction == 1) {
                            __globals.redirectBrowser(__Utils.apiURL('my_order.details', {
                                'orderUID' : responseData.data.orderID
                            }));
                        }       
                    });   
                     

            });

            }

            
		};


	  /**
        * shipping & billing address not same
        *
        * @param sameAddress.
        * @param shippingAddress
        *
        * @return void
        *
        *------------------------------------------------------------------------ */
        scope.sameAsAddress = function(sameAddress, shippingAddress) {
        	
        	if (sameAddress == false) {

        		scope.orderSupportData.billingAddress = '';
        		scope.orderData.addressID1 = '';
                
        	} else {

                scope.getCartOrderDetails(
                            scope.orderData.addressID, 
                            scope.orderData.addressID, 
                            scope.couponCode);
            }

        	scope.orderData.sameAddress = sameAddress;
        };

       

	  /**
	    * if user click on change address then open dialog
	    *
	    * @param {boolean} sameAddress
	    * @param {string}  addressType
	    * @param {string}  countryCode
	    *
	    * @return void
	    *---------------------------------------------------------------- */
	    
	    scope.openAddressListDialog  =  function(sameAddress, addressType) 
	    {  
	    	appServices.showDialog(scope,
	        {	
	            templateUrl : __globals.getTemplateURL('address.list-dialog')
	        },
	        function(promiseObj) {
	        	
	        	if (!_.isUndefined(promiseObj.value) && (promiseObj.value != '$closeButton')) {

	        		var selectedaddress = promiseObj.value.selectedAddress;

	        		if (sameAddress == false && addressType == 'billing') {

		        		scope.orderSupportData.billingAddress   = selectedaddress;
		        		scope.orderData.addressID1   		    = selectedaddress.id;
		        		scope.orderSupportData.sameAddress  	= false;
                        scope.getCartOrderDetails(scope.orderData.addressID, scope.orderData.addressID1, scope.couponCode);

		        	} else if(sameAddress == true && addressType == 'billing') {

		        		scope.orderSupportData.shippingAddress = selectedaddress;
		        		scope.orderSupportData.billingAddress  = selectedaddress;
		        		scope.orderData.addressID   		   = selectedaddress.id;
		        		scope.orderData.addressID1   		   = selectedaddress.id;


		        	} else if(sameAddress == true && addressType == 'shipping') {

						scope.orderSupportData.shippingAddress = selectedaddress;
		        		scope.orderSupportData.billingAddress  = selectedaddress;
		        		scope.orderData.addressID   		   = selectedaddress.id;
		        		scope.orderData.addressID1   		   = selectedaddress.id;
		        		scope.getCartOrderDetails(scope.orderData.addressID, scope.orderData.addressID1, scope.couponCode);

                        if (scope.orderSupportData.shipping.type !== 4) {
                            scope.disabledStatus  = true;
                        }

		        	} else if(sameAddress == false && addressType == 'shipping') {

						scope.orderSupportData.shippingAddress = selectedaddress;
						scope.orderData.addressID   		   = selectedaddress.id;
						
						scope.orderData.addressID1 = _.isEmpty(scope.orderData.addressID1) ? scope.orderSupportData.billingAddress.id : scope.orderData.addressID1;
                        
                        if (scope.orderSupportData.shipping.type !== 4) {
                            scope.disabledStatus  = true;
                        }
		        		

		        		if (!_.isEmpty(scope.orderData.addressID) && scope.orderData.addressID === scope.orderData.addressID1) {
		        			scope.orderData.addressID1  = selectedaddress.id;
		        			scope.orderSupportData.sameAddress  = true;
		        		}

						scope.getCartOrderDetails(
							scope.orderData.addressID, 
							scope.orderData.addressID1, 
							scope.couponCode);

		        	} 
	        	}
	        });

	    };


        /**
	    * remove cart item action
	    *
	    * @param {Number} itemID - cart item row id.
	    * @return void
	    * 
	    *------------------------------------------------------------------------ */

	    scope.removeCartItem = function(itemID) {

	        // get data using angular $http.get() method
	        __DataStore.post({
	        	'apiURL' : 'cart.remove.item',
                'itemID' : itemID
	        }, scope).success(function(responseData) {

				appServices.processResponse(responseData, null,
                    function(reactionCode) {
			 			
			 			scope.data = {
		                  'cart_string': responseData.data.cartItems,
		                  'status'     : true
		                }

		                $scope.$emit('lw.update.cart.string', scope.data);

			 			$('#rowid_'+itemID).fadeOut('slow',function() {
                            $(this).remove();
                        }); 
                        scope.getCartOrderDetails();

                    }
                ); 
	            
    	    });

	    };

	    /**
	    * remove cart item of product out of stock and invalid
	    *
	    * @param {Number} itemID - cart item row id.
	    * @return void
	    * 
	    *------------------------------------------------------------------------ */

	    scope.removeAllCartItem = function(status) {

	        // get data using angular $http.get() method
	        __DataStore.post('cart.remove.invalid.item', scope)
	        	.success(function(responseData) {
					appServices.processResponse(responseData, null,
                        function(reactionCode) {

                        	scope.data = {
			                  'cart_string': responseData.data.cartItems,
			                  'status'     : true
			                }

			                $scope.$emit('lw.update.cart.string', scope.data);
				 			scope.getCartOrderDetails();
						}
                	); 
	            
    	    });

	    };
	 
    };


    function AlertDialogController($scope) {

        var scope            = this;
            scope.pageStatus = false;

            if ($scope.ngDialogData) {
                scope.message    = $scope.ngDialogData.data.message;
                scope.pageStatus = true;
            }
            
      /**
        * Response for submit order
        *
        * @return void
        *-----------------------------------------------------------------------*/
    
        scope.yesSubmitIt = function()
        {
            $scope.closeThisDialog({'is_submit_order' : true})
        }; 
    
        
        /**
        * Close this dialog
        *
        * @return void
        *-----------------------------------------------------------------------*/
    
        scope.closeDialog = function()
        {
            $scope.closeThisDialog({'is_submit_order' : false})
        }; 

    };

})();;
(function() {
'use strict';
    
    /*
     MyOrderListController
    -------------------------------------------------------------------------- */
    
    angular
        .module('PublicApp.Order.list', [])
        .controller('MyOrderListController',   [
            '$scope', 
            '__DataStore',
            'appServices',
            '$stateParams',
            '__Auth',
            '__Utils',
            MyOrderListController 
        ]);

    /**
      * MyOrderListController for manage product list
      *
      * @inject $scope
      * @inject __DataStore
      * @inject appServices
      * @inject $stateParams
      * @inject __Auth
      * 
      * @return void
      *-------------------------------------------------------- */

    function MyOrderListController($scope, __DataStore, appServices, $stateParams, __Auth, __Utils) {
	 	
	 	var scope   = this;

		var dtCartOrderColumnsData = [
            {
                "name"      : "order_uid",
                "orderable" : true,
                "template"  : "#orderColumnIdTemplate"
            },
            {
                "name"      : "status",
                "orderable" : true,
                "template"  : "#orderStatusColumnIdTemplate"
            },
            {
                "name"      : "creation_date",
                "orderable" : true,
                "template"  : "#orderColumnTimeTemplate"
            },
            {
                "name"      : null,
                "template"  : "#orderActionColumnTemplate"
            }
        ],
        tabs    = {
            'active'    : {
                id      : 'activeTabList',
                status  : 1
            },
            'cancelled'    : {
                id      : 'cancelledTabList',
                status  : 3
            },
            'completed'    : {
                id      : 'completedTabList',
                status  : 6
            }
        };

    	$('#adminOrderList a').click(function (e) {

        	e.preventDefault();
        	
            var $this       = $(this),
                tabName     = $this.attr('aria-controls'),
                selectedTab = tabs[tabName];
            if (!_.isEmpty(selectedTab)) {
                $(this).tab('show')
                scope.getOrders(selectedTab.id, selectedTab.status);
            }

    	});


        /**
          * get orders list
          *
          * @param number tableID
          * @param number status
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.getOrders   = function(tableID, status) {

            // destroy if existing instatnce available
            if (scope.cartOrderListDataTable) {
                scope.cartOrderListDataTable.destroy();
            }

            scope.cartOrderListDataTable = __DataStore.dataTable('#'+tableID, {
	            url : {
	                'apiURL' : 'cart.get.orders.data',
	                'status' : status
	            },
	            dtOptions   : {
	                "searching" : true,
	                "order"     : [[ 2, "desc" ]],
	                "columnDefs": [
			            {
			                "targets": [1],
			                "searchable": false
			            }
			        ]
	            },
	            columnsData : dtCartOrderColumnsData, 
	            scope       : $scope
	        });
        };

        scope.getOrders('activeTabList', 1);

        /*
	     Reload current datatable
	    -------------------------------------------------------------------- */
	    
	    scope.reloadDT = function () {
	        __DataStore.reloadDT(scope.cartOrderListDataTable);
	    };

        /**
          * log dialog
          *
          * @param number orderID
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.logDialog = function(orderID) {

            __DataStore.fetch({
                    'apiURL'    : 'order.log.dialog',
                    'orderID'   :  orderID
                })
                .success(function(responseData) {
                
                    appServices.processResponse(responseData, null, function() {
                    	
                    	if (responseData.reaction == 9) {
	                    	window.location = __Utils.apiURL('user.login');
	                    }

                        var requestData = responseData.data;

                        appServices.showDialog({
                            'order'         : requestData.cartOrder,
                            'orderLog'      : requestData.orderLog
                        },
                        {
                            templateUrl : __globals.getTemplateURL(
                                'order.user.log'
                            )
                        },
                        function(promiseObj) {});

                    });    

                });

        };



        /**
          * update order dialog
          * 
          * @param orderID
          * @param isAdmin
          * 
          * @return void
          *---------------------------------------------------------------- */
        scope.cancelDialog = function(orderID) {
            
            __DataStore.fetch({
                    'apiURL'    : 'cart.order.cancel',
                    'orderID'   :  orderID
                })
                .success(function(responseData) {
                
                   appServices.processResponse(responseData, null, function() {

                        var requestData = responseData.data;
                        
                        appServices.showDialog({
                            orderData : requestData.order
                        },
                        {
                            templateUrl : __globals.getTemplateURL(
                                'order.user.cancel'
                            )
                        },
                        function(promiseObj) {

                            // Check if category updated
                            if (_.has(promiseObj.value, 'order_updated') 
                                && promiseObj.value.order_updated === true) {
                                scope.reloadDT();
                            }

                        });

                    });    

                });

        };

    };

})();;
(function() {
'use strict';
    
    /*
     MyOrderDetailsController
    -------------------------------------------------------------------------- */
    
    angular
        .module('PublicApp.Order.details', [])
        .controller('MyOrderDetailsController',   [
            '$scope', 
            '__Form',
            '__Utils',
            'appServices',
            MyOrderDetailsController 
        ]);

    /**
      * MyOrderDetailsController for manage product list
      *
      * @inject $scope
      * @inject __Form
      * @inject __Utils
      * 
      * @return void
      *-------------------------------------------------------- */
            

    function MyOrderDetailsController($scope, __Form, __Utils, appServices) {

       	var scope   		 		= this;
       	scope.pageStatus 	 		= false;

        // Get order details
        scope.orderData   		= __globals.getAppJSItem('orderDetails');

        var requestedData 		= scope.orderData.data;
           
        scope.billingAddress   	= requestedData.address.billingAddress;
        scope.shippingAddress   = requestedData.address.shippingAddress;
        scope.sameAddress   	= requestedData.address.sameAddress;

        scope.user				= requestedData.user;
        scope.order				= requestedData.order;
        scope.orderProducts		= requestedData.orderProducts;
        scope.coupon			= requestedData.coupon;
        scope.taxes				= requestedData.taxes;
        scope.shipping			= requestedData.shipping;

        scope.pageStatus = true; 

	  /**
		* If user order payment is pending then he will allow to update
		* his payment using PayPal
		*
		* @param string orderUID
		*
		* @return void
		*---------------------------------------------------------------- */

        scope.updatePayment = function(orderUID) {

        	__globals.redirectBrowser(__Utils.apiURL('order.paypal.checkout', {
                	'orderUID' : orderUID
                }));
        };

        /**
          * Contact to store/Admin Dialog
          * 
          * @return void
          *---------------------------------------------------------------- */

        scope.contactStoreDialog = function(orderUID) {
        	
            appServices.showDialog({

            	orderUID : orderUID
            },
            {
                templateUrl : __globals.getTemplateURL('order.user.contact-store')
            },
            function(promiseObj) {});
        };
    };

})();;
(function() {
'use strict';
    
    /*
     MyOrderLogController
    -------------------------------------------------------------------------- */
    
    angular
        .module('PublicApp.Order.log', [])
        .controller('MyOrderLogController',   [
            '$scope', 
            '__Form',
            MyOrderLogController 
        ]);

    /**
      * MyOrderLogController for manage product list
      *
      * @inject $scope
      * @inject __Form
      * 
      * @return void
      *-------------------------------------------------------- */
            

    function MyOrderLogController($scope, __Form) {

       var scope   = this;

        scope = __Form.setup(scope, 'cart_order_log_dialog_form', 'cartData', {
            secured : true
        });
            
        scope.ngDialogData   = $scope.ngDialogData;
        scope.order          = scope.ngDialogData.order;
        scope.orderLog       = scope.ngDialogData.orderLog;
            
        /**
          * Close dialog and return promise object
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.close = function() {
            $scope.closeThisDialog();
        }

    };

})();;
(function() {
'use strict';
    
    /*
     CancelOrderController
    -------------------------------------------------------------------------- */
    
    angular
        .module('PublicApp.Order.cancel', [])
        .controller('CancelMyOrderController',   [
            '$scope', 
            '__Form',
            'appServices',
            CancelMyOrderController 
        ]);

    /**
      * CancelMyOrderController for update order status
      *
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */
            

    function CancelMyOrderController($scope, __Form, appServices) {

       var scope  = this;
			scope = __Form.setup(scope, 'form_order_update', 'orderData');
			scope.ngDialogData = $scope.ngDialogData;
			scope = __Form.updateModel(scope, scope.orderData);


            /**
		  	  * process update order
		  	  *
		  	  * @return void
		  	  *---------------------------------------------------------------- */
			scope.cancel = function() {

		 		// post form data
		 		__Form.process({
						'apiURL'   :'cart.order.cancel.process',
						'orderID'  : scope.ngDialogData.orderData._id 
					}, scope ).success( function( responseData ) {
			      		
					appServices.processResponse(responseData, null, function(reactionCode) {

		                $scope.closeThisDialog( { order_updated : true } );

		            });

			    });

		  	};

			/**
		  	  * Close dialog and return promise object
		  	  *
		  	  * @return void
		  	  *---------------------------------------------------------------- */
	  	  	scope.closeDialog = function() {
	  	  		$scope.closeThisDialog();
	  	  	};

    };

})();;
/*!
 *  Engine      : PublicAddressEngine
 *  Component   : Address
----------------------------------------------------------------------------- */

(function( window, angular, undefined ) {

	'use strict';
	
	/*
	  Public Address Engine
	  -------------------------------------------------------------------------- */
	
	angular.module('PublicApp.address', 		[])

		/**
    	  * AddressListController for list of address
    	  *
    	  * @inject __Utils
    	  * @inject __Form
    	  * @inject $state
    	  * @inject appServices
    	  * 
    	  * @return void
    	 *-------------------------------------------------------- */

		.controller('AddressListController', [ 
            '__Utils',
            '__Form',
            '$state',
            'appServices',
            '$scope',
            '__DataStore',
            function (__Utils, __Form , $state, appServices, $scope, __DataStore) {

            	var scope   		= this;
        		scope 				= __Form.setup(scope, 'user_address_form', 'addressData');
            	scope.pageStatus    = false;

				
				/**
		          * get List of addresses
		          *
		          * @return void
		          *---------------------------------------------------------------- */
				scope.getAddresses = function() {

		        	__DataStore.fetch('user.get.addresses')
			        	.success(function(responseData) {

		        		appServices.processResponse(responseData, null, 
		        		function() {
			        		
			        		var requestData 	= responseData.data;
			        		scope.addressData 	= requestData;
			        		scope.pageStatus    = true;

						});
		 			});
		        }

		        scope.getAddresses();


		        /**
		          * Delete address 
		          *
		          * @param number addressID
		          *
		          * @return void
		          *---------------------------------------------------------------- */
		        scope.delete = function(addressID) {

		            __globals.showConfirmation({
		                text                : __globals.getJSString('address_delete_text'),
		                confirmButtonText   : __globals.getJSString('delete_action_button_text')
		            }, 
		            function() {

		                __DataStore.post({
		                    'apiURL'    : 'user.address.delete',
		                    'addressID' : addressID,
		                })
		                .success(function(responseData) {

		                	var message = responseData.data.message;
		                   
		                    appServices.processResponse(responseData, {
		                            error : function(data) {
		                                __globals.showConfirmation({
		                                    title   : __globals.getJSString('confirm_error_title'),
		                                    text    : message,
		                                    type    : 'error'
		                                });

		                            }
		                        },
		                        function(data) {

		                            __globals.showConfirmation({
		                                title   : __globals.getJSString('confirm_error_title'),
		                                text    : message,
		                                type    : 'success'
		                            });
		                            
		                            // use for slowly remove address from list
		                            $('#address_'+addressID).fadeOut('slow',function() {
		                                $(this).remove();
		                            	scope.getAddresses();
		                            });

		                        }
		                    );    

		                });

		            });

		        };

		        /**
		          * address add dialog
		          *
		          * @param number pageType
		          *
		          * @return void
		          *---------------------------------------------------------------- */
		        scope.addAddressDialog = function() {
		        	
		        	scope.addressType = scope.addressData.addressType;
		        	scope.countries   = scope.addressData.countries.data;
		        	appServices.showDialog(scope,
			        {	
			            templateUrl : __globals.getTemplateURL(
			                'address.add'
			            )
			        }, function(promiseObj) {

			        	if (_.has(promiseObj.value, 'address_added') 
		                    && promiseObj.value.address_added === true) {
							scope.getAddresses();
		                }

		        	});
		        }


		        /**
		          * address edit dialog
		          *
		          * @param number addressID
		          *
		          * @return void
		          *---------------------------------------------------------------- */
		        scope.editAddressDialog = function(addressID) {

		        	__DataStore.fetch({
				        	'apiURL'	: 'user.fetch.address.support.data',
				        	'addressID'	: addressID
				        })
	            	   .success(function(responseData) {
	            	   	
	            	   	scope.countries 	= responseData.data.countries;
	            	   	scope.address 		= responseData.data.address;
	            	   	scope.addressType 	= responseData.data.addressType;

			            	appServices.showDialog(scope,
			                {	
			                    templateUrl : __globals.getTemplateURL(
			                            'address.edit'
			                        )
			                }, function(promiseObj) {

				        	if (_.has(promiseObj.value, 'address_updated') 
			                    && promiseObj.value.address_updated == true) {
				        		scope.getAddresses();
			                }

		        		});

	     			});
		        }

		        /**
		          * address list dialog
		          *
		          * @return void
		          *---------------------------------------------------------------- */
		        scope.addressListDialog = function() {

		        	__DataStore.fetch({'apiURL' : 'get.addresses.for.order'})
		    	   .success(function(responseData) {
		    	   	
		    	   		var requestData   = responseData.data;
		    	   		scope.addressData = requestData;

				    	appServices.showDialog(requestData,
				        {	
				            templateUrl : __globals.getTemplateURL(
				                    'address.list-dialog'
				                )
				        },
				        function(promiseObj) {

				        });
			       });
		        }

		        /**
		          * Close dialog
		          *
		          * @return void
		          *---------------------------------------------------------------- */

		    	scope.close = function() {
		            $scope.closeThisDialog();
		        }

		        /**
		          * Select address for order
		          *
		          * @return void
		          *---------------------------------------------------------------- */

		    	scope.selectAddressForOrder = function(addressData, selectedAddress) {

		            // get address for order by address ID
		            if (!_.isEmpty(addressData)) {

			            _.forEach(addressData, function(address, key) {

			            	// take primary address
			           		if (address.id == selectedAddress) { 

		            			$scope.closeThisDialog({'selectedAddress': address});

			           		}

			            });

			        } else {

			        	$scope.closeThisDialog({'selectedAddress': '' });
			        }
		        }

		        /**
		          * Make primary address
		          *
		          * @return void
		          *---------------------------------------------------------------- */

		    	scope.makePrimaryAddress = function(addressID) {

		    		__Form.process({
			                'apiURL'    :'user.get primary.address',
			                'addressID' : addressID
			            }, scope)
		                .success(function(responseData) {

		                    var message 	= responseData.data.message;

		                	appServices.processResponse(responseData, null,
		                        function() {

		                        	scope.getAddresses();
		                        }
		                    );  
		                
		            });
		    	} 

			}
    	])


    	/**
    	  * AddressAddController for add new address
    	  *
    	  * @inject $scope
    	  * @inject __Form
    	  * @inject appServices
    	  * 
    	  * @return void
    	 *-------------------------------------------------------- */

		.controller('AddressAddController', [ 
            '$scope',
            '__Form',
            'appServices',
            function ($scope, __Form, appServices) {
            	
            	var scope   = this;
		        scope = __Form.setup(scope, 'user_address_form', 'userData', {
		            secured : false
		        });

		        scope.ngDialogData = $scope.ngDialogData.addressData;

		        // Get address type
		        scope.addressType = scope.ngDialogData.addressType;
		        
		        
		        // Get countries List
		        scope.countriesCollection     = scope.ngDialogData.countries.data;
		        scope.countries 			  = scope.countriesCollection.countries;

		        scope.countries_select_config = __globals.getSelectizeOptions({
		            valueField  : 'value',
		            labelField  : 'text',
		            searchField : [ 'text' ]  
		        });


		        /**
		          * Submit address form action
		          *
		          * @return void
		          *---------------------------------------------------------------- */

		        scope.submit = function() {

		            __Form.process('user.address.process', scope)

		                .success(function(responseData) {

		                    appServices.processResponse(responseData, null, function() {

			                	$scope.closeThisDialog({address_added : true})

		               		});
		            });

		        };

	            /**
		          * Close dialog
		          *
		          * @return void
		          *---------------------------------------------------------------- */

		    	scope.close = function() {
		            $scope.closeThisDialog();
		        }
            }
        ])


        /**
    	  * AddressEditController for add new address
    	  *
    	  * @inject $scope
    	  * @inject __Form
    	  * @inject appServices
    	  * 
    	  * @return void
    	 *-------------------------------------------------------- */

		.controller('AddressEditController', [ 
            '$scope',
            '__Form',
            'appServices',
            function ($scope, __Form, appServices) {
            	
            	var scope = this;
        		scope     = __Form.setup(scope, 'user_address_edit_form', 'addressData');

		        // Get address type
		        scope.addressType 		  = $scope.ngDialogData.addressType;
		        
		        // Get address Data
		         scope.addressData 		  = $scope.ngDialogData.address;

		        // Get all countries
		        scope.countriesCollection = $scope.ngDialogData.countries.data;
		        scope.countries 		  = scope.countriesCollection.countries;

		        scope.countries_select_config = __globals.getSelectizeOptions({
		            valueField  : 'value',
		            labelField  : 'text',
		            searchField : [ 'text' ]  
		        });


		        /**
		          * update form action
		          *
		          * @return void
		          *------------------------------------------------------------------------ */

		        scope.update = function() {
		            
		             scope.updateURL = {
		                'apiURL'    :'user.address.update',
		                'addressID' : scope.addressData.id
		            };

		            // post form data
		            __Form.process(scope.updateURL, scope )

		                .success( function( responseData ) {

		                appServices.processResponse(responseData, null, function(reactionCode) {
		                 
		                    $scope.closeThisDialog({address_updated : true})
		                    
		                });

		            });

		        };

	            /**
		          * Close dialog
		          *
		          * @return void
		          *---------------------------------------------------------------- */

		    	scope.close = function() {
		            $scope.closeThisDialog();
		        }
            }
        ])




})( window, window.angular );;
(function() {
'use strict';
    
    /*
      Login Controller Module
      -------------------------------------------------------------------------- */
    
    angular
        .module('UserApp.login', [])

        /**
          * UserLoginController - login a user in application
          *
          * @inject __Form
          * @inject __Auth
          * @inject appServices
          * @inject __Utils
          * 
          * @return void
          *-------------------------------------------------------- */

        .controller('UserLoginController',   [
            '__Form', 
            '__Auth', 
            'appServices',
            '__Utils',
            function (__Form, __Auth, appServices, __Utils) {

                var scope   = this;

                scope = __Form.setup(scope, 'form_user_login', 'loginData', {
                    secured : true
                });

                scope.show_captcha      = false;
                scope.request_completed = false;

                /**
                  * Get login attempts for this client ip
                  *
                  * @return void
                  *---------------------------------------------------------------- */

                __Form.fetch('user.login.attempts').success(function(responseData) {

                    scope.show_captcha      = responseData.data.show_captcha;
                    scope.request_completed = true;

                });

                /**
                  * Fetch captch url
                  *
                  * @return string
                  *---------------------------------------------------------------- */

                scope.getCaptchaURL = function() {
                    return __Utils.apiURL('security.captcha')+'?ver='+Math.random();
                };

                /**
                  * Refresh captch 
                  *
                  * @return void
                  *---------------------------------------------------------------- */

                scope.refreshCaptcha = function() {
                    scope.captchaURL = scope.getCaptchaURL();
                };

                scope.captchaURL  = scope.getCaptchaURL();

                /**
                * Submit login form action
                *
                * @return void
                *---------------------------------------------------------------- */

                scope.submit = function() {

                    scope.isInActive = false;

                    __Form.process('user.login', scope).success(function(responseData) {

                        var requestData = responseData.data;

                        appServices.processResponse(responseData, {
                                error : function() {

                                   // scope.isInActive = requestData.isInActive;

                                    scope.show_captcha = requestData.show_captcha;

                                    // reset password field
                                    scope[scope.ngFormModelName].password   = "";

                                    // Check if show captcha exist then refresh captcha
                                    if (scope.show_captcha) {
                                        scope[scope.ngFormModelName].confirmation_code   = "";
                                        scope.refreshCaptcha();
                                    }

                                },
                                otherError : function(reactionCode) {

                                    scope.isInActive = requestData.isInActive;
                                    
                                    // If reaction code is Server Side Validation Error Then 
                                    // Unset the form fields
                                    if (reactionCode == 3) {

                                        // Check if show captcha exist then refresh captcha
                                        if (scope.show_captcha) {
                                            scope.refreshCaptcha();
                                        }

                                    }

                                }
                            },
                            function() {

                                __Auth.checkIn(requestData.auth_info, function() {

                                    if (requestData.intendedUrl) {

                                        __globals.redirectBrowser(requestData.intendedUrl);

                                    } else {

                                        if (requestData.auth_info.designation == 1) {

                                            __globals.redirectBrowser(__Utils.apiURL('manage.app'));

                                        } else {

                                            __globals.redirectBrowser(window.appConfig.appBaseURL);
                                        }

                                    }

                                });
                            });    

                    });

                };

            }

        ]);

})();;
(function() {
'use strict';
    
    /*
     UserLogoutController
    -------------------------------------------------------------------------- */
    
    angular
        .module('UserApp.logout', [])
        .controller('UserLogoutController',   [
            '__DataStore', 
            '__Auth', 
            'appServices', 
            UserLogoutController 
        ]);

    /**
      * UserLogoutController for login logout
      *
      * @inject __DataStore
      * @inject __Auth
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */

    function UserLogoutController(__DataStore, __Auth, appServices) {

        var scope   = this;

        __DataStore.post('user.logout').success(function(responseData) {

            appServices.processResponse(responseData, function(reactionCode) {

                // set user auth information
                __Auth.checkIn(responseData.data.auth_info);  

            });

        });

    };

})();;
(function() {
'use strict';
    
    /*
     UserForgotPasswordController Module
    -------------------------------------------------------------------------- */
    
    angular
        .module('UserApp.forgotPassword', [])

        /**
          * UserForgotPasswordController - request to send password reminder
          *
          * @inject __Form
          * @inject appServices
          * 
          * @return void
          *-------------------------------------------------------- */

        .controller('UserForgotPasswordController',   [
            '__Form', 
            'appServices',
            '__Utils',
            function (__Form, appServices, __Utils) {

                var scope   = this;


                scope = __Form.setup(scope, 'user_forgot_password_form', 'userData', {
                    secured : true
                });

                /**
                  * Submit form
                  *
                  * @return void
                  *---------------------------------------------------------------- */

                scope.submit = function() {

                    __Form.process('user.forgot_password.process', scope)
                    .success(function(responseData) {

                        appServices.processResponse(responseData, null, function() {
                            
                           __globals.redirectBrowser(__Utils.apiURL('user.forgot_password.success'));
                           
                        });    

                    });

                };

            }

        ]);

})();;
(function() {
'use strict';
    
    /*
     UserResetPasswordController Module
    -------------------------------------------------------------------------- */
    
    angular
        .module('UserApp.resetPassword', [])

        /**
          * UserResetPasswordController for reset user password
          *
          * @inject __Form
          * @inject appServices
          * @inject __Utils
          * 
          * @return void
          *-------------------------------------------------------- */

        .controller('UserResetPasswordController',   [
            '__Form', 
            'appServices',
            '__Utils',
            function (__Form, appServices, __Utils) {

                var scope = this;

                scope = __Form.setup(scope, 'user_reset_password_form', 'userData', {
                    secured : true
                });

                /**
                  * Submit reset password form action
                  *
                  * @return void
                  *---------------------------------------------------------------- */
                
                scope.submit = function() {

                    __Form.process({
                        'apiURL'        : 'user.reset_password.process',
                        'reminderToken' : __globals.getAppJSItem('passwordReminderToken')
                    }, scope)
                        .success(function(responseData) {
                            
                        appServices.processResponse(responseData, null,
                            function(reactionCode) {
                                window.location = __Utils.apiURL('user.login');
                        });    

                    });

                };

            }
        ]);

})();;
(function() {
'use strict';
    
    /*
     UserChangePasswordController Module
    -------------------------------------------------------------------------- */
    
    angular
        .module('UserApp.changePassword', [])

        /**
          * UserChangePasswordController - change user password
          *
          * @inject __Form
          * @inject appServices
          * 
          * @return void
          *-------------------------------------------------------- */

        .controller('UserChangePasswordController',   [
            '__Form', 
            'appServices',
            '__Utils',
            '$state',
            function (__Form, appServices, __Utils, $state) {

                var scope   = this;

                scope = __Form.setup(scope, 'user_password_update_form', 'userData', {
                    secured : true
                });

                /**
                  * Submit update password form action
                  *
                  * @return void
                  *---------------------------------------------------------------- */

                scope.submit = function() {

                    __Form.process('user.change_password.process', scope)
                    .success(function(responseData) {

                        appServices.processResponse(responseData, null, function() {
                            scope.userData = {};
                            
                            if (document.location.href == responseData.data.passwordRoute) {
                            	window.location = window.appConfig.appBaseURL;
                            } else {
                            	$state.go('dashboard');
                            }
                            
                        });    

                    });

                };

            } 
        ]);

})();;
(function() {
'use strict';
    
    /*
     UserChangeEmailController Module
    -------------------------------------------------------------------------- */
    
    angular
        .module('UserApp.changeEmail', [])

        /**
          * UserChangeEmailController - handle chnage email form view js scope
          *
          * @inject __Form
          * @inject appServices
          * 
          * @return void
          *-------------------------------------------------------- */

        .controller('UserChangeEmailController',   [
            '__Form', 
            'appServices',
            function (__Form, appServices) {

                var scope   = this;

                scope.requestSuccess  = false;
                scope.pageStatus = false;

                scope = __Form.setup(scope, 'user_change_email_form', 'userData', {
                    secured : true
                });

                /**
                  * Fetch support data
                  *
                  * @return void
                  *---------------------------------------------------------------- */

                __Form.fetch('user.change_email.support_data')
                    .success(function(responseData) {
                
                    var requestData     = responseData.data;
                    
                    appServices.processResponse(responseData, null, function() {
                            
                        scope.changeEmail = requestData.newEmail;
                        scope.formattedDate = requestData.formattedDate;
                        scope.humanReadableDate = requestData.humanReadableDate;

                        scope.pageStatus = true;
                        
                    });    

                });
                
                /**
                  * Submit change email form action
                  *
                  * @return void
                  *---------------------------------------------------------------- */

                scope.submit = function() {

                    __Form.process('user.change_email.process', scope)
                    .success(function(responseData) {

                        var requestData = responseData.data;

                        appServices.processResponse(responseData, null,
                        function() {
                            scope.userData = {};
                            if (responseData.reaction == 1) {
                                scope.activationRequired = requestData.activationRequired;

                                scope.requestSuccess = true;

                                $('.lw-form').slideUp();
                            }
                        });    

                    });

                };

            }
            
        ]);

})();;
(function() {
'use strict';
    
    /*
     UserRegisterController
    -------------------------------------------------------------------------- */
    
    angular
        .module('UserApp.register', [])

        /**
          * UserRegisterController - handle register form & send request to server
          * to submit form data. 
          *
          * @inject __Form
          * @inject $state
          * @inject appServices
          * 
          * @return void
          *-------------------------------------------------------- */

        .controller('UserRegisterController',   [
            '__Form', 
            '$state',
            'appServices',
            '__Utils',
            function (__Form, $state, appServices, __Utils) {

                var scope   = this;

                scope = __Form.setup(scope, 'user_register_form', 'userData', {
                    secured : true
                });


				/**
				  * Fetch captch url
				  *
				  * @return string
				  *---------------------------------------------------------------- */

                scope.getCaptchaURL = function() {
                    return __Utils.apiURL('security.captcha')+'?ver='+Math.random();
                };

                /**
                  * Refresh captch 
                  *
                  * @return void
                  *---------------------------------------------------------------- */

                scope.refreshCaptcha = function() {
                    scope.captchaURL = scope.getCaptchaURL();
                };

                scope.captchaURL  = scope.getCaptchaURL();
                scope.errorMessage = false;
                /**
                  * Submit register form action
                  *
                  * @return void
                  *---------------------------------------------------------------- */
                
                scope.submit = function() {

                    scope.isInActive = false;

                    __Form.process('user.register.process', scope)
                        .success(function(responseData) {

                           var requestData = responseData.data;
                           
                        appServices.processResponse(responseData, {
                        		error : function() {

                                },
                                otherError : function() {

                                    if (responseData.reaction == 3 && !_.isEmpty(responseData.message)) {
                                        scope.errorMessage = responseData.message;
                                    }

                                    //console.log(responseData.message);
                                    scope.isInActive = requestData.isInActive;

	                                // reset password field
	                                scope[scope.ngFormModelName].password   = "";
	                                scope[scope.ngFormModelName].password_confirmation   = "";

	                                // refresh captcha
	                                scope[scope.ngFormModelName].confirmation_code   = "";
	                                scope.refreshCaptcha();

                                }
                            },
                            function() {
                            __globals.redirectBrowser(__Utils.apiURL('user.register.success'));
                        });    

                    });

                };

                /**
                  * Show terms and conditions dialog
                  *
                  * @return void
                  *---------------------------------------------------------------- */

                scope.showTermsAndConditionsDialog = function() {

                    appServices.showDialog(scope,
                    {   
                        templateUrl : __globals.getTemplateURL(
                            'user.terms-and-conditions'
                        )
                    }, 
                    function(promiseObj) {
                    });

                };

            } 
        ]);
    
})();;
(function() {
'use strict';
    
    /*
     UserContactController
    -------------------------------------------------------------------------- */
    
    angular
        .module('UserApp.contact', [])
        .controller('UserContactController',   [
            '__Form', 
            '$state',
            'appServices',
            '__Utils',
            '__Auth',
            '$scope',
            UserContactController 
        ]);

    /**
      * UserContactController handle register form & send request to server
      * to submit form data. 
      *
      * @inject __Form
      * @inject $state
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */

    function UserContactController(__Form, $state, appServices, __Utils, __Auth, $scope) {

        var scope   = this;
       
        scope = __Form.setup(scope, 'user_contact_form', 'userData', {
        	secured : true,
		    unsecuredFields : ['message'],
        });

        // get logged in user Info
        __Auth.refresh(function(authInfo) {
	 		scope.auth_info = authInfo;
	 	});

	 	if (scope.auth_info.reaction_code != 9) { // not authenticate
		 	scope.userData.email 	= scope.auth_info.profile.email;
		 	scope.userData.fullName = scope.auth_info.profile.full_name;
	 	}

	 	if (!_.isEmpty($scope.ngDialogData)) {

	 		scope.userData.orderUID = $scope.ngDialogData.orderUID;
	 	}
        	

        /**
          * Submit register form action
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.requestSuccess = false;
    
        scope.submit = function(formType) {

        	scope.userData.formType = formType;

        	 __Form.process('user.contact.process', scope)
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {

                    scope.userData 		   = '';

					CKEDITOR.instances['message'].setData('');
                    
                	// Check if form type dialog or form
                	if (scope.userData.formType == 2) { // dialog
                        
                		$scope.closeThisDialog();
                	} else {

                        $('.lw-form').slideUp();
                    }
                    
                    scope.requestSuccess = true;

                });    

            });

        };

        /**
	  	  * Close dialog
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */
		scope.closeDialog = function() {
  	  		$scope.closeThisDialog();
  	  	};

    };

})();;
(function() {
'use strict';
    
    /*
     UserProfileController Module
    -------------------------------------------------------------------------- */
    
    angular
        .module('UserApp.profile', [])

        /**
          * UserProfileController - edit user profile
          *
          * @inject __Form
          * @inject appServices
          * 
          * @return void
          *-------------------------------------------------------- */

        .controller('UserProfileController',   [
            '__Form', 
            'appServices',
            function (__Form, appServices) {

                var scope   = this;

                scope = __Form.setup(scope, 'user_profile__form', 'profileData');

                scope.request_completed = false;

                __Form.fetch('user.profile.details').success(function(responseData) {

                    appServices.processResponse(responseData, null, function() {
                        __Form.updateModel(scope, responseData.data.profile);
                        scope.request_completed = true;
                    });

                });

            }

        ]);

})();;
(function() {
'use strict';
    
    /*
     UserProfileEditController Module
    -------------------------------------------------------------------------- */
    
    angular
        .module('UserApp.profileEdit', [])

        /**
          * UserProfileEditController - edit user profile
          *
          * @inject __Form
          * @inject appServices
          * 
          * @return void
          *-------------------------------------------------------- */

        .controller('UserProfileEditController',   [
            '__Form', 
            'appServices',
            function (__Form, appServices) {

                var scope   = this;

                scope = __Form.setup(scope, 'user_profile_edit_form', 'profileData');

                scope.request_completed = false;

                __Form.fetch('user.profile.details').success(function(responseData) {

                    appServices.processResponse(responseData, null, function() {
                        __Form.updateModel(scope, responseData.data.profile);
                        scope.request_completed = true;
                    });    

                });

                /**
                  * Submit profile edit form action
                  *
                  * @return void
                  *---------------------------------------------------------------- */

                scope.submit = function() {

                    __Form.process('user.profile.update', scope)
                    .success(function(responseData) {

                        appServices.processResponse(responseData, null, function() {
                        });    

                    });

                };

            }
             
        ]);

})();;
(function() {
'use strict';
    
    /*
     UserAddressAddController
    -------------------------------------------------------------------------- */
    
    angular
        .module('UserApp.address', [])
        .controller('UserAddressAddController',   [
        	'$scope',
            '__Form', 
            '$state',
            'appServices',
            '__Utils',
            '$rootScope',
            UserAddressAddController 
        ]);

    /**
      * UserAddressAddController handle address form & send request to server
      * to submit form data. 
      *
      * @inject $scope
      * @inject __Form
      * @inject $state
      * @inject appServices
      * @inject __Utils
      * 
      * @return void
      *-------------------------------------------------------- */

    function UserAddressAddController($scope, __Form, $state, appServices, __Utils, $rootScope) {

        var scope   = this;
        
        scope = __Form.setup(scope, 'user_address_form', 'userData', {
            secured : false
        });

        scope.addressType 			  = __globals.getAppJSItem('configGetAddressType');

        // Get countries
        scope.countriesCollection     = __globals.getAppJSItem('countries');
        scope.countries 			  = scope.countriesCollection.data.countries;

        scope.countries_select_config = __globals.getSelectizeOptions({
            valueField  : 'value',
            labelField  : 'text',
            searchField : [ 'text' ]  
        });

        //scope.countries = __globals.configItem('countries');

        /**
          * Submit address form action
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.submit = function() {

            __Form.process('user.address.process', scope)
                .success(function(responseData) {
                    appServices.processResponse(responseData, null, function() {
	                	$scope.closeThisDialog({address_added : true, selectedAddressID : $scope.ngDialogData.selectedAddressID, addressType : $scope.ngDialogData.addressType})
               		});
            });

        };

         /**
          * Close dialog and return promise object
          *
          * @return void
          *---------------------------------------------------------------- */
          
        scope.close = function() {
        	
        	$scope.closeThisDialog({address_added : true, selectedAddressID : $scope.ngDialogData.selectedAddressID, addressType : $scope.ngDialogData.addressType});
        }

    };

})();;
(function() {
'use strict';
    
    /*
     UserAddressListController
    -------------------------------------------------------------------------- */
    
    angular
        .module('UserApp.Addresslist', [])
        .controller('UserAddressListController',   [
        	'$scope',
            '$state',
            '__DataStore',
            '__Form',
            'appServices',
            '__Utils',
            '$rootScope',
            UserAddressListController 
        ]);

    /**
      * UserAddressListController handle address form & send request to server
      * to get list of address. 
      *
      * @inject scope
      * @inject $state
      * @inject __DataStore
      * @inject __Form
      * @inject appServices
      * @inject __Utils
      * 
      * @return void
      *-------------------------------------------------------- */

    function UserAddressListController($scope, $state, __DataStore, __Form, appServices, __Utils, $rootScope) {
    	
    	var scope   			= this;
        	scope 				= __Form.setup(scope, 'user_address_form', 'addressData');
        	scope.ngDialogData  = $scope.ngDialogData;
			scope.pageStatus    = false;
			
        /**
          * get details of addresses
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.getAddresses = function() {

        	__DataStore
        	.fetch('user.get.addresses')
        	.success(
        	function(responseData) {

                //scope.message = responseData.data.message;
        		appServices.processResponse(
        			responseData,
        			null, 
	        		function(reactionCode) {

	        			var requestData      	= responseData.data;

	        			if (requestData.getRoute === document.location.href) {
	        				var pageType	 	= "noDialog";
	        			} else {
	        				var pageType	 	= "dialog";

		    				scope.selectAddress = scope.ngDialogData.selectedAddressID;
					        scope.addressType 	= scope.ngDialogData.addressType;
					        scope.addressSameAs = scope.ngDialogData.addressSameAs;
					        scope.couponAmt		= scope.ngDialogData.couponAmt;

	        			};

	        			scope.addressData 	 = requestData;
	                    scope.pageStatus     = true;
	        			scope.addressprimary = true;
		            	scope.pageType 		 = pageType;
                 
	                    if (!_.isEmpty(scope.ngDialogData)) {
	                        scope.selectAddress  = scope.ngDialogData.selectedAddressID;
	                        scope.addressType    = scope.ngDialogData.addressType;
	                        scope.addressSameAs = scope.ngDialogData.addressSameAs;
	                        scope.couponAmt		= scope.ngDialogData.couponAmt;
	                    } else {
	                        scope.selectAddress  = "";
	                        scope.addressType    = "";
	                        scope.addressSameAs  = "";
	                        scope.couponAmt		 = 0;
	                    }

				});
 			});
        }

        scope.getAddresses();


        $rootScope.$on('changeAddresses',function(events, resposeData){

        	if (resposeData.status) {
        		scope.addressType 	= resposeData.addressType;
        	};
	    
	    });
        

        /**
          * address add dialog
          *
          * @param number pageType
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.addAddress = function(pageType, selectedAddressID, addressType) {

        	if (pageType == "dialog") {

        		$scope.closeThisDialog({

	    			showAddDialog   	: true,
	    			pageType 			: pageType,
	    			selectedAddressID 	: selectedAddressID,
	    			addressType 		: addressType
	    		
	    		});

        	} else {

        		appServices.showDialog(scope,
		        {	
		            templateUrl : __globals.getTemplateURL(
		                'user.add-address'
		            )
		        }, function(promiseObj) {

		        	
		        	if (_.has(promiseObj.value, 'address_added') 
	                    && promiseObj.value.address_added === true) {	
						scope.addressType 	 = promiseObj.value.addressType;
					scope.getAddresses();
	                }

	        	});
        	}
        	
        }

        /**
          * address edit dialog
          *
          * @param number pageType
          * @param number addressID
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.editAddress = function(pageType, addressID, selectedAddressID, addressType) {

        	if (pageType == "dialog") {

        		$scope.closeThisDialog({
	        		showEditDialog 		: true,
	        		addressID 			: addressID,
	        		selectedAddressID 	: selectedAddressID,
	        		addressType 		: addressType
	        	});

        	
        	} else {

        		__DataStore.fetch({
			        	'apiURL'	: 'user.fetch.address.support.data',
			        	'addressID'	: addressID
			        })
            	   .success(function(responseData) {

            	   	scope.address = responseData.data.address;
		            	appServices.showDialog(scope,
		                {	
		                    templateUrl : __globals.getTemplateURL(
		                            'user.edit-address'
		                        )
		                }, function(promiseObj) {

			        	if (_.has(promiseObj.value, 'address_updated') 
		                    && promiseObj.value.address_updated == true) {
			        		scope.getAddresses();
		                }

	        		});

     			});

        	}
        }

        /**
          * Delete address 
          *
          * @param number addressID
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.delete = function(addressID, addressType) {

            __globals.showConfirmation({
                text                : __globals.getJSString('address_delete_text'),
                confirmButtonText   : __globals.getJSString('delete_action_button_text')
            }, function() {

                __DataStore.post({
                    'apiURL'    : 'user.address.delete',
                    'addressID' : addressID,
                })
                .success(function(responseData) {
                
                    var message = responseData.data.message,
                    addressOBJ  = {
						status  : true,
						addressType  : addressType,
						addressID  : addressID
                   	};
                   
                    appServices.processResponse(responseData, {
                            error : function(data) {
                                __globals.showConfirmation({
                                    title   : __globals.getJSString('confirm_error_title'),
                                    text    : message,
                                    type    : 'error'
                                });

                            }
                        },
                        function(data) {

                            __globals.showConfirmation({
                                title   : __globals.getJSString('confirm_error_title'),
                                text    : message,
                                type    : 'success'
                            });
                            
                            $('#address_'+addressID).fadeOut('slow',function() {
                                $(this).remove();
                            	scope.getAddresses();
                            });

                            $rootScope.$emit('changeAddress', addressOBJ);   // reload datatable

                        }
                    );    

                });

            });

        };

        /**
          * Close dialog and return promise object
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.close = function() {

        	var billingAddressOBJ  = {
            	status  : false,
       		};
       		$rootScope.$emit('changeAddress', billingAddressOBJ);
        	$scope.closeThisDialog({address_list : true});

        }

        /**
          * get primary address 
          *
          * @param number addressID
          * @param number primary
          * @param number pageType
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.primaryAddress = function(addressID, primary, pageType) {

        	scope.addressData.primary = primary;

        	scope.updateURL = {
                'apiURL'    :'user.get primary.address',
                'addressID' : addressID
            };

        	__Form.process(scope.updateURL, scope)
                .success(function(responseData) {

                    var message 	= responseData.data.message;
                	 	/*addressOBJ  = {
                        	status          : true
                   		};*/
                	appServices.processResponse(responseData, null,
                        function(data) {
                        	scope.getAddresses();
                        	/*if (pageType == 'dialog') {
                        		$scope.closeThisDialog({address_list : true})
                        	};*/
							//$rootScope.$emit('changePrimaryAddress', addressOBJ);
                        }
                    );  
                
            });
		}

		/**
          * select address for address 
          *
          * @param number addressID
          * @param number addressType
          * @param number addressSameAs
          *
          * @return void
          *---------------------------------------------------------------- */
		scope.selectAddressForOrder = function(addressID, addressType, addressSameAs) {
			
			__DataStore.fetch({
                    'apiURL'    : 'user.get.address.for.order',
                    'addressID' : addressID,
                    'couponAmt' : scope.couponAmt
                })
                .success(function(responseData) {

                	appServices.processResponse(responseData, null,
                        function(data) {

		               		var addressOBJ = {

		               			status 			: true,
		               			addressSameAs 	: addressSameAs,
		               			responseData 	: responseData.data,
		               			addressType 	: addressType,
		               			totalOrder 		: responseData.data.shipping
		               		};

			               	if (addressType == 'billing') {


			               		var billingAddressOBJ  = {
			                    	status  : false,
			                    	addressType : 'billing',
		               				totalOrder 		: responseData.data.shipping
			               		};
			               		$rootScope.$emit('changeAddress', billingAddressOBJ);

			               	};

			               	if (addressSameAs == false && addressType != 'billing') {
			               		$rootScope.$emit('changeAddressInOrder', addressOBJ);
			               	} else {

			               		$rootScope.$emit('changeAddressInOrder', addressOBJ);
			               	}
			               	
			               	$scope.closeThisDialog({address_list : true});
                        }
                    ); 
            	});

		}


    };

})();;
(function() {
'use strict';
    
    /*
     Category edit Controller
    -------------------------------------------------------------------------- */
    
    angular
        .module('UserApp.editAddress', [])
        .controller('UserAddressEditController',    [
            '$scope', 
            '__Form', 
            'appServices',
            '__Utils',
            '$state',
            UserAddressEditController 
        ]);

    /**
     * UserAddressEditController
     *
     * @inject $scope
     * @inject __Form
     * @inject appServices
     * @inject __Utils
     * @inject $state
     * 
     * @return void
     *-------------------------------------------------------- */

    function UserAddressEditController($scope, __Form, appServices, __Utils, $state) {

        var scope = this;

        scope     = __Form.setup(scope, 'user_address_edit_form', 'addressData');

        scope.addressID = __globals.getAppJSItem('addressID');
        scope.loadSelectBox = false;
        scope.addressType = __globals.getAppJSItem('configGetAddressType');

        // Get all countries
        scope.countriesCollection = __globals.getAppJSItem('countries');
        scope.countries = scope.countriesCollection.data.countries;

        scope.countries_select_config = __globals.getSelectizeOptions({
            valueField  : 'value',
            labelField  : 'text',
            searchField : [ 'text' ]  
        });

        if (_.isEmpty(scope.addressID)) {
            scope.addressData = $scope.ngDialogData.address;
                    
            if (!_.isEmpty(scope.addressData)) {
                scope.loadSelectBox = true;
            };  
            scope.addressID = scope.addressData.id;
            scope.getRoute = "";

        } else {
            scope.addressID = scope.addressData.id;
            scope           = __Form.updateModel(scope, __globals.getAppJSItem('addressData'));
            scope.getRoute  = __globals.getAppJSItem('getRoute');
        }          

        /**
          * update form action
          *
          * @return void
          *------------------------------------------------------------------------ */

        scope.update = function() {
            
             scope.updateURL = {
                'apiURL'    :'user.address.update',
                'addressID' : scope.addressID
            };

            // post form data
            __Form.process(scope.updateURL, scope )
                            .success( function( responseData ) {
                appServices.processResponse(responseData, function(reactionCode) {
                    if (reactionCode == 1) {
                        $scope.closeThisDialog({address_updated : true, selectedAddressID : $scope.ngDialogData.selectedAddressID})
                    };
                    
                });

            });

        };

        /**
          * Close dialog and return promise object
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.close = function() {
            $scope.closeThisDialog({address_updated : true, selectedAddressID : $scope.ngDialogData.selectedAddressID});
        }
    };
})();
;
(function() {
'use strict';
    
    /*
     UserResendActivationEmailController Module
    -------------------------------------------------------------------------- */
    
    angular
        .module('UserApp.resendActivationEmail', [])

        /**
          * UserResendActivationEmailController for request to send password reminder
          *
          * @inject __Form
          * @inject appServices
          * 
          * @return void
          *-------------------------------------------------------- */

        .controller('UserResendActivationEmailController',   [
            '__Form', 
            'appServices',
            '__Utils',
            function (__Form, appServices, __Utils) {

                var scope   = this;
                
                scope = __Form.setup(scope, 'form_user_resend_activation_email', 'userData', {
                    secured : false
                });

                /**
                  * Submit forgot password form action
                  *
                  * @return void
                  *---------------------------------------------------------------- */

                scope.submit = function() {

                    __Form.process('user.resend.activation.email.proccess', scope)
                    .success(function(responseData) {

                        appServices.processResponse(responseData, null, function() {
                            window.location = __Utils.apiURL('user.resend_activation_email.success');
                        });    

                    });

                };

            }
             
        ]);
})();