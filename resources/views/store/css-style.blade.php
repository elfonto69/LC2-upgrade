<div ng-controller="CssStyleSettingsController as cssStyleCtrl" class="col-lg-9">
	
	<!-- form action -->
	<form class="lw-form lw-ng-form" name="cssStyleCtrl.[[ cssStyleCtrl.ngFormName ]]" 
        ng-submit="cssStyleCtrl.submit()" 
        novalidate>

		<div class="form-group">
            <div class="alert alert-info">
              <?= __('<strong>Note : </strong> Please be carefully While adding your own CSS it will affect on site.') ?>
            </div>
        <label for="custom_css"><?= __('Write your own CSS Styles') ?></label>
        <textarea name="custom_css" id="custom_css" class="lw-css-style-editor lw-form-field form-control" ng-required="true"
            cols="30" rows="10" ng-model="cssStyleCtrl.editData.custom_css"></textarea>
        </div>  
          
		<!-- button -->
		<div class="form-group">
            <button type="submit" class="lw-btn btn btn-primary" title="<?= __('Update') ?>">
            <?= __('Update') ?> <span></span></button>
        </div>
        <!-- /button -->

	</form>
	<!-- /form action -->
</div>