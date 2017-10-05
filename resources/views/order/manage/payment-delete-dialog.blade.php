<div ng-controller="ManagePaymentDeleteController as paymentDeleteCtrl">

    <!-- main heading -->
    <div class="lw-text-center">
    <strong><h1><?=  __( 'Are You Sure ?' )  ?></h1></strong>
        <h5><?=  __( 'You want to Delete __orderUid__ order payment, all the order related to this payment will deleted as well.', [
            '__orderUid__' => '<strong>[[ paymentDeleteCtrl.orderUid ]]</strong>'
        ])  ?></h5>
    </div>
    <!-- /main heading -->
    
     <form class="lw-form lw-ng-form"
        name="paymentDeleteCtrl.[[ paymentDeleteCtrl.ngFormName ]]" 
        ng-submit="paymentDeleteCtrl.submit(paymentDeleteCtrl.categoryID)" 
        novalidate>

        <!-- Password -->
        <lw-form-field field-for="password" label="<?=  __('Password')  ?>"> 
            <div class="input-group">
            <span class="input-group-btn">
                <button class="btn btn-default" type="button"><?=  __('Password')  ?></button>
            </span>
                <input type="password" 
                      class="lw-form-field form-control"
                      name="password"
                      ng-minlength="6"
                      ng-maxlength="30"
                      ng-required="true" 
                      ng-model="paymentDeleteCtrl.paymentData.password" />
            </div>
        </lw-form-field>
        <!-- Password -->

        <!-- action button -->
        <div class="lw-form-actions lw-text-center">
            <button type="submit" class="lw-btn btn btn-danger" title="<?= __('Delete') ?>"><?= __('Yes, Delete it') ?> <span></span></button>
            <button type="button" class="lw-btn btn btn-default" ng-click="paymentDeleteCtrl.closeDialog()" title="<?= __('Cancel') ?>"><?= __('Cancel') ?></button>
        </div>
        <!-- /action button -->
    </form>

</div>