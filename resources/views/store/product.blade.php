<div ng-controller="ProductSettingsController as productSettingsCtrl" class="col-lg-9">

	<!-- form action -->
	<form class="lw-form lw-ng-form" name="productSettingsCtrl.[[ productSettingsCtrl.ngFormName ]]" 
        ng-submit="productSettingsCtrl.submit()" 
        novalidate>
		
		<div class="lw-main-loader lw-show-till-loading" 
			 ng-if="productSettingsCtrl.pageStatus == false">
        	<div class="loader"><?=  __('Loading...')  ?></div>
    	</div>

    	<div ng-if="productSettingsCtrl.pageStatus">
			<!--Show Out of Stock Products    -->
	        <lw-form-checkbox-field field-for="show_out_of_stock" label="<?= __( 'Show Out Of Stock Products' ) ?>" ng-if="productSettingsCtrl.pageStatus">
	            <input type="checkbox" 
	                 class="lw-form-field js-switch"
	            	ui-switch=""
	            	name="show_out_of_stock"
	            	ng-model="productSettingsCtrl.editData.show_out_of_stock"/>
	        </lw-form-checkbox-field>
	        <!-- /Show Out of Stock Products   -->

			<div class="alert alert-info" ng-show="productSettingsCtrl.editData.item_load_type == 1">
			  <?= __('<strong>Note </strong>Minimum 20 products per page in the list is required to use scroll.') ?>
			</div>

			<div class="alert alert-info" ng-show="productSettingsCtrl.editData.item_load_type == 2">
			  <?= __('<strong>Note </strong>Minimum 5 products per page in the list is required to use button.') ?>
			</div>

	        <!-- Products per page -->
	        <lw-form-field field-for="pagination_count" ng-if="productSettingsCtrl.editData.item_load_type == 1" label="<?= __( 'Products Per Page On List' ) ?>"> 
	            <input type="number" 
	                class="lw-form-field form-control"
	                autofocus
	                name="pagination_count"
	                ng-required="true"
	                min="20"
	                max="100" 
	                step="1"
	                ng-model="productSettingsCtrl.editData.pagination_count" />
	        </lw-form-field>
	        <!-- Products per page -->

	        <!-- Products per page -->
	        <lw-form-field field-for="pagination_count" ng-if="productSettingsCtrl.editData.item_load_type == 2" label="<?= __( 'Products Per Page On List' ) ?>"> 
	            <input type="number" 
	                class="lw-form-field form-control"
	                autofocus
	                name="pagination_count"
	                ng-required="true"
	                min="5"
	                max="100" 
	                step="1"
	                ng-model="productSettingsCtrl.editData.pagination_count" />
	        </lw-form-field>
	        <!-- Products per page -->

	        <fieldset class="lw-fieldset-2">

		        <legend>
		              <?=  __('Load Type')  ?>
		        </legend>

	            <!-- item load type -->
	            <lw-form-radio-field field-for="item_load_type" label="<?= __('Load Type' ) ?>">
	             	<span>
				    <label class="radio-inline">
				      <input type="radio" name="item_load_type" ng-model="productSettingsCtrl.editData.item_load_type" ng-value="1"><?= __('Use Scroll') ?>
				    </label>
	                <label class="radio-inline">
				      <input type="radio" name="item_load_type" ng-model="productSettingsCtrl.editData.item_load_type" ng-value="2"><?= __('Use Button') ?>
				    </label>
		        	</span>
	            </lw-form-radio-field>
	            <!-- /item load type -->
	        </fieldset>

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