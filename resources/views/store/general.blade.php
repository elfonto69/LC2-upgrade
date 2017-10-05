<div ng-controller="GeneralSettingsController as generalSettingsCtrl" class="col-lg-9" id="general">

	<!-- form action -->
	<form class="lw-form lw-ng-form" name="generalSettingsCtrl.[[ generalSettingsCtrl.ngFormName ]]" 
        ng-submit="generalSettingsCtrl.submit()" 
        novalidate>
		
		<div class="lw-main-loader lw-show-till-loading" ng-if="generalSettingsCtrl.pageStatus == false">
        	<div class="loader"><?=  __('Loading...')  ?></div>
    	</div>
    
		<div ng-if="generalSettingsCtrl.pageStatus">
	        <!-- Store Name -->
	        <lw-form-field field-for="store_name" label="<?= __( 'Store Name' ) ?>"> 
	            <input type="text" 
	                  class="lw-form-field form-control"
	                  autofocus
	                  name="store_name"
	                  ng-required="true" 
	                  ng-model="generalSettingsCtrl.editData.store_name" />
	        </lw-form-field>
	        <!-- Store Name -->

			<div class="form-group lw-current-logo-conatiner" ng-show="generalSettingsCtrl.editData.logoURL" style="background: #[[ generalSettingsCtrl.editData.logo_background_color ]]">
	            <label class="control-label"><?=  __("Current Logo")  ?></label>
		        <div class="lw-thumb-logo">
		        	<a href="[[generalSettingsCtrl.editData.logoURL]]" lw-ng-colorbox class="lw-thumb-logo"><img ng-src="[[generalSettingsCtrl.editData.logoURL]]" alt=""></a>
		        </div>
	        </div>
	        
	       	<!-- Select Logo Image -->
	       	<div class="form-group">
		        <lw-form-selectize-field field-for="logo_image" label="<?= __( 'New Logo' ) ?>" class="lw-selectize"><span class="badge lw-badge" ng-bind="generalSettingsCtrl.images_count"></span>
		            <selectize config='generalSettingsCtrl.logo_images_select_config' class="lw-form-field" name="logo_image" ng-model="generalSettingsCtrl.editData.logo_image" options='generalSettingsCtrl.logo_images' placeholder="<?= __( 'Only PNG images are expected' ) ?>"></selectize>
		        </lw-form-selectize-field>
                <div class="lw-form-append-btns">
                    <span class="btn btn-primary btn-xs lw-btn-file">
                        <i class="fa fa-upload"></i> 
                                <?=   __('Upload New Images')   ?>
                        <input type="file" nv-file-select="" uploader="generalSettingsCtrl.uploader" multiple/>
                    </span>
                    <button class="btn btn-default btn-xs" title="<?= __('Uploaded Images')  ?>" 
                    ng-click="generalSettingsCtrl.showUploadedMediaDialog()" type="button">
                    <?=  __("Uploaded Images")  ?></button> 
                </div>
	        </div>
	        <!-- Select Logo Image -->

	        <!-- Logo Background Color -->
	        <lw-form-field field-for="logo_background_color" label="<?= __( 'Header Background Color' )  ?>"> 
                <div class="input-group">
                    <span class="input-group-addon" style="background: #[[ generalSettingsCtrl.editData.logo_background_color ]]">#</span>
                    <input type="text" 
                        class="lw-form-field form-control"
                        autofocus
                        name="logo_background_color"
                        ng-minlength="6"
                        ng-maxlength="6"
                        lw-color-picker
                        readonly 
                        ng-model="generalSettingsCtrl.editData.logo_background_color" />
                    </div>
	        </lw-form-field>
	        <!-- Logo Background Color -->

	        <!-- Business Email -->
	        <lw-form-field field-for="business_email" label="<?= __( 'Business Email' ) ?>"> 
	            <input type="email" 
                      placeholder="[[ generalSettingsCtrl.editData.business_email_placeholder ]]" 
	                  class="lw-form-field form-control"
	                  name="business_email"
	                  ng-required="true" 
	                  ng-model="generalSettingsCtrl.editData.business_email" />
	        </lw-form-field>
	        <!-- Business Email -->
				
			<lw-form-field field-for="home_page" label="<?= __( 'Default Home Page Content' ) ?>" advance="true">

	            <selectize config='generalSettingsCtrl.home_page_select_config' class="lw-form-field" name="home_page" ng-model="generalSettingsCtrl.editData.home_page" options='generalSettingsCtrl.homePageSetting' placeholder="<?= __( 'Home Page' ) ?>"></selectize>

	        </lw-form-field> 
		
	        <!-- timezone -->
			<lw-form-field field-for="timezone" label="<?= __( 'TimeZone' ) ?>"> 
				<selectize config='generalSettingsCtrl.timezone_select_config' class="lw-form-field" name="timezone" ng-model="generalSettingsCtrl.editData.timezone" options='generalSettingsCtrl.timezoneData' placeholder="<?= __( 'TimeZone' ) ?>" ng-required="true"></selectize>
			</lw-form-field>
			<!-- /timezone -->

		       
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

<!-- New logo drop down list item template -->
<script type="text/_template" id="imageListItemTemplate">
    <div>
        <span class="lw-selectize-item lw-selectize-item-selected"><img src="<%= __tData.path %>"/> </span> <span class="lw-selectize-item-label"><%= __tData.name%></span>
    </div>
</script>
<!-- /New logo drop down list item template -->

<!-- New logo drop down list options template -->
<script type="text/_template" id="imageListOptionTemplate">
    <div class="lw-selectize-item">
        <span class="lw-selectize-item-thumb"><img src="<%= __tData.path %>"/> </span> <span class="lw-selectize-item-label"><%= __tData.name%></span>
    </div>
</script>
<!-- /New logo drop down list options template -->