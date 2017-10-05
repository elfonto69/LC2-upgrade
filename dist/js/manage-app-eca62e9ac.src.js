/*!
 LivelyCart-2
 version: 2.2.0
 --------------------------------------------------------------------- 
 Build Timestamp: 1502367828
 Build Date: Thu Aug 10 2017 17:53:48 GMT+0530 (IST)
--------------------------------------------------------------------- */
(function() {
'use strict';

  angular.module('ManageApp', [
    'ngMessages',
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'ngNotify',
    'ngDialog',
    'angularFileUpload',
    'angular-loading-bar',
    'selectize',
    'NgSwitchery',
    'lw.core.utils',
    'lw.security.main',
    'lw.auth',
    'lw.data.datastore',
    'lw.data.datatable',
    'lw.form.main',
    'app.service',
    'app.http',
    'app.notification',
    'app.form',
    'app.fancytree',
    'app.directives',
    'ManageApp.master',
    'UserApp.manage',
    'UserApp.manageUserChangePassword',
    'ManageApp.userDetailDialog',
    'UserApp.profile',
    'UserApp.profileEdit',
    'UserApp.changePassword',
    'UserApp.changeEmail',
    'ManageApp.category',
    'ManageApp.categoryAddDialog',
    'ManageApp.categoryAdd',
    'ManageApp.categoryEditDialog',
    'ManageApp.categoryEdit',
    'ManageApp.categoryDelete',
    'ManageApp.brand',
    'ManageApp.brandDetailDialog',
    'ManageApp.brandAddDialog',
    'ManageApp.brandAdd',
    'ManageApp.brandEditDialog',
    'ManageApp.brandEdit',
    'ManageApp.coupon',
    'ManageProductApp.details',
    'ManageProductApp.add',
    'ManageProductApp.uploadedMedia',
    'ManageProductApp.edit',
    'ManageProductApp.editDetails',
    'ManageApp.shipping',
    'ManageApp.tax',
    'ManageApp.report',
    'ManageProductApp.images',
    'ManageProductApp.addImage',
    'ManageProductApp.editImage',
    'ManageProductApp.options',
    'ManageProductApp.addOption',
    'ManageProductApp.editOption',
    'ManageProductApp.addOptionValues',
    'ManageProductApp.optionValues',
    'ManageProductApp.specification',
    'ManageProductApp.addSpecification',
    'ManageProductApp.editSpecification',
    'ManagePagesApp.list',
    'ManagePagesApp.add',
    'ManagePagesApp.add.dialog',
    'ManagePagesApp.edit.dialog',
    'ManagePagesApp.edit',
    'ManagePagesApp.page.details',
    'manageApp.storeSettingsEdit',
    'manageApp.GeneralSettings',
    'manageApp.CurrencySettings',
    'manageApp.OrderSettings',
    'manageApp.ProductSettings',
    'manageApp.PlacementSettings',
    'manageApp.ContactSettings',
    'manageApp.termAndConditionSettings',
    'manageApp.privacyPolicySettings',
    'manageApp.socialSettings',
    'ManageApp.orderList',
    'ManageApp.orderUpdate',
    'ManageApp.orderCancel',
    'ManageApp.orderLogList',
    'ManageApp.orderDialogList',
    'ManageApp.payment',
    'ManageApp.paymentDetailsDialog',
    'ManageApp.rawDataDialog',
    'ManageApp.orderPaymentUpdate',
    'ManageApp.orderPaymentRefund',
    'ManageApp.orderContact',
    'uploadManagerEngine',
    'DashboardApp.main',
    'ManageApp.brandDeleteDialog',
    'ManageApp.productList',
    'ManageApp.orderDetails',
    'ManageApp.orderDelete',
    'ManageApp.paymentDelete',
    'manageApp.CssStyleSettings'
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

    $urlRouterProvider
       .otherwise('/dashboard');

    //state configurations
    $stateProvider
        
        // home
        .state('home', 
             __globals.stateConfig('/home', 'home', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // dashboard
        .state('dashboard', 
             __globals.stateConfig('/dashboard', 'dashboard/details', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // profile
        .state('profile', 
             __globals.stateConfig('/profile', 'user/manage-profile', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // profile edit
        .state('profileEdit', 
             __globals.stateConfig('/profile/edit', 'user/profile-edit', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // change password
        .state('changePassword', 
             __globals.stateConfig('/change-password', 'user/change-password', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // change email
        .state('changeEmail', 
             __globals.stateConfig('/change-email', 'user/change-email', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // users
        .state('users', 
             __globals.stateConfig('/users', 'user/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

         // categories
        .state('categories', 
             __globals.stateConfig('/categories/:mCategoryID?', 'category/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // productsList
        .state('products', 
             __globals.stateConfig('/products/:mCategoryID?/:brandID?', 'product/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // category add 
        .state('categories.add', 
             __globals.stateConfig('^/categories/add/:mCategoryID?', null, {
             	controller  : 'CategoryAddDialogController',
                access  : { 
                    designation : 1
                }
              }
            )
        )

          // category edit
        .state('categories.edit', 
             __globals.stateConfig('^/categories/:catID/edit', null, {
                controller  : 'CategoryEditDialogController',
                access  : { 
                    designation : 1
                }
              }
            )
        )


        /*// edit 
        .state("categories.edit", 
            __globals.appStateConfig('categories.edit', {
            access      : { 
                designation : 1
            }
        }))*/

		// list brands
        .state('brands', 
             __globals.stateConfig('/brands', 'brand/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // add brands 
        .state('brands.add', 
             __globals.stateConfig('/add', null, {
             	controller  : 'BrandAddDialogController',
                access  : { 
                    designation : 1
                }
              }
            )
        )

          // category edit
        .state('brands.edit', 
             __globals.stateConfig('/:brandID/edit', null, {
                controller  : 'BrandEditDialogController',
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // list coupons
        .state('coupons', 
             __globals.stateConfig('/coupons', 'coupon/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )


        // list coupons current
        .state('coupons.current', 
             __globals.stateConfig('/current', 'coupon/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // list coupons expired
        .state('coupons.expired', 
             __globals.stateConfig('/expired', 'coupon/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // list coupons upcoming
        .state('coupons.upcoming', 
             __globals.stateConfig('/up-coming', 'coupon/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // list shippings
        .state('shippings', 
             __globals.stateConfig('/shipping', 'shipping/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // add shipping 
        .state('shippings.add', 
             __globals.stateConfig('/add', null, {
             	controller  : 'ShippingAddDialogController',
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // edit coupon
        .state('shippings.edit', 
             __globals.stateConfig('/:shippingID/edit', null, {
                controller  : 'ShippingEditDialogController',
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // list taxes
        .state('taxes', 
             __globals.stateConfig('/taxes', 'tax/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // add tax 
        .state('taxes.add', 
             __globals.stateConfig('/add', null, {
             	controller  : 'TaxAddDialogController',
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // edit tax
        .state('taxes.edit', 
             __globals.stateConfig('/:taxID/edit', null, {
                controller  : 'TaxEditDialogController',
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // add product
        .state('product_add', 
             __globals.stateConfig('/product/add', 'product/manage/add', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // add category product
        .state('category_product_add', 
             __globals.stateConfig('/product/add/:categoryID', 'product/manage/add', {
                access  : { 
                    designation : 1
                }
              }
            )
        )
        
        // products
        /*.state('products', 
             __globals.stateConfig('/products', 'product/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )*/

        // products by category id
       /*.state('category_products', 
             __globals.stateConfig('/:categoryID/category-products', 'product/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

       // products by brand id
       .state('brand_products', 
             __globals.stateConfig('/:brandId/brand-products', 'product/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )*/


        // edit product
        .state('product_edit', 
             __globals.stateConfig('/product/:productID/edit', 'product/manage/edit', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // edit product
        .state('product_edit.details', 
             __globals.stateConfig('/details', 'product/manage/edit-details', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // product options
        .state('product_edit.options', 
             __globals.stateConfig('/options', 'product/manage/options/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

         // product specification
        .state('product_edit.specification', 
             __globals.stateConfig('/specification', 'product/manage/specification/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // pages
        .state('pages', 
             __globals.stateConfig('/pages/:parentPageID?', 'pages/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )


        // add page
        .state('pages.add', 
             __globals.stateConfig('^/pages/add/', null, {
                controller  : 'ManagePagesAddDialogController',
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // edit page
        .state('pages.edit', 
             __globals.stateConfig('^/pages/:pageID/edit', null, {
                controller  : 'ManagePagesEditDialogController',
                access  : { 
                    designation : 1
                }
              }
            )
        )

       // page_details
        .state('page_details', 
             __globals.stateConfig('/details/:pageID/:pageTitle', 'pages/manage/details', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // store_settings_edit
        .state('store_settings_edit', 
             __globals.stateConfig('/setting', 'store/edit_settings', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // store_settings_edit general 
        .state('store_settings_edit.general', 
             __globals.stateConfig('/general', null, {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // store_settings_edit products
        .state('store_settings_edit.product', 
             __globals.stateConfig('/product', null, {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // store_settings_edit placements
        .state('store_settings_edit.placement', 
             __globals.stateConfig('/placements', null, {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // store_settings_edit currency
        .state('store_settings_edit.currency', 
             __globals.stateConfig('/currency', null, {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // store_settings_edit order
        .state('store_settings_edit.order', 
             __globals.stateConfig('/order', null, {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // store_settings_edit contact
        .state('store_settings_edit.contact', 
             __globals.stateConfig('/contact', null, {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // store_settings_edit term_condition
        .state('store_settings_edit.term_condition', 
             __globals.stateConfig('/users', null, {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // store_settings_edit privacy_policy
        .state('store_settings_edit.privacy_policy', 
             __globals.stateConfig('/privacy-policy', null, {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // store_settings_edit social
        .state('store_settings_edit.social', 
             __globals.stateConfig('/social', null, {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // store_settings_edit language
        .state('store_settings_edit.language', 
             __globals.stateConfig('/language', null, {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // store_settings_edit css style
        .state('store_settings_edit.css-style', 
             __globals.stateConfig('/css-style', null, {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // product images
        .state('product_edit.images', 
             __globals.stateConfig('/images', 'product/manage/Images/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // manage orders
        .state('orders', 
             __globals.stateConfig('/orders', 'order/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // manage order active
        .state('orders.active', 
            __globals.stateConfig('/active/:userID?', 'order/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // manage order invalid-cancelled
        .state('orders.cancelled', 
            __globals.stateConfig('/cancelled/:userID?', 'order/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // manage order active
        .state('orders.completed', 
            __globals.stateConfig('/completed/:userID?', 'order/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // order details
        .state('order_details', 
             __globals.stateConfig('/order/:orderId/details', 'order/manage/details-view', {
                access  : { 
                    designation : 1
                }
              }
            )
        )
        
        // manage report active
        .state('reports', 
            __globals.stateConfig('/report', 'report/manage/list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        // manage payments list
        .state('payments', 
            __globals.stateConfig('/payments', 'order/manage/payment-list', {
                access  : { 
                    designation : 1
                }
              }
            )
        )

        
        // invalid request
        .state('invalid_request', __globals.stateConfig('/invalid-request',
            'errors/invalid-request'
        ))

        // not found
        .state('not_found', __globals.stateConfig('/not-found',
            'errors.manage-not-exist'
        ))

        // not exist
        .state('not_exist', __globals.stateConfig('/not-exist',
            'errors.manage-not-exist'
        ))

        // unauthorized
        .state('unauthorized', __globals.stateConfig('/unauthorized',
            'errors.unauthorized', {
            access      : {}
        }));

    };

})();;
(function() {
'use strict';
	
	/*
	 ManageController
	-------------------------------------------------------------------------- */
	
	angular
        .module('ManageApp.master', [])
        .controller('ManageController', 	[
			'$rootScope',
            '__DataStore', 
            '$scope', 
            '__Auth', 
            'appServices', 
            'appNotify', 
            ManageController 
	 	]).controller('HelpController',    [
            '$rootScope',
            '$scope', 
            HelpController 
        ]);

  /**
	* ManageController for manage page application
	*
	* @inject $rootScope
	* @inject __DataStore
	* @inject $scope
	* @inject __Auth
	* @inject appServices
	* @inject appNotify
	* 
	* @return void
	*-------------------------------------------------------- */

	function ManageController($rootScope, __DataStore, $scope, __Auth,  appServices, appNotify) {

	 	var scope 	= this;

        scope.pageStatus    = false;

	 	__Auth.refresh(function(authInfo) {

	 		scope.auth_info = authInfo;
        	
	 	});

	 	// update the total new order placed count
	 	$rootScope.$on('update.new.order.placed.count', function(event, data) {
	 		
			scope.newOrderPlacedCount = data.newOrderPlacedCount;
		});
			
        scope.unhandledError = function() {

              appNotify.error(__globals.getReactionMessage(19)); // Unhandled errors

        };

        $rootScope.$on('lw.page.css_styles', function (event, data) {

            scope.pageCSSStyles = data.header_bg_color;

        });

	 	$rootScope.$on('lw.events.state.change_start', function () {
	 		appServices.closeAllDialog(); 
	 		var sw =  document.querySelector(".show-sweet-alert");
            
            if(sw) {
             	var okButton = $('.sweet-close');
             	$(okButton).trigger("click");  
            }
            scope.currentStateStatus = false;
        });

	 	$rootScope.$on('lw.auth.event.reset', function (event, authInfo) {
	 		scope.auth_info = authInfo;             
        });

	 	$rootScope.$on('lw.form.event.process.started', function (event, data) {

	 		$('button[type="submit"] span').addClass('fa fa-spinner fa-spin');
	 		$('a, button').prop("disabled", true);
        	$('button[type="submit"]').prop("disabled", true);

    	});

	 	$rootScope.$on('lw.form.event.process.finished', function (event, data) {

        	$('button[type="submit"] span').removeClass('fa fa-spinner fa-spin');
        	$('button[type="submit"]').prop("disabled", false);
        	$('a, button').prop("disabled", false);

    	} );

        $rootScope.$on('lw.form.event.fetch.started', __globals.showFormLoader );

        $rootScope.$on('lw.datastore.event.fetch.finished', __globals.hideFormLoader );

        $rootScope.$on('lw.form.event.process.error', scope.unhandledError );

        $rootScope.$on('lw.datastore.event.fetch.error', scope.unhandledError );

        scope.showUploadManagerDialog  =  function() {
            appServices.showDialog(scope, {
                templateUrl : __globals.getTemplateURL('upload-manager.upload-manager-dialog')
            },
            function(promiseObj) {

            });
        };

        CKEDITOR.plugins.add('UploadManager', {

            init: function (editor) {

                editor.ui.addButton('UploadManager', {
                    label   : 'Upload Files',
                    command : 'UploadManagerDialog',
                    icon    : '../imgs/ckeditor/upload-manager.png',
                    toolbar : 'insert'
                });
                var cmd = editor.addCommand('UploadManagerDialog', {
                    exec : scope.showUploadManagerDialog 
                });

            }

       });  


        /**
          * Open help dialog
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.openHelpDailog = function(templateUrl, templateTitle) {

            scope.templateTitle = templateTitle;

            appServices.showDialog(scope,
            {
                templateUrl  : __globals.getTemplateURL(templateUrl)
            },
            function(promiseObj) {
               
               

            });

        };

	};

    /**
    * HelpController for helping information
    *
    * @inject $rootScope
    * @inject $scope
    * 
    * @return void
    *-------------------------------------------------------- */

    function HelpController($rootScope, $scope) {

        var scope  = this;
        scope.templateTitle =  $scope.ngDialogData.templateTitle;

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
/*!
 *  Engine      : UploadManagerEngine 
 *  Component   : UploadManager
----------------------------------------------------------------------------- */
(function( window, angular, undefined ) {

'use strict';

    /**
      * UploadManagerEngine
      *
      * @inject object __DataStore       -  js-utils data store service for sent http request
      * @inject object appServices       -  app common service
      * 
      * @return void
      *---------------------------------------------------------------------- */

    angular
        .module('uploadManagerEngine', [])

        /**
          * UploadManagerController
          *
          * @inject object __DataStore       -  js-utils data store service for sent http request
          * @inject object appServices       -  app common service
          * 
          * @return void
          *---------------------------------------------------------------------- */

        .controller('UploadManagerController',[
            '__DataStore',
            'appServices',
            function (__DataStore, appServices) {
                

            }
        ])

        /**
          * UploadManagerDialogController
          *
          * @inject object __DataStore       -  js-utils data store service for sent http request
          * @inject object appServices       -  app common service
          * 
          * @return void
          *---------------------------------------------------------------------- */
          
        .controller('UploadManagerDialogController',[
            '__DataStore',
            'appServices',
            'FileUploader',
            '__Utils',
            '$scope',
            function (__DataStore, appServices, FileUploader, __Utils, $scope) {
                
                var scope    = this,
                    uploader = scope.uploader = new FileUploader({
                    url         : __Utils.apiURL('upload_manager.upload'),
                    autoUpload  : true,
                    headers     : {
                        'X-XSRF-TOKEN': __Utils.getXSRFToken()
                    }
                });

                scope.close = function() {
                    $scope.closeThisDialog();
                };

                /**
                  * Fetch upload manager files
                  *
                  * @return void
                  *---------------------------------------------------------------- */

                scope.getFiles = function() {

                    __DataStore.fetch('upload_manager.files', { fresh : true })
                        .success(function(responseData) {
                            
                        appServices.processResponse(responseData, null, function() {
                            scope.files = responseData.data.files
                        });    

                    });

                };

                scope.getFiles();

                // FILTERS
                uploader.filters.push({
                    name: 'customFilter',
                    fn: function(item /*{File|FileLikeObject}*/, options) {
                        return this.queue.length < 1000;
                    }
                });

                // CALLBACKS
                uploader.onCompleteItem = function(fileItem, response, status, headers) {
                    appServices.processResponse(response, null, function() {
                    });
                    
                };

                uploader.onCompleteAll = function() {
                    scope.getFiles();
                };


                /**
                  * Select image
                  *
                  * @return void
                  *-------------------------------------------------------- */

                scope.selectImage = function(imgURL) {

                    var imgTag = '<img src="'+imgURL+'"/>',
                        editor = CKEDITOR.instances['description'];
                    editor.insertHtml(imgTag);

                    scope.close(); // close dialog

                };

                /**
                  * Select document
                  *
                  * @return void
                  *-------------------------------------------------------- */

                scope.selectDocument = function(fileURL, fileName) {

                    var linkTag = '<a href="'+fileURL+'"/>'+fileName+'</a>',
                        editor  = CKEDITOR.instances['description'];

                    editor.insertHtml(linkTag);

                    scope.close(); // close dialog

                };

                /**
                  * Delete file
                  *
                  * @return void
                  *---------------------------------------------------------------- */

                scope.delete = function(fileName) {

                    __DataStore.post({
                        'apiURL'    : 'upload_manager.delete',
                        'fileName'  : fileName
                    })
                    .success(function(responseData) {
                            
                        appServices.processResponse(responseData, null, function() {
                            scope.getFiles();
                        });    

                    });

                };

            }
        ])

        ;

})(window, window.angular);;
(function() {
'use strict';
    
    /*
       ManageUsersController Module
      ----------------------------------------------------------------------- */
    
    angular
        .module('UserApp.manage', [])
        .controller('ManageUsersController',   [
            '$scope', 
            '__DataStore',
            'appServices',
            ManageUsersController 
        ]).controller('UserAddController',   [
            '$scope', 
            '__Form',
            'appServices','__DataStore',
            UserAddController 
        ]).controller('ContactController',   [
            '$scope', 
            '__Form',
            'appServices','__DataStore',
            ContactController 
        ]);

    /**
      * ManageUsersController - show all store users & we can perform actions -
      * on this users
      *
      * @inject __Form
      * @inject __DataStore
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */

    function ManageUsersController($scope, __DataStore, appServices) {

        var dtUsersColumnsData = [
            {
                "name"      : "name",
                "template"  : "#userNameColumnTemplate",
                "orderable" : true
            },
            {
                "name"      : "email",
                "orderable" : true
            },
            {
                "name"      : "creation_date",
                "orderable" : true
            },
            {
            	"name"		: "last_login",
            	"orderable" : true
            },
            {
                "name"      : null,
                "template"  : "#userActionColumnTemplate"
            }
        ],
        tabs    = {
            'active'    : {
                id      : 'activeUsersTabList',
                status  : 1
            },
            'deleted'    : {
                id      : 'deletedUsersTabList',
                status  : 5
            },
            'never_activated'    : {
                id      : 'neverActivatedUsersTabList',
                status  : 4
            }
        },
        scope   = this;


        // Manage users tab action
        // When clicking on tab, its related tab data load on same page

        $('#manageUsersTabs a').click(function (e) {

            e.preventDefault();

            var $this       = $(this),
                tabName     = $this.attr('aria-controls'),
                selectedTab = tabs[tabName];

            // Check if selected tab exist    
            if (!_.isEmpty(selectedTab)) {

                $(this).tab('show')

                scope.getUsers(selectedTab.id, selectedTab.status);

            }
            
        });

        /**
          * Get users as a datatable source  
          *
          * @param string tableID
          * @param number status
          *
          * @return void
          *---------------------------------------------------------------- */
                        
        scope.getUsers   = function(tableID, status) {

            // destroy if existing instatnce available
            if (scope.usersListDataTable) {
                scope.usersListDataTable.destroy();
            }

            scope.usersListDataTable = __DataStore.dataTable('#'+tableID, { 
                url         : {
                    'apiURL'    : 'manage.users.list',
                    'status'    : status
                }, 
                dtOptions   : {
                    "searching"     : true
                },
                columnsData : dtUsersColumnsData, 
                scope       : $scope

            });

        };

        // load initail data for first tab
        scope.getUsers('activeUsersTabList', 1);

        /*
          Reload current datatable
          ------------------------------------------------------------------- */
        
        scope.reloadDT = function() {
            __DataStore.reloadDT(scope.usersListDataTable);
        };

        /**
          * Delete user 
          *
          * @param number userID
          * @param string userName
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.delete = function(userID, userName) {
        	
            __globals.showConfirmation({
                text                : __ngSupport.getText(
                    __globals.getJSString('user_delete_confirm_text'), {
                        '__name__'    : unescape(userName)
                    }
                ),
                confirmButtonText   : __globals.getJSString('delete_action_button_text')
            },
            function() {

                __DataStore.post({
                    'apiURL'  : 'manage.user.delete',
                    'userID'  : userID,
                })
                .success(function(responseData) {
                
                    var message = responseData.data.message;

                    appServices.processResponse(responseData, {

                            error : function() {

                                __globals.showConfirmation({
                                    title   : 'Deleted!',
                                    text    : message,
                                    type    : 'error'
                                });

                            }
                        },
                        function() {

                            __globals.showConfirmation({
                                title   : 'Deleted!',
                                text    : message,
                                type    : 'success'
                            });
                            scope.reloadDT();   // reload datatable

                        }
                    );    

                });

            });

        };

        /**
          * Restore deleted user 
          *
          * @param number userID
          * @param string userName
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.restore = function(userID, userName) {

            __globals.showConfirmation({
                text                : __ngSupport.getText(
                    __globals.getJSString('user_restore_confirm_text'),{
                        '__name__'    : userName
                    }
                ),
                confirmButtonText   : __globals.getJSString('restore_action_button_text')
            },
            function() {

                __DataStore.post({
                    'apiURL'  : 'manage.user.restore',
                    'userID'  : userID,
                })
                .success(function(responseData) {
                
                    var message = responseData.data.message;

                    appServices.processResponse(responseData, {

                            error : function() {
                                __globals.showConfirmation({
                                    title   : 'Restore!',
                                    text    : message,
                                    type    : 'error'
                                });
                            }
                        },
                        function() {

                            __globals.showConfirmation({
                                    title   : 'Restore!',
                                    text    : message,
                                    type    : 'success'
                                });
                            scope.reloadDT();   // reload datatable

                        });    

                    });
                }
            );

        };

        /**
          * Change password of user by Admin 
          *
          * @param number userID
          * @param number name
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.changePassword = function (userID, name) {
        	
        	// open change password dialog
			appServices.showDialog({
					userID : userID,
        			name   : unescape(name)
        		},
		        {	
		            templateUrl : __globals.getTemplateURL('user.manage.change-password')
		        },
		        function(promiseObj) {

		        });
        };

        /**
          * Change password of user by Admin 
          *
          * @param number userID
          * @param number name
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.getUserDetails =function (userID) {

        	__DataStore.fetch({
        		apiURL : 'manage.users.get.detail',
        		userID : userID
        	})
        	.success(function(responseData) {

        		var requestData = responseData.data;
        		
        		appServices.processResponse(responseData, null, function() {
        			
        			appServices.showDialog(responseData.data, {

        				templateUrl : __globals.getTemplateURL('user.manage.user-details')
        			},
        			function(promiseObj){

        			});
        		});
        	});
        };

        /**
          * Contact user dialog
          * 
          * @return void
          *---------------------------------------------------------------- */

        scope.contactDialog = function (id) {

        	appServices.showDialog({
        		'userId': id},
            {
                templateUrl : __globals.getTemplateURL(
                    'user.manage.contact'
                )
            },
            function(promiseObj) {

            });
        };

        /**
          * Add new user dialog
          * 
          * @return void
          *---------------------------------------------------------------- */

        scope.addNewUser = function (id) {

            appServices.showDialog(scope,
            {
                templateUrl : __globals.getTemplateURL(
                    'user.manage.add'
                )
            },
            function(promiseObj) {
                  
                if (_.has(promiseObj.value, 'user_added') 
                    && promiseObj.value.user_added == true) {
                    scope.reloadDT();
                }
                
            });
        };

    };

    function UserAddController($scope, __Form, appServices, __DataStore) {

        var scope  = this;
            scope  = __Form.setup(scope, 'add_new_user_form', 'userData');
            
            /**
              * Submit register form action
              *
              * @return void
              *---------------------------------------------------------------- */
            
            scope.submit = function() {

                 __Form.process('manage.user.add', scope)
                    .success(function(responseData) {
                        
                    appServices.processResponse(responseData, null, function() {
                        
                        $scope.closeThisDialog({'user_added':true});
                    });    

                });

            };

            /**
            * Close dialog
            *
            * @return void
            *---------------------------------------------------------------- */
            scope.closeDialog = function() {
                $scope.closeThisDialog({'user_added':false});
            };
    };

    function ContactController($scope, __Form, appServices, __DataStore) {

    	var scope 	 = this;

    	 	scope    = __Form.setup(scope, 'contact_form', 'userData', {
		            secured : true,
                    unsecuredFields : ['message'],
		        });

	        // get ng dialog data
	        scope.ngDialogData = $scope.ngDialogData;

	        __DataStore.fetch({
        		'apiURL' : 'user.get.info',
        		'userId' : scope.ngDialogData.userId
        	})
        	.success(function(responseData) {

        		var requestData = responseData.data;

        		appServices.processResponse(responseData, null, function () {

        			scope.userData = requestData;

    				scope   = __Form.updateModel(scope, scope.userData)
        			
        		});
        	});
    		
	        /**
	          * Submit register form action
	          *
	          * @return void
	          *---------------------------------------------------------------- */
	        
	        scope.submit = function() {

	        	 __Form.process('manage.user.contact.process', scope)
	                .success(function(responseData) {
	                    
	                appServices.processResponse(responseData, null, function() {
	                	
	                	$scope.closeThisDialog();
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
     ManageUserChangePasswordController module
    -------------------------------------------------------------------------- */
    
    angular
        .module('UserApp.manageUserChangePassword', [])
        .controller('ManageUserChangePasswordController',   [
        	'$scope',
            '__Form', 
            'appServices',
            ManageUserChangePasswordController 
        ]);

    /**
      * ManageUserChangePasswordController handle change password by admin
      * 
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */

    function ManageUserChangePasswordController($scope,__Form, appServices) {

        var scope   = this;

        scope = __Form.setup(scope, 'change_password_form', 'changePasswordData', {
        			secured : true
                });
        
        scope.ngDialogData = $scope.ngDialogData;

        scope.title = __ngSupport.getText(
                    __globals.getJSString('user_change_password_title_text'), {
                        '__name__'    : unescape(scope.ngDialogData.name)
                    });

        // get id of user
        scope.userID = scope.ngDialogData.userID;


        /*
	 	 Submit form action
	 	-------------------------------------------------------------------------- */

	 	scope.submit = function() {
            
            __Form.process({
                'apiURL'    : 'manage.user.change_password.process',
                'userID' : scope.userID
            }, scope)
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                	
                	// close dialog
	      			$scope.closeThisDialog();

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
     ManageUserDetailsDialog module
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.userDetailDialog', [])
        .controller('ManageUserDetailsDialog',   [
            '$scope',
            ManageUserDetailsDialog 
        ]);

    /**
      * ManageUserDetailsDialog for manage product list
      *
      * @inject $scope
      * @inject __Form
      * 
      * @return void
      *-------------------------------------------------------- */
    function ManageUserDetailsDialog($scope) {

        var scope   = this;
       
        scope.ngDialogData  = $scope.ngDialogData;
        scope.userDetails 	= scope.ngDialogData;
        
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
	 CategoryController
	-------------------------------------------------------------------------- */
	
	angular
        .module('ManageApp.category', [])
        .controller('CategoryController', 	[
            '$scope', 
            '__DataStore', 
            'appServices',
            '$state',
            '__Utils',
            CategoryController 
	 	]);

	/**
	 * CategoryController for admin.
	 *
	 * @inject __DataStore
	 * @inject $scope
	 * @inject $state
	 * 
	 * @return void
	 *-------------------------------------------------------- */

	function CategoryController($scope, __DataStore, appServices, $state, __Utils) {

	 	var scope   			= this,
		 	catID 				= _.isEmpty($state.params.mCategoryID)
			 				 		? null 
			 				 		: $state.params.mCategoryID,
		 	currentStateName 	= $state.current.name;

		// Get current state name
	 	scope.currentStateName 			= currentStateName;

	 	scope.pageContentLoaded 		= false;
	 	scope.parentCategoryExist 		= false;

	 	// Get category ID
		scope.categoryID = catID;
		 	
 		scope.dtCategoriesColumnsData = [
	        {
	            "name"      : "name",
	            "orderable" :  true,
	            "template"  : "#categoriesColumnActionSubcategories"
	        },
	        {
	            "name"      : "status",
	            "orderable" :  true,
	            "template"  : "#categoriesColumnStatus"
	        },
	        {
	            "name"      : null,
	            "template"  : "#categoriesColumnActionAddcategory"
	        },
	        {
	            "name"      : null,
	            "template"  : "#categoriesColumnActionAddProduct"
	        },
	        {
	            "name"      : null,
	            "template"  : "#categoriesColumnActionTemplate"
	        }
    	];
        var tabs    = {
            'manageCategories'    : {
                    id      : 'categoriesTabList',
                    route   : 'categories'
            },
        };

	 	/**
	      * Get datatable source data.
	      *
	      * @return void
	      *---------------------------------------------------------------- */
	      
	    scope.getCategories  = function() {
	    	
	    	// destroy instance of datatable
	    	if (scope.categoriesDataTable) {
	            scope.categoriesDataTable.destroy();
	        }

            scope.categoriesDataTable = __DataStore.dataTable('#categoriesTabList', {
	            url : {
                    'apiURL'        : 'category.list',
                    'categoryID?'   : catID
                },
	            dtOptions   : {
	                "searching" : true
	            },
	            columnsData : scope.dtCategoriesColumnsData, 
	            scope       : $scope,

	        });
            
            // if category ID exist
	        if (catID) {
	        	__DataStore.fetch({
	                'apiURL' : 'category.get.supportData',
	                'catID'  : catID
              	}).success(function(responseData) {
                    
                    appServices.processResponse(responseData, null, function() {
                        scope.parentCategory        = responseData.data.categoryData;
                        scope.isParentInactive      = scope.parentCategory.status;
                        scope.pageContentLoaded     = true;
                        scope.parentCategoryExist   = true;
                        scope.parentData            =  responseData.data.parentData;
                        scope.isInactiveParent = responseData.data.isInactiveParent;
                    });

	            });
 			} else if (!_.isEmpty($state.params.brandID)) {
 				
	            url = {
	              'apiURL'     : 'manage.brand.product.list',
	               'brandId'   : $state.params.brandID
	            };


	        } else {
	        	scope.pageContentLoaded = true;
	        }
		};

		_.defer(function() {

			scope.getCategories();

		});

	    /**
          * Go to categories URL
          *
          * @param $event
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.goToCategories = function ($event) {
	        $event.preventDefault();
	        $state.go('categories', {'mCategoryID' : catID});
	    };

	    /**
          * Go to products URL 
          *
          * @param $event
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.goToProducts = function ($event) {
	        $event.preventDefault();
	        $state.go('products', {'mCategoryID' : catID});
	    };


	    /*
	     * Reload current datatable
	     *
	     *------------------------------------------------------------------ */
	    
	    scope.reloadDT = function () {
	        __DataStore.reloadDT(scope.categoriesDataTable);
	    };

        /**
	      * Get detail dialog.
	      *
	      * @return void
	      *---------------------------------------------------------------- */
	    scope.detailDialog = function (productID) {

	    	__DataStore.fetch({
	        	'apiURL'	: 'manage.product.detailSupportData',
	        	'productID'	: productID
	        })
    	   .success(function(responseData) {

    	   		var requestData = responseData.data;

		    	appServices.showDialog(requestData,
		        {	
		            templateUrl : __globals.getTemplateURL(
		                    'product.manage.detail-dialog'
		                )
		        },
		        function(promiseObj) {

		        });
	       });
	    }

	    /**
          * Add new category
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.add   = function(catID) {

        	this.catID = catID;

        	__DataStore.fetch('category.fancytree.support-data')
					.success(function(responseData) {

          			scope.categories = responseData.data.categories;
          		
	          		appServices.showDialog(scope,
	                {
	                    templateUrl : __globals.getTemplateURL(
	                            'category.add-dialog'
	                        )
	                },
	                function(promiseObj) {

	                    // Check if category updated
	                    if (_.has(promiseObj.value, 'category_added') 
	                        && promiseObj.value.category_added === true) {
	                        scope.reloadDT();
	                    }

	                });
	    	});
            

        };

        /**
          * Fetch category details & show edit category dialog
          *
          * @param number catID
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.edit   = function(catID) {

            __DataStore.fetch({
                    'apiURL'    : 'category.get.details',
                    'catID'     :  catID
                })
                .success(function(responseData) {
                
                    appServices.processResponse(responseData, null, function() {

                    	scope.categoryData = responseData.data;
                    	
                    	if (responseData.data.status === 0)
						{
                       		scope.categoryData.status = false;
						} else {
							scope.categoryData.status = true;
						}

                        appServices.showDialog({
                            'id'        :scope.categoryData.id,
		  					'name'      :scope.categoryData.name,
		  					'status'    :scope.categoryData.status,
		  					'parent_cat':scope.categoryData.parent_id
                        },
                        {
                            templateUrl : __globals.getTemplateURL(
                                    'category.edit-dialog'
                                )
                        },
                        function(promiseObj) {

                            // Check if category updated
                            if (_.has(promiseObj.value, 'category_updated') 
                                && promiseObj.value.category_updated === true) {
                                scope.reloadDT();
                            	scope.getProducts();

                            }

                        }
                    );

                });    

            });

        };

	    /**
	    * delete category
	    *
	    * @param int categoryID 
	    * @param string  name 
	    *
	    * @return void
	    *---------------------------------------------------------------- */
	    
	    scope.deleteDialog  =  function(categoryID, name) 
	    { 	
	    	appServices.showDialog({
	    		categoryID : categoryID,
	    		name 	   : name
	    	},
	        {	
	            templateUrl : __globals.getTemplateURL(
	                'category.delete-dialog'
	            )
	        }, function(promiseObj) {
	        	
	        	if (_.has(promiseObj.value, 'category_deleted') 
                    && promiseObj.value.category_deleted === true) {
	        		
	        		scope.reloadDT();

                }
	        });
				    
		};

    };

})();;
(function() {
'use strict';
    
    /*
     CategoryAddDialogController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.categoryAddDialog', [])
        .controller('CategoryAddDialogController',   [
        	'$scope',
        	'$state',
            'appServices',
            '__DataStore',
            CategoryAddDialogController 
        ]);

    /**
      * CategoryAddDialogController open add category form in dialog
      * @inject $scope
      * @inject $state
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */

    function CategoryAddDialogController($scope, $state, appServices, __DataStore) {

    	var scope   = this;

    	__DataStore.fetch('category.fancytree.support-data')
				.success(function(responseData) {
				
          		scope.categories = responseData.data.categories;

          		appServices.showDialog(scope,
		        {	
		            templateUrl : __globals.getTemplateURL(
		                    'category.add-dialog'
		                )
		        },
		        function(promiseObj) {
		            // Check if category added
		            if (_.has(promiseObj.value, 'category_added') 
		                && promiseObj.value.category_added === true) {
		            	$scope.$parent.categoryCtrl.reloadDT();
		            }
		            $state.go('categories');
		        });
	    });
        

    };

})();;
(function() {
'use strict';
    
    /*
     CategoryAddController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.categoryAdd', [])
        .controller('CategoryAddController',   [
        	'$scope',
            '__Form', 
            '$state',
            'appServices',
            '__DataStore',
            CategoryAddController 
        ]);

    /**
      * CategoryAddController handle add category form
      * 
      * @inject $scope
      * @inject __Form
      * @inject $state
      * @inject appServices
      * @inject __Utils
      * 
      * @return void
      *-------------------------------------------------------- */

    function CategoryAddController($scope,__Form, $state, appServices, __DataStore) {

        var scope   = this;

        scope = __Form.setup(scope, 'category_add_form', 'categoryData');

        scope.categoryStatus		  = false;
        scope.categoryData.status     = true;

        if (_.isEmpty($state.params.mCategoryID)) {
        	
        	scope.categoryData.parent_cat = $scope.ngDialogData.catID;
        } else {
        	scope.categoryData.parent_cat = $state.params.mCategoryID;
        }
		

		scope.categoryData.categories = $scope.ngDialogData.categories;

		 _.forEach(scope.categoryData.categories, function(value) {

			if (value.key == scope.categoryData.parent_cat) {

				scope.categoryStatus = true;

				scope.categoryName = __ngSupport.getText(
                    __globals.getJSString('category_add_title_text'), {
                        '__name__'    : value.title
                    });
			}
        });

		/*
	 	 Submit form action
	 	-------------------------------------------------------------------------- */

	 	scope.submit = function() {
            
	 		__Form.process('category.add', scope)
	 						.success(function(responseData) {
		      		
				appServices.processResponse(responseData,null, function(reactionCode) {

	                // close dialog
	      			$scope.closeThisDialog({ category_added : true });

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
	 CategoryEditDialogController
	-------------------------------------------------------------------------- */
	
	angular
        .module('ManageApp.categoryEditDialog', [])
        .controller('CategoryEditDialogController', 	[
            '$scope', 
            '$state', 
            'appServices',
            '__DataStore',
            CategoryEditDialogController 
	 	]);

	/**
	 * Handle category edit dialog scope
	 *
     * @inject $scope
	 * @inject __Form
	 * @inject $scope
	 * 
	 * @return void
	 *-------------------------------------------------------- */

	function CategoryEditDialogController($scope, $state, appServices, __DataStore) {

	 	var scope   = this;

        __DataStore.fetch({
        	'apiURL': 'category.get.details',
        	'catID': $state.params.catID
        })
	   .success(function(responseData) {

			appServices.processResponse(responseData,null, function(reactionCode) {

				appServices.showDialog(responseData.data,{
	                templateUrl : __globals.getTemplateURL(
	                        'category.edit-dialog'
	                    )
	            },
	            function(promiseObj) {
						
					// Check if category updated
                    if (_.has(promiseObj.value, 'category_updated') 
                        && promiseObj.value.category_updated === true) {
                        $scope.$parent.categoryCtrl.reloadDT();
                    	//$scope.$parent.categoryCtrl.productReloadDT();
                    }
                    $state.go('categories');
				
                });
			});
		});
	};

})();;
(function() {
'use strict';
	
	/*
	 CategoryController
	-------------------------------------------------------------------------- */
	
	angular
        .module('ManageApp.categoryEdit', [])
        .controller('CategoryEditController', [
            '$scope',
            '__Form',
            '$state',
            'appServices',
            CategoryEditController 
	 	]);

	/**
	 * CategoryController for admin.
	 *
	 * @inject __DataStore
	 * @inject $scope
	 * @inject $state
	 * 
	 * @return void
	 *-------------------------------------------------------- */

	function CategoryEditController($scope, __Form, $state, appServices) {

	 	var scope = this;
	 		scope.categoryStatus		  = false;
	 		
			scope.updateURL = {
				'apiURL'	:'category.update',
				'catID' 	: $state.params.catID
			};

			scope 	= __Form.setup(scope, 'form_category_edit', 'categoryData');
			scope   = __Form.updateModel(scope, $scope.ngDialogData);

			scope.categoryData.parent_cat = $scope.ngDialogData.parent_id;

			scope.categoryData.categories = $scope.ngDialogData.categories;
			

			 _.forEach(scope.categoryData.categories, function(value) {

				if (value.key == scope.categoryData.parent_cat) {
					scope.categoryStatus = true;
					scope.categoryName = value.title;
				}
        	});

			/**
			 * Update category.
			 *
			 * 
			 * @return void
			 *-------------------------------------------------------- */
			scope.update = function() {

		 		// post form data
		 		__Form.process(scope.updateURL, scope )
		 						.success( function( responseData ) {
			      		
					appServices.processResponse(responseData, function(reactionCode) {

		                if (reactionCode === 1) {
		                	// close dialog
		      				$scope.closeThisDialog( { category_updated : true } );
		      				
		                }

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
  	  		$state.go('categories');
  	  	};


	};

})();;
(function() {
'use strict';
    
    /*
     Login Controller
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.categoryDelete', [])
        .controller('CategoryDeleteController',   [
            '$scope',
            '__Form',  
            'appServices',
            '$state',
            '__DataStore',
            CategoryDeleteController 
        ]);

    /**
      * CategoryDeleteController for delete category
      * @inject __Form
      * @inject appServices
      * @inject $state
      * 
      * @return void
      *-------------------------------------------------------- */

    function CategoryDeleteController($scope, __Form, appServices, $state, __DataStore) {

        var scope   = this;

        scope = __Form.setup(scope, 'form_category_delete', 'categoryData', {
            secured : true
        });
        
        scope.categoryID    = $scope.ngDialogData.categoryID;
        scope.categoryName	= _.unescape($scope.ngDialogData.name);

        /**
          * Submit delete action
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.submit = function(categoryID) {

        	__Form.process({
                    'apiURL'     : 'category.delete',
                    'categoryID' : categoryID,
                }, scope).success(function(responseData) {
		      		
				appServices.processResponse(responseData, function(reactionCode) {

	                if (reactionCode === 1) {
	                	// close dialog
	      				$scope.closeThisDialog({category_deleted : true});
					}

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
		}
	};

})();;
(function() {
'use strict';
	
	/*
	 BrandListController
	-------------------------------------------------------------------------- */
	
	angular
        .module('ManageApp.brand', [])
        .controller('BrandListController', 	[
            '$scope', 
            '__DataStore', 
            'appServices',
            BrandListController 
	 	]);

	/**
	 * BrandListController for admin.
	 *
	 * @inject $scope
	 * @inject __DataStore
	 * @inject $appServices
	 * 
	 * @return void
	 *-------------------------------------------------------- */

	function BrandListController($scope, __DataStore, appServices) {

		var scope   = this,
			dtProductsColumnsData = [
                {
                    "name"      : "logo_url",
                    "template"  : "#brandLogoColumnTemplate"
                },
                {
                    "name"      : "name",
                    "orderable" : true,
                    "template"  : "#brandNameColumnTemplate"
                },
                {
	                "name"      : "creation_date",
	                "orderable" : true,
	                "template"  : "#brandCreatedDateColumnTemplate"
	            },
                {
	                "name"      : "status",
	                "orderable" :  true,
	                "template"  : "#statusColumnTemplate"
	            },
	            {
	                "name"      : null,
	                "template"  : "#brandColumnActionTemplate"
	            }
            ];
			
         scope.brandsListDataTable = __DataStore.dataTable('#manageBrandList', {
            url         : "manage.brand.list",
            dtOptions   : {
                "searching": true,
                "order": [[ 1, "asc" ]]
            },
            columnsData : dtProductsColumnsData, 
            scope       : $scope

        });

	    /*
	     Reload current datatable
	    -------------------------------------------------------------------- */
	    
	    scope.reloadDT = function () {
	        __DataStore.reloadDT(scope.brandsListDataTable);
	    };

	    /**
	      * Get detail dialog.
	      *
	      * @return void
	      *---------------------------------------------------------------- */
	    scope.detailDialog = function (brandID) {

	    	__DataStore.fetch({
	        	'apiURL'	: 'manage.brand.detailSupportData',
	        	'brandID'	: brandID
	        })
    	   .success(function(responseData) {

    	   		var requestData = responseData.data;
    	   		
    	   		appServices.processResponse(responseData, null, function() {

			    	appServices.showDialog(requestData,
			        {	
			            templateUrl : __globals.getTemplateURL(
			                    'brand.manage.detail-dialog'
			                )
			        },
			        function(promiseObj) {

			        });
			    });
	       });
	    }

	    /**
	     * delete brand
	     * @param brandID
	     * @param brandName
	     * 
	    -------------------------------------------------------------------- **/
	    scope.delete = function(brandID, brandName) {
	    	/*__globals.showConfirmation({
                text                : __ngSupport.getText(
                    __globals.getJSString('brand_delete_text'), {
                        '__name__'     : unescape(brandName)
                    }
                ),
                confirmButtonText   : __globals.getJSString('delete_action_button_text')
            }, function() {

                __DataStore.post({
                    'apiURL' 	: 'manage.brand.delete',
                    'brandID' 	: brandID,
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
                            scope.reloadDT();   // reload datatable

                        }
                    );    

                });

            });*/

            appServices.showDialog({
                    brandId     : brandID,
                    brandName   : unescape(brandName)
                },
                {   
                    templateUrl : __globals.getTemplateURL('brand.manage.delete-dialog')
                },
                function(promiseObj) {
                    
                    if (_.has(promiseObj.value, 'brand_deleted') && promiseObj.value.brand_deleted) {
                        scope.reloadDT();
                    }

            });

	    }

	};

})();;
(function() {
'use strict';
    
    /*
     BrandDetailDialogController module
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.brandDetailDialog', [])
        .controller('BrandDetailDialogController',   [
            '$scope',
            BrandDetailDialogController 
        ]);

    /**
      * BrandDetailDialogController for manage product list
      *
      * @inject $scope
      * @inject __Form
      * 
      * @return void
      *-------------------------------------------------------- */
    function BrandDetailDialogController($scope) {

        var scope   = this;
       
        scope.ngDialogData  = $scope.ngDialogData;
	    scope.brandData 	= scope.ngDialogData;

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
     BrandAddDialogController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.brandAddDialog', [])
        .controller('BrandAddDialogController',   [
        	'$scope',
        	'$state',
            'appServices',
            BrandAddDialogController 
        ]);

    /**
      * BrandAddDialogController open add brand form in dialog
      * @inject $scope
      * @inject $state
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */

    function BrandAddDialogController($scope, $state, appServices) {

    	var scope   = this;

    	appServices.showDialog(scope,
        {	
            templateUrl : __globals.getTemplateURL(
                    'brand.manage.add-dialog'
                )
        },
        function(promiseObj) {

            // Check if brand added
            if (_.has(promiseObj.value, 'brand_added') 
                && promiseObj.value.brand_added === true) {
            	$scope.$parent.brandListCtrl.reloadDT();
            }
            $state.go('brands');
        });
        

    };

})();;
(function() {
'use strict';
    
    /*
     BrandAddController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.brandAdd', [])
        .controller('BrandAddController',   [
        	'$scope',
        	'__Form',
        	'appServices',
        	'FileUploader',
        	'__Utils',
        	'appNotify',
            BrandAddController 
        ]);

    /**
      * BrandAddController handle add category form
      * 
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * @inject FileUploader
      * @inject __Utils
      * @inject appNotify
      * 
      * @return void
      *-------------------------------------------------------- */

    function BrandAddController($scope, __Form, appServices, FileUploader, __Utils, appNotify) {

        var scope   = this;

        scope = __Form.setup(scope, 'manage_brand_add', 'brandData',
					        { 
					            secured : false
					        });
        scope.brandData.status  = true;

        scope.imagesSelectConfig     = __globals.getSelectizeOptions({
            valueField  : 'name',
            labelField  : 'name',
            render      : {
                item: function(item, escape) {
                    return  __Utils.template('#logoListItemTemplate',
                    item
                    );
                },
                option: function(item, escape) {
                    return  __Utils.template('#logoListOptionTemplate',
                    item
                    );
                }
            }, 
            searchField : ['name']  
        });
        
        /**
          * Fetch uploaded temp images media files
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.images_count = 0;
        scope.getTempImagesMedia = function() {

            __Form.fetch('media.uploaded.images', { fresh : true })
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                    scope.image_files = responseData.data.files
                    if (responseData.data.files.length > 0) {
                    	scope.images_count = responseData.data.files.length;
					};
                });    

            });

        };

        scope.getTempImagesMedia();
        
        var uploader = scope.uploader = new FileUploader({
            url         : __Utils.apiURL('media.upload.image'),
            autoUpload  : true,
            headers     : {
                'X-XSRF-TOKEN': __Utils.getXSRFToken()
            }
        });


        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 1000;
            }
        });

        scope.currentUploadedFileCount = 0;
		scope.loadingStatus     	   = false;

		/**
        * uploading msg
        *
        * @return void
        *---------------------------------------------------------------- */
        uploader.onAfterAddingAll = function() {

            scope.loadingStatus = true;
            appNotify.info(__globals.getJSString('loading_text'),{sticky : true});

        };

        /**
        * Uploading on process
        *
        * @return void
        *---------------------------------------------------------------- */

        uploader.onBeforeUploadItem = function(item) {
            scope.loadingStatus = true;
        };


        /**
        * on success counter of uploaded image
        *
        * @param object fileItem
        * @param object response
        *
        * @return void
        *---------------------------------------------------------------- */
        
        uploader.onSuccessItem = function( fileItem, response ) {

            appServices.processResponse(response, {
                error : function() {
                },
                otherError : function(reactionCode) {
                  
                    // If reaction code is Server Side Validation Error Then 
                    if (reactionCode == 3) {

                        appNotify.error(response.data.message,{sticky : false});

                    }

                }
            },
            function() {

                scope.currentUploadedFileCount++
                
            });   

        };

        /**
        * uploaded all image then call function
        *
        * @return void
        *---------------------------------------------------------------- */
        
        uploader.onCompleteAll  = function() {

           scope.loadingStatus  = false;
            if (scope.currentUploadedFileCount > 0) {
                appNotify.success(scope.currentUploadedFileCount+' '+__globals.getJSString('file_uploaded_text'), {sticky : false});

            }
            scope.getTempImagesMedia();
            scope.currentUploadedFileCount = 0;

        };

        /**
          * Submit brand form action
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function() {
        	 
            __Form.process('manage.brand.add', scope)
                .success(function(responseData) {

                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog( { brand_added : true, brand : responseData.data.brand } );
                });    

            });

        };

        /**
          * Show uploaded media files
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.showUploadedMediaDialog = function() {

            appServices.showDialog({ 'image_files' : scope.image_files }, {
                templateUrl : __globals.getTemplateURL(
                    'product.manage.uploaded-media'
                )
            }, function(promiseObj) {
            	// Check if upload files updated
                if (_.has(promiseObj.value, 'files')) {
                    scope.image_files 	= promiseObj.value.files;
                    scope.images_count 	= promiseObj.value.files.length;
                } else {
                    scope.getTempImagesMedia();
                }

            });

        };

        /**
	  	  * Close dialog and return promise object
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */
	  	 

  	  	scope.close = function() {
  	  		$scope.closeThisDialog();
  	  	};
    };

})();;
(function() {
'use strict';
    
    /*
     BrandEditDialogController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.brandEditDialog', [])
        .controller('BrandEditDialogController',   [
        	'$scope',
        	'$state',
            '__DataStore',
            'appServices',
            BrandEditDialogController 
        ]);

    /**
      * BrandEditDialogController open add brand form in dialog
      * @inject $scope
      * @inject $state
      * @inject __DataStore
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */

    function BrandEditDialogController($scope, $state, __DataStore, appServices) {

    	var scope   = this;

        __DataStore.fetch({
	        	'apiURL'	: 'manage.brand.editSupportData',
	        	'brandID'	: $state.params.brandID
	        })
    	   .success(function(responseData) {

				appServices.processResponse(responseData,null, function(reactionCode) {
					
	            	appServices.showDialog(responseData.data,
	                {
	                    templateUrl : __globals.getTemplateURL(
	                            'brand.manage.edit-dialog'
	                        )
	                },
	                function(promiseObj) {

	                	 // Check if brand updated
	                    if (_.has(promiseObj.value, 'brand_updated') 
	                        && promiseObj.value.brand_updated === true) {
	                    	
	                    	$scope.$parent.brandListCtrl.reloadDT();
	                    }
	                    
	                    $state.go('brands');
	                   
	                });
	        });
     	});
        

    };

})();;
(function() {
'use strict';
    
    /*
     BrandEditController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.brandEdit', [])
        .controller('BrandEditController',   [
        	'$scope',
        	'__Form',
        	'appServices',
        	'$state',
        	'FileUploader',
        	'__Utils',
        	'appNotify',
            BrandEditController 
        ]);

    /**
      * BrandEditController handle add brand form
      * 
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * @inject $state
      * @inject FileUploader
      * @inject __Utils
      * @inject appNotify
      * 
      * @return void
      *-------------------------------------------------------- */

    function BrandEditController($scope, __Form, appServices, $state, FileUploader, __Utils, appNotify) {

        var scope   = this,
        	ngDialogData = $scope.ngDialogData;
       		scope.updateURL = {
				'apiURL' :'manage.brand.edit.process',
				'brandID' : $state.params.brandID
			};

        scope 	= __Form.setup(scope, 'manage_brand_add', 'brandData', { 
					            secured : false
					        });
        scope   = __Form.updateModel(scope, $scope.ngDialogData);

        scope.imagesSelectConfig     = __globals.getSelectizeOptions({
            valueField  : 'name',
            labelField  : 'name',
            render      : {
                item: function(item, escape) {
                    return  __Utils.template('#logoListItemTemplate',
                    item
                    );
                },
                option: function(item, escape) {
                    return  __Utils.template('#logoListOptionTemplate',
                    item
                    );
                }
            }, 
            searchField : ['name']  
        });

        /**
          * Fetch uploaded temp images media files
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.images_count = 0;
        scope.getTempImagesMedia = function() {

            __Form.fetch('media.uploaded.images', { fresh : true })
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                    scope.image_files = responseData.data.files
                    if (responseData.data.files.length > 0) {
                    	scope.images_count = responseData.data.files.length;
					};
                });    

            });

        };

        scope.getTempImagesMedia();
        
        var uploader = scope.uploader = new FileUploader({
            url         : __Utils.apiURL('media.upload.image'),
            autoUpload  : true,
            headers     : {
                'X-XSRF-TOKEN': __Utils.getXSRFToken()
            }
        });

        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 1000;
            }
        });

        scope.currentUploadedFileCount = 0;
		scope.loadingStatus     	   = false;

		/**
        * uploading msg
        *
        * @return void
        *---------------------------------------------------------------- */
        uploader.onAfterAddingAll = function() {

            scope.loadingStatus = true;
            appNotify.info(__globals.getJSString('loading_text'),{sticky : true});

        };

        /**
        * Uploading on process
        *
        * @return void
        *---------------------------------------------------------------- */

        uploader.onBeforeUploadItem = function(item) {
            scope.loadingStatus = true;
        };


        /**
        * on success counter of uploaded image
        *
        * @param object fileItem
        * @param object response
        *
        * @return void
        *---------------------------------------------------------------- */
        
        uploader.onSuccessItem = function( fileItem, response ) {

            appServices.processResponse(response, {
                error : function() {
                },
                otherError : function(reactionCode) {
                  
                    // If reaction code is Server Side Validation Error Then 
                    if (reactionCode == 3) {

                        appNotify.error(response.data.message,{sticky : false});

                    }

                }
            },
            function() {

                scope.currentUploadedFileCount++
                
            });   

        };

        /**
        * uploaded all image then call function
        *
        * @return void
        *---------------------------------------------------------------- */
        
        uploader.onCompleteAll  = function() {

           scope.loadingStatus  = false;
            if (scope.currentUploadedFileCount > 0) {
                appNotify.success(scope.currentUploadedFileCount+' '+__globals.getJSString('file_uploaded_text'), {sticky : false});

            }
            scope.getTempImagesMedia();
            scope.currentUploadedFileCount = 0;

        };


        /**
          * Submit brand form action
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function() {

            __Form.process(scope.updateURL, scope)
                .success(function(responseData) {

                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog( { brand_updated : true } );
                });    

            });

        };

        /**
          * Show uploaded media files
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.showUploadedMediaDialog = function() {

            appServices.showDialog({ 'image_files' : scope.image_files }, {
                templateUrl : __globals.getTemplateURL(
                    'product.manage.uploaded-media'
                )
            }, function(promiseObj) {
            	// Check if files added
                if (_.has(promiseObj.value, 'files')) {
                    scope.image_files 	= promiseObj.value.files;
                    scope.images_count 	= promiseObj.value.files.length;
                } else {
                    scope.getTempImagesMedia();
                }

            });

        };


        /**
	  	  * Close dialog and return promise object
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */
	  	
	  	scope.close = function() {
  	  		$scope.closeThisDialog();
  	  	};
    };

})();;
(function() {
    'use strict';
    
    /**
      * BrandDeleteDialogController - handle a delete brand confirmation dialog
      * 
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */
    
    angular
        .module('ManageApp.brandDeleteDialog', [])
        .controller('BrandDeleteDialogController', [
        	'$scope',
        	'__Form',
        	'appServices',
            function ($scope, __Form, appServices) {

                var scope       = this,
                    brandId     = $scope.ngDialogData.brandId,
                    brandName   = $scope.ngDialogData.brandName;

                scope = __Form.setup(scope, 'delete_brand_form', 'brandData',{ secured : true });

                scope.brandData.delete_related_products = false;

                scope.notificationMessage = __ngSupport.getText(
                    __globals.getJSString('brand_delete_text'), {
                        '__name__'     : unescape(brandName)
                    }
                );

                /**
                  * Submit delete brand form action
                  *
                  * @return void
                  *---------------------------------------------------------------- */
                
                scope.submit = function() {
                     
                    __Form.process({
                        'apiURL'    : 'manage.brand.delete',
                        'brandID'   : brandId
                    }, scope)
                        .success(function(responseData) {

                        appServices.processResponse(responseData, null, function() {
                            $scope.closeThisDialog({ 'brand_deleted' : true });
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
                }; 

        }]);

})();;
(function() {
'use strict';
    
    /*
     ManageProductAddController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.add', [])
        .controller('ManageProductAddController',   [
            '__Form', 
            '$state',
            'appServices',
            'FileUploader',
            '__Utils',
            '$stateParams',
            'appNotify',
            ManageProductAddController 
        ]);

    /**
      * ManageProductAddController handle add product form
      *
      * @inject __Form
      * @inject $state
      * @inject appServices
      * @inject FileUploader
      * @inject __Utils
      * @inject $stateParams
      * @inject appNotify
      * 
      * @return void
      *-------------------------------------------------------- */

    function ManageProductAddController(__Form, $state, appServices,
     FileUploader, __Utils, $stateParams, appNotify) {

        var scope       = this,
            categoryID  = $stateParams.categoryID;
           	scope.categoryStatus = false;

        scope = __Form.setup(scope, 'form_product_add', 'productData', 
            { secured : false }
        );

        scope.productData.categories = [];

        if (!_.isEmpty(categoryID)) {
            scope.productData.categoryID = categoryID;
            scope.productData.categories = [ categoryID ];
        }
        
        scope.imagesSelectConfig     = __globals.getSelectizeOptions({
            valueField  : 'name',
            labelField  : 'name',
            render      : {
                item: function(item, escape) {
                    return  __Utils.template('#imageListItemTemplate',
                    item
                    );
                },
                option: function(item, escape) {
                    return  __Utils.template('#imageListOptionTemplate',
                    item
                    );
                }
            }, 
            searchField : ['name']  
        });

        scope.brandsSelectConfig = __globals.getSelectizeOptions({
            valueField  : 'value',
            labelField  : 'name',
            searchField : [ 'name' ]  
        });

        scope.relatedProductsSelectConfig = __globals.getSelectizeOptions({
            maxItems        : 1000,
            searchField     : ['name', 'product_id']  
        });

        /**
          * Fetch support data
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.getAddProductData = function() {
        	__Form.fetch({
                'apiURL'     : 'manage.product.add.supportdata',
                'categoryId?' : scope.productData.categoryID
            })
                .success(function(responseData) {
            var requestData = responseData.data;

	            appServices.processResponse(responseData, null, function() {
	                scope.related_products      = requestData.related_products;
	                scope.store_currency_symbol = requestData.store_currency_symbol;
	                scope.store_currency        = requestData.store_currency;
	                scope.fancytree_categories  = requestData.categories;
	                scope.activeBrands  		= requestData.activeBrands;
                    scope.parentData            = requestData.parentData;
                    scope.parentCategoryExist   = requestData.isParentExist;
                    scope.categoryDetail        = requestData.categoryDetail;

                    scope.isParentExist = true;
                    
                    if (_.isUndefined(scope.productData.categoryID)) {
                        scope.isParentExist = false;
                    }
    	               
	                _.forEach(requestData.categories, function(value) {
	                	
	                	if (value.key == scope.productData.categoryID) {

							scope.categoryStatus = true;

							scope.categoryName = __ngSupport.getText(
			                    			__globals.getJSString('product_add_title_text'), {
			                        '__name__'    : value.title
			                    });
						}
	                });

	            });    

	        });
        }
        scope.getAddProductData();

        /**
          * Fetch uploaded temp images media files
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.images_count = 0;
        scope.getTempImagesMedia = function() {

            __Form.fetch('media.uploaded.images', {fresh : true})
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                    scope.image_files = responseData.data.files;
                    if (responseData.data.files.length > 0) {
                    	scope.images_count = responseData.data.files.length;
					};
                });    

            });

        };
        scope.getTempImagesMedia();
        
        var uploader = scope.uploader = new FileUploader({
            url         : __Utils.apiURL('media.upload.image'),
            autoUpload  : true,
            headers     : {
                'X-XSRF-TOKEN': __Utils.getXSRFToken()
            }
        });

        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 1000;
            }
        });

        scope.currentUploadedFileCount = 0;
        scope.loadingStatus     	   = false;

		/**
        * uploading msg
        *
        * @return void
        *---------------------------------------------------------------- */
        uploader.onAfterAddingAll = function() {

            scope.loadingStatus = true;
            appNotify.info(__globals.getJSString('loading_text'),{sticky : true});

        };

        /**
        * Uploading on process
        *
        * @return void
        *---------------------------------------------------------------- */

        uploader.onBeforeUploadItem = function(item) {
            scope.loadingStatus = true;
        };


        /**
        * on success counter of uploaded image
        *
        * @param object fileItem
        * @param object response
        *
        * @return void
        *---------------------------------------------------------------- */
        
        uploader.onSuccessItem = function( fileItem, response ) {

            appServices.processResponse(response, {
                error : function() {
                },
                otherError : function(reactionCode) {
                  
                    // If reaction code is Server Side Validation Error Then 
                    if (reactionCode == 3) {

                        appNotify.error(response.data.message,{sticky : false});

                    }

                }
            },
            function() {

                scope.currentUploadedFileCount++
                
            });   

        };

        /**
        * uploaded all image then call function
        *
        * @return void
        *---------------------------------------------------------------- */
        
        uploader.onCompleteAll  = function() {

           scope.loadingStatus  = false;
            if (scope.currentUploadedFileCount > 0) {
                appNotify.success(scope.currentUploadedFileCount+' '+__globals.getJSString('file_uploaded_text'), {sticky : false});

            }
            scope.getTempImagesMedia();
            scope.currentUploadedFileCount = 0;

        };

        /**
          * Submit prodcut add form action
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function(string) {

            __Form.process('manage.product.add', scope)
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                	
                	scope.productId = responseData.data.productId;
                	
                	if (scope.productData.publish === false) {
	                	$state.go('product_edit.options', {'productID' : scope.productId});
                    } else {
                    	$state.go('products', { 'mCategoryID' : categoryID });
                       
                    }

                });    

            });

        };

        /**
        * Click on this btn submit product mark as ative
        * & show publically & redirect page on manage products
        *
        * @return void
        *---------------------------------------------------------------- */
        scope.saveAndPublish = function() {
            scope.productData.publish = true;
            scope.submit(null);
        };

		/**
        * Click on this btn submit product mark as inative
        * & publically not show & mark as inactive & redirect page on manage options
        *
        * @return void
        *---------------------------------------------------------------- */
        scope.saveAndAddOptions = function() {
            scope.productData.publish = false;
            scope.submit(null);
        };


        /**
          * Show uploaded media files
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.showUploadedMediaDialog = function() {

            appServices.showDialog({ 'image_files' : scope.image_files }, {
                templateUrl : __globals.getTemplateURL('product.manage.uploaded-media')
            }, function(promiseObj) {

                if (_.has(promiseObj.value, 'files')) {
                    scope.image_files = promiseObj.value.files;
                    scope.images_count = promiseObj.value.files.length;
                } else {
                    scope.getTempImagesMedia();
                }

            });
        };

        /**
          * add brand dialog
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.addBrand = function() {
        	// show add brand dialog
	        appServices.showDialog(scope,
	        {	
	            templateUrl : __globals.getTemplateURL(
	                    'brand.manage.add-dialog'
	                )
	        },
	        function(promiseObj) {
	        	
				// Check if brand added
	            if (_.has(promiseObj.value, 'brand_added') 
	                && promiseObj.value.brand_added === true) {

	            	scope.getAddProductData();
	            }

	        });
        }
    };

})();;
(function() {
'use strict';
    
    /*
     ManageProductUploadedMediaController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.uploadedMedia', [])
        .controller('ManageProductUploadedMediaController',   [
            '$scope',
            '__DataStore', 
            'appServices',
            '$rootScope',
            ManageProductUploadedMediaController 
        ]);

    /**
      * ManageProductUploadedMediaController handle uploaded media files
      *
      * @inject $scope
      * @inject __DataStore
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */

    function ManageProductUploadedMediaController($scope, __DataStore, appServices, $rootScope) {

        var scope       = this;

        scope.image_files               = [];
        scope.files                     = $scope.ngDialogData.image_files;
        scope.uploadedMediaFileCount    = scope.files.length;
        scope.any_file_selected         = false;

        if (!_.isEmpty(scope.files)) {

            _.forEach(scope.files, function(value, key) {

                scope.image_files.push({
                    'name'  : value.name,
                    'path'  : value.path,
                    'exist' : false,
                });

            });

        }
        scope.all_files_selected    = false;

        /**
          * Select or unselect all uploaded media files
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.selectAll  = function() {

            // Check if all files selected 
            if (scope.all_files_selected) {

                scope.any_file_selected    = true;
                scope.unSelectedFilesCount = 0;
                
            } else {

                scope.any_file_selected    = false;
                scope.unSelectedFilesCount = scope.image_files.length;

            }

            angular.forEach(scope.image_files, function(value, index) {
                scope.image_files[index]['exist'] = scope.all_files_selected;
            });

        };

        /**
          * Select any media image file 
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.select = function() {

            scope.unSelectedFilesCount = 0;

            _.forEach(scope.image_files, function(value) {

                if (value.exist == false) {
                    scope.unSelectedFilesCount++;
                }

            });

            if (scope.unSelectedFilesCount == 0 && scope.uploadedMediaFileCount != 0) {

                scope.all_files_selected    = true;
                scope.any_file_selected     = true;

            } else if (scope.unSelectedFilesCount > 0 
                && scope.uploadedMediaFileCount != 0) {

                scope.all_files_selected    = false;
                scope.any_file_selected     = true;

            } else {

                scope.all_files_selected    = false;
                scope.any_file_selected        = false;

            }

        };

        /**
          * Fetch uploaded temp images media files
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.getTempImagesMedia = function() {

            __DataStore.fetch('media.uploaded.images', {fresh : true})
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {

                    scope.files         = responseData.data.files
                    scope.image_files   = [];

                    if (!_.isEmpty(scope.files)) {

                        _.forEach(scope.files, function(value, key) {

                            scope.image_files.push({
                                'name'  : value.name,
                                'path'  : value.path,
                                'exist' : false,
                            });

                        });

                    }/*

                    $rootScope.$emit('remove.uploded.temp', {'status':true});*/

                });    

            });

        };

        /**
          * Delete media file 
          *
          * @param string fileName
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.delete = function(fileName) {

            __DataStore.post({
                'apiURL'    : 'media.delete',
                'fileName'  : fileName
            })
            .success(function(responseData) {
                scope.all_files_selected    = false;
                appServices.processResponse(responseData, null, function() {
                    scope.getTempImagesMedia();
                });    

            });

        };

        /**
          * Delete multiple uploaded teparary media Files
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.deleteMultipleFiles = function() {

            var selectedUploadedFiles = [];

            angular.forEach(scope.image_files, function(value, index) {
               
                if (value.exist) {
                    selectedUploadedFiles.push(value.name);
                }

            });

            // Check if files exist
            if (!_.isEmpty(selectedUploadedFiles)) {

                __DataStore.post('media.delete.multiple',
                        { 'files' : selectedUploadedFiles })
                    .success(function(responseData) {

                    appServices.processResponse(responseData, null, function() {
                        scope.getTempImagesMedia();
                    });  

                });

            }

        };
       
       /**
          * Close current dialog
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.close = function() {
            $scope.closeThisDialog({ files : scope.files });
        }; 

    };

})();;
(function() {
'use strict';
    
    /*
     ManageEditProductDetailsController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.details', [])
        .controller('ManageEditProductDetailsController',   [
        	'__DataStore',
            'appServices',
            '$stateParams',
            '__Form',
            ManageEditProductDetailsController 
        ]);

    /**
      * ManageEditProductDetailsController for update tabs
      *
      * @inject __DataStore
      * @inject appServices
      * @inject $stateParams
      * @inject __Form
      * 
      * @return void
      *-------------------------------------------------------- */

    function ManageEditProductDetailsController(__DataStore, appServices, $stateParams, __Form) {

        var scope       = this,
            productID   = $stateParams.productID;

        scope = __Form.setup(scope, 'update_product_status_form', 'productData');

        scope.initialContentLoaded = false;

        /**
          * Fetch uploaded temp images media files
          *
          * @return void
          *---------------------------------------------------------------- */

        __DataStore.fetch({
            'apiURL'    : 'manage.product.fetch.name',
            'productID' : productID
        }).success(function(responseData) {
                    
            appServices.processResponse(responseData, null, function() {

                scope.productName = __ngSupport.getText(
                    __globals.getJSString('product_edit_title_text'), {
                        '__name__'    : responseData.data.productName.name
                    });

                var requestData = responseData.data;

                scope.isMultipleCategory = requestData.isMultipleCategory;

                scope.categoryData = requestData.categoryData;

                scope.detailsUrl = requestData.detailsUrl;

                scope.initialContentLoaded = true;

                scope = __Form.updateModel(scope, {'active' : responseData.data.status});
                
            });    

        });

        /**
          * Submit update product status form action
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function() {

            __Form.process({ 'apiURL' : 'manage.product.update_status', 'productID' : productID }, scope)
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {

                });    

            });

        };

    };

})();;
(function() {
'use strict';
    
    /*
     ManageProductEditController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.edit', [])
        .controller('ManageProductEditController',   [
            '__DataStore', 
            'appServices',
            '$stateParams',
            ManageProductEditController
        ]);

    /**
      * ManageProductEditController handle edit product details form
      *
      * @inject __DataStore
      * @inject appServices
      * @inject $stateParams
      * 
      * @return void
      *-------------------------------------------------------- */

    function ManageProductEditController(__DataStore, appServices, $stateParams) {

        var scope   = this;

        /**
          * Fetch uploaded temp images media files
          *
          * @return void
          *---------------------------------------------------------------- */

        __DataStore.fetch({
            'apiURL'    : 'manage.product.details',
            'productID' : $stateParams.productID
        }).success(function(responseData) {
                    
            appServices.processResponse(responseData, null, function() {

                scope.product = responseData.data.productName;
                
            });    

        });
    };

})();;
(function() {
'use strict';
    
    /*
     ManageProductEditDetailsController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.editDetails', [])
        .controller('ManageProductEditDetailsController',   [
            '__Form', 
            '$state',
            'appServices',
            'FileUploader',
            '__Utils',
            '$stateParams',
            'appNotify',
            '$rootScope',
            ManageProductEditDetailsController 
        ]);

    /**
      * ManageProductEditDetailsController handle edit product form
      *
      * @inject __Form
      * @inject $state
      * @inject appServices
      * @inject FileUploader
      * @inject __Utils
      * @inject $stateParams
      * 
      * @return void
      *-------------------------------------------------------- */

    function ManageProductEditDetailsController(__Form, $state, appServices, 
        FileUploader, __Utils, $stateParams, appNotify, $rootScope) {

        var scope       = this,
            productID   = $stateParams.productID;

        scope = __Form.setup(scope, 'form_product_edit', 'productData', {
            secured : false
        });

        scope.imagesSelectConfig     = __globals.getSelectizeOptions({
            valueField  : 'name',
            labelField  : 'name',
            render      : {
                item: function(item, escape) {
                    return  __Utils.template('#imageListItemTemplate',
                    item
                    );
                },
                option: function(item, escape) {
                    return  __Utils.template('#imageListOptionTemplate',
                    item
                    );
                }
            }, 
            searchField : ['name']  
                                        });

        scope.relatedProductsSelectConfig = __globals.getSelectizeOptions({
            maxItems        : 1000,
            searchField     : ['name', 'product_id']  
        });

        scope.brandsSelectConfig = __globals.getSelectizeOptions({
            valueField  : 'value',
            labelField  : 'name',
            searchField : [ 'name' ]  
        });

        scope.pageStatus = false;

        /**
          * Fetch support data
          *
          * @return void
          *---------------------------------------------------------------- */
          
        scope.getProductEditDetails = function() {
        	__Form.fetch({
	            'apiURL'    : 'manage.product.edit.details.supportdata',
	            'productID' : productID
	        })
	                .success(function(responseData) {
	                    
	            appServices.processResponse(responseData, null, function() {
	            	
	            	appServices.delayAction(function() {
	               		var requestData         	= responseData.data;
	               		var productName = { 
	               			name : requestData.product.name 
	               		};
	                	scope.related_products  	= requestData.related_products;
	                	scope.categories        	= requestData.product.categories;
	                    scope.store_currency_symbol = requestData.store_currency_symbol;
	                    scope.store_currency        = requestData.store_currency;
	                	scope.fancytree_categories 	= responseData.data.categories;
	                	scope.activeBrands  		= requestData.activeBrands;
	                	
	                	
	                	scope.pageStatus = true;
	                	__Form.updateModel(scope, requestData.product);
	                	$rootScope.$emit('productData', productName);
	           		});

	                
	            });    

	        });
        }
        scope.getProductEditDetails();

        /**
          * Fetch uploaded temp images media files
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.images_count = 0;
        scope.getTempImagesMedia = function() {

            __Form.fetch('media.uploaded.images', {fresh : true})
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                    scope.image_files = responseData.data.files
                    if (responseData.data.files.length > 0) {
                    	scope.images_count = responseData.data.files.length;
					};
                });    

            });

        };

        scope.getTempImagesMedia();
        
        var uploader = scope.uploader = new FileUploader({
            url         : __Utils.apiURL('media.upload.image'),
            autoUpload  : true,
            headers     : {
                'X-XSRF-TOKEN': __Utils.getXSRFToken()
            }
        });

        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 1000;
            }
        });

        scope.currentUploadedFileCount = 0;
        scope.loadingStatus     	   = false;

		/**
        * uploading msg
        *
        * @return void
        *---------------------------------------------------------------- */
        uploader.onAfterAddingAll = function() {

            scope.loadingStatus = true;
            appNotify.info(__globals.getJSString('loading_text'),{sticky : true});

        };

        /**
        * Uploading on process
        *
        * @return void
        *---------------------------------------------------------------- */

        uploader.onBeforeUploadItem = function(item) {
            scope.loadingStatus = true;
        };


        /**
        * on success counter of uploaded image
        *
        * @param object fileItem
        * @param object response
        *
        * @return void
        *---------------------------------------------------------------- */
        
        uploader.onSuccessItem = function( fileItem, response ) {

            appServices.processResponse(response, {
                error : function() {
                },
                otherError : function(reactionCode) {
                  
                    // If reaction code is Server Side Validation Error Then 
                    if (reactionCode == 3) {

                        appNotify.error(response.data.message,{sticky : false});

                    }

                }
            },
            function() {

                scope.currentUploadedFileCount++
                
            });   

        };

        /**
        * uploaded all image then call function
        *
        * @return void
        *---------------------------------------------------------------- */
        
        uploader.onCompleteAll  = function() {

           scope.loadingStatus  = false;
            if (scope.currentUploadedFileCount > 0) {
                appNotify.success(scope.currentUploadedFileCount+' '+__globals.getJSString('file_uploaded_text'), {sticky : false});

            }
            scope.getTempImagesMedia();
            scope.currentUploadedFileCount = 0;

        };


        /**
          * Submit product edit form submit action
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function() {

            __Form.process({
                'apiURL'    : 'manage.product.edit',
                'productID' : productID
            }, scope)
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                   // scope.productData.image = '';
                });    

            });

        };

        /**
          * Show uploaded media files
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.showUploadedMediaDialog = function() {

            appServices.showDialog({ 'image_files' : scope.image_files }, {
                templateUrl : __globals.getTemplateURL('product.manage.uploaded-media')
            }, function(promiseObj) {

                if (_.has(promiseObj.value, 'files')) {
                    scope.image_files = promiseObj.value.files;
                    scope.images_count = promiseObj.value.files.length;
                } else {
                    scope.getTempImagesMedia();
                }

            });
        };

        /**
          * add brand
          *
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.addBrand = function() {
        	// show add brand dialog
	        appServices.showDialog(scope,
	        {	
	            templateUrl : __globals.getTemplateURL(
	                    'brand.manage.add-dialog'
	                )
	        },
	        function(promiseObj) {
	        	
				// Check if brand added
	            if (_.has(promiseObj.value, 'brand_added') 
	                && promiseObj.value.brand_added === true) {

	            	scope.getProductEditDetails();
	            }

	        });
        }

    };

})();;
(function() {
'use strict';
    
    /*
     ProductImagesController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.images', [])
        .controller('ProductImagesController',   [
            '$scope', 
            '__DataStore',
            'appServices',
            '$stateParams',
            ProductImagesController 
        ]);

    /**
      * ProductImagesController for manage product image list
      *
      * @inject $scope
      * @inject __DataStore
      * @inject appServices
      * @inject $stateParams
      * 
      * @return void
      *-------------------------------------------------------- */

    function ProductImagesController($scope, __DataStore, appServices,
     $stateParams) {

        var dtProductImagesColumnsData = [
                {
                    "name"      : "thumbnail",
                    "template"  : "#productImageThumbnailColumnTemplate"
                },
                {
                    "name"      : "title",
                    "orderable" : true
                },
                {
                    "name"      : null,
                    "template"  : "#productImageActionColumnTemplate"
                }
            ],
            scope       = this,
            productID   = $stateParams.productID;

        /**
          * Get images  
          *
          * @return void
          *---------------------------------------------------------------- */
                        
        scope.imagesListDataTable = __DataStore.dataTable('#productImagesList', {
            url         : {
                'apiURL'    : 'manage.product.image.list',
                'productID' : productID
            },
            dtOptions   : {
                "searching": true,
                "order": [[ 1, "asc" ]]
            },
            columnsData : dtProductImagesColumnsData, 
            scope       : $scope
        });

        /*
         Reload current datatable
        -------------------------------------------------------------------------- */
        
        scope.reloadDT = function() {
            __DataStore.reloadDT(scope.imagesListDataTable);
        };

        /**
          * Add new image of product
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.add   = function() {

            appServices.showDialog({},
                {
                    templateUrl : __globals.getTemplateURL(
                            'product.manage.Images.add-dialog'
                        )
                },
                function(promiseObj) {

                    // Check if image added
                    if (_.has(promiseObj.value, 'image_added') 
                        && promiseObj.value.image_added === true) {
                        scope.reloadDT();
                    }

                });

        };

        /**
          * Edit prdouct existing image
          *
          * @param number imageID
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.edit   = function(imageID) {

            __DataStore.fetch({
                    'apiURL'    : 'manage.product.image.edit.supportdata',
                    'imageID'   : imageID,
                    'productID' : productID,
                })
                .success(function(responseData) {
                
                    appServices.processResponse(responseData, null, function() {

                        appServices.showDialog({
                            'image_id'      : imageID,
                            'prdouct_id'    : productID,
                            'imageData'     : responseData.data.prdouct_image
                        },
                        {
                            templateUrl : __globals.getTemplateURL(
                                    'product.manage.Images.edit-dialog'
                                )
                        },
                        function(promiseObj) {

                            // Check if image updated
                            if (_.has(promiseObj.value, 'image_updated') 
                                && promiseObj.value.image_updated === true) {
                                scope.reloadDT();
                            }

                        }
                    );

                });    

            });

        };

        /**
          * Delete image 
          *
          * @param number imageID
          * @param string imageName
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.delete = function(imageID, imageName) {

            __globals.showConfirmation({
                text                : __ngSupport.getText(
                    __globals.getJSString(
                        'product_image_delete_confirm_text'
                    ), {
                        '__title__'    : imageName
                    }
                ),
                confirmButtonText   : __globals.getJSString(
                    'delete_action_button_text'
                )
            }, function() {

                __DataStore.post({
                    'apiURL'    : 'manage.product.image.delete',
                    'imageID'   : imageID,
                    'productID' : productID,
                })
                .success(function(responseData) {
                
                    var message = responseData.data.message;

                    appServices.processResponse(responseData, {
                            error : function() {

                                __globals.showConfirmation({
                                    title   : 'Deleted!',
                                    text    : message,
                                    type    : 'error'
                                });

                            }
                        },
                        function() {

                            __globals.showConfirmation({
                                title   : 'Deleted!',
                                text    : message,
                                type    : 'success'
                            });
                            scope.reloadDT();   // reload datatable

                        }
                    );    

                });

            });

        };

    };

})();;
(function() {
'use strict';
    
    /*
     ProductImageAddController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.addImage', [])
        .controller('ProductImageAddController',   [
            '$scope',
            '__Form', 
            'appServices',
            'FileUploader',
            '__Utils',
            '$stateParams',
            'appNotify',
            ProductImageAddController 
        ]);

    /**
      * ProductImageAddController for add product new image
      *
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * @inject FileUploader
      * @inject __Utils
      * @inject $stateParams
      * 
      * @return void
      *-------------------------------------------------------- */

    function ProductImageAddController($scope, __Form, appServices, 
        FileUploader, __Utils, $stateParams, appNotify) {

        var scope   = this;

        scope = __Form.setup(scope, 'form_product_add_image',
            'imageData',
            { 
                secured : false
            }
        );

        scope.imagesSelectConfig     = __globals.getSelectizeOptions({
            valueField  : 'name',
            labelField  : 'name',
            render      : {
                item: function(item, escape) {
                    return  __Utils.template('#imageListItemTemplate',
                    item
                    );
                },
                option: function(item, escape) {
                    return  __Utils.template('#imageListOptionTemplate',
                    item
                    );
                }
            }, 
            searchField : ['name']  
        });
        
        /**
          * Fetch uploaded temp images media files
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.images_count = 0;
        scope.getTempImagesMedia = function() {

            __Form.fetch('media.uploaded.images', { fresh : true })
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                    scope.image_files = responseData.data.files
                    if (responseData.data.files.length > 0) {
                    	scope.images_count = responseData.data.files.length;
					};
                });    

            });

        };

        scope.getTempImagesMedia();
        
        var uploader = scope.uploader = new FileUploader({
            url         : __Utils.apiURL('media.upload.image'),
            autoUpload  : true,
            headers     : {
                'X-XSRF-TOKEN': __Utils.getXSRFToken()
            }
        });

        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 1000;
            }
        });

        scope.currentUploadedFileCount = 0;
		scope.loadingStatus     	   = false;

		/**
        * uploading msg
        *
        * @return void
        *---------------------------------------------------------------- */
        uploader.onAfterAddingAll = function() {

            scope.loadingStatus = true;
            appNotify.info(__globals.getJSString('loading_text'),{sticky : true});

        };

        /**
        * Uploading on process
        *
        * @return void
        *---------------------------------------------------------------- */

        uploader.onBeforeUploadItem = function(item) {
            scope.loadingStatus = true;
        };


        /**
        * on success counter of uploaded image
        *
        * @param object fileItem
        * @param object response
        *
        * @return void
        *---------------------------------------------------------------- */
        
        uploader.onSuccessItem = function( fileItem, response ) {

            appServices.processResponse(response, {
                error : function() {
                },
                otherError : function(reactionCode) {
                  
                    // If reaction code is Server Side Validation Error Then 
                    if (reactionCode == 3) {

                        appNotify.error(response.data.message,{sticky : false});

                    }

                }
            },
            function() {

                scope.currentUploadedFileCount++
                
            });   

        };

        /**
        * uploaded all image then call function
        *
        * @return void
        *---------------------------------------------------------------- */
        
        uploader.onCompleteAll  = function() {

           scope.loadingStatus  = false;
            if (scope.currentUploadedFileCount > 0) {
                appNotify.success(scope.currentUploadedFileCount+' '+__globals.getJSString('file_uploaded_text'), {sticky : false});

            }
            scope.getTempImagesMedia();
            scope.currentUploadedFileCount = 0;

        };

        /**
          * Submit image form action
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function() {

            __Form.process({
                'apiURL'    : 'manage.product.image.add',
                'productID' : $stateParams.productID
            }, scope)
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog({ 'image_added' : true });
                });    

            });

        };

        /**
          * Show uploaded media files
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.showUploadedMediaDialog = function() {

            appServices.showDialog({ 'image_files' : scope.image_files }, {
                templateUrl : __globals.getTemplateURL(
                    'product.manage.uploaded-media'
                )
            }, function(promiseObj) {

                if (_.has(promiseObj.value, 'files')) {
                    scope.image_files 	= promiseObj.value.files;
                    scope.images_count 	= promiseObj.value.files.length;
                } else {
                    scope.getTempImagesMedia();
                }

            });

        };

        /**
          * Cancel current dialog
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.cancel = function() {
            $scope.closeThisDialog();
        };

    };

})();;
(function() {
'use strict';
    
    /*
     ProductImageEditController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.editImage', [])
        .controller('ProductImageEditController',   [
            '$scope',
            '__Form', 
            'appServices',
            ProductImageEditController 
        ]);

    /**
      * ProductImageEditController for edit prdouct image
      *
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */

    function ProductImageEditController($scope, __Form, appServices) {

        var scope       = this,
            dialogData  = $scope.ngDialogData;

        scope = __Form.setup(scope, 'form_product_edit_image',
            'imageData',
            { 
                secured : false
            }
        );

        scope = __Form.updateModel(scope, dialogData.imageData);

        /**
          * Submit prdouct image edit form
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function() {

            __Form.process({
                'apiURL'        : 'manage.product.image.edit',
                'productID'     : dialogData.prdouct_id,
                'imageID'       : dialogData.image_id
            }, scope)
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog({ 'image_updated' : true });
                });    

            });

        };

        /**
          * Cancel current dialog
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.cancel = function() {
            $scope.closeThisDialog();
        };
        
    };

})();;
(function() {
'use strict';
    
    /*
     ProductOptionsController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.options', [])
        .controller('ProductOptionsController',   [
            '$scope', 
            '__DataStore',
            'appServices',
            '$stateParams',
            ProductOptionsController 
        ]);

    /**
      * ProductOptionsController for manage product options
      *
      * @inject $scope
      * @inject __DataStore
      * @inject appServices
      * @inject $stateParams
      * 
      * @return void
      *-------------------------------------------------------- */

    function ProductOptionsController($scope, __DataStore, appServices,
     $stateParams) {

        var dtProductOptionsColumnsData = [
                {
                    "name"          : "name",
                     "orderable"    : true
                },
                {
                    "name"      : null,
                    "template"  : "#productOptionValuesColumnTemplate"
                },
                {
                    "name"      : null,
                    "template"  : "#productOptionActionColumnTemplate"
                }
            ],
            scope       = this,
            productID   = $stateParams.productID;

        /**
          * Get products  
          *
          * @return void
          *---------------------------------------------------------------- */
                        
        scope.optionListDataTable = __DataStore.dataTable('#productOptionList', {
            url         : {
                'apiURL'    : 'manage.product.option.list',
                'productID' : productID
            },
            dtOptions   : {
                "searching": true,
                "order": [[ 0, "asc" ]]
            },
            columnsData : dtProductOptionsColumnsData, 
            scope       : $scope
        });

        /*
         Reload current datatable
        -------------------------------------------------------------------------- */
        
        scope.reloadDT = function() {
            __DataStore.reloadDT(scope.optionListDataTable);
        };

        /**
          * Add product new option
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.add   = function() {

            appServices.showDialog({},
                {
                    templateUrl : __globals.getTemplateURL(
                        'product.manage.options.add-dialog'
                    )
                },
                function(promiseObj) {

                    // Check if option added
                    if (_.has(promiseObj.value, 'option_added') 
                        && promiseObj.value.option_added === true) {
                        scope.reloadDT();
                    }

                });

        };

        /**
          * Edit prdouct existing option
          *
          * @param number optionID
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.edit   = function(optionID) {

            __DataStore.fetch({
                    'apiURL'        : 'manage.product.option.edit.supportdata',
                    'optionID'      : optionID,
                    'productID'     : productID,
                })
                .success(function(responseData) {
                
                    appServices.processResponse(responseData, null, function() {

                        appServices.showDialog({
                            'option_id'      : optionID,
                            'prdouct_id'     : productID,
                            'optionData'     : responseData.data.product_option
                        },
                        {
                            templateUrl : __globals.getTemplateURL(
                                    'product.manage.options.edit-dialog'
                                )
                        },
                        function(promiseObj) {

                            // Check if option updated
                            if (_.has(promiseObj.value, 'option_updated') 
                                && promiseObj.value.option_updated === true) {
                                scope.reloadDT();
                            }

                        }
                    );

                });    

            });

        };

        /**
          * Show product option values dialog
          *
          * @param number optionID
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.values   = function(optionID, optionName) {

            __DataStore.fetch({
                    'apiURL'        : 'manage.product.option.value.list',
                    'productID'     : productID,
                    'optionID'      : optionID
                 }, {
                    fresh : true
                 })
                .success(function(responseData) {
                
                    appServices.processResponse(responseData, null, function() {

                        appServices.showDialog({
                            'option_id'         : optionID,
                            'prdouct_id'        : productID,
                            'option_name'       : optionName,
                            'option_values'     : responseData.data.option_values
                        },
                        {
                            templateUrl : __globals.getTemplateURL(
                                    'product.manage.options.values.list-dialog'
                                )
                        },
                        function(promiseObj) {

                        }
                    );

                });    

            });

        };

        /**
          * Add option values
          *
          * @param number optionID
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.addValues = function(optionID, optionName) {

            appServices.showDialog({
                'option_id'         : optionID,
                'option_name'       : optionName,
                'prdouct_id'        : productID
            },
            {
                templateUrl : __globals.getTemplateURL(
                        'product.manage.options.values.add-dialog'
                    )
            },
            function(promiseObj) {

            });

        };
        

        /**
          * Delete option 
          *
          * @param number optionID
          * @param string optionName
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.delete = function(optionID, optionName) {

            __globals.showConfirmation({
                text                : __ngSupport.getText(
                    __globals.getJSString('product_option_delete_confirm_text'), {
                        '__name__'    : optionName
                    }
                ),
                confirmButtonText   : __globals.getJSString('delete_action_button_text')
            }, function() {

                __DataStore.post({
                    'apiURL'        : 'manage.product.option.delete',
                    'optionID'      : optionID,
                    'productID'     : productID,
                })
                .success(function(responseData) {
                
                    var message = responseData.data.message;

                    appServices.processResponse(responseData, {
                            error : function() {

                                __globals.showConfirmation({
                                    title   : 'Deleted!',
                                    text    : message,
                                    type    : 'error'
                                });

                            }
                        },
                        function() {

                            __globals.showConfirmation({
                                title   : 'Deleted!',
                                text    : message,
                                type    : 'success'
                            });
                            scope.reloadDT();   // reload datatable

                        }
                    );    

                });

            });

        };

    };

})();;
(function() {
'use strict';
    
    /*
     ProductOptionAddController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.addOption', [])
        .controller('ProductOptionAddController',   [
            '$scope',
            '__Form', 
            'appServices',
            '$stateParams',
            ProductOptionAddController 
        ]);

    /**
      * ProductOptionAddController for add product option
      *
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * @inject $stateParams
      * 
      * @return void
      *-------------------------------------------------------- */

    function ProductOptionAddController($scope, __Form, appServices, $stateParams) {

        var scope       = this;

        scope = __Form.setup(scope, 'form_product_add_option',
            'optionData',
            { 
                secured : false
            }
        );

        scope.optionData.values  = [
            {
                'name'          : '',
                'addon_price'   : ''
            }
        ];

        /**
          * Add new value in option value
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.addNewValue = function() {
            scope.optionData.values.push({
                name        : '',
                addon_price : ''
            });
        };

        /**
          * Remove current option value row
          *
          * @param number index
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.remove = function(index) {

            if (!_.isEmpty(scope.optionData.values)
             && scope.optionData.values.length > 1) {

                _.remove(scope.optionData.values, function(value, key) {
                    return index == key;
                });

            }
            
        };

        /**
          * Check if option value already taken
          *
          * @param valueNameFieldIndex
          * @param valueNameFieldValue
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.checkUnique = function(valueNameFieldIndex, valueNameFieldValue) {

            // Check if option values length greater 
            if (scope.optionData.values.length > 1) {
                _.forEach(scope.optionData.values,

                    function(optionValue, keyIndex) {

                    var optionValueName         = optionValue.name,
                        optionValueNameField    = 'values.'+keyIndex+'.name';
                    if (!_.isEmpty(optionValueName)) {

                        _.find(scope.optionData.values,
                             function(value, key) {

                             	if (!_.isEmpty(optionValueName)) {
                             		var newOptionValue = optionValueName.toLowerCase();
                             	} else {
                             		var newOptionValue = optionValueName;
                             	}

                             	if (!_.isEmpty(value.name)) {
                             		var valueNmae = value.name.toLowerCase();
                             	} else {
                             		var valueNmae = value.name;
                             	}


                            if (valueNmae == newOptionValue 
                                && keyIndex != key) {

                                scope
                                .form_product_add_option[optionValueNameField]
                                    .$setValidity('unique', false);

                            } else {

                                scope
                                .form_product_add_option[optionValueNameField]
                                    .$setValidity('unique', true);
                            }

                        });

                    } else {

                        scope
                            .form_product_add_option[optionValueNameField]
                             .$setValidity('unique', true);

                    }


              
                });

            } else {

                var valueField = 'values.'+valueNameFieldIndex+'.name';
                scope.form_product_add_option[valueField]
                        .$setValidity('unique', true);
            }
            
        };
        
        /**
          * Submit product add option form action
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function() {
            
            __Form.process({
                'apiURL'        : 'manage.product.option.add',
                'productID'     : $stateParams.productID
            }, scope)
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog({ 'option_added' : true });
                });    

            });

        };

        /**
          * Cancel current dialog
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.cancel = function() {
            $scope.closeThisDialog();
        };
        
    };

})();;
(function() {
'use strict';
    
    /*
     ProductOptionEditController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.editOption', [])
        .controller('ProductOptionEditController',   [
            '$scope',
            '__Form', 
            'appServices',
            '$stateParams',
            ProductOptionEditController 
        ]);

    /**
      * ProductOptionEditController for edit prdouct option
      *
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * @inject $stateParams
      * 
      * @return void
      *-------------------------------------------------------- */

    function ProductOptionEditController($scope, __Form, appServices, $stateParams) {

        var scope       = this,
            dialogData  = $scope.ngDialogData;

        scope = __Form.setup(scope, 'form_product_edit_option',
            'optionData',
            { 
                secured : false
            }
        );

        scope = __Form.updateModel(scope, dialogData.optionData);

        /**
          * Submit prdouct edit option form action
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function() {

            __Form.process({
                'apiURL'        : 'manage.product.option.edit',
                'productID'     : dialogData.prdouct_id,
                'optionID'      : dialogData.option_id
            }, scope)
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog({ 'option_updated' : true });
                });    

            });

        };

        /**
          * Cancel current dialog
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.cancel = function() {
            $scope.closeThisDialog();
        };
        
    };

})();;
(function() {
'use strict';
    
    /*
     ProductOptionValuesController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.optionValues', [])
        .controller('ProductOptionValuesController',   [
            '$scope',
            '__Form',
            '__DataStore',
            'appServices',
            ProductOptionValuesController 
        ]);

    /**
      * ProductOptionValuesController for manage product option values
      *
      * @inject $scope
      * @inject __Form
      * @inject __DataStore
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */

    function ProductOptionValuesController($scope, __Form, __DataStore,  appServices) {

        var scope       = this,
            dialogData  = $scope.ngDialogData,
            productID   = dialogData.prdouct_id,
            optionID    = dialogData.option_id;
            scope.optionLableID = dialogData.prdouct_id,
            
        scope = __Form.setup(scope, 'form_product_edit_option_values',
            'optionData',
            { 
                secured : false
            }
        );

        scope.notification_message = __ngSupport.getText(
            __globals.getJSString('product_option_value_add_form_notification'),
             {
                '__option_name__'    : dialogData.option_name
             }
        );

        scope.optionData.values = [];
        scope.optionData.optionID = optionID;   
        scope = __Form.updateModel(scope, { values : dialogData.option_values });

        /**
          * Add new value in options value
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.addNewValue = function() {
            scope.optionData.values.push({
                name        : '',
                addon_price : ''
            });
        };


        /**
          * Fetch product option values 
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.fetchOptionValues = function() {

            __Form.fetch({
                    'apiURL'        : 'manage.product.option.value.list',
                    'productID'     : productID,
                    'optionID'      : optionID, 
                })
                .success(function(responseData) {
                
                    appServices.processResponse(responseData, null, function() {

                        scope = __Form.updateModel(scope, {
                            values : responseData.data.option_values
                        });

                    });

                });
        };

        /**
          * Remove current option value row
          *
          * @param number index
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.remove = function(index) {

            if (!_.isEmpty(scope.optionData.values)
             && scope.optionData.values.length > 1) {

                _.remove(scope.optionData.values, function(value, key) {
                    return index == key;
                });

            }
            
        };
        

        /**
          * Delete option value
          *
          * @param number optionValueID
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.delete = function(optionValueID) {
        
         __DataStore.post({
                'apiURL'        : 'manage.product.option.value.delete',
                'optionID'      : optionID,
                'productID'     : productID,
                'optionValueID' : optionValueID
            })
            .success(function(responseData) {

                appServices.processResponse(responseData, null, function() {
                    /*scope.fetchOptionValues();*/
                    _.remove(scope.optionData.values, function(value) {
                      return value.id == optionValueID;
                    });

                });    

            });
        
        };

        /**
          * Check if option value already taken
          *
          * @param valueNameFieldIndex
          * @param valueNameFieldValue
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.checkUnique = function(valueNameFieldIndex, valueNameFieldValue) {

            // Check if option values length greater 
            if (scope.optionData.values.length > 1) {

                _.forEach(scope.optionData.values,
                    function(optionValue, keyIndex) {

                    var optionValueName         = optionValue.name,
                        optionValueNameField    = 'values.'+keyIndex+'.name';

                    if (!_.isEmpty(optionValueName)) {

                        _.find(scope.optionData.values,
                             function(value, key) {

                            if (!_.isEmpty(optionValueName)) {
                         		var newOptionValue = optionValueName.toLowerCase();
                         	} else {
                         		var newOptionValue = optionValueName;
                         	}

                         	if (!_.isEmpty(value.name)) {
                         		var valueNmae = value.name.toLowerCase();
                         	} else {
                         		var valueNmae = value.name;
                         	}
                         	
                            if (valueNmae == newOptionValue 
                                && keyIndex != key) {

                                scope
                                .form_product_edit_option_values[optionValueNameField]
                                    .$setValidity('unique', false);

                            } else {

                                scope
                                .form_product_edit_option_values[optionValueNameField]
                                    .$setValidity('unique', true);
                            }

                        });

                    } else {

                        scope
                            .form_product_edit_option_values[optionValueNameField]
                             .$setValidity('unique', true);

                    }


              
                });

            } else {

                var valueField = 'values.'+valueNameFieldIndex+'.name';
                scope.form_product_edit_option_values[valueField]
                        .$setValidity('unique', true);
            }
            
        };

        /**
          * Submit prdouct option edit values form action
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function() {
            __Form.process({
                'apiURL'        : 'manage.product.option.value.edit',
                'productID'     : productID,
                'optionID'      : optionID
            }, scope)
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog();
                });    

            });

        };

        /**
          * Cancel current dialog
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.cancel = function() {
            $scope.closeThisDialog();
        };

    };

})();;
(function() {
'use strict';
    
    /*
     ProductOptionValuesAddController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.addOptionValues', [])
        .controller('ProductOptionValuesAddController',   [
            '$scope',
            '__Form', 
            'appServices',
            ProductOptionValuesAddController 
        ]);

    /**
      * ProductOptionValuesAddController for add prdouct option values
      *
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */

    function ProductOptionValuesAddController($scope, __Form, appServices) {

        var scope       = this,
            dialogData  = $scope.ngDialogData;

        scope = __Form.setup(scope, 'form_product_add_option',
            'optionData',
            { 
                secured : false
            }
        );
        scope.optionData.values  = [
            {
                'name'          : '',
                'addon_price'   : ''
            }
        ];

        scope.notification_message = __ngSupport.getText(
            __globals.getJSString('product_option_value_add_form_notification'),
             {
                '__option_name__'    : dialogData.option_name
             }
        );

        /**
          * Add new value in options value
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.addNewValue = function() {
            scope.optionData.values.push({
                name        : '',
                addon_price : ''
            });
        };

        /**
          * Remove current option value row
          *
          * @param number index
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.remove = function(index) {

            if (!_.isEmpty(scope.optionData.values)
             && scope.optionData.values.length > 1) {

                _.remove(scope.optionData.values, function(value, key) {
                    return index == key;
                });

            }
            
        };

        /**
          * Check if option value already taken
          *
          * @param valueNameFieldIndex
          * @param valueNameFieldValue
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.checkUnique = function(valueNameFieldIndex, valueNameFieldValue) {

            // Check if option values length greater 
            if (scope.optionData.values.length > 1) {

                _.forEach(scope.optionData.values,
                    function(optionValue, keyIndex) {

                    var optionValueName         = optionValue.name,
                        optionValueNameField    = 'values.'+keyIndex+'.name';
                    if (!_.isEmpty(optionValueName)) {

                        _.find(scope.optionData.values,
                             function(value, key) {

                            if (!_.isEmpty(optionValueName)) {
                         		var newOptionValue = optionValueName.toLowerCase();
                         	} else {
                         		var newOptionValue = optionValueName;
                         	}

                         	if (!_.isEmpty(value.name)) {
                         		var valueNmae = value.name.toLowerCase();
                         	} else {
                         		var valueNmae = value.name;
                         	}
                            
                            if (valueNmae == newOptionValue 
                                && keyIndex != key) {

                                scope
                                .form_product_add_option[optionValueNameField]
                                    .$setValidity('unique', false);

                            } else {

                                scope
                                .form_product_add_option[optionValueNameField]
                                    .$setValidity('unique', true);
                            }

                        });

                    } else {

                        scope
                            .form_product_add_option[optionValueNameField]
                             .$setValidity('unique', true);

                    }


              
                });

            } else {

                var valueField = 'values.'+valueNameFieldIndex+'.name';
                scope.form_product_add_option[valueField]
                        .$setValidity('unique', true);
            }
            
        };
        
        
        /**
          * Submit prdouct add option form action
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function() {
            
            __Form.process({
                'apiURL'        : 'manage.product.option.value.add',
                'productID'     : dialogData.prdouct_id,
                'optionID'      : dialogData.option_id
            }, scope)
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog();
                });    

            });

        };

        /**
          * Cancel current dialog
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.cancel = function() {
            $scope.closeThisDialog();
        };
        
    };

})();;
(function() {
'use strict';
    
    /*
     ProductSpecificationController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.specification', [])
        .controller('ProductSpecificationController',   [
            '$scope', 
            '__DataStore',
            'appServices',
            '$stateParams',
            ProductSpecificationController 
        ]);

    /**
      * ProductSpecificationController for manage product options
      *
      * @inject $scope
      * @inject __DataStore
      * @inject appServices
      * @inject $stateParams
      * 
      * @return void
      *-------------------------------------------------------- */

    function ProductSpecificationController($scope, __DataStore, appServices,
     $stateParams) {

        var dtProductSpecificationColumnsData = [
                {
                    "name"       : "name",
                    "orderable"  : true
                },
                {
                    "name"       : "value"
                },
                {
                    "name"       : null,
                    "template"   : "#productSpecificationActionColumnTemplate"
                }
            ],
            scope       = this,
            productID   = $stateParams.productID;

        /**
          * Get specification  
          *
          * @return void
          *---------------------------------------------------------------- */
                        
        scope.specificationListDataTable = __DataStore.dataTable('#productSpecificationList', {
            url         : {
                'apiURL'    : 'manage.product.specification.list',
                'productID' : productID
            },
            dtOptions   : {
                "searching": true,
                "order": [[ 0, "asc" ]]
            },
            columnsData : dtProductSpecificationColumnsData, 
            scope       : $scope
        });

        /*
         Reload current datatable
        -------------------------------------------------------------------------- */
        
        scope.reloadDT = function() {
            __DataStore.reloadDT(scope.specificationListDataTable);
        };

        /**
          * Add product new specification
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.add   = function() {

        	 __DataStore.fetch({
                    'apiURL'          : 'manage.product.specification.get.all',
                    'productID'       : productID,
                })
                .success(function(responseData) {
                
                    appServices.processResponse(responseData, null, function() {
                    	
			            appServices.showDialog({
			            	'specificationData'	: responseData.data.specificationData
			            },
		                {
		                    templateUrl : __globals.getTemplateURL(
		                        'product.manage.specification.add-dialog'
		                    )
		                },
		                function(promiseObj) {

                    // Check if option added
                    if (_.has(promiseObj.value, 'specification_added') 
                        && promiseObj.value.specification_added === true) {
                        scope.reloadDT();
                    }

                });

               });    

            });

        };

        /**
          * Edit prdouct existing specification
          *
          * @param number specificationID
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.edit   = function(specificationID) {
        	
            __DataStore.fetch({
                    'apiURL'          : 'manage.product.specification.edit',
                    'productID'       : productID,
                    'specificationID' : specificationID,
                })
                .success(function(responseData) {
                
                    appServices.processResponse(responseData, null, function() {
                    
                        appServices.showDialog({

                            'specificationValues'     : responseData.data.secificationValues,
                            'specificationCollection' : responseData.data.specificationCollection
                        },
                        {
                            templateUrl : __globals.getTemplateURL(
                                    'product.manage.specification.edit-dialog'
                                )
                        },
                        function(promiseObj) {

                            // Check if option updated
                            if (_.has(promiseObj.value, 'specification_updated') 
                                && promiseObj.value.specification_updated === true) {
                                scope.reloadDT();
                            }

                        }
                    );

                });    

            });

        };

        /**
          * Delete product specification 
          *
          * @param number specificationID
          * @param string specificationName
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.delete = function(specificationID, specificationName) {

            __globals.showConfirmation({
                text                : __ngSupport.getText(
                    __globals.getJSString('product_specification_delete_confirm_text'), {
                        '__name__'    : specificationName
                    }
                ),
                confirmButtonText   : __globals.getJSString('delete_action_button_text')
            }, function() {

                __DataStore.post({
                    'apiURL'        	: 'manage.product.specification.delete',
                    'specificationID'   : specificationID,
                    'productID'     	: productID,
                })
                .success(function(responseData) {
                
                    var message = responseData.data.message;

                    appServices.processResponse(responseData, {
                            error : function() {

                                __globals.showConfirmation({
                                    title   : 'Deleted!',
                                    text    : message,
                                    type    : 'error'
                                });

                            }
                        },
                        function() {

                            __globals.showConfirmation({
                                title   : 'Deleted!',
                                text    : message,
                                type    : 'success'
                            });
                            scope.reloadDT();   // reload datatable

                        }
                    );    

                });

            });

        };

    };

})();;
(function() {
'use strict';
    
    /*
     ProductSpecificationAddController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.addSpecification', [])
        .controller('ProductSpecificationAddController',   [
            '$scope',
            '__Form', 
            'appServices',
            '$stateParams',
            ProductSpecificationAddController 
        ]);

    /**
      * ProductSpecificationAddController for add product option
      *
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * @inject $stateParams
      * 
      * @return void
      *-------------------------------------------------------- */

    function ProductSpecificationAddController($scope, __Form, appServices, $stateParams) {

        var scope       = this;

        scope = __Form.setup(scope, 'form_product_add_specification',
            'specificationData',
            { 
                secured : false
            }
        );

        scope.specificationData  = [
            {
                'name'    : '',
                'value'   : ''
            }
        ];

        scope.specification_name_select_config = __globals.getSelectizeOptions({
            valueField  : 'name',
            labelField  : 'name',
            searchField : [ 'name' ],

		    create: function(input) {
		        return {
		            _id: input,
		            name: input
		        }
		    }
        });

        scope.specification_value_select_config = __globals.getSelectizeOptions({
            valueField  : 'value',
            labelField  : 'value',
            searchField : [ 'value' ],

		    create: function(input) {
		        return {
		            value: input
		        }
		    }
        });
        
        scope.specificationCollection = $scope.ngDialogData.specificationData;
       
        /**
          * Add new value in specification value
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.addNewValue = function() {
            scope.specificationData.push({
                name        : '',
                value : ''
            });
        };

        /**
          * Remove current specification value row
          *
          * @param number index
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.remove = function(index) {

            if (!_.isEmpty(scope.specificationData)
             && scope.specificationData.length > 1) {

                _.remove(scope.specificationData, function(value, key) {
                    return index == key;
                });

            }
            
        };

       
        /**
          * Submit product add specification form action
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function() {
            
            __Form.process({
                'apiURL'        : 'manage.product.specification.add',
                'productID'     : $stateParams.productID
            }, scope)
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog({ 'specification_added' : true });
                });    

            });

        };

        scope.checkUnique = function(specificationNameFieldIndex, specificationNameFieldValue) {
        	
        	if (scope.specificationData.length > 1) {

        		_.forEach(scope.specificationData,
                    function(specificationValue, keyIndex) {

                    var specificationValueName         = specificationValue.name,
                        specificationValueNameField    = keyIndex+'.name';
                      
                    if (!_.isEmpty(specificationValueName)) {

                    	_.find(scope.specificationData,
                             function(value, key) {

                            if (!_.isEmpty(specificationValueName)) {
                         		var newSpecificationValue = specificationValueName.toLowerCase();
                         	} else {
                         		var newSpecificationValue = specificationValueName;
                         	}

                         	if (!_.isEmpty(value.name)) {
                         		var valueName = value.name.toLowerCase();
                         	} else {
                         		var valueName = value.name;
                         	}

                         	if (valueName == newSpecificationValue 
                                && keyIndex != key) {

                                scope.form_product_add_specification[specificationValueNameField]
                                    .$setValidity('unique', false);

                            } else {

                                scope
                                .form_product_add_specification[specificationValueNameField]
                                    .$setValidity('unique', true);
                            }

                        });

                    } else {

                        scope
                            .form_product_add_specification[specificationValueNameField]
                             .$setValidity('unique', true);
					}

                });

        	} else {

                var valueField = specificationNameFieldIndex+'.name';
                scope.form_product_add_specification[valueField]
                        .$setValidity('unique', true);
            }
		};

        /**
          * Cancel current dialog
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.cancel = function() {
            $scope.closeThisDialog();
        };
        
    };

})();;
(function() {
'use strict';
    
    /*
     ProductSpecificationEditController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageProductApp.editSpecification', [])
        .controller('ProductSpecificationEditController',   [
            '$scope',
            '__Form', 
            'appServices',
            '$stateParams',
            ProductSpecificationEditController 
        ]);

    /**
      * ProductSpecificationEditController for edit prdouct option
      *
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * @inject $stateParams
      * 
      * @return void
      *-------------------------------------------------------- */

    function ProductSpecificationEditController($scope, __Form, appServices, $stateParams) {

        var scope       = this,
            dialogData  = $scope.ngDialogData;
            //specificationCollection
        	scope 	= __Form.setup(scope, 'form_specification_edit', 'specificationData');
			scope   = __Form.updateModel(scope, dialogData.specificationValues);
		
			$stateParams

			scope.specification_name_select_config = __globals.getSelectizeOptions({
            valueField  : 'name',
            labelField  : 'name',
            searchField : [ 'name' ],

		    create: function(input) {
		        return {
		             _id: input,
		            name: input
		        }
		    }
        });

        scope.specification_value_select_config = __globals.getSelectizeOptions({
            valueField  : 'value',
            labelField  : 'value',
            searchField : [ 'value' ],

		    create: function(input) {
		        return {
		            value: input
		        }
		    }
        });

        scope.specificationCollection = dialogData.specificationCollection;


        /**
          * Submit prdouct edit specification form action
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function() {

            __Form.process({
                'apiURL'        	   : 'manage.product.specification.update',
                'productID'			   : $stateParams.productID,
                'specificationID'      : scope.specificationData._id
            }, scope)
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog({ 'specification_updated' : true });
                });    

            });

        };

        /**
          * Cancel current dialog
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.cancel = function() {
            $scope.closeThisDialog();
        };
        
    };

})();;
(function() {
'use strict';
	
	/*
	 ProductListController
	-------------------------------------------------------------------------- */
	
	angular
        .module('ManageApp.productList', [])
        .controller('ProductListController', 	[
            '$scope', 
            '__DataStore', 
            'appServices',
            '$state',
            '__Utils',
            ProductListController 
	 	])
	 	.controller('ProductDetailDialogController',   [
            '$scope',
            ProductDetailDialogController 
        ]);;

	/**
	 * CategoryController for admin.
	 *
	 * @inject __DataStore
	 * @inject $scope
	 * @inject $state
	 * 
	 * @return void
	 *-------------------------------------------------------- */

	function ProductListController($scope, __DataStore, appServices, $state, __Utils) {

	 	var scope   			= this,
		 	catID 				= _.isEmpty($state.params.mCategoryID)
			 				 		? null 
			 				 		: $state.params.mCategoryID,
		 	currentStateName 	= $state.current.name;

		// Get current state name
	 	scope.currentStateName 			= currentStateName;

	 	scope.pageContentLoaded 		= false;
	 	scope.parentCategoryExist 		= false;

	 	// Get category ID
		scope.categoryID = catID;


	    var dtProductsColumnsData = [
                {
                    "name"      : "thumbnail",
                    "template"  : "#productThumbnailColumnTemplate"
                },
                {
                    "name"      : "name",
                    "orderable" : true,
                    "template"	: "#nameColumnTemplate"
                },
                {
                    "name"      : "featured",
                    "orderable" : true,
                    "template"	: "#featuredProductColumnTemplate"
                },
                {
                    "name"      : "out_of_stock",
                    "orderable" : true,
                    "template"	: "#outOfStockColumnTemplate"
                },
                {
                    "name"      : "status",
                    "orderable" : true,
                    "template"  : "#productStatusColumnTemplate"
                },
                {
                    "name"      : "creation_date",
                    "orderable" : true,
                    "template"	: "#creationDateColumnTemplate"
                },
                {
                    "name"      : "updation_date",
                    "orderable" : true,
                    "template"	: "#updationDateColumnTemplate"
                },
                {
                    "name"      : "categories_id",
                    "template"  : "#productCategoriesColumnTemplate"
                },
                {
                    "name"      : "brand",
                    "template"  : "#productBrandColumnTemplate"
                },
                {
                    "name"      : null,
                    "template"  : "#productActionColumnTemplate"
                }
            ],
	            tabs    = {
	                'manageProducts'    : {
	                       id      : 'productsTabList',
	                       route   : 'products'
	                }
	            },
            scope   = this,
            url;
         
        // get category and brand
        if (!_.isEmpty(catID)) {

            url = {
                'apiURL'        : 'manage.category.product.list',
                'categoryID'    : catID
            };

        }  else if (!_.isEmpty($state.params.brandID)) {
				
            url = {
              'apiURL'     : 'manage.brand.product.list',
               'brandId'   : $state.params.brandID
            };


	    } else {

            url = 'manage.product.list';

        }

        scope.category 			= {};
        scope.categoryStatus 	= false;
        scope.pageStatus 		= false;
        scope.brandStatus		= false;

        /**
          * Get products  
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.getProducts  = function() {

        	// distroy instance of datatable
	    	if (scope.productsListDataTable) {
	            scope.productsListDataTable.destroy();
	        }

	        scope.productsListDataTable = __DataStore.dataTable('#productsTabList', {
	            url         : url,
	            dtOptions   : {
	                "searching"    : true,
	                "order"        : [[ 1, "asc" ]]
	            },
	            columnsData : dtProductsColumnsData, 
	            scope       : $scope

	        },null, function(responseData) {
	        	
	        	scope.category 	 = responseData._options.category;
	        	scope.parentData = responseData._options.parentData;
                
	        	//scope.isParentCategory  = _.isNull(scope.category.parent_id) ? false : true;
	        	
	        	// Check if category exist
	        	if (_.isEmpty(scope.category)) {
	        		scope.categoryStatus 	= false;
	        	} else {
	        		scope.categoryStatus 	= true;
	        	}

	        	// Check if Brand Exist
	        	scope.brand = responseData._options.brand;

	        	if (_.isEmpty(scope.brand)) {
	        		scope.brandStatus = false;
	        	} else {
	        		scope.brandStatus = true;
	        	}

	        	scope.pageStatus = true;

	        });
	       
	    };

		_.defer(function() {

			scope.getProducts();

		});

	    /**
          * Go to categories URL
          *
          * @param $event
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.goToCategories = function ($event) {
	        $event.preventDefault();
	        $state.go('categories', {'mCategoryID' : catID});
	    };

	    /**
          * Go to products URL 
          *
          * @param $event
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.goToProducts = function ($event) {
	        $event.preventDefault();
	        $state.go('products', {'mCategoryID' : catID});
	    };

	    /*
	     * Reload current datatable
	     *
	     *------------------------------------------------------------------ */
        
        scope.reloadDT = function() {
            __DataStore.reloadDT(scope.productsListDataTable);
        };

        /**
	      * Get detail dialog.
	      *
	      * @return void
	      *---------------------------------------------------------------- */
	    scope.detailDialog = function (productID) {

	    	__DataStore.fetch({
	        	'apiURL'	: 'manage.product.detailSupportData',
	        	'productID'	: productID
	        })
    	   .success(function(responseData) {

    	   		var requestData = responseData.data;

		    	appServices.showDialog(requestData,
		        {	
		            templateUrl : __globals.getTemplateURL(
		                    'product.manage.detail-dialog'
		                )
		        },
		        function(promiseObj) {

		        });
	       });
	    }

	    /**
          * Add new category
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.add   = function(catID) {

        	this.catID = catID;

        	__DataStore.fetch('category.fancytree.support-data')
					.success(function(responseData) {

          			scope.categories = responseData.data.categories;
          		
	          		appServices.showDialog(scope,
	                {
	                    templateUrl : __globals.getTemplateURL(
	                            'category.add-dialog'
	                        )
	                },
	                function(promiseObj) {

	                    // Check if category updated
	                    if (_.has(promiseObj.value, 'category_added') 
	                        && promiseObj.value.category_added === true) {
	                        scope.reloadDT();
	                    }

	                });
	    	});
            

        };

        /**
          * Delete product 
          *
          * @param number productID
          * @param string productName
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.productDelete = function(productID, productName) {

            __globals.showConfirmation({
                text                : __ngSupport.getText(
                    __globals.getJSString('product_delete_confirm_text'), {
                        '__name__'    : unescape(productName)
                    }
                ),
                confirmButtonText   : __globals.getJSString('delete_action_button_text')
            }, function() {

                __DataStore.post({
                    'apiURL'    : 'manage.product.delete',
                    'productID' : productID,
                })
                .success(function(responseData) {
                
                    var message = responseData.data.message;

                    appServices.processResponse(responseData, {
                            error : function() {

                                __globals.showConfirmation({
                                    title   : __globals.getJSString('confirm_error_title'),
                                    text    : message,
                                    type    : 'error'
                                });

                            }
                        },
                        function() {

                            __globals.showConfirmation({
                                title   : __globals.getJSString('confirm_error_title'),
                                text    : message,
                                type    : 'success'
                            });
                            scope.reloadDT();   // reload datatable

                        }
                    );    

                });

            });

        };

    };

    /**
      * ProductDetailDialogController for manage product list
      *
      * @inject $scope
      * @inject __Form
      * 
      * @return void
      *-------------------------------------------------------- */
    function ProductDetailDialogController($scope) {

        var scope   = this;
       
        scope.ngDialogData  	= $scope.ngDialogData;
	    scope.productData 		= scope.ngDialogData;
	    scope.currencySymbol	= scope.ngDialogData.currencySymbol;
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
     ManageOrderDetailsController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.orderDetails', [])

        /**
          * ManageOrderDetailsController - Handle order details view scope
          *
          * @inject __DataStore
          * @inject $stateParams
          * 
          * @return void
          *-------------------------------------------------------- */

        .controller('ManageOrderDetailsController', [
            '__DataStore',
            '$stateParams',
            'appServices',
            function (__DataStore, $stateParams, appServices) {

               var scope   = this,
                   orderId = $stateParams.orderId;
               
                scope.discountStatus = false;

                scope.initialContendLoaded = false;

                __DataStore.fetch({
                    'apiURL'    : 'manage.order.details.dialog',
                    'orderID'   :  orderId
                })
                .success(function(responseData) {
                
                    appServices.processResponse(responseData, null, function() {
                        
                        var orderDetails = responseData.data.orderDetails.data;

                        scope.billingAddress    = orderDetails.address.billingAddress;
                        scope.shippingAddress   = orderDetails.address.shippingAddress;
                        scope.sameAddress       = orderDetails.address.sameAddress;

                        scope.user              = orderDetails.user;
                        scope.order             = orderDetails.order;
                        scope.orderProducts     = orderDetails.orderProducts;
                        scope.coupon            = orderDetails.coupon;
                        scope.taxes             = orderDetails.taxes;
                        scope.shipping          = orderDetails.shipping;

                    });

                    scope.initialContendLoaded = true;

                });

                /**
                  * Contact user dialog
                  * 
                  * @return void
                  *---------------------------------------------------------------- */

                scope.contactUserDialog = function () {

                    __DataStore.fetch({
                        'apiURL' : 'manage.order.get.user.details',
                        'orderID': orderId
                    })
                    .success(function(responseData) {

                        scope.userData = responseData.data;
                        
                        appServices.processResponse(responseData, null, function () {

                            appServices.showDialog(responseData.data,
                            {
                                templateUrl : __globals.getTemplateURL(
                                    'order.manage.contact-user'
                                )
                            },
                            function(promiseObj) {

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
      ManagePagesApp Module
      -------------------------------------------------------------------------- */
    
    angular
        .module('ManagePagesApp.list', [])
        .controller('ManagePagesListController',   [
            '$scope', 
            '__DataStore',
            'appServices',
            '$state',
            ManagePagesListController 
        ]);

    /**
      * ManagePagesListController - show all pages list
      *
      * @inject $scope
      * @inject __DataStore
      * @inject appServices
      * @inject $state
      * 
      * @return void
      *-------------------------------------------------------- */

    function ManagePagesListController($scope, __DataStore, appServices, $state) {


        var dtPageColumnsData = [
            {
                "name"      : "list_order",
                "orderable" : true,
                "template"  : "#pagesColumnListOrderTemplate"
            },
            {
                "name"      : "title",
                "orderable" : true,
                "template"  : "#pagesColumnTitleTemplate"
            },
            {
                "name"      : "type",
                "orderable" : true,
                "template"  : "#pagesColumnTypeTemplate"
            },
            {
                "name"      : "created_at",
                "orderable" : true,
                "template"  : "#pagesColumnTimeTemplate"
            },
            {
                "name"      : "updated_at",
                "orderable" : true,
                "template"  : "#pagesColumnUpdatedTimeTemplate"
            },
            {
                "name"      : "add_to_menu",
                "template"  : "#pagesColumnAddToMenuTemplate"
            },
            {
                "name"      : "status",
                "orderable" : true,
                "template"  : "#pagesColumnActiveTemplate"
            },
            {
                "name"      : null,
                "template"  : "#pagesColumnActionTemplate"
            }
        ],

        scope               = this;
        scope.parentPageID  = $state.params.parentPageID;
        scope.parent        = false;


        scope.pagesListDataTable = __DataStore.dataTable('#lwPagesTable', {
            url             : {
              'apiURL'          : 'manage.pages.fetch.datatable.source',
              'parentPageID?'   :  (scope.parentPageID) 
                                    ? scope.parentPageID 
                                    : null
            },
            columnsData     : dtPageColumnsData, 
            dtOptions   : {
                "searching" : true
            },
            scope : $scope
        });

        
        // Check if parent page id exist
		if (scope.parentPageID) {

            __DataStore.fetch({
                'apiURL'    	: 'manage.pages.get.parent.page',
                'parentPageID'  : scope.parentPageID
              })
                .success(function(responseData) {

                    scope.parentPage    = responseData.data;
                
                    scope.parent        = true;
                    scope.parentPageID  = scope.parentPageID;

                });
        }

        // list ordering pages
        $("table#lwPagesTable tbody").sortable({
            items      : 'tr',
            cursor     : 'move',
            axis       : 'y',
            containment: '.lw-pages-container',
            update     : function(event, ui) {

                var pages               = $(this).sortable('toArray'),
                    pageListOrderData   = [];

                // Check if is pages empty
                if (!_.isEmpty(pages)) {

                    _.forEach(pages, function(item, key) {

                        pageListOrderData.push({
                            id         : _.trim(item.replace('rowid_', '')),
                            list_order  : key + 1
                        })
                      
                    });

                    __DataStore.post('manage.page.update.list.order',{ 
                        'pages_list_order' : pageListOrderData
                    }).success(function(responseData) {
                    
                        appServices.processResponse(
                            responseData,
                            {
                                error : function() {
                                    scope.reloadDT();   // reload datatable
                                }
                            },
                            function() {
                         
                            }
                        ); 

                    });

                }

            }

        });

        $("table#lwPagesTable tbody").disableSelection();

        /*
         Reload current datatable
        -------------------------------------------------------------------------- */
        
        scope.reloadDT = function() {
            __DataStore.reloadDT(scope.pagesListDataTable);
        };

        /**
          * Delete page 
          *
          * @param number pageID
          * @param string pageName
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.delete = function(pageID, pageName) {

            __globals.showConfirmation({
                text                : __ngSupport.getText(
                    __globals.getJSString('page_delete_confirm_text'), {
                        '__name__'     : unescape(pageName)
                    }
                ),
                confirmButtonText   : __globals.getJSString('delete_action_button_text')
            }, function() {

                __DataStore.post({
                    'apiURL' : 'manage.pages.delete',
                    'pageID' : pageID,
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
                            scope.reloadDT();   // reload datatable

                        }
                    );    

                });

            });

        };

    };

})();;
(function() {
'use strict';
    
    /*
      ManagePagesAddDialogController Module
      -------------------------------------------------------------------------- */
    
    angular
        .module('ManagePagesApp.add.dialog', [])
        .controller('ManagePagesAddDialogController',   [
        	'$scope',
        	'$state',
            'appServices',
            '__DataStore',
            ManagePagesAddDialogController 
        ]);

    /**
      * ManagePagesAddDialogController - for show add dialog form
      *
      * @inject $scope
      * @inject $state
      * @inject appServices
      * @inject __DataStore
      * 
      * @return void
      *-------------------------------------------------------- */

    function ManagePagesAddDialogController($scope, $state, appServices, __DataStore) {

        var scope   = this;
  
        __DataStore.fetch('manage.pages.get.Type')
            .success(function(responseData) {

            	scope.page = responseData.data;

            	appServices.showDialog(scope,
                {	
                    templateUrl : __globals.getTemplateURL('pages.manage.add')
                },
                function(promiseObj) {
                	
                    // Check if page added
                    if (_.has(promiseObj.value, 'page_added') 
                        && promiseObj.value.page_added === true) {
                    	$scope.$parent.managePagesListCtrl.reloadDT();
                    }

                    $state.go('pages');

                });
     	});

    };

})();;
(function() {
'use strict';
    
    /*
      ManagePagesAddController Module
      -------------------------------------------------------------------------- */
    
    angular
        .module('ManagePagesApp.add', [])
        .controller('ManagePagesAddController',   [
        	'$scope',
            '__Form', 
            '$state',
            'appServices',
            ManagePagesAddController 
        ]);

    /**
      * ManagePagesAddController - handle add page dialog scope
      * 
      * @inject $scope
      * @inject __Form
      * @inject $state
      * @inject appServices
      * @inject __Utils
      * 
      * @return void
      *-------------------------------------------------------- */

    function ManagePagesAddController($scope,__Form, $state, appServices) {

        var scope   = this;

        scope = __Form.setup(scope, 'manage_pages_add', 'pageData');

        scope.pagesSelectConfig     = __globals.getSelectizeOptions({
            valueField  : 'value',
            labelField  : 'text',
            searchField : ['text']  
        });
        
        // Check if ngDialogData exist
        if ($scope.ngDialogData) {
        	
        	var page = $scope.ngDialogData.page;

        	scope.pageType  	= page.type;
        	scope.pageLink  	= page.link;
        	scope.pages  		= page.fancytree_data;

        }

        scope.pageData.add_to_menu  = true;
        scope.pageData.hide_sidebar = false;
      	scope.pageData.active       = true;
      	scope.pageData.type         = '1';
      	scope.pageData.open_as      = '_blank';
      	scope.descriptionRequired   = true;
      	scope.externalLinkRequired  = false;
      	scope.openAsRequired        = false;
        
        scope.pageTypeChanged = function() {
	    	
	        var pageType = scope.pageData.type;

	        if (pageType == 1) {
	          // page.
	          scope.descriptionRequired  = true;
	          scope.externalLinkRequired = false;
	          scope.openAsRequired       = false;

	        } else if (pageType == 2) {
	          // link.
	          scope.descriptionRequired  = false;
	          scope.externalLinkRequired = true;
	          scope.openAsRequired       = true;

          }

	    };

        /**
          * Submit add page form
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function() {
        	 
            __Form.process('manage.pages.add', scope)
                .success(function(responseData) {

                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog( { page_added : true } );
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
  	  	};

    };

})();;
(function() {
'use strict';
    
    /*
      ManagePagesEditDialogController Module
      -------------------------------------------------------------------------- */
    
    angular
        .module('ManagePagesApp.edit.dialog', [])
        .controller('ManagePagesEditDialogController',   [
        	'$scope',
        	'$state',
            'appServices',
            '__DataStore',
            ManagePagesEditDialogController 
        ]);

    /**
      * ManagePagesEditDialogController - show edit page dialog
      *
      * @inject $scope
      * @inject $state
      * @inject appServices
      * @inject __DataStore
      * 
      * @return void
      *-------------------------------------------------------- */

    function ManagePagesEditDialogController($scope, $state, appServices, __DataStore) {

        var scope   = this;

        __DataStore.fetch({
	        	'apiURL'  : 'manage.pages.get.details',
	        	'pageID'  : $state.params.pageID
	        })
        	.success(function(responseData) {

			appServices.processResponse(responseData,null, function(reactionCode) {
				
				appServices.showDialog(responseData.data,
                {
                    templateUrl : __globals.getTemplateURL('pages.manage.edit')
                },
                function(promiseObj) {

                    // Check if page updated
                    if (_.has(promiseObj.value, 'page_updated') 
                        && promiseObj.value.page_updated === true) {
                    	
                    	$scope.$parent.managePagesListCtrl.reloadDT();
                    }
                    
                    $state.go('pages');
                    
                });
			});
            	
     	});

    };

})();;
(function() {
'use strict';
	
	/*
	  ManagePagesEditController Module
	  -------------------------------------------------------------------------- */
	
	angular
        .module('ManagePagesApp.edit', [])
        .controller('ManagePagesEditController', 	[
            '$scope', 
            '__Form', 
            'appServices',
            '$state',
            ManagePagesEditController 
	 	]);

	/**
	  * ManagePagesEditController - handle scope of edit page dialog
	  *
	  * @inject $scope
      * @inject __Form
      * @inject appServices
      * @inject $state
	  * 
	  * @return void
	  *-------------------------------------------------------- */

	function ManagePagesEditController($scope, __Form, appServices, $state) {

	 	var scope = this;

		scope.updateURL = {
			'apiURL' :'manage.pages.update',
			'pageID' : $state.params.pageID
		};

		scope 	= __Form.setup(scope, 'form_page_edit', 'pageData');
		
		scope   = __Form.updateModel(scope, $scope.ngDialogData.pageDetails);
		
		scope.pagesSelectConfig     = __globals.getSelectizeOptions({
            valueField  : 'value',
            labelField  : 'text',
            searchField : ['text']  
        });

        scope.ngDialogData = $scope.ngDialogData;

        scope.type = scope.ngDialogData.pageDetails.type;

        if (scope.type != 3) {

            scope.pageType 	= scope.ngDialogData.configItems.pageType;
            scope.pageLink 	= scope.ngDialogData.configItems.pageLinks;
           
    		scope.getPageType = function() {

    	    	if (scope.ngDialogData) {

            		scope.pages  = scope.ngDialogData.pageDetails.fancytree_data;
    	        	var pageType = scope.ngDialogData.pageDetails.type;

    		        if ( pageType == 1 ) {
    		            // Internal page.
    		            scope.descriptionRequired  = true;
    		            scope.externalLinkRequired = false;
    		            scope.openAsRequired       = false;

    		        } else if ( pageType == 2) {
    		            // External link.
    		            scope.descriptionRequired  = false;
    		            scope.externalLinkRequired = true;
    		            scope.openAsRequired       = true; 

    		        } 
    	        } 
    	    };

            scope.getPageType();

        }
	    

		/*
	 	 Submit edit form action
	 	-------------------------------------------------------------------------- */
	 	
	 	scope.update = function() {

	 		// post form data
	 		__Form.process(scope.updateURL, scope )
	 						.success( function( responseData ) {
		      		
				appServices.processResponse(responseData, null, function(reactionCode) {

	                $scope.closeThisDialog({ page_updated : true });

	            });

		    });

	  	};

	  	/**
	  	  * Close dialog
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */

  	  	scope.cancel = function() {
  	  		$scope.closeThisDialog();
  	  	};

	};

})();;
(function() {
'use strict';
    
    /*
     PageDetailsController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManagePagesApp.page.details', [])
        .controller('PageDetailsController',   [
        	'$state',
            'appServices',
            '__DataStore',
            PageDetailsController 
        ]);

    /**
      * PageDetailsController handle add pages form
      * @inject $scope
      * @inject $state
      * @inject appServices
      * @inject __DataStore
      * 
      * @return void
      *-------------------------------------------------------- */

    function PageDetailsController($state, appServices, __DataStore) {
    	
        var scope   = this;
        		
      	/**
      	* get pages info
      	* 
      	* @return void
      	*-------------------------------------------------------- */

        scope.getPageInfo = function() {

        	__DataStore.fetch({	
        			'apiURL' :'manage.display.page.details',
        			'pageID' : $state.params.pageID
        		}, scope)
            	.success(function(responseData) {

            	appServices.processResponse(responseData, null, function() {

            	 	scope.pageDetails = responseData.data;
            	});    

     		});
        };
        scope.getPageInfo();
        
    };

})();;
(function() {
'use strict';
    
    /*
     EditStoreSettingsController
    -------------------------------------------------------------------------- */
    
    angular
        .module('manageApp.storeSettingsEdit', [])
        .controller('EditStoreSettingsController',   [
        	'$state',
            '$scope',
            EditStoreSettingsController 
        ]);

    /**
      * EditStoreSettingsController for update store settings
      *
      * @inject __Form
      * @inject appServices
      * @inject $state
      * @inject FileUploader
      * @inject __Utils
      * 
      * @return void
      *-------------------------------------------------------- */

    function EditStoreSettingsController($state, $scope) {

    	var scope   = this;

        $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            
            _.defer(function(){
                var stateName = toState.name;
            
                // if current route is general then open general panel
                if (stateName == 'store_settings_edit.general') {

                    scope.generalPanelClass = 'panel-collapse collapse in';
                    scope.generalPanelStatus = true;

                } else {

                    scope.generalPanelClass = 'panel-collapse collapse';
                }

                // if current route is currency then open general panel
                if (stateName == 'store_settings_edit.currency') {

                    scope.currencylPanelClass = 'panel-collapse collapse in';
                    scope.currencyPanelStatus = true;

                } else {

                    scope.currencylPanelClass = 'panel-collapse collapse';
                }

                // if current route is order then open general panel
                if (stateName == 'store_settings_edit.order') {

                    scope.orderPanelClass = 'panel-collapse collapse in';
                    scope.orderPanelStatus = true;

                } else {

                    scope.orderPanelClass = 'panel-collapse collapse';
                } 

                // if current route is products then open general panel
                if (stateName == 'store_settings_edit.product') {

                    scope.productsPanelClass = 'panel-collapse collapse in';
                    scope.productPanelStatus = true;

                } else {

                    scope.productsPanelClass = 'panel-collapse collapse';
                }

                // if current route is placement then open general panel
                if (stateName == 'store_settings_edit.placement') {

                    scope.placementPanelClass = 'panel-collapse collapse in';
                    scope.placementPanelStatus = true;

                } else {

                    scope.placementPanelClass = 'panel-collapse collapse';
                }

                // if current route is contact then open general panel
                if (stateName == 'store_settings_edit.contact') {

                    scope.contactPanelClass = 'panel-collapse collapse in';
                    scope.contactPanelStatus = true;

                } else {

                    scope.contactPanelClass = 'panel-collapse collapse';
                }

                // if current route is terms and condition then open general panel
                if (stateName == 'store_settings_edit.term_condition') {

                    scope.termsConditionsPanelClass = 'panel-collapse collapse in';
                    scope.termsConditionPanelStatus = true;

                } else {

                    scope.termsConditionsPanelClass = 'panel-collapse collapse'; 
                } 

                // if current route is privacy policy then open general panel
                if (stateName == 'store_settings_edit.privacy_policy') {

                    scope.privacyPolicyPanelClass = 'panel-collapse collapse in';
                    scope.privacyPolicyPanelStatus = true;

                } else {

                    scope.privacyPolicyPanelClass = 'panel-collapse collapse';
                }

                // if current route is social then open general panel
                if (stateName == 'store_settings_edit.social')  {

                    scope.socialPanelClass = 'panel-collapse collapse in';
                    scope.socialPanelStatus = true;

                } else {

                    scope.socialPanelClass = 'panel-collapse collapse';
                }

                // if current route is social then open language panel
                if (stateName == 'store_settings_edit.language')  {

                    scope.languagePanelClass = 'panel-collapse collapse in';
                    scope.languagePanelStatus = true;

                } else {

                    scope.languagePanelClass = 'panel-collapse collapse';
                }

                // if current route is css style then open item tab
                if (stateName == 'store_settings_edit.css-style') {

                    scope.cssStylePanelClass    = 'panel-collapse collapse in';
                    scope.cssStylePanelStatus   = true;

                } else {

                    scope.cssStylePanelClass  = 'panel-collapse collapse';
                }

            });

        });

    	scope.getPage = function (pageType) {

    		if (pageType) {

                _.defer(function(){

    			switch(pageType) {

    				case 1: // general

    					$state.go('store_settings_edit.general');
    					scope.generalPanelStatus = true;

    					break;

    				case 2: // currency

    					$state.go('store_settings_edit.currency');
    					scope.currencyPanelStatus = true;

    					break;

    				case 3: // order

    					$state.go('store_settings_edit.order');
    					scope.orderPanelStatus = true;

    					break;

    				case 4: // products

    					$state.go('store_settings_edit.product');
    					scope.productPanelStatus = true;

    					break;

    				case 5: // Placement

    					$state.go('store_settings_edit.placement');
    					scope.placementPanelStatus = true;

    					break;

    				case 6: // Contact

    					$state.go('store_settings_edit.contact');
    					scope.contactPanelStatus = true;

    					break;

    				case 7: // Terms and Conditions

    					$state.go('store_settings_edit.term_condition');
    					scope.termsConditionPanelStatus = true;

    					break;

    				case 8: // Privacy Policy

    					$state.go('store_settings_edit.privacy_policy');
    					scope.privacyPolicyPanelStatus = true;

    					break;

    				case 9: // Social

    					$state.go('store_settings_edit.social');
    					scope.socialPanelStatus = true;

    					break;

                    case 10: // css style

                        $state.go('store_settings_edit.css-style');
                        scope.cssStylePanelStatus = true;

                        break;

    			}

            });
    		}
    	}

    	// if current route is general then open general panel
        if ($state.current.name == 'store_settings_edit.general') {

        	scope.generalPanelClass = 'panel-collapse collapse in';
        	scope.generalPanelStatus = true;

        } else {

        	scope.generalPanelClass = 'panel-collapse collapse';
        }

        // if current route is currency then open general panel
        if ($state.current.name == 'store_settings_edit.currency') {

        	scope.currencylPanelClass = 'panel-collapse collapse in';
        	scope.currencyPanelStatus = true;

        } else {

        	scope.currencylPanelClass = 'panel-collapse collapse';
        }

        // if current route is order then open general panel
        if ($state.current.name == 'store_settings_edit.order') {

        	scope.orderPanelClass = 'panel-collapse collapse in';
        	scope.orderPanelStatus = true;

        } else {

        	scope.orderPanelClass = 'panel-collapse collapse';
        } 

        // if current route is products then open general panel
        if ($state.current.name == 'store_settings_edit.product') {

        	scope.productsPanelClass = 'panel-collapse collapse in';
        	scope.productPanelStatus = true;

        } else {

        	scope.productsPanelClass = 'panel-collapse collapse';
        }

        // if current route is placement then open general panel
        if ($state.current.name == 'store_settings_edit.placement') {

        	scope.placementPanelClass = 'panel-collapse collapse in';
        	scope.placementPanelStatus = true;

        } else {

        	scope.placementPanelClass = 'panel-collapse collapse';
        }

        // if current route is contact then open general panel
        if ($state.current.name == 'store_settings_edit.contact') {

        	scope.contactPanelClass = 'panel-collapse collapse in';
        	scope.contactPanelStatus = true;

        } else {

        	scope.contactPanelClass = 'panel-collapse collapse';
        }

        // if current route is terms and condition then open general panel
        if ($state.current.name == 'store_settings_edit.term_condition') {

        	scope.termsConditionsPanelClass = 'panel-collapse collapse in';
        	scope.termsConditionPanelStatus = true;

        } else {

        	scope.termsConditionsPanelClass = 'panel-collapse collapse'; 
        } 

        // if current route is privacy policy then open general panel
        if ($state.current.name == 'store_settings_edit.privacy_policy') {

        	scope.privacyPolicyPanelClass = 'panel-collapse collapse in';
        	scope.privacyPolicyPanelStatus = true;

        } else {

        	scope.privacyPolicyPanelClass = 'panel-collapse collapse';
        }

        // if current route is social then open general panel
        if ($state.current.name == 'store_settings_edit.social')  {

        	scope.socialPanelClass = 'panel-collapse collapse in';
        	scope.socialPanelStatus = true;

        } else {

        	scope.socialPanelClass = 'panel-collapse collapse';
        }

        // if current route is social then open language panel
        if ($state.current.name == 'store_settings_edit.language')  {

        	scope.languagePanelClass = 'panel-collapse collapse in';
        	scope.languagePanelStatus = true;

        } else {

        	scope.languagePanelClass = 'panel-collapse collapse';
        }

        // if current route is css-style then open css-style
        if ($state.current.name == 'store_settings_edit.css-style') {

            scope.cssStylePanelClass    = 'panel-collapse collapse in';
            scope.cssStylePanelStatus = true;

        } else {

            scope.cssStylePanelClass  = 'panel-collapse collapse';
        }
        
       
            

    };

})();;
(function() {
'use strict';
	
	/*
	  general setting Related Controllers
	  ---------------------------------------------------------------------- */
	
	angular
        .module('manageApp.GeneralSettings', 		[])

         /**
	      * GeneralSettingsController for update store settings
	      *
	      * @inject __Form
	      * @inject appServices
	      * @inject $state
	      * @inject FileUploader
	      * @inject __Utils
	      * 
	      * @return void
	      *-------------------------------------------------------- */

		.controller('GeneralSettingsController', [
			'__Form', 
            '$scope',
            'appServices',
            '$state',
            'FileUploader',
            '__Utils',
            'appNotify',
            '$rootScope',
            function (__Form, $scope, appServices, $state,
     			FileUploader, __Utils, appNotify, $rootScope) {

                var scope   = this;
 				scope.pageStatus = false;
		        scope = __Form.setup(scope, 'form_general_settings', 'editData', {
		        	secured : true,
		        	modelUpdateWatcher:false,
                    unsecuredFields : ['store_name']
		        });

		        scope.logo_images_select_config = __globals.getSelectizeOptions({
		            valueField  : 'name',
		            labelField  : 'name',
		            render      : {
		                item: function(item, escape) {
		                    return  __Utils.template('#imageListItemTemplate',
		                    item
		                    );
		                },
		                option: function(item, escape) {
		                    return  __Utils.template('#imageListOptionTemplate',
		                    item
		                    );
		                }
		            }, 
		            searchField : ['name']
		        });

		        scope.timezone_select_config = __globals.getSelectizeOptions({
		            valueField  : 'value',
		            labelField  : 'text',
		            searchField : [ 'text' ]  
		        });
		        
		        scope.home_page_select_config = __globals.getSelectizeOptions({
		            valueField  : 'id',
		            labelField  : 'name',
		            searchField : [ 'name' ]  
		        });
			        
		        /**
		          * Fetch support data
		          *
		          * @return void
		          *---------------------------------------------------------------- */

		        __Form.fetch({
		        		'apiURL'   :'store.settings.edit.supportdata',
		        		'formType' : 1
		        	}).success(function(responseData) {
		            
		            var requestData = responseData.data;
                    
		            scope.homePageList    = requestData.store_settings.home_page_setting;
		            scope.homePageSetting = __globals.generateKeyValueItems(scope.homePageList);
		            scope.timezoneData 	  = requestData.store_settings.timezone_list;

		            appServices.processResponse(responseData, null, function() {

		                if (!_.isEmpty(requestData.store_settings)) {
		                	
		                    __Form.updateModel(scope, requestData.store_settings);
		                }
		                
  						scope.pageStatus = true;
                        
		            });    

		        });

		        /**
		          * Fetch uploaded temp images media files
		          *
		          * @return void
		          *---------------------------------------------------------------- */
		        scope.images_count = 0;
		        scope.getTempImagesMedia = function() {

		            __Form.fetch('media.uploaded.images', {fresh : true})
		                .success(function(responseData) {
		                    
		                appServices.processResponse(responseData, null, function() {
		                    
		                    scope.logoImages = responseData.data.files;

		                    var selectizeImages = [];

		                    _.forEach(scope.logoImages, function(value, index) {
		                    	
		                    	scope.imagesExtention = value.name.split(".").pop();
				            	
				            	if (scope.imagesExtention == 'png') {

				            		selectizeImages.push(value);
				            	}
				            });

				            scope.logo_images = selectizeImages;

		                    if (scope.logo_images.length > 0) {
		                    	scope.images_count = scope.logo_images.length;
							} else {
								scope.images_count = 0;
							};
		                });    
		                
		            });

		        };

		        scope.getTempImagesMedia();
		        
		        var uploader = scope.uploader = new FileUploader({
		            url         : __Utils.apiURL('media.upload.image'),
		            autoUpload  : true,
		            headers     : {
		                'X-XSRF-TOKEN': __Utils.getXSRFToken()
		            }
		        });

		        // FILTERS
		        uploader.filters.push({
		            name: 'customFilter',
		            fn: function(item /*{File|FileLikeObject}*/, options) {
		            	if (item.type == 'image/png') {
		                	return this.queue.length < 1000;
		            	}
		            }
		        });


		        scope.currentUploadedFileCount = 0;
		        scope.loadingStatus     	   = false;

				/**
                * uploading msg
                *
                * @return void
                *---------------------------------------------------------------- */
                uploader.onAfterAddingAll = function() {

                    scope.loadingStatus = true;
                    appNotify.info(__globals.getJSString('loading_text'),{sticky : true});

                };

                /**
                * Uploading on process
                *
                * @return void
                *---------------------------------------------------------------- */

                uploader.onBeforeUploadItem = function(item) {
                    scope.loadingStatus = true;
                };

		        /**
		        * on success counter of uploaded image
		        *
		        * @param object fileItem
		        * @param object response
		        *
		        * @return void
		        *---------------------------------------------------------------- */
		        
		        uploader.onSuccessItem = function( fileItem, response ) {

					appServices.processResponse(response, null, function() {
		            	scope.currentUploadedFileCount++
		            }); 

		        };

		        /**
                * on success counter of uploaded image
                *
                * @param object fileItem
                * @param object response
                *
                * @return void
                *---------------------------------------------------------------- */
                
                uploader.onSuccessItem = function( fileItem, response ) {

                    appServices.processResponse(response, null, function() {

                        if (fileItem._file.name.split('.').pop() === 'png') {
                            scope.currentUploadedFileCount++
                        }
                        
                    }); 

                };

                /**
                * uploaded all image then call function
                *
                * @return void
                *---------------------------------------------------------------- */
                
                uploader.onCompleteAll  = function() {

                    scope.loadingStatus  = false;
                    
                    if (scope.currentUploadedFileCount === 0) {
                        appNotify.warn(__globals.getJSString('logo_empty_file_uploaded_text'),{sticky : false});
                    }

                    if (scope.currentUploadedFileCount > 0) {
                        appNotify.success(scope.currentUploadedFileCount+' '+__globals.getJSString('file_uploaded_text'),{sticky : false});
                    }

                    scope.getTempImagesMedia();
                    scope.currentUploadedFileCount = 0;
                };
		        
		        /**
		          * Submit store settings edit form
		          *
		          * @return void
		          *---------------------------------------------------------------- */
		
		        scope.submit = function() {

		            __Form.process({	
		        		'apiURL'   :'store.settings.edit',
		        		'formType' :1
		        	}, scope)
		                .success(function(responseData) {
		                	
		                appServices.processResponse(responseData, null, 
		                    function() {
		                    	
		                  	__globals.showConfirmation({
				                title               : responseData.data.message,
				                text                : responseData.data.textMessage,
				                type                : "success",
		                        showCancelButton    : true,
		                        confirmButtonClass  : "btn-success",
		                        confirmButtonText   : __globals.getJSString('reload_text'),
								confirmButtonColor :  "#337ab7",
		                        closeOnConfirm      : false
				            }, function() {

				               location.reload();

				            });

		                });    

		            });

		        };

		        /**
		          * Show uploaded media files
		          *
		          * @return void
		          *---------------------------------------------------------------- */
		        
		        scope.showUploadedMediaDialog = function() {
		            appServices.showDialog({ 'image_files' : scope.logo_images }, {
		                templateUrl : __globals.getTemplateURL('product.manage.uploaded-media')
		            }, function(promiseObj) {

		            	if (_.has(promiseObj.value, 'files')) {
		                    scope.logo_images = promiseObj.value.files;
		                    scope.images_count = promiseObj.value.files.length;

		                } else if(promiseObj.value == '$closeButton') {

		                    scope.getTempImagesMedia();
		                }

		            });
		        };
		}]);

})();;
(function() {
'use strict';
	
	/*
	  currency & setting Related Controllers
	  ---------------------------------------------------------------------- */
	
	angular
        .module('manageApp.CurrencySettings', 		[])

         /**
	      * CurrencySettingsController for update store settings
	      *
	      * @inject __Form
	      * @inject appServices
	      * @inject $state
	      * @inject FileUploader
	      * @inject __Utils
	      * 
	      * @return void
	      *-------------------------------------------------------- */

		.controller('CurrencySettingsController', [
			'__Form', 
            'appServices',
            function (__Form, appServices) {

                var scope = this;

            scope.isZeroDecimalCurrency = false;

            /**
              * Generate key value
              * 
              * @param bool responseKeyValue
              * 
              * @return void
              *---------------------------------------------------------------- */
            
            scope.generateCurrenciesArray = function(currencies, responseKeyValue) {
                
                if (!responseKeyValue) {
                    return currencies;
                }

                var currenciesArray = [];

                _.forEach(currencies, function(value, key) {
                    
                    currenciesArray.push({
                        'currency_code'     : key,
                        'currency_name'     : value.name   
                    });

                });

                currenciesArray.push({
                    'currency_code'  : 'other',
                    'currency_name'  :  __globals.getJSString('other')
                });

                return currenciesArray;
             
            };

            /**
              *  Check the the currency match with zero decimal
              *
              * @param array zeroDecimalCurrecies
              * @param string selectedCurrencyValue 
              * 
              * @return void
              *---------------------------------------------------------------- */
            
            scope.checkIsZeroDecimalCurrency = function(zeroDecimalCurrecies, selectedCurrencyValue) {
      
                var isMatch = _.filter(zeroDecimalCurrecies, function(value, key) {
                    
                        return  (key === selectedCurrencyValue);
                    });

                scope.isZeroDecimalCurrency = Boolean(isMatch.length);
                
            };

            /**
              * Check if current currency is Paypal supported or not
              *
              * @return void
              *---------------------------------------------------------------- */
            scope.checkIsPaypalSupported = function (currencyValue) {

                var isPaypalSupported = _.filter(scope.options, function(value, key) {
                    
                    return  (key == currencyValue);
                });

                scope.isPaypalSupport = Boolean(isPaypalSupported.length);
            };

            /**
              * format currency symbol and currency value
              *
              * @return void
              *---------------------------------------------------------------- */
            scope.formatCurrency = function (currencySymbol, currency) {

                _.defer(function() {

                    var $lwCurrencyFormat = $('#lwCurrencyFormat');

                    var string = $lwCurrencyFormat.attr('data-format');

                    scope.currency_format_preview  =  string.split('{__currencySymbol__}').join(currencySymbol)
                                                            .split('{__amount__}').join(100)
                                                            .split('{__currencyCode__}').join(currency);
                });
            };

            scope.pageStatus = false;

            scope  = __Form.setup(scope, 'edit_currency_configuration', 'editData', {
                secured : true,
                unsecuredFields : [
                    'currency_symbol'
                ]
            });

            scope.currencies_select_config = __globals.getSelectizeOptions({
                valueField  : 'currency_code',
                labelField  : 'currency_name',
                searchField : [ 'currency_code', 'currency_name' ]  
            });

            scope.is_support_paypal = true;


            __Form.fetch({
                    'apiURL'   :'store.settings.edit.supportdata',
                    'formType' : 2
                }).success(function(responseData) {
                
                appServices.processResponse(responseData, null, function() {

                        var requestData     = responseData.data,
                            currenciesData  = requestData.store_settings.currencies;

                        scope.options     = currenciesData.options;
                        scope.currencies  = currenciesData.details;
                        scope.zeroDecimal = currenciesData.zero_decimal;
                        scope.currencies_options  
                                = scope.generateCurrenciesArray(currenciesData.details, true);
                                
                        if (!_.isEmpty(requestData.store_settings)) {

                            scope.checkIsZeroDecimalCurrency(scope.zeroDecimal, requestData.store_settings.currency_value);

                            scope.checkIsPaypalSupported(requestData.store_settings.currency);

                            scope.default_currency_format = requestData.store_settings.default_currency_format;

            
                            scope = __Form.updateModel(scope, requestData.store_settings);

                            _.forEach(scope.currencies, function(currencyObj, key) {

                                if (key == scope.editData.currency_value) {
                                    scope.currencySymbol = currencyObj.symbol;
                                }
                            });

                            if (requestData.store_settings.currency == 'other') {
                                scope.currencySymbol = requestData.store_settings.currency_symbol;
                            }
                            
                            scope.formatCurrency(scope.currencySymbol, scope.editData.currency_value);

                        }

                        scope.pageStatus = true;
                    
                });    

            });

            
            /**
              * Use default format for currency
              *
              * @param string defaultCurrencyFormat
              * 
              * @return string
              *---------------------------------------------------------------- */
            scope.useDefaultFormat = function(defaultCurrencyFormat, currency_symbol, currency_value) {

                scope.editData.currency_format = defaultCurrencyFormat;

                var lwSymbol = $('#lwSymbol'),
                    currency_symbol = lwSymbol.html(lwSymbol.attr('data')).text();
                    
                var string = scope.editData.currency_format;
                
                scope.currency_format_preview  =  string.split('{__currencySymbol__}').join(currency_symbol)
                                                    .split('{__amount__}').join(100)
                                                    .split('{__currencyCode__}').join(currency_value);
            };


            /**
              * Use default format for currency
              *
              * @param string defaultCurrencyFormat
              * 
              * @return string
              *---------------------------------------------------------------- */
            scope.updateCurrencyPreview = function(currency_symbol, currency_value, isSymbol) {
                
                if (isSymbol == true) {
                    var lwSymbol = $('#lwSymbol'),
                    currency_symbol = lwSymbol.html(lwSymbol.attr('data')).text();
                }

                if (_.isUndefined(currency_symbol)) {
                    currency_symbol = '';
                }

                if (_.isUndefined(currency_value)) {
                    currency_value = '';
                }

                var $lwCurrencyFormat = $('#lwCurrencyFormat');

                var string = $lwCurrencyFormat.attr('data-format');

                scope.currency_format_preview  =  string.split('{__currencySymbol__}').join(currency_symbol)
                                                        .split('{__amount__}').join(100)
                                                        .split('{__currencyCode__}').join(currency_value);
                
            };

            /**
              * Submit currency Data
              *
              * @return void
              *---------------------------------------------------------------- */
            
            scope.submit = function() {

                __Form.process({
                    'apiURL'   :'store.settings.edit',
                    'formType' : 2
                }, scope)
                    .success(function(responseData) {

                    appServices.processResponse(responseData, null, function() {
                        
                        __globals.showConfirmation({
                            title               : responseData.data.message,
                            text                : responseData.data.textMessage,
                            type                : "success",
                            showCancelButton    : true,
                            confirmButtonClass  : "btn-success",
                            confirmButtonText   : __globals.getJSString('reload_text'),
                            confirmButtonColor :  "#337ab7"
                        }, function() {

                           location.reload();

                        });
                    });    

                });
            };


            /**
              * currency change
              *
              * @param selectedCurrency
              * @return void
              *---------------------------------------------------------------- */
            scope.currencyChange = function(selectedCurrency) {
                
                scope.checkIsZeroDecimalCurrency(scope.zeroDecimal, selectedCurrency);

                if (!_.isEmpty(selectedCurrency) && selectedCurrency != 'other') {

                    _.forEach(scope.currencies, function(currencyObj, key) {
                        
                        if (key == selectedCurrency) {
                            scope.editData.currency_value   = selectedCurrency;
                            scope.editData.currency_symbol  = currencyObj.ASCII;
                            scope.currencySymbol            = currencyObj.symbol;
                        }

                    });

                    scope.is_support_paypal = true;

                } else {

                    scope.editData.currency_value   = '';
                    scope.editData.currency_symbol  = '';

                }

                scope.updateCurrencyPreview(scope.currencySymbol, scope.editData.currency_value);

                scope.checkIsPaypalSupported(scope.editData.currency_value);

            };

            /**
              * currency value change
              *
              * @param currencyValue
              *
              * @return void
              *---------------------------------------------------------------- */
            scope.currencyValueChange = function(currencyValue) {
                
                scope.checkIsZeroDecimalCurrency(scope.zeroDecimal, currencyValue);

                if (!_.isEmpty(currencyValue) && currencyValue != 'other') {

                    var currency = {};
                    _.forEach(scope.currencies, function(currencyObj, key) {

                        if (key == currencyValue) {
                            currency = currencyObj;
                        }

                    });

                    if (_.isEmpty(currency)) {
                        //scope.is_support_paypal = false;
                        scope.editData.currency  = 'other';
                    } else {
                        //scope.is_support_paypal     = true;
                        scope.editData.currency     = currencyValue;
                        scope.editData.currency_symbol  = currency.ASCII;
                        scope.currencySymbol           = currency.symbol;
                    }

                } else if (!_.isEmpty(currencyValue)) {

                    //scope.is_support_paypal     = false;
                    scope.editData.currency     = 'other';

                } else {

                    //scope.is_support_paypal  = true;
                    scope.editData.currency  = '';

                }

                scope.checkIsPaypalSupported(currencyValue);

                if (_.isUndefined(scope.editData.currency_value)) {
                    scope.currencySymbol = '';
                }

                scope.updateCurrencyPreview(scope.currencySymbol, scope.editData.currency_value);
            };

		}]);

})();;
(function() {
'use strict';
	
	/*
	  order setting Related Controllers
	  ---------------------------------------------------------------------- */
	
	angular
        .module('manageApp.OrderSettings',[])

         /**
	      * OrderSettingsController for update store settings
	      *
	      * @inject __Form
	      * @inject appServices
	      * @inject $state
	      * @inject FileUploader
	      * @inject __Utils
	      * 
	      * @return void
	      *-------------------------------------------------------- */

		.controller('OrderSettingsController', [
			'__Form', 
            'appServices',
            function (__Form, appServices) {

                var scope   = this;

                scope = __Form.setup(scope, 'form_order_and_currency_settings', 'editData', {
		            secured : true,
		        	modelUpdateWatcher:false,
		            unsecuredFields : [
						               'payment_check_text', 
						               'payment_bank_text', 
						               'payment_cod_text',
						               'payment_other_text'
						            ],
		        });

		        scope.pageStatus = false;

		        /**
		          * Fetch support data
		          *
		          * @return void
		          *---------------------------------------------------------------- */

		        __Form.fetch({	
		        		'apiURL'   :'store.settings.edit.supportdata',
		        		'formType' : 3
		        	}).success(function(responseData) {
		            
		            var requestData    = responseData.data;
		           
		            appServices.processResponse(responseData, null, function() {
		            
						if (!_.isEmpty(requestData.store_settings)) {
		                    __Form.updateModel(scope, requestData.store_settings);
		                }

		                scope.pageStatus = true;

		            });    

		        });

                /**
                  * Add stripe key 
                  *---------------------------------------------------------------- */
                scope.addStripeKeys = function(stripeKeysFor) {

                    if (stripeKeysFor == 1) {
                        scope.editData.isLiveStripeKeysExist = false;
                    } else {
                        scope.editData.isTestingStripeKeysExist = false;
                    }
                };
		        
		        /**
		          * Submit store settings edit form
		          *
		          * @return void
		          *---------------------------------------------------------------- */
		        
		        scope.submit = function() {

		            __Form.process({	
		        		'apiURL'   :'store.settings.edit',
		        		'formType' :3
		        	}, scope)
		                .success(function(responseData) {
		                	
		                appServices.processResponse(responseData, null, 
		                    function() {
		                    	
							scope.editData.logo_image = '';
							
		                    __globals.showConfirmation({
				                title               : responseData.data.message,
				                text                : responseData.data.textMessage,
				                type                : "success",
		                        showCancelButton    : true,
		                        confirmButtonClass  : "btn-success",
		                        confirmButtonText   : __globals.getJSString('reload_text'),
								confirmButtonColor :  "#337ab7",
		                        closeOnConfirm      : false
				            }, function() {

				               location.reload();

				            });

		                });    

		            });

		        };
		}]);

})();;
(function() {
'use strict';
	
	/*
	  general setting Related Controllers
	  ---------------------------------------------------------------------- */
	
	angular
        .module('manageApp.PlacementSettings', 		[])

         /**
	      * PlacementSettingsController for update store settings
	      *
	      * @inject __Form
	      * @inject appServices
	      * @inject $state
	      * @inject FileUploader
	      * @inject __Utils
	      * 
	      * @return void
	      *-------------------------------------------------------- */

		.controller('PlacementSettingsController', [
			'__Form', 
            'appServices',
            function (__Form,appServices) {

                var scope   = this;
  				scope.pageStatus = false;
		        scope = __Form.setup(scope, 'form_placement_settings', 'editData', {
		            secured : true,
		        	modelUpdateWatcher:false,
                    unsecuredFields : ['addtional_page_end_content', 'global_notification', 'append_email_message'],
		        });

		        scope.categories_menu_placement_select_config = __globals.getSelectizeOptions({
		            valueField  : 'value',
		            labelField  : 'name',
		            searchField : [ 'name' ]  
		        });

		        scope.brand_menu_placement_select_config = __globals.getSelectizeOptions({
		            valueField  : 'value',
		            labelField  : 'name',
		            searchField : [ 'name' ]  
		        });

		        /**
		          * Fetch support data
		          *
		          * @return void
		          *---------------------------------------------------------------- */

		        __Form.fetch({	
		        		'apiURL'   :'store.settings.edit.supportdata',
		        		'formType' : 5
		        	}).success(function(responseData) {
		            
		            var requestData = responseData.data;
		            
		            scope.menu_placement = requestData.store_settings.menu_placement;
		            appServices.processResponse(responseData, null, function() {

		                if (!_.isEmpty(requestData.store_settings)) {
		                    __Form.updateModel(scope, requestData.store_settings); 
		                }  
		                scope.pageStatus = true;

		            });    

		        });

		        /**
		          * Submit store settings edit form
		          *
		          * @return void
		          *---------------------------------------------------------------- */
		        
		        scope.submit = function() {

		            __Form.process({	
		        		'apiURL'   :'store.settings.edit',
		        		'formType' : 5
		        	}, scope)
		                .success(function(responseData) {
		                	
		                appServices.processResponse(responseData, null, 
		                    function() {
		                    	
							scope.editData.logo_image = '';
							
		                    __globals.showConfirmation({
				                title               : responseData.data.message,
				                text                : responseData.data.textMessage,
				                type                : "success",
		                        showCancelButton    : true,
		                        confirmButtonClass  : "btn-success",
		                        confirmButtonText   : __globals.getJSString('reload_text'),
								confirmButtonColor :  "#337ab7",
		                        closeOnConfirm      : false
				            }, function() {

				               location.reload();

				            });

		                });    

		            });

		        };
		}]);

})();;
(function() {
'use strict';
	
	/*
	  general setting Related Controllers
	  ---------------------------------------------------------------------- */
	
	angular
        .module('manageApp.ProductSettings', 		[])

         /**
	      * ProductSettingsController for update store settings
	      *
	      * @inject __Form
	      * @inject appServices
	      * @inject $state
	      * @inject FileUploader
	      * @inject __Utils
	      * 
	      * @return void
	      *-------------------------------------------------------- */

		.controller('ProductSettingsController', [
			'__Form', 
            'appServices',
            function (__Form,appServices) {

                var scope   = this;
                scope.pageStatus = false;
		        scope = __Form.setup(scope, 'form_product_settings_edit', 'editData', {
		            secured : true,
		        	modelUpdateWatcher:false
		        });

		        scope.editData.credit_info = true;

		        /**
		          * Fetch support data
		          *
		          * @return void
		          *---------------------------------------------------------------- */

		        __Form.fetch({	
		        		'apiURL'   :'store.settings.edit.supportdata',
		        		'formType' : 4
		        	}).success(function(responseData) {
		            
		            var requestData = responseData.data;
		            
		            appServices.processResponse(responseData, null, function() {

		                if (!_.isEmpty(requestData.store_settings)) {
		                    __Form.updateModel(scope, requestData.store_settings);
		                }
 						scope.pageStatus = true;
		            });    

		        });

		       /**
		          * Submit store settings edit form
		          *
		          * @return void
		          *---------------------------------------------------------------- */
		        
		        scope.submit = function() {

		            __Form.process({	
		        		'apiURL'   :'store.settings.edit',
		        		'formType' : 4
		        	}, scope)
		                .success(function(responseData) {
		                	
		                appServices.processResponse(responseData, null, 
		                    function() {
							
		                    __globals.showConfirmation({
				                title               : responseData.data.message,
				                text                : responseData.data.textMessage,
				                type                : "success",
		                        showCancelButton    : true,
		                        confirmButtonClass  : "btn-success",
		                        confirmButtonText   : __globals.getJSString('reload_text'),
								confirmButtonColor :  "#337ab7",
		                        closeOnConfirm      : false
				            }, function() {

				               location.reload();

				            });

		                });    

		            });

		        };
		}]);

})();;
(function() {
'use strict';
	
	/*
	  contact setting Related Controllers
	  ---------------------------------------------------------------------- */
	
	angular
        .module('manageApp.ContactSettings', 		[])

         /**
	      * ContactSettingsController for update store settings
	      *
	      * @inject __Form
	      * @inject appServices
	      * 
	      * @return void
	      *-------------------------------------------------------- */

		.controller('ContactSettingsController', [
			'__Form', 
            'appServices',
            function (__Form,appServices) {

                var scope   = this;
  				scope.pageStatus = false;
		        scope = __Form.setup(scope, 'form_contact_settings', 'editData', {
		            secured : true,
		        	modelUpdateWatcher:false,
		            unsecuredFields : ['contact_address'],
		        });


		        /**
		          * Fetch support data
		          *
		          * @return void
		          *---------------------------------------------------------------- */

		        __Form.fetch({	
		        		'apiURL'   :'store.settings.edit.supportdata',
		        		'formType' : 6
		        	}).success(function(responseData) {
		            
		            var requestData = responseData.data;
		            
		            appServices.processResponse(responseData, null, function() {
		            	
		                if (!_.isEmpty(requestData.store_settings)) {
		                    __Form.updateModel(scope, requestData.store_settings);
		                }
  						scope.pageStatus = true;
		            });    

		        });
		        
		        /**
		          * Submit store settings edit form
		          *
		          * @return void
		          *---------------------------------------------------------------- */
		        
		        scope.submit = function() {

		            __Form.process({	
		        		'apiURL'   :'store.settings.edit',
		        		'formType' :6
		        	}, scope)
		                .success(function(responseData) {
		                	
		                appServices.processResponse(responseData, null, 
		                    function() {
		                    	
							scope.editData.logo_image = '';
							
		                    __globals.showConfirmation({
				                title               : responseData.data.message,
				                text                : responseData.data.textMessage,
				                type                : "success",
		                        showCancelButton    : true,
		                        confirmButtonClass  : "btn-success",
		                        confirmButtonText   : __globals.getJSString('reload_text'),
								confirmButtonColor :  "#337ab7",
		                        closeOnConfirm      : false
				            }, function() {

				               location.reload();

				            });

		                });    

		            });

		        };
		}]);

})();;
(function() {
'use strict';
	
	/*
	  privacy setting Related Controllers
	  ---------------------------------------------------------------------- */
	
	angular
        .module('manageApp.privacyPolicySettings', [])

         /**
	      * PrivacyPolicySettingsController for update store settings
	      *
	      * @inject __Form
	      * @inject appServices
	      * 
	      * @return void
	      *-------------------------------------------------------- */

		.controller('PrivacyPolicySettingsController', [
			'__Form', 
            'appServices',
            function (__Form,appServices) {

                var scope   = this;
                scope.pageStatus = false;
		        scope 		= __Form.setup(scope, 'form_privacy_policy_settings', 'editData', {
		            secured : true,
		        	modelUpdateWatcher:false,
		            unsecuredFields : ['privacy_policy']
		        });

		        /**
		          * Fetch support data
		          *
		          * @return void
		          *---------------------------------------------------------------- */

		        __Form.fetch({	
		        		'apiURL'   :'store.settings.edit.supportdata',
		        		'formType' : 8
		        	}).success(function(responseData) {
		            
		            var requestData = responseData.data;
		            
		            appServices.processResponse(responseData, null, function() {

		                if (!_.isEmpty(requestData.store_settings)) {
		                    __Form.updateModel(scope, requestData.store_settings);
		                }
  						scope.pageStatus = true;
		            });    

		        });

		       /**
		          * Submit store settings edit form
		          *
		          * @return void
		          *---------------------------------------------------------------- */
		        
		        scope.submit = function() {

		            __Form.process({	
		        		'apiURL'   :'store.settings.edit',
		        		'formType' :8
		        	}, scope)
		                .success(function(responseData) {
		                	
		                appServices.processResponse(responseData, null, 
		                    function() {
							
		                    __globals.showConfirmation({
				                title               : responseData.data.message,
				                text                : responseData.data.textMessage,
				                type                : "success",
		                        showCancelButton    : true,
		                        confirmButtonClass  : "btn-success",
		                        confirmButtonText   : __globals.getJSString('reload_text'),
								confirmButtonColor :  "#337ab7",
		                        closeOnConfirm      : false
				            }, function() {

				               location.reload();

				            });

		                });    

		            });

		        };
		}]);

})();;
(function() {
'use strict';
	
	/*
	  term & condition setting Related Controllers
	  ---------------------------------------------------------------------- */
	
	angular
        .module('manageApp.termAndConditionSettings',[])

         /**
	      * TermAndConditionSettingsController for update store settings
	      *
	      * @inject __Form
	      * @inject appServices
	      * 
	      * @return void
	      *-------------------------------------------------------- */

		.controller('TermAndConditionSettingsController', [
			'__Form', 
            'appServices',
            function (__Form,appServices) {

                var scope   = this;
  				scope.pageStatus = false;
		        scope = __Form.setup(scope, 'form_term_and_condition_settings', 'editData', {
		            secured : true,
		        	modelUpdateWatcher:false,
		            unsecuredFields : [
		            					'term_condition'
								    ]
		        });

		        /**
		          * Fetch support data
		          *
		          * @return void
		          *---------------------------------------------------------------- */

		        __Form.fetch({	
		        		'apiURL'   :'store.settings.edit.supportdata',
		        		'formType' :7
		        	}).success(function(responseData) {
		            
		            var requestData = responseData.data;
		            
		            appServices.processResponse(responseData, null, function() {

		                if (!_.isEmpty(requestData.store_settings)) {
		                    __Form.updateModel(scope, requestData.store_settings);
		                }

		                scope.pageStatus = true;

		            });    

		        });

		       /**
		          * Submit store settings edit form
		          *
		          * @return void
		          *---------------------------------------------------------------- */
		        
		        scope.submit = function() {

		            __Form.process({	
		        		'apiURL'   :'store.settings.edit',
		        		'formType' :7
		        	}, scope)
		                .success(function(responseData) {
		                	
		                appServices.processResponse(responseData, null, 
		                    function() {
							
		                    __globals.showConfirmation({
				                title               : responseData.data.message,
				                text                : responseData.data.textMessage,
				                type                : "success",
		                        showCancelButton    : true,
		                        confirmButtonClass  : "btn-success",
		                        confirmButtonText   : __globals.getJSString('reload_text'),
								confirmButtonColor :  "#337ab7",
		                        closeOnConfirm      : false
				            }, function() {

				               location.reload();

				            });

		                });    

		            });

		        };
		}]);

})();;
(function() {
'use strict';
    
    /*
      CssStyleSettingsController setting Related Controllers
      ---------------------------------------------------------------------- */
    
    angular
        .module('manageApp.CssStyleSettings',        [])

    /** 
     * CssStyleSettingsController for manage custom css
     *
     * @inject $scope
     * @inject __Form
     * @inject appServices
     *
     * @return void
     *-------------------------------------------------------- */
    .controller('CssStyleSettingsController', [
        '$scope',
        '__Form',
        'appServices',      
    function CssStyleSettingsController( $scope, __Form, appServices ) {

        var scope = this;

        scope.pageStatus = false;

        scope  = __Form.setup(scope, 'edit_css_style_configuration', 'editData', {
            secured : true,
            modelUpdateWatcher:false,
            unsecuredFields : ['custom_css']
        });
       
        var cssTextEditorEle  = document.getElementById('custom_css');
            
            var $cssTextEditorInstance  = CodeMirror.fromTextArea(cssTextEditorEle, {
                lineNumbers     : true,
                mode            : 'css',
                readOnly        : false,
                autofocus       : true,
                lineWrapping    : true
            });

          __Form.fetch({  
              'apiURL'   :'store.settings.edit.supportdata',
              'formType' : 9
            }).success(function(responseData) {
              
              var requestData    = responseData.data;

                appServices.processResponse(responseData, null, function() {

                    var cssStyleData =  requestData.store_settings;

                    __Form.updateModel(scope, cssStyleData);
                    
                    if (!_.isEmpty(cssStyleData.custom_css)) {
                        $cssTextEditorInstance.setValue(cssStyleData.custom_css);

                    }
                    _.defer(function() {
                        $cssTextEditorInstance.setCursor({line:0, ch:0});
                    });

                }); 
                scope.pageStatus = true;
          });

        /**
          * Submit privacyPolicy Data
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function() {

            scope.editData.custom_css = $cssTextEditorInstance.getValue();

            __Form.process({
               'apiURL'   :'store.settings.edit',
               'formType' : 9
            }, scope)
                .success(function(responseData) {

                appServices.processResponse(responseData, null, function() {
                    
                    __globals.showConfirmation({
                        title               : responseData.data.message,
                        text                : responseData.data.textMessage,
                        type                : "success",
                        showCancelButton    : true,
                        confirmButtonClass  : "btn-success",
                        confirmButtonText   : __globals.getJSString('reload_text'),
                        confirmButtonColor :  "#337ab7",
                        closeOnConfirm      : false
                    }, function() {

                       location.reload();

                    });
                });    

            });
        };

     }]);

})();;
(function() {
'use strict';
	
	/*
	  Social setting Related Controllers
	  ---------------------------------------------------------------------- */
	
	angular
        .module('manageApp.socialSettings', [])

         /**
	      * SocialSettingsController for update social store settings
	      *
	      * @inject __Form
	      * @inject appServices
	      * 
	      * @return void
	      *-------------------------------------------------------- */

		.controller('SocialSettingsController', [
			'__Form', 
            'appServices',
            function (__Form,appServices) {

                var scope   = this;
                scope.pageStatus = false;
		        scope 		= __Form.setup(scope, 'form_social_settings', 'editData', {
		        	secured : true,
		        	modelUpdateWatcher:false
		        });

		        /**
		          * Fetch support data
		          *
		          * @return void
		          *---------------------------------------------------------------- */

		        __Form.fetch({	
		        		'apiURL'   :'store.settings.edit.supportdata',
		        		'formType' : 10
		        	}).success(function(responseData) {
		            
		            var requestData = responseData.data;
		            
		            appServices.processResponse(responseData, null, function() {

		                if (!_.isEmpty(requestData.store_settings)) {
		                    __Form.updateModel(scope, requestData.store_settings);
		                }
  						scope.pageStatus = true;
		            });    

		        });

		       /**
		          * Submit store settings edit form
		          *
		          * @return void
		          *---------------------------------------------------------------- */
		        
		        scope.submit = function() {

		            __Form.process({	
		        		'apiURL'   :'store.settings.edit',
		        		'formType' :10
		        	}, scope)
		                .success(function(responseData) {
		                	
		                appServices.processResponse(responseData, null, 
		                    function() {
							
		                    __globals.showConfirmation({
				                title               : responseData.data.message,
				                text                : responseData.data.textMessage,
				                type                : "success",
		                        showCancelButton    : true,
		                        confirmButtonClass  : "btn-success",
		                        confirmButtonText   : __globals.getJSString('reload_text'),
								confirmButtonColor :  "#337ab7",
		                        closeOnConfirm      : false
				            }, function() {

				               location.reload();

				            });

		                });    

		            });

		        };
		}]);

})();;
/*!
 *  Engine      : ManagePaymentEngine
 *  Component   : Order
----------------------------------------------------------------------------- */

(function( window, angular, undefined ) {

	'use strict';
	
	/*
	  Manage Payment Engine
	  -------------------------------------------------------------------------- */
	
	angular.module('ManageApp.payment', 		[])

		/**
    	  * PaymentListController for list of address
    	  *
    	  * @inject __Utils
    	  * @inject __Form
    	  * @inject $state
    	  * @inject appServices
    	  * 
    	  * @return void
    	 *-------------------------------------------------------- */

		.controller('PaymentListController', [ 
            '__Utils',
            '__Form',
            '$state',
            'appServices',
            '$scope',
            '__DataStore',
            function (__Utils, __Form , $state, appServices, $scope, __DataStore) {

            	var scope   	= this;

            	scope = __Form.setup(scope, 'manage_payment_list', 'paymentData');


            	scope.paymentData.duration 	= 5; // today

            	var monthFirstDay       = moment().startOf('month')
                                            .format('YYYY-MM-DD'),
                    monthLastDay        = moment().endOf('month').format('YYYY-MM-DD'),

                    lastMonthFirstDay   = moment().subtract(1, 'months')
                                            .startOf('month').format('YYYY-MM-DD'),
                    lastMonthLastDay    = moment().subtract(1, 'months')
                                            .endOf('month').format('YYYY-MM-DD'),
                    
                    currentWeekFirstDay = moment().startOf('week').format('YYYY-MM-DD'),
                    currentWeekLastDay  = moment().endOf('week').format('YYYY-MM-DD'),

                    lastWeekFirstDay    = moment().weekday(-7).format('YYYY-MM-DD'),
                    lastWeekLastDay     = moment().weekday(-1).format('YYYY-MM-DD'),
                    today               = moment().format('YYYY-MM-DD'),
                    yesterday           = moment().subtract(1, 'day').format('YYYY-MM-DD'),
                    lastYearFirstDay    = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
                    lastYearLastDay     = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD'),
                    currentYearFirstDay = moment().startOf('year').format('YYYY-MM-DD'),
                    currentYearLastDay  = moment().endOf('year').format('YYYY-MM-DD'),
                    last30Days          = moment().subtract(30, 'day').format('YYYY-MM-DD');


                // date and time
            	var today = moment().format('YYYY-MM-DD');

				scope.paymentData.start = today;
				scope.paymentData.end   = today;

				scope.startDateConfig = {
					time    : false
				};

				scope.endDateConfig = {
					minDate : moment().format('YYYY-MM-DD'),
					time    : false
				};

				$scope.$watch('paymentListCtrl.paymentData.start', 
	                function(currentValue, oldValue) {

	                var $element = angular.element('#end');
	          
	                // Check if currentValue exist
	                if (_.isEmpty(currentValue)) {
	      
	                    $element.bootstrapMaterialDatePicker('setMinDate', '');

	                } else {

	                    $element.bootstrapMaterialDatePicker('setMinDate', currentValue);
	                }
				});

				/**
				  * Call when start date updated
				  *
				  * @param startDate
				  *
				  * @return void
				  *---------------------------------------------------------------- */
				scope.startDateUpdated = function(startDate) {

					if (scope.paymentData.duration) {

                        if ( startDate != monthFirstDay 
                            &&  startDate != lastMonthFirstDay 
                            && startDate != currentWeekFirstDay
                            && startDate != lastWeekFirstDay ) {

                            scope.paymentData.duration = 7; // custom duration
                        }
                    }

					scope.paymentData.start = startDate;
				};

				/**
				  * Call when start date updated
				  *
				  * @param endDate
				  *
				  * @return void
				  *---------------------------------------------------------------- */
				scope.endDateUpdated = function(endDate) {
					
					if (scope.paymentData.duration) {

                        if ( endDate != monthLastDay 
                            &&  endDate != lastMonthLastDay 
                            && endDate != currentWeekLastDay
                            && endDate != lastWeekLastDay ) {

                            scope.paymentData.duration = 7; // custom duration
                        }
                    }

					if (scope.paymentData.start > scope.paymentData.end) { 
						scope.paymentData.end = endDate;
					}
					scope.paymentData.end = endDate;
				};

				/**
				  * When changed in duration start and end date changed
				  *
				  * @param {number} duration
				  *
				  * @return void
				  *---------------------------------------------------------------- */

				scope.durationChange = function(duration) {

					if (duration) {

						switch(duration) {

							case 1:

								scope.paymentData.start = monthFirstDay;
								scope.paymentData.end   = monthLastDay

								break;

							case 2:

								scope.paymentData.start = lastMonthFirstDay;
								scope.paymentData.end   = lastMonthLastDay

								break;

							case 3:

								scope.paymentData.start = currentWeekFirstDay;
								scope.paymentData.end   = currentWeekLastDay

								break;

							case 4:

								scope.paymentData.start = lastWeekFirstDay;
								scope.paymentData.end   = lastWeekLastDay

								break;

							case 5:

								scope.paymentData.start = today;
								scope.paymentData.end   = today

								break;

							case 6:

								scope.paymentData.start = yesterday;
								scope.paymentData.end   = yesterday

								break;

                            case 7:

                                scope.paymentData.start = lastYearFirstDay;
                                scope.paymentData.end   = lastYearLastDay

                                break;

                            case 8:

                                scope.paymentData.start = currentYearFirstDay;
                                scope.paymentData.end   = currentYearLastDay

                                break;

                            case 9:

                                scope.paymentData.start = last30Days;
                                scope.paymentData.end   = today

                                break;
						}
					}
				}


				var dtCartOrderColumnsData = [
		            {
		                "name"      : "order_uid",
		                "orderable" : true,
		                "template"  : "#orderPaymentColumnUIDTemplate"
		            },
		            {
		                "name"      : 'txn',
		                "orderable" : true,
		                "template"  : "#orderPaymentTransactionIDTemplate"
		            },
		            {
		                "name"      : 'formattedFee',
		                "orderable" : true,
		                "template"  : "#orderPaymentFeeTemplate"
		            },
		            {
		                "name"      : 'formattedPaymentOn',
		                "orderable" : true
		            },
		            {
		                "name"      : 'formattedPaymentMethod',
		                "orderable" : true
		            },
		            {
		                "name"      : 'totalAmount',
		                "orderable" : true,
		                "template"  : "#orderPaymentTotalAmountTemplate"
		            },
                    {
                        "name"      : null,
                        "orderable" : false,
                        "template"  : "#orderPaymentActionTemplate"
                    }
		        ];

		        scope.getPaymentList = function () {

		        	// distroy instance of datatable
			    	if (scope.orderPaymentsListDataTable) {
			            scope.orderPaymentsListDataTable.destroy();
			        }

		        	scope.orderPaymentsListDataTable = __DataStore.dataTable('#managePaymentList', {
		        		url : {
			                    'apiURL'      : 'order.payment.list',
			                    'startDate'   : scope.paymentData.start, // start date
			                    'endDate'	  : scope.paymentData.end,   // end date
		                	},
			            dtOptions   : {
			                "searching" : true,
                            rowCallback : function(row, data, index) {
                            
                                // Highlight sandbox orders 
                                if (data.isTestOrder) {
                                   $(row).addClass('lw-sandbox-order');
                                }
                            }
			            },
			            columnsData : dtCartOrderColumnsData, 
			            scope       : $scope
			            
			        }, null, scope.tableData = function(dataTableCollection) {

						// Check table status
			        	scope.tableStatus = dataTableCollection.data;

			        	// Get report duration key value array
            			scope.paymentDuration 	= __globals.generateKeyValueItems(dataTableCollection._options.duration);

			        	// Excel download URL
			        	scope.excelDownloadURL = dataTableCollection._options.excelDownloadURL;

                        scope.isEmptySanboxRecords = dataTableCollection._options.isEmptySanboxRecords;

			        });
		        }

		        scope.getPaymentList();

		/**
          * list dialog
          *
          * @param number orderID
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.orderDetailsDialog = function(orderID) {

            __DataStore.fetch({
                    'apiURL'    : 'manage.order.details.dialog',
                    'orderID'   :  orderID
                })
                .success(function(responseData) {
                
                    appServices.processResponse(responseData, null, function() {
                        
                        var requestData = responseData.data;
                        
                        appServices.showDialog({
                           'orderDetails'    : requestData.orderDetails
                        },
                        {
                            templateUrl : __globals.getTemplateURL(
                                'order.manage.details'
                            )
                        },
                        function(promiseObj) {

                        	// Check if order updated
                            if (_.has(promiseObj.value, 'order_updated') 
                                && promiseObj.value.order_updated === true) {
                                scope.reloadDT();
                            }

                        });

                    });    

                });

        };


		/**
          * payment detail dialog
          * 
          * @param {number} orderID
          * 
          * @return void
          *---------------------------------------------------------------- */

        scope.paymentDetailsDialog = function (orderPaymentID) {

        	__DataStore.fetch({
                'apiURL'    		: 'order.payment.detail.dialog',
                'orderPaymentID'   	:  orderPaymentID
            })
            .success(function(responseData) {

                scope.orderPaymentData = responseData.data;
                
                appServices.processResponse(responseData, null, function() {
                	// show payment detail dialog
                    appServices.showDialog(scope.orderPaymentData,
                    {
                        templateUrl : __globals.getTemplateURL(
                            'order.manage.payment-details-dialog'
                        )
                    },
                    function(promiseObj) {

                    });

                });    

            });

        };

        /**
          * Delete SandBox Order 
          *
          * @param number paymentId
          * @param string orderUid
          * @param bool isTestOrder
          *
          * @return void 
          *---------------------------------------------------------------- */

        scope.deleteSandBoxOrder = function(paymentId, orderUid, isTestOrder) {

            if (isTestOrder == 2) {

                appServices.showDialog(
                {
                    paymentId   : paymentId,
                    orderUid    : orderUid
                },
                {
                    templateUrl : __globals.getTemplateURL(
                        'order.manage.payment-delete-dialog'
                    )
                },
                function(promiseObj) {

                    // Check if order updated
                    if (_.has(promiseObj.value, 'payment_deleted') 
                        && promiseObj.value.payment_deleted === true) {
                        scope.getPaymentList();
                    }

                });
            }

            if (isTestOrder == 1) {
        
                __globals.showConfirmation({
                    text: __globals.getJSString('delete_sandbox_payment_msg'),
                    confirmButtonText  : __globals.getJSString('delete_action_button_text')
                }, function() {

                    __DataStore.post({
                        'apiURL'  :'order.payment.delete.sandbox',
                        'paymentId' : paymentId
                    })
                    .success(function(responseData) {
                    
                        var message = responseData.data.message;
                        appServices.processResponse(responseData, {
                                error : function() {

                                    __globals.showConfirmation({
                                        title   : __globals.getJSString('confirm_error_title'),
                                        text    : message,
                                        type    : 'error'
                                    });

                                }
                            },
                            function() {

                                __globals.showConfirmation({
                                    title   : __globals.getJSString('confirm_error_title'),
                                    text    : message,
                                    type    : 'success'
                                });
                                scope.getPaymentList();   // reload datatable

                            }
                        );    

                    });

                });

            }

        };
            }
        ])

})( window, window.angular );;
(function() {
'use strict';
    
    /*
     ManageOrderListController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.orderList', [])
        .controller('ManageOrderListController',   [
            '$scope',
            '__DataStore',
            'appServices',
            '$state',
            '__Auth',
            '$rootScope',
            ManageOrderListController 
        ]);

    /**
      * ManageOrderListController for manage product list
      *
      * @inject $scope
      * @inject __DataStore
      * @inject appServices
      * @inject $state
      * @inject __Auth
      * 
      * @return void
      *-------------------------------------------------------- */

    function ManageOrderListController($scope, __DataStore, appServices, $state, __Auth, $rootScope) {
	 	
    	var scope   	= this;
	 	scope.userInfo 	= __Auth.authInfo().designation;

	 	// get user id from param if exist
    	var userId = null;

    	if (!_.isEmpty($state.params.userID)) {
    		userId = $state.params.userID;
    	}

		var dtCartOrderColumnsData = [
            {
                "name"      : "order_uid",
                "orderable" : true,
                "template"  : "#orderColumnIdTemplate"
            },
            {
                "name"      : 'fname',
                "orderable" : true,
                "template"  : "#userNameColumnIdTemplate"
            },
            {
                "name"      : "status",
                "orderable" : true,
                "template"  : "#orderStatusColumnIdTemplate"
            },
            {
                "name"      : "paymentStatus",
                "orderable" : true,
                "template"  : "#paymentActionColumnTemplate"
            },
            {
                "name"      : "paymentMethod",
                "template"  : "#orderPaymentMethodColumnIdTemplate"
            },
            {
                "name"      : "creation_date",
                "orderable" : true,
                "template"  : "#orderColumnTimeTemplate"
            },
            {
                "name"      : "total_amount",
                "orderable" : true,
                "template"  : "#orderColumnTotalAmountTemplate"
            },
            {
                "name"      : null,
                "template"  : "#orderActionColumnTemplate"
            }
        ],
        tabs    = {
            'active'    : {
                id      : 'activeTabList',
                route   : 'orders.active',
                status  : 1
            },
            'cancelled'    : {
                id      : 'cancelledTabList',
                route   : 'orders.cancelled',
                status  : 3
            },
            'completed'    : {
                id      : 'completedTabList',
                route   : 'orders.complete',
                status  : 6
            }
        };

    	$('#adminOrderList a').click(function (e) {

        	e.preventDefault();
        	
            var $this       = $(this),
                tabName     = $this.attr('aria-controls'),
                selectedTab = tabs[tabName];
            if (!_.isEmpty(selectedTab)) {
                $(this).tab('show');
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
	    			'apiURL' : 'manage.get.orders.data',
		            'status' : status,
		            'userID?': userId
    			},
	            dtOptions   : {
	                "searching" : true,
	                "order"     : [[ 5, "desc" ]],
	                "columnDefs": [
			            {
			                "targets"	: [1],
			                "visible"	: (scope.userInfo === 1) ? true:false,
			                "searchable": false,

			            }
			        ],
                    rowCallback : function(row, data, index) {
                        
                        // Highlight sandbox orders 
                        if (data.isTestOrder) {
                           $(row).addClass('lw-sandbox-order');
                        }
                    }
	            },
	            columnsData : dtCartOrderColumnsData, 
	            scope       : $scope
	        }, null, scope.userData = function (dataTableCollection){

	        	// get full name of user
	        	scope.userFullName = dataTableCollection._options.userFullName;

                scope.isEmptySanboxRecords = dataTableCollection._options.isEmptySanboxRecords;
	        	
	        	// get title of manage order list
	        	scope.manageOrdersTitle 	= __ngSupport.getText(
						                  __globals.getJSString('manage_order_title'), {
						                        '__name__'     : scope.userFullName,
						                    });

	        });
        };

        _.defer(function(text) {
			if ($state.current.name == 'orders.active') {

	        	var selectedTab = $('.nav li a[href="#active"]');
	        		selectedTab.triggerHandler('click', true);

	        } else if ($state.current.name == 'orders.cancelled') {

	        	var selectedTab = $('.nav li a[href="#cancelled"]');
	        		selectedTab.triggerHandler('click', true);

	        } else if ($state.current.name == 'orders.completed') {
	        	
	        	var selectedTab = $('.nav li a[href="#completed"]');
	        		selectedTab.triggerHandler('click', true);
	        }
			 
		}, 0);
        

      /**
        * When click on active tab so active template open in url
        *
        * @param  $event
        *
        * @return void
        *---------------------------------------------------------------- */
        scope.goToActiveTab = function ($event) {
	        $event.preventDefault();
	        $state.go('orders.active', {'userID' : userId});
	    };

	    /**
        * When click on cancelled tab so cancelled template open in url
        *
        * @param  $event
        *
        * @return void
        *---------------------------------------------------------------- */

	    scope.goToCancelledTab = function ($event) {
	        $event.preventDefault();
	        $state.go('orders.cancelled', {'userID' : userId});
	    };
		
		/**
        * When click on completed tab so completed template open in url
        *
        * @param  $event
        *
        * @return void
        *---------------------------------------------------------------- */

	    scope.goToCompletedTab = function ($event) {
	        $event.preventDefault();
	        $state.go('orders.completed', {'userID' : userId});
	    };
	    
        /*
	     Reload current datatable
	    -------------------------------------------------------------------- */
	    
	    scope.reloadDT = function () {
	        __DataStore.reloadDT(scope.cartOrderListDataTable);
	    };

        /**
          * list dialog
          *
          * @param number orderID
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.orderDetailsDialog = function(orderID) {

            __DataStore.fetch({
                    'apiURL'    : 'manage.order.details.dialog',
                    'orderID'   :  orderID
                })
                .success(function(responseData) {
                
                    appServices.processResponse(responseData, null, function() {
                        
                        var requestData = responseData.data;
                        
                        appServices.showDialog({
                           'orderDetails'    : requestData.orderDetails
                        },
                        {
                            templateUrl : __globals.getTemplateURL(
                                'order.manage.details'
                            )
                        },
                        function(promiseObj) {

                        	// Check if order updated
                            if (_.has(promiseObj.value, 'order_updated') 
                                && promiseObj.value.order_updated === true) {
                                scope.reloadDT();
                            }

                        });

                    });    

                });

        };

        /**
          * log dialog
          *
          * @param number orderID
          *
          * @return void
          *---------------------------------------------------------------- */
        scope.logDetailsDialog = function(orderID) {

            __DataStore.fetch({
                    'apiURL'    : 'manage.order.log.details.dialog',
                    'orderID'   :  orderID
                })
                .success(function(responseData) {
                
                appServices.processResponse(responseData, null, function() {

                    var requestData = responseData.data;
                    
                    appServices.showDialog({
                        'order'         : requestData.cartOrder,
                        'orderLog'      : requestData.orderLog
                    },
                    {
                        templateUrl : __globals.getTemplateURL(
                            'order.manage.log'
                        )
                    },
                    function(promiseObj) {
					
					});

                });    

            });

        };



        /**
          * update order dialog
          * 
          * @param orderID
          * @param orderUID
          * 
          * @return void
          *---------------------------------------------------------------- */
        scope.updateDialog = function(orderID, orderUID) {

            __DataStore.fetch({
                    'apiURL'    : 'manage.order.update.support.data',
                    'orderID'   :  orderID
                })
                .success(function(responseData) {
                	
                    var message = responseData.data

                    appServices.processResponse(responseData, null, function() {
                    	
                        appServices.showDialog({
                            'order'   : responseData.data.order,
                            'orderID' : orderID
                        },
                        {
                            templateUrl : __globals.getTemplateURL(
                                'order.manage.update'
                            )
                        },
                        function(promiseObj) {
                        	// Check if order updated		
                        	if (_.has(promiseObj.value, 'order_updated') 
			                    && promiseObj.value.order_updated === true) {

                        		// Get order status and Payment status of order
                        		scope.orderStatus 	= promiseObj.value.updateData.status;
				        		scope.paymentStatus	= promiseObj.value.updateData.paymentStatus;

				        		if (scope.orderStatus == 3 // Cancelled
				        			&& scope.paymentStatus == 2) { // Completed

				        			scope.showConfirmationOnOrderUpdate(orderID, orderUID);
				        		}

				        		scope.reloadDT();
				        	}
                            
                        });

                    });    

                });

        };

        /**
          * Show confirmation on order Update
          * 
          * @param orderID
          * @param orderUID
          * 
          * @return void
          *---------------------------------------------------------------- */

        scope.showConfirmationOnOrderUpdate = function (orderID, orderUID) {

        	// Show confirmation message on succefful update
        	__globals.showConfirmation({
        	 		title	: __globals.getJSString('order_refund_string'),
	                text 	: __globals.getJSString
	                			('order_refund_change_status_string'),
	                type                : "success",
	                confirmButtonClass  : "btn-success",
					confirmButtonColor :  "#337ab7",
	                confirmButtonText   : __globals.getJSString('order_payment_confirm_text')
	            },
	            function(data) {
	            	// when update successfully then open update dialog
	            	scope.reloadDT();
	            	scope.refundPaymentDialog(orderID, orderUID);
	            }
	        );
        };

        /**
          * Refund order payment
          * 
          * @param orderID
          * @param orderUID
          * 
          * @return void
          *---------------------------------------------------------------- */

        scope.refundPaymentDialog = function (orderID, orderUID) {

        	__DataStore.fetch({
        		'apiURL'	: 'order.payment.refund.detail.dialog',
        		'orderID'	: orderID
        	})
        	.success(function(responseData) {
        		var message = responseData.data;

        		appServices.processResponse(responseData, null, function() {
        			
        			appServices.showDialog(
        			{
        				orderDetails 		: responseData.data,
        				orderUID 			: orderUID
        			}, 
        			{
        				templateUrl : __globals.getTemplateURL('order.manage.refund-dialog')
        			},
        			function(promiseObj) {
        				// Check if order updated		
                    	if (_.has(promiseObj.value, 'order_updated') 
		                    && promiseObj.value.order_updated === true) {
			        		
			        		scope.reloadDT();
			        	}
        			})
        		})
        	})
        }


        /**
          * payment detail dialog
          * 
          * @param {number} orderID
          * 
          * @return void
          *---------------------------------------------------------------- */

        scope.paymentDetailsDialog = function (orderPaymentID) {

        	__DataStore.fetch({
                'apiURL'    		: 'order.payment.detail.dialog',
                'orderPaymentID'   	:  orderPaymentID
            })
            .success(function(responseData) {

                scope.orderPaymentData = responseData.data;
                
                appServices.processResponse(responseData, null, function() {
                	// show payment detail dialog
                    appServices.showDialog(scope.orderPaymentData,
                    {
                        templateUrl : __globals.getTemplateURL(
                            'order.manage.payment-details-dialog'
                        )
                    },
                    function(promiseObj) {

                    });

                });    

            });

        }

        /**
          * Update payment detail dialog
          * 
          * @param {number} orderID
          * 
          * @return void
          *---------------------------------------------------------------- */

        scope.updatePaymentDetailsDialog = function (orderID) {
        	
        	__DataStore.fetch({
                'apiURL'    : 'order.payment.update.detail.dialog',
                'orderID'   :  orderID
            })
            .success(function(responseData) {

                scope.orderData = responseData.data;
                
                appServices.processResponse(responseData, null, function() {
                	// show payment detail dialog
                    appServices.showDialog(scope.orderData,
                    {
                        templateUrl : __globals.getTemplateURL(
                            'order.manage.update-payment-dialog'
                        )
                    },
                    function(promiseObj) {

                    	// Check if order updated
	                    if (_.has(promiseObj.value, 'order_updated') 
	                        && promiseObj.value.order_updated === true) {

	                    	// Show confirmation message on succefful update
	                    	 __globals.showConfirmation({
	                    	 		title	: __globals.getJSString('order_payment_update_string'),
					                text 	: __globals.getJSString
					                			('order_payment_change_status_string'),
					                type                : "success",
					                confirmButtonClass  : "btn-success",
									confirmButtonColor :  "#337ab7",
					                confirmButtonText   : __globals.getJSString('order_payment_confirm_text')
					            },
					            function(data) {
					            	// when update successfully then open update dialog
					            	scope.reloadDT();
					            	scope.updateDialog(orderID);
					            }
					        );

	                    	scope.reloadDT();
	                    }

                    });

                });    

            });

        };

        /**
          * Contact user dialog
          * 
          * @param {number} orderID
          * 
          * @return void
          *---------------------------------------------------------------- */

        scope.contactUserDialog = function (orderID) {

        	__DataStore.fetch({
        		'apiURL' : 'manage.order.get.user.details',
        		'orderID': orderID
        	})
        	.success(function(responseData) {

        		scope.userData = responseData.data;
        		
        		appServices.processResponse(responseData, null, function () {

        			appServices.showDialog(responseData.data,
                    {
                        templateUrl : __globals.getTemplateURL(
                            'order.manage.contact-user'
                        )
                    },
                    function(promiseObj) {

                    });
        		});
        	});
        };

        /**
          * Delete SandBox Order 
          *
          * @param number orderId
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.deleteSandBoxOrder = function(orderId, isTestOrder, orderUid) {

            // Check if delete order is not test order
            if (isTestOrder == 2) {
                appServices.showDialog(
                {
                    orderId     : orderId,
                    orderUid    : orderUid
                },
                {
                    templateUrl : __globals.getTemplateURL(
                        'order.manage.order-delete-dialog'
                    )
                },
                function(promiseObj) {

                    // Check if order updated
                    if (_.has(promiseObj.value, 'order_deleted') 
                        && promiseObj.value.order_deleted === true) {
                        scope.reloadDT();
                    }

                });
            }

            // Check if test order delete or not
            if (isTestOrder == 1) {
                
                __globals.showConfirmation({
                    text: __globals.getJSString('delete_sandbox_order_msg'),
                    confirmButtonText  : __globals.getJSString('delete_action_button_text')
                }, function() {

                    __DataStore.post({
                        'apiURL'        : 'manage.order.sandbox_order.delete',
                        'orderId'       : orderId,
                        'isTestOrder'   : 1
                    })
                    .success(function(responseData) {
                    
                        var message = responseData.data.message;
                        appServices.processResponse(responseData, {
                                error : function() {

                                    __globals.showConfirmation({
                                        title   : __globals.getJSString('confirm_error_title'),
                                        text    : message,
                                        type    : 'error'
                                    });

                                }
                            },
                            function() {

                                __globals.showConfirmation({
                                    title   : __globals.getJSString('confirm_error_title'),
                                    text    : message,
                                    type    : 'success'
                                });
                                scope.reloadDT();   // reload datatable

                            }
                        );    

                    });

                });

            }

        };

	 }
})();;
(function() {
'use strict';
    
    /*
     ManageUpdateOrderController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.orderUpdate', [])
        .controller('ManageUpdateOrderController',   [
            '$scope', 
            '__Form',
            'appServices',
            ManageUpdateOrderController 
        ]);

    /**
      * ManageUpdateOrderController for update order status
      *
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */
            

    function ManageUpdateOrderController($scope, __Form, appServices) {

        var scope  = this;
			scope  = __Form.setup(scope, 'form_order_update', 'orderData');

			scope.ngDialogData = $scope.ngDialogData.order;
			
           	scope.orderData = {
           		'statusName' 			: scope.ngDialogData.statusName,
           		'currentPaymentStatus'	: scope.ngDialogData.currentPaymentStatus,
           		'checkMail'				: true
           	};
           
            scope.statuses  = scope.ngDialogData.statusCode;

           	scope.updateDialogTitle 	= __ngSupport.getText(
						                  __globals.getJSString('update_order_dialog_title_text'), {
						                        '__name__'     : scope.ngDialogData.name,
						                        '__orderUID__' : scope.ngDialogData.orderUID
						                    });

			scope = __Form.updateModel(scope, scope.orderData);


            /**
		  	  * process update order
		  	  *
		  	  * @return void
		  	  *---------------------------------------------------------------- */
			scope.update = function() {

		 		// post form data
		 		__Form.process({
						'apiURL'   :'manage.order.update',
						'orderID'  : scope.ngDialogData._id 
					}, scope ).success( function( responseData ) {
			      		
					appServices.processResponse(responseData, function(reactionCode) {

		                if (reactionCode === 1) {
		                	// close dialog
		      				$scope.closeThisDialog( { order_updated : true, updateData : scope.ngDialogData } );
		                }

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
(function() {
'use strict';
    
    /*
     ManageCancelOrderController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.orderCancel', [])
        .controller('ManageCancelOrderController',   [
            '$scope', 
            '__Form',
            'appServices',
            ManageCancelOrderController 
        ]);

    /**
      * ManageCancelOrderController for update order status
      *
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */
            

    function ManageCancelOrderController($scope, __Form, appServices) {

       var scope  = this;
			scope = __Form.setup(scope, 'form_order_cancel', 'orderData');
			scope.ngDialogData = $scope.ngDialogData;
			scope = __Form.updateModel(scope, scope.orderData);
			
			// Make a object for when order cancelled then show confirmation and show 
			// refund payment dialog to amin
			scope.updateData = {
				approveStatus : scope.orderData,
				paymentStatus : scope.ngDialogData.order.paymentStatus
			};

            /**
		  	  * process cancel order
		  	  *
		  	  * @return void
		  	  *---------------------------------------------------------------- */
			scope.update = function(status) {
				scope.orderData.approveStatus = status;
		 		// post form data
		 		__Form.process({
						'apiURL'   :'manage.order.cancel',
						'orderID'  : scope.ngDialogData.order._id 
					}, scope ).success( function( responseData ) {
						
					appServices.processResponse(responseData, function(reactionCode) {

		                if (reactionCode === 1) {
		                	// close dialog
		      				$scope.closeThisDialog( { order_updated : true, orderStatus : scope.updateData } );
		      				
		                }

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
(function() {
'use strict';
    
    /*
     ManageOrderDialogController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.orderDialogList', [])
        .controller('ManageOrderDialogController',   [
            '$scope', 
            '__Form',
            ManageOrderDialogController 
        ]);

    /**
      * ManageOrderDialogController for manage product list
      *
      * @inject $scope
      * @inject __Form
      * 
      * @return void
      *-------------------------------------------------------- */
            

    function ManageOrderDialogController($scope, __Form) {

       var scope   = this;
       
       		scope.discountStatus = false;

	        scope = __Form.setup(scope, 'cart_order_dialog_form', 'cartData', {
	            secured : true
	        });

       		scope.ngDialogData   = $scope.ngDialogData;
                    
            var requestedData 		= scope.ngDialogData.orderDetails.data;
        	
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
     ManageOrderLogController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.orderLogList', [])
        .controller('ManageOrderLogController',   [
            '$scope', 
            '__Form',
            ManageOrderLogController 
        ]);

    /**
      * ManageOrderLogController for manage product list
      *
      * @inject $scope
      * @inject __Form
      * 
      * @return void
      *-------------------------------------------------------- */
            

    function ManageOrderLogController($scope, __Form) {

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
     ManagePaymentDetailsController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.paymentDetailsDialog', [])
        .controller('ManagePaymentDetailsController',   [
            '$scope', 
            'appServices',
            ManagePaymentDetailsController 
        ]);

    /**
      * ManagePaymentDetailsController for order payment details
      *
      * @inject $scope
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */
            

    function ManagePaymentDetailsController($scope, appServices) {

        var scope  = this;

			// get ng-dialog data
			scope.ngDialogData = $scope.ngDialogData;

			// get payment details
			scope.paymentDetail = scope.ngDialogData.orderPaymentDetails;

			/**
		  	  * Raw data dialog
		  	  *
		  	  * @param rawData
		  	  *
		  	  * @return void
		  	  *---------------------------------------------------------------- */
			scope.rawDataDialog = function (rawData) {

				appServices.showDialog(
					{
						rawDetail : rawData
					},
                    {
                        templateUrl : __globals.getTemplateURL(
                            'order.manage.raw-data-dialog'
                        )
                    },
                    function(promiseObj) {

                    });   
			}

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
(function() {
'use strict';
    
    /*
     ManageRawDataController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.rawDataDialog', [])
        .controller('ManageRawDataController',   [
            '$scope', 
            'appServices',
            ManageRawDataController 
        ]);

    /**
      * ManageRawDataController for payment order raw data
      *
      * @inject $scope
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */
            

    function ManageRawDataController($scope, appServices) {

        var scope  = this;

			// get raw data
			scope.ngDialogData  = $scope.ngDialogData;
			scope.rawData = scope.ngDialogData.rawDetail;
			
            // Check if pass variable is object or not 
            scope.isObject = function(rawData) {
                return _.isObject(rawData);
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
(function() {
'use strict';
    
    /*
     ManageUpdateOrderPaymentController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.orderPaymentUpdate', [])
        .controller('ManageUpdateOrderPaymentController',   [
            '$scope', 
            '__Form',
            'appServices',
            ManageUpdateOrderPaymentController 
        ]);

    /**
      * ManageUpdateOrderPaymentController for update order payment detail
      *
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */
            

    function ManageUpdateOrderPaymentController($scope, __Form, appServices) {

        var scope  = this;
			scope  = __Form.setup(scope, 'form_order_payment_update', 'orderData');
			scope.ngDialogData = $scope.ngDialogData;
			
			// get order details
			scope.orderDetails 		= scope.ngDialogData.orderDetails;

			// get list of payment method
			scope.paymentMethodList = scope.ngDialogData.paymentMethod;

			scope = __Form.updateModel(scope, scope.orderDetails);

            /**
		  	  * process update order
		  	  *
		  	  * @return void
		  	  *---------------------------------------------------------------- */
			scope.update = function() {

		 		// post form data
		 		__Form.process({
						'apiURL'   :'order.payment.update.process',
						'orderID'  : scope.orderDetails.orderID 
					}, scope ).success( function( responseData ) {
			      		
					appServices.processResponse(responseData, null, function() {
						$scope.closeThisDialog({order_updated : true});
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
     ManageRefundOrderPaymentController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.orderPaymentRefund', [])
        .controller('ManageRefundOrderPaymentController',   [
            '$scope', 
            '__Form',
            'appServices',
            ManageRefundOrderPaymentController 
        ]);

    /**
      * ManageRefundOrderPaymentController for refund order payment
      *
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */
            

    function ManageRefundOrderPaymentController($scope, __Form, appServices) {

        var scope  = this;
			scope  = __Form.setup(scope, 'form_order_payment_refund', 'orderData');
			
			// get order payment data for refund detail dialog
			scope.ngDialogData   	 = $scope.ngDialogData;
			
			scope.paymentDetails 	 = scope.ngDialogData.orderDetails.orderPaymentDetails;
			scope.paymentMethodList  = scope.ngDialogData.orderDetails.paymentMethodList;
			scope.paymentDetails.orderUID = scope.ngDialogData.orderUID;
			
			scope = __Form.updateModel(scope, scope.paymentDetails);

            /**
		  	  * process update order
		  	  *
		  	  * @return void
		  	  *---------------------------------------------------------------- */
			scope.update = function() {

		 		// post form data
		 		__Form.process({
						'apiURL'   :'order.payment.refund.process',
						'orderID'  : scope.paymentDetails.orderID 
					}, scope)
		 		.success( function( responseData ) {
			      		
					appServices.processResponse(responseData, null, function() {
						$scope.closeThisDialog({order_updated : true});
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
     ManageContactUserController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.orderContact', [])
        .controller('ManageContactUserController',   [
            '__Form', 
            'appServices',
            '$scope',
            ManageContactUserController 
        ]);

    /**
      * ManageContactUserController handle register form & send request to server
      * to submit form data. 
      *
      * @inject __Form
      * @inject $state
      * @inject appServices
      * 
      * @return void
      *-------------------------------------------------------- */

    function ManageContactUserController(__Form, appServices, $scope) {

        var scope   = this;
       
        scope = __Form.setup(scope, 'manage_contact_form', 'userData');
        // get ng dialog data
        scope.ngDialogData = $scope.ngDialogData;
      	// get user information and order UID
        scope.userData.fullName 	= scope.ngDialogData.fullname;
        scope.userData.email	   	= scope.ngDialogData.email;
        scope.userData.id 			= scope.ngDialogData.id;
        scope.userData.orderUID 	= scope.ngDialogData.orderUID;

        scope   = __Form.updateModel(scope, scope.userData)

        /**
          * Submit register form action
          *
          * @return void
          *---------------------------------------------------------------- */
        
        scope.submit = function() {

        	 __Form.process('manage.order.user.contact', scope)
                .success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {
                	
                	$scope.closeThisDialog();
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
     ManageOrderDeleteController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.orderDelete', [])
        .controller('ManageOrderDeleteController',   [
            '$scope',
            '__Form',
            'appServices',
            '$state',
            '__Auth',
            '$rootScope',
            ManageOrderDeleteController 
        ]);

    /**
      * ManageOrderDeleteController for manage product list
      *
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * @inject $state
      * @inject __Auth
      * 
      * @return void
      *-------------------------------------------------------- */

    function ManageOrderDeleteController($scope, __Form, appServices, $state, __Auth, $rootScope) {
        
        var scope       = this;

        scope = __Form.setup(scope, 'form_manage_order_delete', 'orderData', {
            secured : true
        });

        scope.ngDialogData  = $scope.ngDialogData;
        scope.orderUid      = scope.ngDialogData.orderUid;
        
        /**
          * Submit delete action
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.submit = function() {

            __Form.process({
                    'apiURL'      : 'manage.order.delete',
                    'orderId'     : scope.ngDialogData.orderId
                }, scope).success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {

                    // close dialog
                    $scope.closeThisDialog({order_deleted : true});
                    

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
        }
    }

})();;
(function() {
'use strict';
    
    /*
     ManagePaymentDeleteController
    -------------------------------------------------------------------------- */
    
    angular
        .module('ManageApp.paymentDelete', [])
        .controller('ManagePaymentDeleteController',   [
            '$scope',
            '__Form',
            'appServices',
            '$state',
            '__Auth',
            '$rootScope',
            ManagePaymentDeleteController 
        ]);

    /**
      * ManagePaymentDeleteController for delete payments
      *
      * @inject $scope
      * @inject __Form
      * @inject appServices
      * @inject $state
      * @inject __Auth
      * 
      * @return void
      *-------------------------------------------------------- */

    function ManagePaymentDeleteController($scope, __Form, appServices, $state, __Auth, $rootScope) {
        
        var scope       = this;

        scope = __Form.setup(scope, 'form_manage_payment_delete', 'paymentData', {
            secured : true
        });

        scope.ngDialogData  = $scope.ngDialogData;
        scope.orderUid      = scope.ngDialogData.orderUid;
        
        /**
          * Submit delete action
          *
          * @return void
          *---------------------------------------------------------------- */

        scope.submit = function() {

            __Form.process({
                    'apiURL'      : 'order.payment.delete',
                    'paymentId'   : scope.ngDialogData.paymentId
                }, scope).success(function(responseData) {
                    
                appServices.processResponse(responseData, null, function() {

                    // close dialog
                    $scope.closeThisDialog({payment_deleted : true});
                    

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
        }
    }

})();;
(function() {
'use strict';
	
	/*
	 DashboardController
	-------------------------------------------------------------------------- */
	
	angular
        .module('DashboardApp.main', [])
        .controller('DashboardController', 	[ 
            '$scope',
            'appServices',
            '__DataStore',
            '$rootScope',
            DashboardController 
	 	]);

	/**
	 * DashboardController for admin 
	 *
	 * @inject $scope
	 * @inject appServices
	 * @inject __DataStore
	 * @inject $rootScope
	 * 
	 * @return void
	 *-------------------------------------------------------- */

	 function DashboardController($scope, appServices, __DataStore, $rootScope) {

	 	var scope 	= this;
	 	
	};

})();;
(function() {
'use strict';
	
	/*
	Coupon related controllers
	-------------------------------------------------------------------------- */
	
	angular.module('ManageApp.coupon', 		[]).
		controller('CouponListController', [
			'$scope', '__DataStore', 'appServices','$state', CouponListController
		]).controller('CouponDetailDialogController', [
			'$scope', '__DataStore', 'appServices','$state', CouponDetailDialogController
		]).controller('CouponAddController', [
			'$scope', '__Form','appServices', '$state', CouponAddController
		]).controller('CouponEditController', [
			'$scope', '__Form','appServices', '$state', CouponEditController
		]);

    /**
	 * CouponListController for get list of coupon & manage it.
	 *
	 * @inject $scope
	 * @inject __DataStore
	 * @inject appServices
	 *
	 * @return void
	 *-------------------------------------------------------- */

	function CouponListController($scope, __DataStore, appServices, $state) {

		var scope   = this,
		dtProductsColumnsData = [
            {
                "name"      : "title",
                "orderable"  : true,
                "template"	: "#titleColumnTemplate"
            },
            {
                "name"      : "code",
                "orderable"  : true
            },
            {
                "name"      : "start_date",
                "orderable" : true,
                "template"	: "#startDateColumnTemplate"
            },
            {
                "name"      : "end_date",
                "orderable" : true,
                "template"  : "#endDateColumnTemplate"
            },
            {
                "name"      : "status",
                "orderable" :  true,
                "template"  : "#statusColumnTemplate"
            },
            {
                "name"      : null,
                "template"  : "#columnActionTemplate"
            }
        ],
        tabs    = {
            'current'    : {
                id      : 'currentCoupon',
                route   : 'coupons.current',
                status  : 1
            },
            'expired' : {
                id      : 'expiredCoupon',
                route   : 'coupons.expired',
                status  : 2
            },
            'upcoming' : {
                id      : 'upcomingCoupon',
                route   : 'coupons.upcoming',
                status  : 3
            }
        };

        $('#manageCouponList a').click(function (e) {

        	e.preventDefault();
        	
            var $this       = $(this),
                tabName     = $this.attr('aria-controls'),
                selectedTab = tabs[tabName];
            if (!_.isEmpty(selectedTab)) {
                $(this).tab('show');
                scope.getCouponsList(selectedTab.id, selectedTab.status);
            }

    	});

     /**
        * get coupon data base on status
        *
        * @param string tableID
        * @param int status
        * @return void
        *---------------------------------------------------------------- */
        
        scope.getCouponsList  =  function(tableID, status) 
        { 
        	// distroy instance of datatable
	    	if (scope.couponsListDataTable) {
	            scope.couponsListDataTable.destroy();
	        }
        	scope.couponsListDataTable = __DataStore.dataTable('#'+tableID, {
	            url         : {
	            	'apiURL' : "manage.coupon.list",
	            	'status' : status
	            },
	            dtOptions   : {
	                "searching": true,
	                "order": [[ 1, "asc" ]]
	            },
	            columnsData : dtProductsColumnsData, 
	            scope       : $scope
        	});
        }; 

        _.defer(function(text) {
			if ($state.current.name == 'coupons.current') {

	        	var selectedTab = $('.nav li a[href="#current"]');
	        		selectedTab.triggerHandler('click', true);

	        } else if ($state.current.name == 'coupons.expired') {

	        	var selectedTab = $('.nav li a[href="#expired"]');
	        		selectedTab.triggerHandler('click', true);

	        } else if ($state.current.name == 'coupons.upcoming') {
	        	
	        	var selectedTab = $('.nav li a[href="#upcoming"]');
	        		selectedTab.triggerHandler('click', true);
	        }
			 
		}, 0);
		

		 /**
        * When click on tab so template open in url
        *
        * @param  $event
        * @param  url
        *
        * @return void
        *---------------------------------------------------------------- */
        scope.tabClick = function ($event, url) {
	        $event.preventDefault();
	        $state.go(url);
	    };
	    
	    /**
	      * Get detail dialog.
	      *
	      * @return void
	      *---------------------------------------------------------------- */
	    scope.detailDialog = function (couponID) {

	    	__DataStore.fetch({
	        	'apiURL'	: 'manage.coupon.detailSupportData',
	        	'couponID'	: couponID
	        })
    	   .success(function(responseData) {

    	   		var requestData = responseData.data;

    	   		appServices.processResponse(responseData, null, function() {

			    	appServices.showDialog(requestData,
			        {	
			            templateUrl : __globals.getTemplateURL(
			                    'coupon.manage.detail-dialog'
			                )
			        },
			        function(promiseObj) {

			        });
			    });
	       });
	    }

	   

        /**
	      * Get datatable source data.
	      *
	      * @return void
	      *---------------------------------------------------------------- */
        scope.reloadDT = function () {
	        __DataStore.reloadDT(scope.couponsListDataTable);
	    };

	    /**
	      * delete coupon.
	      *
	      * @param couponID
	      * @param couponName
	      *
	      * @return void
	      *---------------------------------------------------------------- */
        scope.delete = function(couponID, couponName) {
	    	__globals.showConfirmation({
                text                : __ngSupport.getText(
                    __globals.getJSString('coupon_delete_text'), {
                        '__name__'     : unescape(couponName)
                    }
                ),
                confirmButtonText   : __globals.getJSString('delete_action_button_text')
            }, function() {

                __DataStore.post({
                    'apiURL' 	: 'manage.coupon.delete',
                    'couponID' 	: couponID,
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
                            scope.reloadDT();   // reload datatable

                        }
                    );    

                });

            });
	    };


	    /**
	    * open 
	    *
	    * @param object param1 type 
	    *
	    * @return void
	    *---------------------------------------------------------------- */
	    
	    scope.openCouponDialog  =  function() 
	    { 	
	    	__DataStore.fetch('manage.coupon.fetch.couponDiscountType')
    	   		.success(function(responseData) {

    	   		var requestData = responseData.data;
    	   		
			    appServices.showDialog(requestData,
		        {	
		            templateUrl : __globals.getTemplateURL(
		                    'coupon.manage.add-dialog'
		                )
		        },
		        function(promiseObj) {

		            // Check if brand added
		            if (_.has(promiseObj.value, 'coupon_added') 
		                && promiseObj.value.coupon_added === true) {
		            	scope.reloadDT();   // reload datatable
		            }
		        });
		    });
	    };

	    /**
	    * edit coupon edit dialog
	    *
	    * @param int couponID
	    *
	    * @return void
	    *---------------------------------------------------------------- */
	    
	    scope.openEditCouponDialog  =  function(couponID) 
	    { 
	    	 __DataStore.fetch({
	        	'apiURL'	: 'manage.coupon.editSupportData',
	        	'couponID'	: couponID
	        })
    	   .success(function(responseData) {

    	   		var requestData = responseData.data;

    	   		requestData.start = moment(requestData.start)
    	   							.format('YYYY-MM-DD HH:mm:ss');

    	   		requestData.end = moment(requestData.end)
    	   							.format('YYYY-MM-DD HH:mm:ss');

	        	appServices.showDialog(requestData,
	            {
	                templateUrl : __globals.getTemplateURL(
	                        'coupon.manage.edit-dialog'
	                    )
	            },
	            function(promiseObj) {

	            	 // Check if coupon updated
	                if (_.has(promiseObj.value, 'coupon_updated') 
	                    && promiseObj.value.coupon_updated === true) {
	                	
	                	scope.reloadDT();   // reload datatable
	                }
	               
	            });
	     	});	
	    };

	};

	 /**
	   * CouponDetailDialogController for get detail dialog.
	   *
	   * @inject $scope
	   * @inject __DataStore
	   * @inject appServices
	   * @inject state
	   *
	   * @return void
	   *-------------------------------------------------------- */
	    function CouponDetailDialogController($scope, __DataStore, appServices, state) {

	    	var scope   = this;
	    	scope.ngDialogData   = $scope.ngDialogData;
	    	scope.couponDate = scope.ngDialogData;


	     /**
	  	  * Close dialog and return promise object
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */
			scope.closeDialog = function() {
	  	  		$scope.closeThisDialog();
	  	  	};

		};

	/**
	 * CouponAddntroller for get dialog for add coupon & manage it.
	 *
	 * @inject $scope
	 * @inject __Form
	 * @inject appServices
	 *
	 * @return void
	 *-------------------------------------------------------- */

	function CouponAddController($scope, __Form, appServices, $state) {

		var scope   = this;
		scope.ngDialogData   = $scope.ngDialogData;
		
		scope = __Form.setup(scope, 'manage_coupon_add', 'couponData',
					        { 
					            secured : false
					        });
		
		scope.discountType 				= scope.ngDialogData.discountType;
		scope.couponData.amountSymbol 	= scope.ngDialogData.currencySymbol;
		scope.couponData.currency 		= scope.ngDialogData.currency;
		scope.couponData.discount_type 	= 2;
		scope.couponData.active 		= true;
		
		var today = moment().format('YYYY-MM-DD HH:mm:ss');

		scope.couponData.start = today;
		scope.couponData.end   = today;

		scope.startDateConfig = {
			minDate : moment().format('YYYY-MM-DD HH:mm:ss')
		};

		$scope.$watch('couponAddCtrl.couponData.start', 
                function(currentValue, oldValue) {

                var $element = angular.element('#end');
          
                // Check if currentValue exist
                if (_.isEmpty(currentValue)) {
      
                    $element.bootstrapMaterialDatePicker('setMinDate', '');

                } else {

                    $element.bootstrapMaterialDatePicker('setMinDate', currentValue);
                }

        });

	    /**
		  * Call when start date updated
		  *
		  * @param date date
		  *
		  * @return void
		  *---------------------------------------------------------------- */
		scope.endDateUpdated = function(date) {
	
			if (scope.couponData.start > scope.couponData.end) { 
				scope.couponData.end = date;
			}
		};

	    /**
		  * submit add form.
		  *
		  *
		  * @return void
		  *-------------------------------------------------------- */

		scope.submit = function() {

		    __Form.process('manage.coupon.add', scope)
                .success(function(responseData) {
                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog( { coupon_added : true } );
                });    

            });
		}

		/**
	  	  * Close dialog and return promise object
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */
		scope.closeDialog = function() {
  	  		$scope.closeThisDialog();
  	  	};
	};


	/**
	 * CouponEditController for get dialog for add coupon & manage it.
	 *
	 * @inject $scope
	 * @inject __Form
	 * @inject appServices
	 * @inject $state
	 *
	 * @return void
	 *-------------------------------------------------------- */

	function CouponEditController($scope, __Form, appServices, $state) {

		var scope   = this,
        	ngDialogData = $scope.ngDialogData;

       		scope.updateURL = {
				'apiURL'   :'manage.coupon.edit.process',
				'couponID' : ngDialogData.couponData._id
			};


		scope = __Form.setup(scope, 'manage_coupon_edit', 'couponData');
		
		scope   = __Form.updateModel(scope, $scope.ngDialogData.couponData);
		scope.discountType 				= ngDialogData.configItems.discountType;
		scope.couponData.amountSymbol 	= ngDialogData.configItems.currencySymbol;
		scope.couponData.currency 		= ngDialogData.configItems.currency;
		
		scope.startDateConfig = {
			minDate : moment().format('YYYY-MM-DD HH:mm:ss')
		};

		$scope.$watch('couponEditCtrl.couponData.end', 
                function(currentValue, oldValue) {
				
                var $element = angular.element('#end');

                // Check if currentValue exist
                if (_.isEmpty(currentValue)) {
      
                    $element.bootstrapMaterialDatePicker('setDate', '');

                } else {

                    $element.bootstrapMaterialDatePicker('setDate', currentValue);
                }

			//$element.bootstrapMaterialDatePicker('setMinDate', currentValue);

        });

		/**
		* Call when start date updated
		*
		* @param date date
		*
		* @return void
		*---------------------------------------------------------------- */
		scope.endDateUpdated = function(date) {
		
			if (scope.couponData.start > scope.couponData.end) { 
				scope.couponData.end = date;
			}
		};


		/**
		* submit coupon update form.
		*
		*
		* @return void
		*---------------------------------------------------------------- */
		scope.submit = function() {

		    __Form.process(scope.updateURL, scope)
                .success(function(responseData) {
                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog( { coupon_updated : true } );
                });    

            });
		}

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
(function() {
'use strict';
	
	/*
	  Manage shipping component related controllers
	  ----------------------------------------------------------------------- */
	
	angular.module('ManageApp.shipping', 		[])

        .controller('ShippingListController', [
			'$scope',
            '__DataStore',
            'appServices',
            '__Form',
            ShippingListController
		]).controller('ShippingDetailController', [
			'$scope', 
			'__DataStore', 
			'appServices',
			'$state', 
			ShippingDetailController
        ]).controller('ShippingAddDialogController', [
			'$scope',
            '__DataStore',
            'appServices',
            '$state',
            ShippingAddDialogController
		])
        .controller('ShippingAddController', [
			'$scope',
            '__Form',
            'appServices',
            '$state',
            ShippingAddController
		])
        .controller('ShippingEditDialogController', [
			'$scope',
            '__DataStore',
            'appServices',
            '$state',
            ShippingEditDialogController
		])
        .controller('ShippingEditController', [
			'$scope',
            '__Form',
            'appServices',
            '$state',
            ShippingEditController
		]);

    /**
	  * ShippingListController - for get list of shipping rules & manage it.
	  *
	  * @inject $scope
	  * @inject __DataStore
	  * @inject appServices
	  * @inject __Form
	  *
	  * @return void
	  *-------------------------------------------------------- */

	function ShippingListController($scope, __DataStore, appServices, __Form) {

		var scope                 = this,
		    dtShippingColumnsData = [
                {
                    "name"      : "name",
                    "orderable"  : true,
                    "template"	: "#countryColumnTemplate"
                },
                {
                    "name"      : "type",
                    "orderable"  : true,
                    "template"	: "#typeColumnTemplate"
                },
                {
                    "name"      : "charges",
                    "orderable" : true,
                },
                {
                    "name"      : "creation_date",
                    "orderable" : true,
                    "template"	: "#creationDateColumnTemplate"
                },
                {
	                "name"      : "status",
	                "orderable" :  true,
	                "template"  : "#statusColumnTemplate"
	            },
	            {
	                "name"      : null,
	                "template"  : "#columnActionTemplate"
	            }
            ],
            tabs    = {
                'specificCountry'    : {
	                    id      : 'manageShippingList'
                },
                'allOtherCountries'    : {
                       id      : 'allOtherCountriesTabList'
                }
            };

        // Fired when clicking on tab    
        $('#manageShippingTab a').click(function (e) {

            e.preventDefault();

            var $this       = $(this),
                tabName     = $this.attr('aria-controls'),
                selectedTab = tabs[tabName];

            // Check if selectedTab exist    
            if (!_.isEmpty(selectedTab)) {

                $(this).tab('show')
                scope.getShipping(selectedTab.id);

            }
            
        });

        /**
	  	  * Shipping list according to datatable id 
	  	  *
	  	  * @param tableID
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */

        scope.getShipping = function (tableID) {
        	
	        scope.shippingListDataTable = __DataStore.dataTable('#'+tableID, {
	            url            : "manage.shipping.list",
	            dtOptions      : {
	                "searching": true,
	                "order": [[ 1, "asc" ]]
	            },
	            columnsData    : dtShippingColumnsData, 
	            scope          : $scope

	        });
        };

        var selectedTab = $('.nav li a[href="#specificCountry"]');

	    selectedTab.triggerHandler('click', true);

	    /**
	  	  * Reload datatable
	  	  *
	  	  *---------------------------------------------------------------- */

        scope.reloadDT = function () {
	        __DataStore.reloadDT(scope.shippingListDataTable);
	    };

	    /**
	      * Get detail dialog.
	      *
	      * @return void
	      *---------------------------------------------------------------- */
	    scope.detailDialog = function (shippingID) {

	    	__DataStore.fetch({
	        	'apiURL'		: 'manage.shipping.detailSupportData',
	        	'shippingID'	: shippingID
	        })
    	   .success(function(responseData) {

    	   		var requestData = responseData.data;

    	   		appServices.processResponse(responseData, null, function() {

			    	appServices.showDialog(requestData,
			        {	
			            templateUrl : __globals.getTemplateURL(
			                    'shipping.manage.detail-dialog'
			                )
			        },
			        function(promiseObj) {

			        });
			    });
	       });
	    }

	    /**
	  	  * Delete shipping rule sending http request using __DataStore post
          * function
          *
	  	  * @param int    shippingID
	  	  * @param string country
	  	  *
	  	  * return void
	  	  *---------------------------------------------------------------- */

        scope.delete = function(shippingID, country) {

	    	__globals.showConfirmation({
                text                : __ngSupport.getText(
							        __globals.getJSString('shipping_delete_text'), {
							            '__country__'    : country
							        }
						    	),
                confirmButtonText   : __globals.getJSString('delete_action_button_text')
            },
            function() {

                __DataStore.post({
                    'apiURL' 		: 'manage.shipping.delete',
                    'shippingID' 	: shippingID,
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
                        scope.reloadDT();   // reload datatable

                    });    

                });

            });

	    };

        // AOC stands for All Other Countries
        // AOC shipping related
        
	    scope 	= __Form.setup(scope, 'manage_aoc_edit', 'shippingData');
		
        __DataStore.fetch('manage.aoc.shipping.editSupportData')
    	   	.success(function(responseData) {

 				appServices.processResponse(responseData, null, function() {

                    var requestData = responseData.data;

                    scope.shippingType    = requestData.configItems.shippingType;
					scope.currencySymbol  = requestData.configItems.storeCurrencySymbol;
					scope.currency        = requestData.configItems.currency;

                    scope   = __Form.updateModel(scope, requestData.shipping);

                }); 
     	});

        
        /**
	  	  * Submit aoc form data
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */

        scope.submit = function() {

		    __Form.process('manage.aoc.shipping.update', scope)
                .success(function(responseData) {

                appServices.processResponse(responseData, null, function() {
                    
                });    

            });

		};

	};

	/**
	   * ShippingDetailController for get detail dialog.
	   *
	   * @inject $scope
	   * @inject __DataStore
	   * @inject appServices
	   * @inject state
	   *
	   * @return void
	   *-------------------------------------------------------- */
	    function ShippingDetailController($scope, __DataStore, appServices, state) {

	    	var scope   = this;
	    	scope.ngDialogData   = $scope.ngDialogData;
	    	scope.currencySymbol = scope.ngDialogData.currencySymbol;
	    	scope.shippingDetail = scope.ngDialogData.shippingData;
	    	
	     /**
	  	  * Close dialog
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */
			scope.closeDialog = function() {
	  	  		$scope.closeThisDialog();
	  	  	};

		};

	/**
	  * ShippingAddDialogController - show add shipping rule dialog
	  *
	  * @inject $scope
	  * @inject __DataStore
	  * @inject appServices
	  * @inject $state
	  *
	  * @return void
	  *-------------------------------------------------------- */

	function ShippingAddDialogController($scope, __DataStore, appServices, $state) {

		var scope   = this;

        __DataStore.fetch('manage.shipping.fetch.contries')
    	   	.success(function(responseData) {

    	   		var requestData = responseData.data;
    	   		// show add dialog
	        	appServices.showDialog(requestData,
	            {
	                templateUrl : __globals.getTemplateURL(
	                        'shipping.manage.add-dialog'
	                    )
	            },
	            function(promiseObj) {

	            	// Check if shipping added
		            if (_.has(promiseObj.value, 'shipping_added') 
		                && promiseObj.value.shipping_added === true) {
		            	$scope.$parent.shippingListCtrl.reloadDT();
		            }
		            $state.go('shippings');
	               
	            });
     	});

	};

	/**
	  * ShippingAddController - handle scope of add shipping rule dialog
	  *
	  * @inject $scope
	  * @inject __Form
	  * @inject appServices
      * @inject $state
	  *
	  * @return void
	  *-------------------------------------------------------- */

	function ShippingAddController($scope, __Form, appServices, $state) {

		var scope  			= this,
			ngDialogData 	= $scope.ngDialogData;

		scope     = __Form.setup(scope, 'manage_shipping_add', 'shippingData');
		
		scope.countries_select_config = __globals.getSelectizeOptions({
            valueField  : 'value',
            labelField  : 'text',
            searchField : [ 'text' ]  
        });

        scope.countries 			= ngDialogData.countries;
        scope.shippingType 			= ngDialogData.shippingType;
        scope.shippingData.active 	= true;
        scope.shippingData.type 	= 1;
        scope.freeAfterAmount  		= true;
      	scope.charges 		 		= true;
      	scope.amountCap 			= false;
        scope.currencySymbol 		= ngDialogData.currencySymbol;
        scope.currency 				= ngDialogData.currency;

        /**
        * description
        *
        * @param object param1 type 
        *
        * @return void
        *---------------------------------------------------------------- */
        
        scope.onChangeType = function(type) {
	    	
	        var shippingType = ngDialogData.shippingType;
	        
	        if (type == 1) {
	          	// flat.
	          	scope.freeAfterAmount  	= true;
	          	scope.charges 		 	= true;
	          	scope.amountCap 		= false;

	        } else if (type == 2) {
	          	// percentage.
	          	scope.freeAfterAmount  	= false;
	          	scope.charges 		 	= true;
	          	scope.amountCap 		= true;

         	} else if (type == 3 || type == 4) {
         	 // free or Not Shippable
         	 	scope.freeAfterAmount  	= false;
	          	scope.charges 		 	= false;
	          	scope.amountCap 		= false;

         	} 
	    };

        /**
	  	  * add new shiiping
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */

        scope.submit = function() {

		    __Form.process('manage.shipping.add', scope)
                .success(function(responseData) {

                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog( { shipping_added : true } );
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

	/**
	  * ShippingEditDialogController - show edit shipping rule dialog
	  *
	  * @inject $scope
	  * @inject __DataStore
	  * @inject appServices
	  * @inject $state
	  *
	  * @return void
	  *-------------------------------------------------------- */

	function ShippingEditDialogController($scope, __DataStore, appServices, $state) {

		var scope   = this;
		
        __DataStore.fetch({
        	'apiURL'		: 'manage.shipping.editSupportData',
        	'shippingID'	: $state.params.shippingID
	    })
    	   .success(function(responseData) {

    	   	appServices.processResponse(responseData,null, function(reactionCode) {

    	   		var requestData = responseData.data;

	        	appServices.showDialog(requestData,
	            {
	                templateUrl : __globals.getTemplateURL(
	                        'shipping.manage.edit-dialog'
	                    )
	            },
	            function(promiseObj) {
	            	
	            	 // Check if coupon updated
	                if (_.has(promiseObj.value, 'shipping_updated') 
	                    && promiseObj.value.shipping_updated === true) {
	                	
	                	$scope.$parent.shippingListCtrl.reloadDT();

	                }
	                
	                $state.go('shippings');
	               
	            });
			});
     	});

	};

	/**
	  * ShippingEditController - handle edit shipping dialog scope
	  *
	  * @inject $scope
	  * @inject __Form
	  * @inject appServices
      * @inject $state
	  *
	  * @return void
	  *-------------------------------------------------------- */

	function ShippingEditController($scope, __Form, appServices, $state) {

		var scope              = this,
        	ngDialogData       = $scope.ngDialogData;
       		scope.updateURL    = {
				'apiURL' :'manage.shipping.edit.process',
				'shippingID' : $state.params.shippingID
			};
		
		scope     = __Form.setup(scope, 'manage_shipping_edit', 'shippingData');

		scope.shippingData = ngDialogData;

		scope.discountType      = ngDialogData.shippingType;
        scope.shippingData 		= ngDialogData.shippingData;
        scope.currencySymbol 	= ngDialogData.currencySymbol;
        scope.currency 			= ngDialogData.currency;
        

		scope = __Form.updateModel(scope, scope.shippingData)


		/**
		  * submit edit form data
		  *
		  * @return void
		  *---------------------------------------------------------------- */
		
		scope.submit = function() {

		    __Form.process(scope.updateURL, scope)
                .success(function(responseData) {

                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog( { shipping_updated : true } );
                });    

            });
		}

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
	  Manage tax component related controllers
	  -------------------------------------------------------------------------- */
	
	angular.module('ManageApp.tax', 		[]).
		controller('TaxListController', [
			'$scope',
            '__DataStore',
            'appServices',
            TaxListController
		])

		.controller('TaxDetailController', [
			'$scope', 
			'__DataStore', 
			'appServices',
			TaxDetailController
		])

        .controller('TaxAddDialogController', [
			'$scope',
            '__DataStore',
            'appServices',
            '$state',
            TaxAddDialogController
		])

        .controller('TaxAddController', [
			'$scope',
            '__Form',
            'appServices',
            '$state',
            TaxAddController
		])

        .controller('TaxEditDialogController', [
			'$scope',
            '__DataStore',
            'appServices',
            '$state',
            TaxEditDialogController
		])

        .controller('TaxEditController', [
			'$scope',
            '__Form',
            'appServices',
            '$state',
            TaxEditController
		]);

    /**
	  * TaxListController for get list of tax & manage it.
	  *
	  * @inject $scope
	  * @inject __DataStore
	  * @inject appServices
	  *
	  * @return void
	  *-------------------------------------------------------- */

	function TaxListController($scope, __DataStore, appServices) {

		var scope   = this,
		dttaxColumnsData = [
            {
                "name"      : "label",
                "orderable" : true,
                "template"	: "#labelColumnTemplate"
            },
            {
                "name"      : "name",
                "orderable" : true,
                "template"	: "#countryColumnTemplate"
            },
            {
                "name"      : "type",
                "orderable" : true,
                "template"	: "#typeColumnTemplate"
            },
            {
                "name"      : "applicable_tax",
                "orderable" : true,
            },
            {
                "name"      : "creation_date",
                "orderable" : true,
                "template"	: "#creationDateColumnTemplate"
            },
            {
                "name"      : "status",
                "orderable" :  true,
                "template"  : "#statusColumnTemplate"
            },
            {
                "name"      : null,
                "template"  : "#columnActionTemplate"
            }
        ];
		
        scope.taxListDataTable = __DataStore.dataTable('#manageTaxList', {
            url             : "manage.tax.list",
            dtOptions       : {
                "searching"     : true,
                "order"         : [[ 1, "asc" ]]
            },
            columnsData     : dttaxColumnsData, 
            scope           : $scope

        });

        /**
    	  * reload data table
    	  *
    	  *-------------------------------------------------------- */

        scope.reloadDT = function () {
            __DataStore.reloadDT(scope.taxListDataTable);
        };

        /**
	      * Get detail dialog.
	      *
	      * @return void
	      *---------------------------------------------------------------- */
	    scope.detailDialog = function (taxID) {

	    	__DataStore.fetch({
	        	'apiURL' : 'manage.tax.detailSupportData',
	        	'taxID'	 : taxID
	        })
    	   .success(function(responseData) {

    	   		var requestData = responseData.data;

    	   		appServices.processResponse(responseData, null, function() {

			    	appServices.showDialog(requestData,
			        {	
			            templateUrl : __globals.getTemplateURL(
			                    'tax.manage.detail-dialog'
			                )
			        },
			        function(promiseObj) {

			        });
			    });
	       });
	    }

        /**
    	  * delete tax by sending http request.
    	  *
    	  * @param number taxID
    	  *
    	  * @return void
    	  *-------------------------------------------------------- */

        scope.delete = function(taxID) {

        	__globals.showConfirmation({
                text                : __globals.getJSString('tax_delete_text'),
                confirmButtonText   : __globals.getJSString('delete_action_button_text')
            }, function() {

                __DataStore.post({
                    'apiURL' 	: 'manage.tax.delete',
                    'taxID' 	: taxID,
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
                            scope.reloadDT();   // reload datatable

                        }

                    );    

                });

            });

        }

	};

	/**
     * TaxDetailController for get detail dialog.
     *
     * @inject $scope
     * @inject __DataStore
     * @inject appServices
     *
     * @return void
     *-------------------------------------------------------- */
    function TaxDetailController($scope, __DataStore, appServices) {

    	var scope   = this;
    	scope.ngDialogData   = $scope.ngDialogData;
    	scope.currencySymbol = scope.ngDialogData.currencySymbol;
    	scope.taxData 		 = scope.ngDialogData.taxData;
    	
 	/**
	 * Close dialog
	 *
	 * @return void
	 *---------------------------------------------------------------- */
		scope.closeDialog = function() {
  	  		$scope.closeThisDialog();
  	  	};

	};

	/**
	 * TaxAddDialogController - for show add tax dialog with getting its -
     * support dialog data
	 *
	 * @inject $scope
	 * @inject __DataStore
	 * @inject appServices
	 * @inject $state
	 *
	 * @return void
	 *-------------------------------------------------------- */

	function TaxAddDialogController($scope, __DataStore, appServices, $state) {

		var scope   = this;

        __DataStore.fetch('manage.tax.fetch.contries')
    	   	.success(function(responseData) {

    	   		var requestData = responseData.data;

	        	appServices.showDialog(requestData,
	            {
	                templateUrl : __globals.getTemplateURL(
	                        'tax.manage.add-dialog'
	                    )
	            },
	            function(promiseObj) {

	            	// Check if tax added
		            if (_.has(promiseObj.value, 'tax_added') 
		                && promiseObj.value.tax_added == true) {
		            	$scope.$parent.taxListCtrl.reloadDT();
		            }
		            $state.go('taxes');
	               
	            });
     	});

	};

	/**
	 * TaxAddController - handle scope of add dialog & also responsible for -
     * form handling & dialog closing
	 *
	 * @inject $scope
	 * @inject __Form
	 * @inject appServices
	 * @inject $state
	 *
	 * @return void
	 *-------------------------------------------------------- */

	function TaxAddController($scope, __Form, appServices, $state) {

		var scope  			= this,
			ngDialogData 	= $scope.ngDialogData;

		scope 	= __Form.setup(scope, 'manage_tax_add', 'taxData');
		
		scope.countries_select_config = __globals.getSelectizeOptions({
            valueField  : 'value',
            labelField  : 'text',
            searchField : [ 'text' ]
        });

        scope.countries 		= ngDialogData.countries;
        scope.taxType 			= __globals.generateKeyValueItems(ngDialogData.taxType);
        scope.taxData.active 	= true;
        scope.taxData.type 		= 1;
        scope.currencySymbol 	= ngDialogData.currencySymbol;
        scope.currency 	        = ngDialogData.currency;

        /**
	  	  * Submit form using form service process method
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */

        scope.submit = function() {

		    __Form.process('manage.tax.add', scope)
                .success(function(responseData) {
                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog( { tax_added : true } );
                });    

            });
		}


		/**
	  	  * Close dialog and return promise object
	  	  *
	  	  * @return void
	  	  *---------------------------------------------------------------- */

		scope.closeDialog = function() {
  	  		$scope.closeThisDialog();
  	  	};

	};

	/**
	 * TaxEditDialogController - Getting edit tax data from server & if tax -
     * exist on server then show tax edit dialog 
	 *
	 * @inject $scope
     * @inject __DataStore
	 * @inject appServices
	 * @inject $state
	 *
	 * @return void
	 *-------------------------------------------------------- */

	function TaxEditDialogController($scope, __DataStore, appServices, $state) {

		var scope   = this;

        __DataStore.fetch({
        	'apiURL'		: 'manage.tax.editSupportData',
        	'taxID'			: $state.params.taxID
	    })
    	   .success(function(responseData) {

    	   	appServices.processResponse(responseData,null, function(reactionCode) {

    	   		var requestData = responseData.data;

	        	appServices.showDialog(requestData,
	            {
	                templateUrl : __globals.getTemplateURL(
	                        'tax.manage.edit-dialog'
	                    )
	            },
	            function(promiseObj) {

	            	// Check if tax updated
	                if (_.has(promiseObj.value, 'tax_updated') 
	                    && promiseObj.value.tax_updated === true) {
	                	
	                	$scope.$parent.taxListCtrl.reloadDT();
	                }
	                
	                $state.go('taxes');
	               
	            });
	        });
     	});

	};

	/**
	 * TaxEditController - handle scope of edit dialog & also responsible for -
     * form handling & dialog closing
	 *
	 * @inject $scope
	 * @inject __Form
	 * @inject appServices
     * @inject $state
	 *
	 * @return void
	 *-------------------------------------------------------- */

	function TaxEditController($scope, __Form, appServices, $state) {

		var scope              = this,
        	ngDialogData       = $scope.ngDialogData;
       		scope.updateURL    = {
				'apiURL' :'manage.tax.edit.process',
				'taxID'  : $state.params.taxID
			};

		scope = __Form.setup(scope, 'manage_tax_edit', 'taxData');

        scope.countries_select_config = __globals.getSelectizeOptions({
            valueField  : 'value',
            labelField  : 'text',
            searchField : [ 'text' ]  
        });
        
		scope.countries = ngDialogData.countries.data.countries;
		
		scope   = __Form.updateModel(scope, $scope.ngDialogData)

		scope.taxType 			= __globals.generateKeyValueItems(ngDialogData.taxType);
        scope.taxData 			= ngDialogData.taxData;
        scope.currencySymbol 	= ngDialogData.currencySymbol;
        scope.currency 			= ngDialogData.currency;

		/**
		  * Submit edit tax form
		  *
		  * @return void
		  *---------------------------------------------------------------- */
		
		scope.submit = function() {

		    __Form.process(scope.updateURL, scope)
                .success(function(responseData) {

                appServices.processResponse(responseData, null, function() {
                    $scope.closeThisDialog( { tax_updated : true } );
                });    

            });

		}

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
/*!
 *  Engine      : ManageReportEngine 
 *  Component   : Manage/Report
----------------------------------------------------------------------------- */

(function( window, angular, undefined ) {

	'use strict';
	
	/*
	  Manage report Engine
	  -------------------------------------------------------------------------- */
	
	angular.module('ManageApp.report', 		[])

		/**
    	  * ReportController for list of order
    	  *
    	  * @inject __Utils
    	  * @inject __Form
    	  * @inject $state
    	  * @inject appServices
    	  * 
    	  * @return void
    	 *-------------------------------------------------------- */

		.controller('ReportController', [ 
            '__Utils',
            '__Form',
            '$state',
            'appServices',
            '$scope',
            '__DataStore',
            function (__Utils, __Form , $state, appServices, $scope, __DataStore) {

            	var scope = this;

            	scope = __Form.setup(scope, 'manage_report_list', 'reportData');

            	scope.reportData.status = 1; // new
            	scope.reportData.order 	= 1; // placed
            	scope.duration 			= 5; // today

            	//scope.statuses 			= __globals.configItem('order_status');
            	
            	// set date
				scope.monthFirstDay       = moment().startOf('month')
				                            .format('YYYY-MM-DD');

				scope.monthLastDay        = moment().endOf('month')
											.format('YYYY-MM-DD');


				scope.lastMonthFirstDay   = moment().subtract(1, 'months')
				                            .startOf('month')
											.format('YYYY-MM-DD');

				scope.lastMonthLastDay    = moment().subtract(1, 'months')
				                            .endOf('month')
											.format('YYYY-MM-DD');
				    
				scope.currentWeekFirstDay = moment().startOf('week')
													.format('YYYY-MM-DD');

				scope.currentWeekLastDay  = moment().endOf('week')
													.format('YYYY-MM-DD');


				scope.lastWeekFirstDay    = moment().weekday(-7)
													.format('YYYY-MM-DD');

				scope.lastWeekLastDay     = moment().weekday(-1)
													.format('YYYY-MM-DD');

				scope.today               = moment().format('YYYY-MM-DD');

				scope.yesterday           = moment().subtract(1, 'day')
													.format('YYYY-MM-DD');

                scope.lastYearFirstDay    = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD');

                scope.lastYearLastDay     = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD');

                scope.currentYearFirstDay = moment().startOf('year').format('YYYY-MM-DD');

                scope.currentYearLastDay  = moment().endOf('year').format('YYYY-MM-DD');

                scope.last30Days          = moment().subtract(30, 'day').format('YYYY-MM-DD');


				__DataStore.fetch('manage.order.get.config.items')
						   .success(function(responseData) {

						   	var requestData = responseData.data;

						   	// list of status
						   	scope.statuses  = __globals.generateKeyValueItems(requestData.orderConfigStatusItems);
						   	scope.itemName = __ngSupport.getText(__globals.getJSString('status_array_item_in_report'));
						   	// Push one more items in status array
						   	scope.statuses.push({
						   		id 		: 9,
						   		name 	: scope.itemName
						   	});

						   	scope.orderList = __globals.generateKeyValueItems(requestData.orderConfigDateItems);

						});

            	// date and time
            	var today = moment().format('YYYY-MM-DD');

				scope.reportData.start = today;
				scope.reportData.end   = today;

				scope.startDateConfig = {
					time    : false
				};

				scope.endDateConfig = {
					minDate : moment().format('YYYY-MM-DD'),
					time    : false
				};

				$scope.$watch('reportCtrl.reportData.start', 
	                function(currentValue, oldValue) {

	                var $element = angular.element('#end');
	          
	                // Check if currentValue exist
	                if (_.isEmpty(currentValue)) {
	      
	                    $element.bootstrapMaterialDatePicker('setMinDate', '');

	                } else {

	                    $element.bootstrapMaterialDatePicker('setMinDate', currentValue);
	                }
				});

				/**
				  * Call when start date updated
				  *
				  * @param startDate
				  *
				  * @return void
				  *---------------------------------------------------------------- */
				scope.startDateUpdated = function(startDate) {

					scope.reportData.start = startDate;
				};

				/**
				  * Call when start date updated
				  *
				  * @param endDate
				  *
				  * @return void
				  *---------------------------------------------------------------- */
				scope.endDateUpdated = function(endDate) {
					
					if (scope.reportData.start > scope.reportData.end) { 
						scope.reportData.end = endDate;
					}
					scope.reportData.end = endDate;
				};


				/**
			  	  * get date and time according to duration 
			  	  *
			  	  * @param duration
			  	  *
			  	  *---------------------------------------------------------------- */
		        scope.durationChange = function (duration) {
		        	
		        	if (duration == 1) { // current month

		        		scope.reportData.start 	 = scope.monthFirstDay;
		        		scope.reportData.end   = scope.monthLastDay;
		        		      
		        	} else if (duration == 2) { // last month

		        		scope.reportData.start   = scope.lastMonthFirstDay;
		        		scope.reportData.end   = scope.lastMonthLastDay;

		        	} else if (duration == 3) { // current week

		        		scope.reportData.start   = scope.currentWeekFirstDay;
		        		scope.reportData.end   = scope.currentWeekLastDay;

		        	} else if (duration == 4) { // last week

		        		scope.reportData.start   = scope.lastWeekFirstDay;
		        		scope.reportData.end   = scope.lastWeekLastDay;

		        	} else if (duration == 5) { // today

		        		scope.reportData.start   = scope.today;
		        		scope.reportData.end   = scope.today;

		        	} else if (duration == 6) { // yesterday

		        		scope.reportData.start   = scope.yesterday;
		        		scope.reportData.end   = scope.yesterday;

		        	} else if (duration == 7) { // last year

                        scope.reportData.start   = scope.lastYearFirstDay;
                        scope.reportData.end   = scope.lastYearLastDay;

                    } else if (duration == 8) { // current year

                        scope.reportData.start   = scope.currentYearFirstDay;
                        scope.reportData.end   = scope.currentYearLastDay;

                    } else if (duration == 9) { // last 30 days

                        scope.reportData.start   = scope.last30Days;
                        scope.reportData.end   = scope.today;

                    }
		        }


				var dtReportColumnsData = [
		            {
		                "name"      : "order_uid",
		                "orderable" : true,
		                "template"  : "#orderColumnIdTemplate"
		            },
		            {
		                "name"      : 'fname',
		                "orderable" : true,
		                "template"  : "#userNameColumnIdTemplate"
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
		                "name"      : "totalAmount",
		                "orderable" : true,
		                "template"  : "#orderColumnTotalAmountTemplate"
		            },
		            {
		                "name"      : null,
		                "template"  : "#orderActionColumnTemplate"
		            }
		        ];

		    	scope.getReports = function () {

			    	// distroy instance of datatable
			    	if (scope.reportListDataTable) {
			            scope.reportListDataTable.destroy();
			        }
					
			        scope.reportListDataTable = __DataStore.dataTable('#manageReportList', {
			            url : {
		                    'apiURL'      : 'manage.order.report.get.data',
		                    'startDate'   : scope.reportData.start, // start date
		                    'endDate'	  : scope.reportData.end,   // end date
		                    'status'	  : scope.reportData.status, // status
		                    'order'		  : scope.reportData.order  // order
	                	},
						dtOptions       : {
			                "searching"     : true
			            },
			            columnsData     : dtReportColumnsData, 
			            scope           : $scope

			        }, null, scope.countData = function (dataTableCollection) {
			        	// Check table status
			        	scope.tableStatus = dataTableCollection.data;

			        	// Get order total amount by currency code
			        	scope.totalAmounts = dataTableCollection._options.totalAmounts.orderAmountByType;
			        	
			        /*	scope.debitAmount = scope.totalAmounts.debit 
			        	scope.creditAmount = scope.totalAmounts.credit*/

			        	// Excel download URL
			        	scope.excelDownloadURL = dataTableCollection._options.excelDownloadURL;
			        	scope.reportDuration   =__globals.generateKeyValueItems(dataTableCollection._options.duration);
			        });
		    	};
		    	
		    	scope.getReports();

				/**
		          * order detail dialog
		          *
		          * @param number orderID
		          *
		          * @return void
		          *---------------------------------------------------------------- */
		        scope.orderDetailsDialog = function(orderID) {

		            __DataStore.fetch({
	                    'apiURL'    : 'manage.order.details.dialog',
	                    'orderID'   :  orderID
	                })
	                .success(function(responseData) {
	                
	                    appServices.processResponse(responseData, null, function() {
	                        
	                        var requestData = responseData.data;
	                        
	                        appServices.showDialog({
	                           'orderDetails'    : requestData.orderDetails
	                        },
	                        {
	                            templateUrl : __globals.getTemplateURL(
	                                'report.manage.details-dialog'
	                            )
	                        },
	                        function(promiseObj) {
	                        	
	                        });

	                    });    

	                });
				};

			}
    	])

		/**
    	  * OrderReportController for list of order
    	  *
    	  * @inject __Form
    	  * @inject $scope
    	  * 
    	  * @return void
    	 *-------------------------------------------------------- */

		.controller('OrderReportController', [ 
            '$scope',
            function ($scope) {

            	var scope = this;

            	scope.ngDialogData   = $scope.ngDialogData;
                    
	            var requestedData 		= scope.ngDialogData.orderDetails.data;
	        	
		        scope.billingAddress   	= requestedData.address.billingAddress;
		        scope.shippingAddress   = requestedData.address.shippingAddress;
		        scope.sameAddress   	= requestedData.address.sameAddress;

		        scope.user				= requestedData.user;
		        scope.order				= requestedData.order;
		        scope.orderProducts		= requestedData.orderProducts;
		        scope.coupon			= requestedData.coupon;
		        scope.taxes				= requestedData.taxes;
		        scope.shipping			= requestedData.shipping;
            	
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


})( window, window.angular );