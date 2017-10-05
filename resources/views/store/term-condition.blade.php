<div ng-controller="TermAndConditionSettingsController as termAndConditionCtrl" class="col-lg-9">
	
	<!-- form action -->
	<form class="lw-form lw-ng-form" 
		name="termAndConditionCtrl.[[ termAndConditionCtrl.ngFormName ]]" 
        ng-submit="termAndConditionCtrl.submit()" novalidate>

        <!-- Activation Required For New User -->
        <lw-form-checkbox-field field-for="activation_required_for_new_user" label="<?= __( 'Activation Required For New User' ) ?>" advance="true" ng-if="termAndConditionCtrl.pageStatus">
            <input type="checkbox" 
                class="lw-form-field js-switch"
                name="activation_required_for_new_user"
                ng-model="termAndConditionCtrl.editData.activation_required_for_new_user"
                ui-switch="" />
        </lw-form-checkbox-field>
        <!-- /Activation Required For New User -->

        <!-- Activation Required For Change Email -->
        <lw-form-checkbox-field field-for="activation_required_for_change_email" label="<?= __( 'Activation Required For Change Email' ) ?>" advance="true"  ng-if="termAndConditionCtrl.pageStatus">
            <input type="checkbox" 
                class="lw-form-field js-switch"
                name="activation_required_for_change_email"
                ng-model="termAndConditionCtrl.editData.activation_required_for_change_email"
                ui-switch="" />
        </lw-form-checkbox-field>
        <!-- /Activation Required For Change User -->

        <fieldset class="lw-fieldset-2">
            <legend class="lw-fieldset-legend-font"><?= __('Login settings') ?></legend>
            <div class="form-inline">
                <?= __('show captcha after') ?>

                <!-- Show Captcha after login attempt -->
                <lw-form-field field-for="show_captcha" v-label="<?= __( 'Show Captcha' ) ?>"> 
                    <input type="number" 
                            class="lw-form-field form-control"
                            autofocus
                            name="show_captcha"
                            ng-required="true"
                            min="1"
                            ng-model="termAndConditionCtrl.editData.show_captcha" />
                </lw-form-field>
                <!-- /Show Captcha after login attempt -->

                <?= __(' login attempts') ?>
            </div>
        </fieldset>
    	
    	<!-- terms and condition ck editor -->
		<div ng-if="termAndConditionCtrl.pageStatus">
	        <lw-form-field field-for="term_condition" label="<?= __( 'Terms & Conditions For User Registration' ) ?>" > 
		        <textarea 
		            name="term_condition" 
		            class="lw-form-field form-control" 
		            cols="30" 
		            rows="10" 
		            ng-minlength="6" 
		            ng-model="termAndConditionCtrl.editData.term_condition" 
		            lw-ck-editor 
		            >
		        </textarea>
	    	</lw-form-field>
		  	<!-- /terms and condition ck editor -->   
			
			<!-- update button -->
			<div class="form-group">
	            <button type="submit" class="lw-btn btn btn-primary" title="<?= __('Update') ?>">
	            <?= __('Update') ?> <span></span></button>
	        </div>
	        <!-- update button -->
	    </div>
	</form>
	<!-- /form action -->
</div>