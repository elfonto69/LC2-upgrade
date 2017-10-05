<div ng-controller="AlertDialogController as alertCtrl">
    
    <!-- main heading -->
    <div class="lw-section-heading-block">
        <h3 class="lw-header"><?=  __( 'Are you sure' )  ?></h3>
    </div>
    <!-- /main heading -->

    <div ng-if="alertCtrl.pageStatus">
       <span class="lw-danger" ng-bind="alertCtrl.message"></span>
    </div>
    <!-- action button -->
    <div class="lw-form-actions">

        <button type="submit" 
            class="lw-btn btn btn-primary" 
            ng-click="alertCtrl.yesSubmitIt()" 
            title="<?= __('Yes update the changes in order.') ?>"><?= __('Yes Update It') ?>
        </button>

        <button 
            type="button" 
            class="lw-btn btn btn-default" 
            ng-click="alertCtrl.closeDialog()" 
            title="<?= __('Go Back') ?>"><?= __('Go Back') ?>
        </button>
    </div>
    <!-- /action button -->
</div>