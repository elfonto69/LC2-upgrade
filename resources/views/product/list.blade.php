<!--  To show the products list   -->
<div ng-controller="ProductsController as productsCtrl">
<?php $featuredProductsRoute = ($currentRoute === route("products.featured") || ($customRoute === "products.featured")) ? true : false; ?>

	<!--  To show the heading of product  -->
	<div class="lw-image-width">
		@if(empty($brand))
		    <div class="lw-section-heading-block">	
		        <!--  main heading  -->
		        <h3 class="lw-section-heading">

		            @if(isset($category) and !__isEmpty($category))

			            <?=  $category->name  ?>
						<!--  page title set in browser tab  -->
			            @section('page-title') 
				        	<?= $category->name ?>
				        @endsection
				        <!--  / page title set in browser tab  -->
					
		            @elseif($currentRoute === "products.featured" || $customRoute === "products.featured") 
						<!--  page title set in browser tab  -->
	                    @section('page-title') 
				        	<?= __('Featured Products') ?>
				        @endsection
				        <!--  / page title set in browser tab  -->
	                    <?= __('Featured Products') ?>

		            @elseif(!empty($searchTerm)) 
						<!--  page title set in browser tab  -->							
	           			@section('page-title') 
				        	<?= e( __('__productCount__ Products found for : __searchTerm__  term', [
                                '__productCount__' => $productCount,
                                '__searchTerm__' => $searchTerm 
                            ])) ?>
				        @endsection
						<!--  / page title set in browser tab  -->	
		             	<?= e( __('Products Search') ) ?>

		              <div>
			              <small>
				              <?= __('found __productCount__ results for', [
				              		'__productCount__' => $productCount
				              ]) ?>
			              </small>
			              <div class="btn-group" role="group">
				              	<a href="" class="btn btn-default btn-xs" title="<?=  $searchTerm  ?>">
				              		<?= e( $searchTerm ) ?>
				              	</a>
				              	<a  href="<?= route('products') ?>" 
									class="btn btn-default btn-xs" title="<?=  e( __('Remove __searchTerm__', ['__searchTerm__' => $searchTerm]) )  ?>">&times;
								</a>
			              </div>
		              </div><br>
		                
		            @else
						<!--  page title set in browser tab  -->
		                @section('page-title') <?= __('Products') ?> @endsection
						<!--  / page title set in browser tab  -->
				        <?= __('Products') ?>
				        
		            @endif
		        </h3>
		        <!--  /main heading  -->
		    </div>
		@else 
			<!--  To show brand related heading like name, logo  -->
		  	<div class="lw-section-heading-block">
		        <!--  main heading  -->
		        <h3 class="lw-section-heading">
		            <?= $brand->name ?>
					<!--  page title set in browser tab  -->
		            @section('page-title') 
			        	<?= $brand->name ?>
			        @endsection
			        <!--  / page title set in browser tab  -->
		        </h3>
		        <!--  /main heading  -->
			</div>

			<!--  To show brand logo  -->
		    @if(!empty($brand->logo))
				<div class="col-lg-12 text-center">
					<div class="lw-brand-logo">
						<img class="lw-thumb-logo" src="<?=  getBrandLogoURL($brand->_id, $brand->logo)  ?>">
					</div>
				</div>
			@endif
			<!-- / To show brand logo  -->

			<div class="lw-section-heading-block">
		        <!--  main heading  -->
		        <h3 class="lw-section-heading">
		            <?=  __('Products')  ?>
		        </h3>
		        <!--  /main heading  -->
			</div>
		    <!-- /To show brand related heading like name, logo  -->
		@endif
		<!-- / To show the heading of product  -->
	</div>

	<div class="clearfix lw-filter-row">
		<!--  brand section  -->
		@if(!empty($brands))
	 		<?=  __('Showing Products for ')  ?>
		 	@foreach($brands as $brand)
				<div class="btn-group" role="group">
					<!--  To show the brand name  -->
					<a  href="<?=  route('product.related.by.brand', [$brand->brandID, slugIt($brand->brandName)])  ?>" 
						class="btn btn-default btn-xs" title="<?=  $brand->brandName  ?>">
						  <?=  $brand->brandName  ?>
					</a>
					<!-- / To show the brand name  -->

					<!--  To show Remove brand filter btn  -->
					<a  href="<?= sortOrderURL(null, ['sbid' => $brand->brandID]) ?>" 
						class="btn btn-default btn-xs" title="<?=  __('Remove ')  ?><?=  $brand->brandName  ?>">&times;
					</a>
					<!-- / To show Remove brand filter btn  -->
				</div>&nbsp;
			@endforeach
		@endif
		<!--  /brand section  -->
		
		<!--  filter section  -->
		@if(!empty($showFilterPrice))
			<?=  __(' In price between ')  ?> 
			<div class="btn-group" role="group">
				
				<a href="" class="btn btn-default btn-xs" ng-click="productsCtrl.filterDailogProduct(productsCtrl.filterUrl)" title="<?=  __('Min and Max Price')  ?>">
					<strong><?= $showFilterPrice ?></strong>
				</a>

				<!--  To show Remove brand filter btn  -->
				<a  href="<?= e(removePriceFilter()) ?>" 
					class="btn btn-default btn-xs" title="<?=  __('Remove ')  ?>">&times;
				</a>
				<!-- / To show Remove brand filter btn  -->
			</div>&nbsp;
		@endif
		<!--  / filter section  -->

		<!--  Clear all Filters  -->
		@if(!empty($brands) or !empty($showFilterPrice))
			@if(empty($searchTerm))
				<a href="<?= Request::url() ?>" class="btn btn-danger btn-xs" title="<?=  __('Clear all Filters')  ?>"><?=  __('Clear all Filters')  ?></a>
			@else
				<a href="<?= e(Request::url().'?search_term='.$searchTerm) ?>" class="btn btn-danger btn-xs" title="<?=  __('Clear all Filters')  ?>"><?=  __('Clear all Filters')  ?></a>
			@endif
		@endif
		<!--  / Clear all Filters  -->

		<!--  To show Product filter dialog click & sort by product drop-down  -->
		<div class="btn-group pull-right" role="group">

				<button type="button" 
						class="btn btn-default" 
						ng-click="productsCtrl.filterDailogProduct(productsCtrl.filterUrl)" 
						title="<?= __('Filter') ?>">
					<i class="fa fa-filter"></i> <?= __('Filter') ?>
				</button>

			@if(!empty($products))
				<!--  /filter section  -->
				<div class="btn-group" role="group">
					<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="<?= __('Order by') ?>">
						@if(!empty($sortBy))
							<?=  ((!empty($sortOrder)) and $sortOrder == 'desc') ? '<i class="fa fa-sort-amount-desc"></i>' : '<i class="fa fa-sort-amount-asc"></i>'  ?>
						@endif
						<?= __('Order by') ?> <?=  (!empty($sortBy)) ? $sortBy : ''  ?>
						
						<span class="caret"></span>
					</button>
					<ul class="dropdown-menu pull-right">
						<li><a href="<?=  sortOrderUrl('name')  ?>"><?=   __('Name')  ?></a></li>
						<li><a href="<?=  sortOrderUrl('price')  ?>"><?=  __('Price')  ?></a></li>
					</ul>
				</div>
			@endif
		</div>
		<!-- / To show Product ..... drop-down  -->
	</div>
	<!--  To show product image & quick view & display product details btn  -->
  <div class="container">
    <div class="row">
      <div class="col-md-10 col-md-offset-1">
        <div class="col-lg-12">
          <div class="row pt-md">

		@if(!empty($products))

				@foreach($products as $product)

				<div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 productmob">
                            <!--  To show product image  -->
                            <!--  If the product is out of stock to show out of stock  -->
                                @if($product['out_of_stock'] == 1)
                                    <span class="lw-out-of-stock-label"><i class="fa fa-warning"></i>  <?= __('Out of stock') ?></span>
                                @endif
                                <!-- / If the .... stock  -->

                                <!--  Thumbnail  -->
                                
                                    <a href="<?=  productsDetailsRoute($product['id'], $product['slugName'], (!empty($category->id))? $category->id:'') ?><?=  (!empty($pageType))? $pageType:''   ?>"  title="<?= __('View Details') ?>">
                                        <span class="lw-product-thumbnail"><img style="width:100%"
                                        src="<?=  $product['thumbnailURL']  ?>" 
                                        >  </span>
                                    </a>
                              
                                <!-- / Thumbnail  -->
                            <!-- / To show product image  -->

                            <!--  To show product name  -->
                            <h4 class="lw-product-name"><?= $product['name'] ?></h4>
                            <!-- / To show product name  -->

                            <!--  To show price & options  -->
                            <h4 class="lw-product-price">

                                <?= $product['formate_price'] ?> 
                                <!--  To show when the product contain option then display + sign  -->
                                @if($product['options'] == true)
                                   <sup> <a href="#" title="" data-container="body" data-toggle="popover" data-trigger="hover"  data-placement="top" class="lw-product-list-popover"><span class="fa fa-plus lw-color-warn"></span></a>
                                </sup>
                                @endif
                                <!-- / To show ... + sign  -->
                            </h4>
                            <!--  /To show price & options  -->

                            <div class="btn-group" role="group" aria-label="">

                                <!--  To show product details btn  -->
                                <a href="<?=  productsDetailsRoute($product['id'], $product['slugName'], (!empty($category->id))? $category->id:'') ?><?=  (!empty($pageType))? $pageType:''   ?>"  title="<?= __('View Details') ?>" class="btn btn-default btn-sm lw-show-process-action"><?=  __('Details')  ?>  <i class="fa fa-arrow-right"></i>
                                </a>
                              <a href="<?=  productsDetailsRoute($product['id'], $product['slugName'], (!empty($category->id))? $category->id:'') ?><?=  (!empty($pageType))? $pageType:''   ?>#quick_order"  title="<?= __('View Details') ?>" class="btn btn-default btn-sm lw-show-process-action"><?=  __('Quick Order')  ?>  <i class="fa fa-arrow-right"></i>
                                </a>
                                <!--  To show product details btn  -->

                            </div>

                        </div>

				@endforeach
				<!--  render pagination when script not available  -->
                <noscript>
					<?=  $productCollection->render()   ?>
				</noscript> 
				<!--  / render pagination when script not available  -->
			</div>

			<!--  when load content display loder & msg  -->
			
			<!--  loader  -->
	        <div ng-if="productsCtrl.itemLoadType == 1 && productsCtrl.remainingItems && productsCtrl.hasMorePages" class="lw-loader-position text-right">
	            <div class="loader"></div>
	        </div>
	        <!-- / loader  -->

	        <!--  end products msg  -->
	        <div ng-if="!productsCtrl.remainingItems && !productsCtrl.hasMorePages" class="text-center alert alert-info">
	            <?=  __("Looks like you've reached the end.")  ?>
	        </div>
	        <!-- / end products msg  -->
	        
	    	<!-- / when load content display loader & msg   -->

	    	<!-- show this button when item load on button  -->

            <div ng-if="productsCtrl.itemLoadType == 2 && productsCtrl.remainingItems && productsCtrl.hasMorePages">

                <button type="button" class="btn btn-secondary btn-lg btn-block" ng-click="productsCtrl.loadProductsOnBtnClick()">

                    <span ng-show="productsCtrl.remainingItems > productsCtrl.paginationData.perPage"><?=  __('Load __item__ more items out of __remainingCount__.', ['__item__' => '[[ productsCtrl.paginationData.perPage ]]', '__remainingCount__' => '[[ productsCtrl.remainingItems ]]']) ?></span>

                    <span ng-show="productsCtrl.remainingItems <= productsCtrl.paginationData.perPage"><?=  __('Load __remainingCount__ more items.', ['__remainingCount__' => '[[ productsCtrl.remainingItems ]]']) ?></span>

                </button>

            </div><br>
		    <!-- / show this button when item load on button  -->
		@else
			<!--  when the product not available then display msg  -->
			<div>

				<div class="alert alert-info">

					<?=  __('No products available here.') ?>

				</div>

			</div>
        	<!--  / when the ... msg  -->
        @endif

		
	       </div>
      </div>
    </div>
  </div>
    <!-- / To show product image ...  btn  -->

	<!--  render this script when scroll page  -->
	<script type="text/_template" id="productListItemTemplate">
	   <!-- opacity:0 given to remove flicker issue -->
       <div class="text-center lw-product-box" style="opacity:0">
        <!--  Show featured product ribbon  -->
         @if(!$featuredProductsRoute)
          <% if (__tData.featured == 1) { %> 
            <div class="lw-ribbon-wrapper-green" title="<?= __('Featured Product') ?>">
                <div class="lw-ribbon-green">
                    <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>
                </div>
            </div>
        <% } %>
         @endif
        <!--  /Show featured product ribbon  -->
        <!--  If the product is out of stock to show out of stock  -->
        <% if (__tData.out_of_stock === 1) { %> 
            <span class="lw-out-of-stock-label"><i class="fa fa-warning"></i> <?= __('Out of stock') ?></span>
        <% } %>
        <!-- / If the .... stock  -->                    
        <span class="lw-product-thumbnail">
        <!--  Thumbnail  -->
            <a class="lw-prevent-default-action" href="<%= __tData.detailURL %>?page_type=products" ng-click="productsCtrl.showDetailsDialog($event,'<%= __tData.id %>','<?=  (!empty($pageType))?$pageType:''  ?>')"><img src="<%= __tData.thumbnailURL %>" alt="" data-productID="<%= __tData.id %>" >
            </a>
        <!-- /Thumbnail  -->
        </span>
        <!--  To show product name  -->
            <h4><%= __tData.name %></h4>
        <!--  / To show product name  -->

        <!--  To show price & options  -->
        <h4 class="lw-product-price">
            <%= __tData.formate_price %>

            <!--  To show when the product contain option then display + sign  -->
	        <% if(__tData.options) { %>
	            <sup> 
	           		<a href="#" title="" data-container="body" data-toggle="popover" data-trigger="hover"  data-placement="top" class="lw-product-list-popover"><span class="fa fa-plus lw-color-warn"></span></a>
	        	</sup>
	        <% } %>
	        <!-- / To show ... + sign  -->
	    </h4>
        <!--  /To show price & options  -->

        <div class="btn-group" role="group" aria-label="">

            <!--  To show product details btn  -->
            <a href="<%= __tData.detailURL %>" title="<?= __('View Details') ?>" class="btn btn-default btn-sm"><?=  __('Details')  ?>  <i class="fa fa-arrow-right"></i></a>
            <!--  To show product details btn  -->
        </div>
    </div>
	</script>	
	<!--  render this script when scroll page  -->

</div>

<!-- /To show the products list   -->
@push('appScripts')
	<script  type="text/javascript">

	var $masonryInstance;

	    $(document).ready(function(){

	        $masonryInstance = $('.lw-products-container');

	         $masonryInstance.imagesLoaded( function() {

	             $masonryInstance.masonry({
	                itemSelector    : '.lw-product-box',
                    percentPosition: true,
                    columnWidth: '.lw-product-box',                    
                    gutter:'.lw-gutter-sizer'
	              });

                 $('.lw-ribbon-wrapper-green').removeClass('lw-zero-opacity');

	        });

	        $('.lw-product-list-popover').popover({
		    	html: true, 
				content: function() {
			          return "<?=  __('Addon option may affect price.')  ?>";
			        }
		    }); 
	    });
	</script>
@endpush