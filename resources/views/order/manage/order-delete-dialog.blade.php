<div ng-controller="ManageOrderDeleteController as orderDeleteCtrl">

    <!-- main heading -->
    <div class="lw-text-center">
    <strong><h1><?=  __( 'Are You Sure ?' )  ?></h1></strong>
        <h5><?=  __( 'You want to Delete __orderUid__ order, all the payment transaction related to this order will deleted as well.', [
            '__orderUid__' => '<strong>[[ orderDeleteCtrl.orderUid ]]</strong>'
        ])  ?></h5>
    </div>
    <!-- /main heading -->
    
     <form class="lw-form lw-ng-form"
        name="orderDeleteCtrl.[[ orderDeleteCtrl.ngFormName ]]" 
        ng-submit="orderDeleteCtrl.submit(orderDeleteCtrl.categoryID)" 
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
                      ng-model="orderDeleteCtrl.orderData.password" />
            </div>
        </lw-form-field>
        <!-- Password -->

        <!-- action button -->
        <div class="lw-form-actions lw-text-center">
            <button type="submit" class="lw-btn btn btn-danger" title="<?= __('Delete') ?>"><?= __('Yes, Delete it') ?> <span></span></button>
            <button type="button" class="lw-btn btn btn-default" ng-click="orderDeleteCtrl.closeDialog()" title="<?= __('Cancel') ?>"><?= __('Cancel') ?></button>
        </div>
        <!-- /action button -->
    </form>

</div>