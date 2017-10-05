<div ng-controller="UserAddController as UserAddCtrl">

    <div class="lw-section-heading-block">
        <!--  main heading  -->
        <h3 class="lw-section-heading"><?=  __( 'Add New User' )  ?></h3>
        <!--  /main heading  -->
    </div>
    
    <form class="lw-form lw-ng-form" 
        name="UserAddCtrl.[[ UserAddCtrl.ngFormName ]]" 
        ng-submit="UserAddCtrl.submit()" 
        novalidate>
        
        <!--  First Name  -->
        <lw-form-field field-for="fname" label="<?=  __( 'First Name' )  ?>"> 
            <input type="text" 
              class="lw-form-field form-control"
              name="fname"
              ng-required="true"
              ng-minlength="2"
              ng-maxlength="30"
              ng-model="UserAddCtrl.userData.fname" />
        </lw-form-field>
        <!--  /First Name  -->

        <!--  Last Name  -->
        <lw-form-field field-for="lname" label="<?=  __( 'Last Name' )  ?>"> 
            <input type="text" 
              class="lw-form-field form-control"
              name="lname"
              ng-required="true" 
              ng-minlength="2"
              ng-maxlength="30"
              ng-model="UserAddCtrl.userData.lname" />
        </lw-form-field>
        <!--  /Last Name  -->

        <!--  Email  -->
        <lw-form-field field-for="email" label="<?=  __( 'Email' )  ?>"> 
            <input type="email" 
              class="lw-form-field form-control"
              name="email"
              ng-required="true" 
              ng-model="UserAddCtrl.userData.email" />
        </lw-form-field>
        <!--  /Email  -->

        <!--  Password  -->
        <lw-form-field field-for="password" label="<?=  __( 'Password' )  ?>"> 
            <input type="password" 
              class="lw-form-field form-control"
              name="password"
              ng-minlength="6"
              ng-maxlength="30"
              ng-required="true" 
              ng-model="UserAddCtrl.userData.password" />
        </lw-form-field>
        <!--  /Password  -->

        <!--  Password Confirmation  -->
        <lw-form-field field-for="password_confirmation" label="<?=  __( 'Password Confirmation' )  ?>"> 
            <input type="password" 
                  class="lw-form-field form-control"
                  name="password_confirmation"
                  ng-minlength="6"
                  ng-maxlength="30"
                  ng-required="true" 
                  ng-model="UserAddCtrl.userData.password_confirmation" />
        </lw-form-field>
        <!--  /Password Confirmation  -->

        <div class="lw-dotted-line"></div>

        <!--  Action button  -->
        <div class="lw-form-actions">
            <!--  add button  -->
            <button type="submit" class="lw-btn btn btn-primary" title="<?= __('Add') ?>"><?= __('Add') ?> <span></span></button>
            <!--  /add button  -->

            <!--  cancel button  -->
            <button type="button" class="lw-btn btn btn-default" ng-click="UserAddCtrl.closeDialog()" title="<?= __('Cancel') ?>"><?= __('Cancel') ?></button>
            <!--  /cancel button  -->
        </div>
        <!--  /Action button  -->

    </form>

</div>