<div ng-controller="CurrencySettingsController as currencySettingsCtrl" class="col-lg-9">
	
	<!-- form action -->
	<form class="lw-form lw-ng-form" 
		name="currencySettingsCtrl.[[ currencySettingsCtrl.ngFormName ]]" 
        ng-submit="currencySettingsCtrl.submit()" 
        novalidate>

		<!-- page Loader -->
        <div class="lw-main-loader lw-show-till-loading" 
            ng-if="currencySettingsCtrl.pageStatus == false">
            <div class="loader"><?=  __('Loading...')  ?></div>
        </div>
        <!-- page Loader -->

        <!-- Currency -->
        <div ng-if="currencySettingsCtrl.pageStatus">
            
            <div class="form-group">
                <lw-form-selectize-field field-for="currency" label="<?= __( 'Currency' ) ?>" class="lw-selectize">
                    <selectize 
                        config='currencySettingsCtrl.currencies_select_config' 
                        class="lw-form-field" 
                        name="currency" 
                        ng-model="currencySettingsCtrl.editData.currency" 
                        options='currencySettingsCtrl.currencies_options' 
                        placeholder="<?= __( 'Select Currency' ) ?>" 
                        ng-required="true"  
                        ng-change="currencySettingsCtrl.currencyChange(currencySettingsCtrl.editData.currency, currencySettingsCtrl.editData.currency_symbol, currencySettingsCtrl.editData.currency_value)">
                    </selectize>
                </lw-form-selectize-field>
            </div>
            <!-- /Currency -->
            
            <div ng-hide="currencySettingsCtrl.isPaypalSupport" class="alert alert-warning"><i class="fa fa-exclamation-triangle"></i> <?= __( 'Currency may not supported by PayPal' ) ?></div>

            <div class="alert alert-info">
                <?= __("Please check supported currencies for your payment method.") ?>
            </div>

            <span class="pull-right"><a href="https://developer.paypal.com/docs/classic/api/currency_codes/" target="__blank" title="<?= __('You can see PayPal Supported Currencies more information in detail.') ?>"><?= __('PayPal Supported Currencies') ?></a></span><br>

            <span class="pull-right"><a href="https://support.stripe.com/questions/which-currencies-does-stripe-support " target="__blank" title="<?= __('You can see Stripe Supported Currencies more information in detail.') ?>"><?= __('Stripe Supported Currencies') ?></a></span><br>
            
            <!-- Currency Value -->
            <lw-form-field field-for="currency_value" label="<?= __( 'Currency Code' ) ?>"> 
                <input type="text" 
                    class="lw-form-field form-control"
                    name="currency_value"
                    ng-required="true"
                    ng-change="currencySettingsCtrl.currencyValueChange( currencySettingsCtrl.editData.currency_value)" 
                    ng-model="currencySettingsCtrl.editData.currency_value"/>
            </lw-form-field>
            <!-- Currency Value -->

            <span ng-show="currencySettingsCtrl.isZeroDecimalCurrency">
                <!-- Round Zero Decimal Currency -->
                <lw-form-checkbox-field field-for="round_zero_decimal_currency" label="<?= __( 'Round Zero Decimal Currency' ) ?>" advance="true">
                    <input type="checkbox" 
                        class="lw-form-field js-switch"
                        name="round_zero_decimal_currency"
                        ng-model="currencySettingsCtrl.editData.round_zero_decimal_currency"
                        ui-switch="" />
                </lw-form-checkbox-field>
                <!-- /Round Zero Decimal Currency -->

                <div class="alert alert-warning" ng-show="currencySettingsCtrl.editData.round_zero_decimal_currency">
                    <?= __('All the price and amount will be rounded. Eg : 10.25 It will become 10 , 10.57 It will become 11.') ?>
                </div>

                <div class="alert alert-danger" ng-show="!currencySettingsCtrl.editData.round_zero_decimal_currency">
                    <i class="fa fa-exclamation-triangle"></i>  <?= __("This currency doesn't support Decimal values it may create error at payment.") ?>
                </div>

            </span>

            <!-- Currency Symbol -->
            <lw-form-field field-for="currency_symbol" label="<?= __( 'Currency Symbol' ) ?>"> 
                <div class="input-group">
                    <input type="text" 
                      class="lw-form-field form-control"
                      name="currency_symbol"
                      ng-required="true" 
                      ng-model="currencySettingsCtrl.editData.currency_symbol"
                      ng-change="currencySettingsCtrl.updateCurrencyPreview(currencySettingsCtrl.editData.currency_symbol, currencySettingsCtrl.editData.currency_value)" />
                      <span class="input-group-addon" id="lwSymbol" data="[[currencySettingsCtrl.editData.currency_symbol]]" ng-bind-html="currencySettingsCtrl.editData.currency_symbol"></span>
                    </div>
            </lw-form-field>
            <!-- Currency Symbol -->

            <span class="pull-right"><?= __('Refer for') ?> <a href="http://goo.gl/zRJRq" target="_blank"><?= __('ASCII Codes') ?></a></span>

            <input type="hidden" id="lwOrderUpdateTextMsg" data-message="<?= __( 'Order Payment Update successfully') ?>" data-delete-button-text="<?= __('Yes, delete it') ?>" order-status-change="<?= __( 'Do you want to change order status also') ?>"><br><br>

            <div class="alert alert-info">
                <?= __("Do not change contains in the curly braces.") ?>
            </div>

            <!-- Currency Format -->
            <lw-form-field field-for="currency_format" label="<?= __( 'Currency Format' ) ?>"> 
                <div class="input-group">
                    <input type="text" 
                        class="lw-form-field form-control"
                        name="currency_format"
                        ng-required="true" 
                        ng-model="currencySettingsCtrl.editData.currency_format"
                        ng-keyup="currencySettingsCtrl.updateCurrencyPreview(currencySettingsCtrl.currencySymbol, currencySettingsCtrl.editData.currency_value, true)"/>
                        <span 
                            class="input-group-addon" 
                            data-format="[[currencySettingsCtrl.editData.currency_format]]"
                            title="<?= __('This is currency format preview, Which is display in publically.') ?>" 
                            id="lwCurrencyFormat" ng-bind="currencySettingsCtrl.currency_format_preview">
                        </span>
                      <span class="input-group-addon">
                      <a href ng-click="currencySettingsCtrl.useDefaultFormat(currencySettingsCtrl.default_currency_format, currencySettingsCtrl.currencySymbol, currencySettingsCtrl.editData.currency_value)" title="<?= __('Reset this format and use default format') ?>"><?= __('Use Default') ?></a></span>
                    </div>
            </lw-form-field>
            <!-- Currency Format -->
          
            
            <!-- Update -->
            <div class="form-group">
                <button type="submit" class="lw-btn btn btn-primary" title="<?= __('Update') ?>">
                <?= __('Update') ?> <span></span></button>
            </div>
            <!-- /Update -->
        </div>
        
	</form>
	<!-- /form action -->
</div>