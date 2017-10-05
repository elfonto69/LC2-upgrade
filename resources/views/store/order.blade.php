<div ng-controller="OrderSettingsController as orderSettingsCtrl" class="col-lg-9">
	
	<!-- form action -->
	<form class="lw-form lw-ng-form" 
		name="orderSettingsCtrl.[[ orderSettingsCtrl.ngFormName ]]" 
        ng-submit="orderSettingsCtrl.submit()" 
        novalidate>

		<!-- page Loader -->
	    <div class="lw-main-loader lw-show-till-loading" ng-if="orderSettingsCtrl.pageStatus == false">
	        <div class="loader"><?=  __('Loading...')  ?></div>
	    </div>
		<!-- /page Loader -->

        <div ng-if="orderSettingsCtrl.pageStatus">
        
	    <fieldset class="lw-fieldset-2">
	        <legend>
	              <?=  __('Order')  ?>
	        </legend>

	        <!-- Hide Sidebar On Order Summary Page -->
	        <lw-form-checkbox-field 
        		field-for="hide_sidebar_on_order_page" 
        		label="<?= __( 'Hide Sidebar On Order Submit Page.' ) ?>" ng-if="orderSettingsCtrl.pageStatus">
              	<input type="checkbox" 
                  class="lw-form-field js-switch"
                  ui-switch=""
                  name="hide_sidebar_on_order_page"
                  ng-model="orderSettingsCtrl.editData.hide_sidebar_on_order_page"/>
	        </lw-form-checkbox-field>
	        <!-- /Hide Sidebar On Order Summary Page -->
	       
            <fieldset class="lw-fieldset-2">
                <legend><?= __('Tax') ?></legend>


            <!-- Apply Tax -->
            <lw-form-radio-field field-for="apply_tax_after_before_discount" label="<?= __( 'Apply Tax' ) ?>"> 
                <?= __('Apply Tax') ?>
                <span>
                    <label class="radio-inline">
                        <input ng-model="orderSettingsCtrl.editData.apply_tax_after_before_discount" type="radio" name="apply_tax_after_before_discount" ng-value="1" ng-required="true"><?= __('Before Discount') ?>
                    </label>

                    <label class="radio-inline">
                        <input ng-model="orderSettingsCtrl.editData.apply_tax_after_before_discount" type="radio" name="apply_tax_after_before_discount" ng-value="2" ng-required="true"><?= __('After Discount') ?>
                    </label>
                </span>
            </lw-form-radio-field>
            <!-- /Apply Tax -->

            <!-- Calculate Tax as per -->
            <lw-form-radio-field field-for="calculate_tax_as_per_shipping_billing" label="<?= __( 'Apply Tax' ) ?>"> 
                <?= __('Calculate Tax as per') ?>
                <span>
                    <label class="radio-inline">
                        <input ng-model="orderSettingsCtrl.editData.calculate_tax_as_per_shipping_billing" type="radio" name="calculate_tax_as_per_shipping_billing" ng-value="1" ng-required="true"><?= __('Shipping Address') ?>
                    </label>

                    <label class="radio-inline">
                        <input ng-model="orderSettingsCtrl.editData.calculate_tax_as_per_shipping_billing" type="radio" name="calculate_tax_as_per_shipping_billing" ng-value="2" ng-required="true"><?= __('Billing Address') ?>
                    </label>
                </span>
            </lw-form-radio-field>
            <!-- /Calculate Tax as per --> 
            </fieldset>
	   </fieldset>


		<fieldset class="lw-fieldset-2">
			<legend>
				<?=  __('Payments')  ?>
			</legend>
		
			<div class='form-group'>

	            <!-- Use Paypal -->
		        <lw-form-checkbox-field field-for="use_paypal" label="<?= __( 'PayPal' ) ?>"  ng-if="orderSettingsCtrl.pageStatus">
		            <input type="checkbox" 
		                class="lw-form-field js-switch"
	                	ui-switch=""
	                	name="use_paypal"
	                	ng-model="orderSettingsCtrl.editData.use_paypal"/>
		        </lw-form-checkbox-field>
		        <!-- /Use Paypal -->
				
				<div ng-if="orderSettingsCtrl.editData.use_paypal">

    		        <!-- Paypal Email -->
    		        <lw-form-field field-for="paypal_email" label="<?= __( 'PayPal Email' ) ?>"> 
    		            <input type="email" 
                              placeholder="[[ orderSettingsCtrl.editData.paypal_email_placeholder ]]" 
    		                  class="lw-form-field form-control"
    		                  name="paypal_email"
    		                  ng-required="true" 
    		                  ng-model="orderSettingsCtrl.editData.paypal_email"/>
    		        </lw-form-field>
    		        <!-- Paypal Email -->

                    <!-- Paypal Sandbox Email -->
                    <lw-form-field field-for="paypal_sandbox_email" label="<?= __( 'PayPal Sandbox Email (Testing) ' ) ?>"> 
                        <input type="email" 
                              placeholder="[[ orderSettingsCtrl.editData.paypal_sandbox_email_placeholder ]]"
                              class="lw-form-field form-control"
                              name="paypal_sandbox_email"
                              ng-required="true" 
                              ng-model="orderSettingsCtrl.editData.paypal_sandbox_email"/>
                    </lw-form-field>
                    <!-- /Paypal Sandbox Email -->

		        </div>

		  	</div>

            <div class='form-group'>

                <!-- Use stripe -->
                <lw-form-checkbox-field field-for="use_stripe" label="<?= __( 'Use Stripe' ) ?>" advance="true">
                    <input type="checkbox" 
                        class="lw-form-field js-switch"
                        ui-switch=""
                        name="use_stripe"
                        ng-model="orderSettingsCtrl.editData.use_stripe"/>
                </lw-form-checkbox-field>
                <!-- /Use stripe -->

                <div ng-if="orderSettingsCtrl.editData.use_stripe">

                <fieldset class="lw-fieldset-2">

                    <legend class="lw-fieldset-legend-font">  
                        <?= __("Live") ?>
                    </legend>

                    <!-- show after added live stripe information -->
                    <div class="btn-group" ng-if="orderSettingsCtrl.editData.use_stripe && orderSettingsCtrl.editData.isLiveStripeKeysExist">
                      <button type="button" disabled="true" class="btn btn-success"><?= __('Live Stripe keys are installed.') ?></button>
                      <button type="button" ng-click="orderSettingsCtrl.addStripeKeys(1)" class="btn btn-default"><?= __('Update') ?></button>
                    </div>
                    <!-- show after added live stripe information -->

                    <!-- Stripe Live Key -->
                    <lw-form-field field-for="stripe_live_secret_key" label="<?= __( 'Secret Key' ) ?>" ng-if="orderSettingsCtrl.editData.use_stripe && !orderSettingsCtrl.editData.isLiveStripeKeysExist"> 
                        <input type="text" 
                            placeholder="[[ orderSettingsCtrl.editData.stripe_live_secret_key_placeholder ]]" 
                            class="lw-form-field form-control"
                            name="stripe_live_secret_key"
                            ng-required="orderSettingsCtrl.editData.stripe_live_publishable_key" 
                            ng-model="orderSettingsCtrl.editData.stripe_live_secret_key"/>
                    </lw-form-field>
                    <!-- /Stripe Live Key -->

                    <!-- Publishable Key -->
                    <lw-form-field field-for="stripe_live_publishable_key" label="<?= __( 'Publishable Key' ) ?>" ng-if="orderSettingsCtrl.editData.use_stripe && !orderSettingsCtrl.editData.isLiveStripeKeysExist"> 
                        <input type="text" 
                            placeholder="[[ orderSettingsCtrl.editData.stripe_live_publishable_key_placeholder ]]"
                            class="lw-form-field form-control"
                            name="stripe_live_publishable_key"
                            ng-required="orderSettingsCtrl.editData.stripe_live_secret_key" 
                            ng-model="orderSettingsCtrl.editData.stripe_live_publishable_key"/>
                    </lw-form-field>
                    <!-- /Publishable Key -->
                </fieldset>


                <fieldset class="lw-fieldset-2">

                    <legend class="lw-fieldset-legend-font">  
                        <?= __("Testing") ?>
                    </legend>

                    <!-- show after added testing stripe information -->
                    <div class="btn-group" ng-if="orderSettingsCtrl.editData.use_stripe && orderSettingsCtrl.editData.isTestingStripeKeysExist">
                      <button type="button" disabled="true" class="btn btn-success"><?= __('Live Stripe keys are installed.') ?></button>
                      <button type="button" ng-click="orderSettingsCtrl.addStripeKeys(2)" class="btn btn-default"><?= __('Update') ?></button>
                    </div>
                    <!-- show after added testing stripe information -->

                    <!-- Testing Secret Live Key -->
                    <lw-form-field field-for="stripe_testing_secret_key" label="<?= __( 'Secret Key' ) ?>" ng-if="orderSettingsCtrl.editData.use_stripe && !orderSettingsCtrl.editData.isTestingStripeKeysExist"> 
                        <input type="text" 
                              placeholder="[[ orderSettingsCtrl.editData.stripe_testing_secret_key_placeholder ]]"
                              class="lw-form-field form-control"
                              name="stripe_testing_secret_key"
                              ng-required="orderSettingsCtrl.editData.stripe_testing_publishable_key" 
                              ng-model="orderSettingsCtrl.editData.stripe_testing_secret_key"/>
                    </lw-form-field>
                    <!-- /Testing Stripe Live Key -->

                    <!-- Testing Publishable Key -->
                    <lw-form-field field-for="stripe_testing_publishable_key" label="<?= __( 'Publishable Key' ) ?>" ng-if="orderSettingsCtrl.editData.use_stripe && !orderSettingsCtrl.editData.isTestingStripeKeysExist"> 
                        <input type="text" 
                              placeholder="[[ orderSettingsCtrl.editData.stripe_testing_publishable_key_placeholder ]]"
                              class="lw-form-field form-control"
                              name="stripe_testing_publishable_key"
                              ng-required="orderSettingsCtrl.editData.stripe_testing_secret_key" 
                              ng-model="orderSettingsCtrl.editData.stripe_testing_publishable_key"/>
                    </lw-form-field>
                    <!-- /Testing Publishable Key -->
                </fieldset>

            </div>

            </div>
	  	
			<!-- Check Payment -->
	        <div>
	        	<!-- Check Payment checkbox -->
		        <lw-form-checkbox-field field-for="payment_check" label="<?= __( 'Check Payment' ) ?>"  ng-if="orderSettingsCtrl.pageStatus">
		            <input type="checkbox" 
		                class="lw-form-field js-switch"
	                	ui-switch=""
	                	name="payment_check"
	                	ng-model="orderSettingsCtrl.editData.payment_check"/>
		        </lw-form-checkbox-field>
		        <!-- /Check Payment checkbox -->
				
				<!-- Check Payment textarea -->
		        <div ng-if="orderSettingsCtrl.editData.payment_check == true">
			        <lw-form-field field-for="payment_check_text" label="<?= __( 'Check Payment Information' ) ?>"> 
			            <textarea name="payment_check_text" class="lw-form-field form-control" ng-required="true" cols="30" rows="10" ng-model="orderSettingsCtrl.editData.payment_check_text" lw-ck-editor></textarea>
			         </lw-form-field>
	         	</div>
	         	<!-- /Check Payment textarea -->
	        </div>
	        <!-- /Check Payment -->
			
			<!-- Bank Payment -->
	        <div>
	        	<!-- Bank Payment checkbox -->
		        <lw-form-checkbox-field field-for="payment_bank" label="<?= __( 'Bank Payment' ) ?>"  ng-if="orderSettingsCtrl.pageStatus">
		            <input type="checkbox" 
		                class="lw-form-field js-switch"
	                	ui-switch=""
	                	name="payment_bank"
	                	ng-model="orderSettingsCtrl.editData.payment_bank"/>
		        </lw-form-checkbox-field>
		        <!-- /Bank Payment checkbox -->

		        <!-- Bank Payment textarea -->
		        <div ng-if="orderSettingsCtrl.editData.payment_bank == true">
			        <lw-form-field field-for="payment_bank_text" label="<?= __( 'Bank Payment Information' ) ?>"> 
			            <textarea name="payment_bank_text" class="lw-form-field form-control" ng-required="true" cols="30" rows="10" ng-model="orderSettingsCtrl.editData.payment_bank_text" lw-ck-editor></textarea>
			         </lw-form-field>
	         	</div>
	         	<!-- /Bank Payment textarea -->
	        </div>
	        <!-- /Bank Payment -->
			
			<!-- COD Payment -->
	        <div>
	        	<!-- COD Payment checkbox -->
		        <lw-form-checkbox-field field-for="payment_cod" label="<?= __( 'COD Payment' ) ?>"  ng-if="orderSettingsCtrl.pageStatus">
		            <input type="checkbox" 
		                class="lw-form-field js-switch"
	                	ui-switch=""
	                	name="payment_cod"
	                	ng-model="orderSettingsCtrl.editData.payment_cod"/>
		        </lw-form-checkbox-field>
		        <!-- /COD Payment checkbox -->

		        <!-- COD Payment textarea -->
		        <div ng-if="orderSettingsCtrl.editData.payment_cod == true">
			        <lw-form-field field-for="payment_cod_text" label="<?= __( 'COD Payment Information' ) ?>"> 
			            <textarea name="payment_cod_text" class="lw-form-field form-control" ng-required="true" cols="30" rows="10" ng-model="orderSettingsCtrl.editData.payment_cod_text" lw-ck-editor></textarea>
			         </lw-form-field>
	         	</div>
	         	<!-- /COD Payment textarea -->
	        </div>
	       	<!-- /COD Payment -->

			<!-- Other Payment -->
	       <div>
	       		<!-- Use Submit Order by Email -->
	            <lw-form-checkbox-field field-for="payment_other" label="<?= __( 'Other' ) ?>" ng-if="orderSettingsCtrl.pageStatus">
	                <input type="checkbox" 
	                    class="lw-form-field js-switch"
	                    ui-switch=""
	                    name="payment_other"
	                    ng-model="orderSettingsCtrl.editData.payment_other"/>
	            </lw-form-checkbox-field>
	            <!-- /Use Submit Order by Email -->

	            <!-- ck editor for customer contact you after placed order -->
		        <div ng-if="orderSettingsCtrl.editData.payment_other">
			        <lw-form-field field-for="payment_other_text" label="<?= __( 'Other Order Payment Information') ?>"> 
			            <textarea name="payment_other_text" class="lw-form-field form-control" ng-required="true" cols="30" rows="10" ng-model="orderSettingsCtrl.editData.payment_other_text" lw-ck-editor></textarea>
			         </lw-form-field>
	         	</div>
         		<!-- /ck editor for customer contact you after placed order -->
	       </div>	
	       <!-- Other Payment -->
	    </fieldset>

		  	<!-- button --> 
			<div class="form-group">
	            <button type="submit" class="lw-btn btn btn-primary" title="<?= __('Update') ?>">
	            <?= __('Update') ?> <span></span></button>
	        </div>
	        <!-- /button --> 
                
            </div>
	</form>
	<!-- /form action -->
</div>