<div ng-controller="ManageEditProductDetailsController as editProductCtrl">
	
    <div class="lw-section-heading-block" ng-if="editProductCtrl.productName">
            
            <div class="lw-breadcrumb">
                <!-- main heading when child category or its product are selected -->
                <span ng-show="editProductCtrl.isMultipleCategory">
                    <!-- first level -->
                    <a ui-sref="categories({mCategoryID:''})">
                        <?= __( 'Manage Categories & Products' ) ?>
                    </a> &raquo;
                    <!-- /first level -->

                    <span class="dropdown lw-breadcrumb-dropdown">
                        <button class="btn btn-default dropdown-toggle lw-toggle-btn" type="button" id="menu1" data-toggle="dropdown"><?= __('Multiple Category') ?>
                        <span class="caret"></span></button>
                        <ul class="dropdown-menu" role="menu" aria-labelledby="menu1" >
                          <li role="presentation" ng-repeat="cat in editProductCtrl.categoryData"><a ui-sref="categories({mCategoryID:cat.id})" target="_blank" role="menuitem" tabindex="-1" href="">[[cat.name]]</a></li>
                        </ul>
                    </span>

                </span>
                <!-- /main heading when child category or its product are selected -->
                
                <span ng-show="editProductCtrl.isMultipleCategory == false" ng-repeat="category in editProductCtrl.categoryData">
                   
                    <!-- first level -->
                    <a ui-sref="categories({mCategoryID:''})">
                        <?= __( 'Manage Categories & Products' ) ?>
                    </a> &raquo;
                    <!-- /first level -->

                    <!-- third level -->
                    <span>
                        <a ui-sref="categories({mCategoryID:category.id})" href>
                            <span ng-bind="category.name"></span>
                        </a>
                    </span>
                    <!-- /third level -->

                </span>

            </div>
        <!-- main heading -->
        <span class="lw-section-heading" ng-bind="editProductCtrl.productName"></span>  
         <a href="[[editProductCtrl.detailsUrl]]" target="_new" title="
        <?= __('View Page') ?>"> <i class="fa fa-external-link fa-2x"></i>
        </a>
        <!-- /main heading -->
    </div>

    <div class="lw-clear pull-right">

        <!-- update form status form -->
        <form class="lw-form lw-ng-form form-inline" name="editProductCtrl.[[ editProductCtrl.ngFormName ]]" 
            novalidate>

            <!-- Active -->
            <lw-form-checkbox-field field-for="active" label="<?= __( 'Publically Available' ) ?>" class="lw-form-item-box" ng-if="editProductCtrl.initialContentLoaded">
                <input type="checkbox" 
                    class="lw-form-field js-switch"
                    name="active"
                    title="<?= __( 'Update Status' ) ?>" 
                    ng-model="editProductCtrl.productData.active" 
                    ui-switch="" ng-change="editProductCtrl.submit()"/>
            </lw-form-checkbox-field>
            <!-- /Active -->

        </form>
        <!-- /update form status form -->

    </div>
    
    <!-- Product Edit Tabs -->
    <ul class="nav nav-tabs">
        <li role="presentation" ui-sref-active="active"><a ui-sref="product_edit.details"><?= __( 'Details' ) ?></a></li>
        <li role="presentation" ui-sref-active="active"><a ui-sref="product_edit.options"><?= __( 'Options' ) ?></a></li>
        <li role="presentation" ui-sref-active="active"><a ui-sref="product_edit.images"><?= __( 'Images' ) ?></a></li>
        <li role="presentation" ui-sref-active="active"><a ui-sref="product_edit.specification"><?= __( 'Specification' ) ?></a></li>
    </ul>
    <!-- /Product Edit Tabs -->

    <div ui-view></div>

</div>
