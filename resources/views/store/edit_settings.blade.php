<div  class="col-lg-12" ng-controller="EditStoreSettingsController as settingsCtrl">
    <div class="lw-section-heading-block">
        <!-- main heading -->
        <h3 class="lw-section-heading"><?= __( 'Basic Configuration' ) ?></h3>
        <!-- /main heading -->
    </div>

    <div class="panel-group lw-accordion" id="accordion" role="tablist" aria-multiselectable="true">	
    	<!-- General Setting -->
		<div class="panel panel-default">
    		<div class="panel-heading" role="tab">
    			<h4 class="panel-title">
			      	<a ng-class="{ 'collapsed': !settingsCtrl.generalPanelStatus }" role="button" ng-click="settingsCtrl.getPage(1)" title="<?= __('General') ?>" data-toggle="collapse" data-parent="#accordion" data-target="#general" aria-expanded="false" aria-controls="general">
			          	<div class="lw-collapsed">
                       		<?=  __('General')  ?>
                        	<i class="pull-right fa fa-caret-down lw-on-expand"></i>
                            <i class="pull-right fa fa-caret-right lw-on-collapsed"></i>
                        </div>
			        </a>
			    </h4>
    		</div>

    		<div id="general" ng-class="settingsCtrl.generalPanelClass" role="tabpanel" aria-labelledby="headingThree" ng-if="settingsCtrl.generalPanelStatus">
    			<div class="panel-body">
                	@include('store.general')
                </div>
            </div>
    	</div>
		<!-- /General Setting -->

		<!-- Currency Setting -->
    	<div class="panel panel-default">
    		<div class="panel-heading" role="tab">

    			<h4 class="panel-title">
			      	<a ng-class="{ 'collapsed': !settingsCtrl.currencyPanelStatus }" role="button" ng-click="settingsCtrl.getPage(2)" title="<?= __('Currency') ?>" data-toggle="collapse" data-parent="#accordion" data-target="#currency" aria-expanded="false" aria-controls="currency">
			          	<div class="lw-collapsed">
                       		<?=  __('Currency')  ?>
                        	<i class="pull-right fa fa-caret-down lw-on-expand"></i>
                            <i class="pull-right fa fa-caret-right lw-on-collapsed"></i>
                        </div>
			        </a>
			    </h4>
    		</div>

    		<div id="currency" ng-class="settingsCtrl.currencylPanelClass" role="tabpanel" aria-labelledby="headingThree" ng-if="settingsCtrl.currencyPanelStatus">
    			<div class="panel-body">
                	@include('store.currency')
                </div>
            </div>
    	</div>
    	<!-- /Currency Setting -->
		
		<!-- Order Setting -->
    	<div class="panel panel-default">
    		<div class="panel-heading" role="tab">

    			<h4 class="panel-title">
			      	<a ng-class="{ 'collapsed': !settingsCtrl.orderPanelStatus }" role="button" ng-click="settingsCtrl.getPage(3)" data-toggle="collapse" title="<?= __('Order & Payments') ?>" data-parent="#accordion" data-target="#order" aria-expanded="false" aria-controls="order">
			          	<div class="lw-collapsed">
                       		<?=  __('Order & Payments')  ?>
                        	<i class="pull-right fa fa-caret-down lw-on-expand"></i>
                            <i class="pull-right fa fa-caret-right lw-on-collapsed"></i>
                        </div>
			        </a>
			    </h4>
    		</div>

    		<div id="order" ng-class="settingsCtrl.orderPanelClass" role="tabpanel" aria-labelledby="headingThree" ng-if="settingsCtrl.orderPanelStatus">
    			<div class="panel-body">
                	@include('store.order')
                </div>
            </div>
    	</div>
    	<!-- /Order Setting -->

		<!-- Products Setting -->
    	<div class="panel panel-default">
    		<div class="panel-heading" role="tab">

    			<h4 class="panel-title">
			      	<a ng-class="{ 'collapsed': !settingsCtrl.productPanelStatus }" role="button" ng-click="settingsCtrl.getPage(4)" data-toggle="collapse" title="<?= __('Products') ?>" data-parent="#accordion" data-target="#product" aria-expanded="false" aria-controls="product">
			          	<div class="lw-collapsed">
                       		<?=  __('Products')  ?>
                        	<i class="pull-right fa fa-caret-down lw-on-expand"></i>
                            <i class="pull-right fa fa-caret-right lw-on-collapsed"></i>
                        </div>
			        </a>
			    </h4>
    		</div>

    		<div id="product" ng-class="settingsCtrl.productsPanelClass" role="tabpanel" aria-labelledby="headingThree" ng-if="settingsCtrl.productPanelStatus">
    			<div class="panel-body">
                	@include('store.product')
                </div>
            </div>
    	</div>
		<!-- /Products Setting -->
		
		<!-- Placement & Other element Setting -->
    	<div class="panel panel-default">
    		<div class="panel-heading" role="tab">

    			<h4 class="panel-title">
			      	<a ng-class="{ 'collapsed': !settingsCtrl.placementPanelStatus }" role="button" ng-click="settingsCtrl.getPage(5)" data-toggle="collapse" title="<?= __('Placements & Other Elements') ?>" data-parent="#accordion" data-target="#placement" aria-expanded="false" aria-controls="placement">
			          	<div class="lw-collapsed">
                       		<?=  __('Placement & Other Elements')  ?>
                        	<i class="pull-right fa fa-caret-down lw-on-expand"></i>
                            <i class="pull-right fa fa-caret-right lw-on-collapsed"></i>
                        </div>
			        </a>
			    </h4>
    		</div>

    		<div id="placement" ng-class="settingsCtrl.placementPanelClass" role="tabpanel" aria-labelledby="headingThree" ng-if="settingsCtrl.placementPanelStatus">
    			<div class="panel-body">
                	@include('store.placement')
                </div>
            </div>
    	</div>
    	<!-- /Placement & Other element Setting -->
		
		<!-- Contact Setting -->
    	<div class="panel panel-default">
    		<div class="panel-heading" role="tab">

    			<h4 class="panel-title">
			      	<a ng-class="{ 'collapsed': !settingsCtrl.contactPanelStatus }" role="button" ng-click="settingsCtrl.getPage(6)" data-toggle="collapse" title="<?= __('Contact') ?>" data-parent="#accordion" data-target="#contact" aria-expanded="false" aria-controls="contact">
			          	<div class="lw-collapsed">
                       		<?=  __('Contact')  ?>
                        	<i class="pull-right fa fa-caret-down lw-on-expand"></i>
                            <i class="pull-right fa fa-caret-right lw-on-collapsed"></i>
                        </div>
			        </a>
			    </h4>
    		</div>

    		<div id="contact" ng-class="settingsCtrl.contactPanelClass" role="tabpanel" aria-labelledby="headingThree" ng-if="settingsCtrl.contactPanelStatus">
    			<div class="panel-body">
                	@include('store.contact')
                </div>
            </div>
    	</div>
		<!-- /Contact Setting -->

		<!-- Users-->
    	<div class="panel panel-default">
    		<div class="panel-heading" role="tab">

    			<h4 class="panel-title">
			      	<a ng-class="{ 'collapsed': !settingsCtrl.termsConditionPanelStatus }" role="button" ng-click="settingsCtrl.getPage(7)" data-toggle="collapse" title="<?= __('Users') ?>" data-parent="#accordion" data-target="#termsAndCondition" aria-expanded="false" aria-controls="termsAndCondition">
			          	<div class="lw-collapsed">
                       		<?=  __('Users')  ?>
                        	<i class="pull-right fa fa-caret-down lw-on-expand"></i>
                            <i class="pull-right fa fa-caret-right lw-on-collapsed"></i>
                        </div>
			        </a>
			    </h4>
    		</div>

    		<div id="termsAndCondition" ng-class="settingsCtrl.termsConditionsPanelClass" role="tabpanel" aria-labelledby="headingThree" ng-if="settingsCtrl.termsConditionPanelStatus">
    			<div class="panel-body">
                	@include('store.term-condition')
                </div>
            </div>
    	</div>
		<!-- /Users -->

		<!-- Privacy Policy Setting -->
    	<div class="panel panel-default">
    		<div class="panel-heading" role="tab">

    			<h4 class="panel-title">
			      	<a ng-class="{ 'collapsed': !settingsCtrl.privacyPolicyPanelStatus }" role="button" ng-click="settingsCtrl.getPage(8)" data-toggle="collapse" title="<?= __('Privacy Policy') ?>" data-parent="#accordion" data-target="#privacyPolicy" aria-expanded="false" aria-controls="privacyPolicy">
			          	<div class="lw-collapsed">
                       		<?=  __('Privacy Policy')  ?>
                        	<i class="pull-right fa fa-caret-down lw-on-expand"></i>
                            <i class="pull-right fa fa-caret-right lw-on-collapsed"></i>
                        </div>
			        </a>
			    </h4>
    		</div>

    		<div id="privacyPolicy" ng-class="settingsCtrl.privacyPolicyPanelClass" role="tabpanel" aria-labelledby="headingThree" ng-if="settingsCtrl.privacyPolicyPanelStatus">
    			<div class="panel-body">
                	@include('store.privacy-policy')
                </div>
            </div>
    	</div>
    	<!-- /Privacy Policy Setting -->
		
		<!-- Social Setting -->
    	<div class="panel panel-default">
    		<div class="panel-heading" role="tab">

    			<h4 class="panel-title">
			      	<a ng-class="{ 'collapsed': !settingsCtrl.socialPanelStatus }" role="button" ng-click="settingsCtrl.getPage(9)" data-toggle="collapse" title="<?= __('Social') ?>" data-parent="#accordion" data-target="#social" aria-expanded="false" aria-controls="social">
			          	<div class="lw-collapsed">
                       		<?=  __('Social')  ?>
                        	<i class="pull-right fa fa-caret-down lw-on-expand"></i>
                            <i class="pull-right fa fa-caret-right lw-on-collapsed"></i>
                        </div>
			        </a>
			    </h4>
    		</div>

    		<div id="social" ng-class="settingsCtrl.socialPanelClass" role="tabpanel" aria-labelledby="headingThree" ng-if="settingsCtrl.socialPanelStatus">
    			<div class="panel-body">
                	@include('store.social')
                </div>
            </div>
    	</div>
    	<!-- /Social Setting -->

        <!-- Css Style -->
        <div class="panel panel-default">
            <div class="panel-heading" role="tab">

                <h4 class="panel-title">
                    <a ng-class="{ 'collapsed': !settingsCtrl.cssStylePanelStatus }" role="button" ng-click="settingsCtrl.getPage(10)" data-toggle="collapse" title="<?= __('CSS Style') ?>" data-parent="#accordion" data-target="#cssStyle" aria-expanded="false" aria-controls="cssStyle">
                        <div class="lw-collapsed">
                            <?=  __('CSS Style')  ?>
                            <i class="pull-right fa fa-caret-down lw-on-expand"></i>
                            <i class="pull-right fa fa-caret-right lw-on-collapsed"></i>
                        </div>
                    </a>
                </h4>
            </div>

            <div id="cssStyle" ng-class="settingsCtrl.cssStylePanelClass" role="tabpanel" aria-labelledby="headingThree" ng-if="settingsCtrl.cssStylePanelStatus">
                <div class="panel-body">
                    @include('store.css-style')
                </div>
            </div>
        </div>
        <!-- /Css Style -->


    </div>
    
</div>