
<style>#activeTabList_processing { display:none !important} .alert-success{ display:none}</style>

<div>

    <div class="lw-section-heading-block">
        <!-- main heading -->
        <h3 class="lw-section-heading"><?=  __( 'Quick Orders' ) ?>
        
	    </h3>
        <!-- /main heading -->
    </div>

	<!--  users tabs section -->
	<div>


		<div class="tab-content">
	    	<!-- Active Tab -->
	        <div role="tabpanel" class="tab-pane fade in active" id="active">
				<!-- datatable -->
		        <table  class="table table-striped table-bordered" cellspacing="0" width="100%">
		            <thead class="page-header">
		                <tr>
		                   
		                    <th><?=  __('Name')  ?></th>
		                    <th><?=  __('Phone')  ?></th>
		                    <th><?=  __('Address')  ?></th>
                             <th><?=  __('Product Name')  ?></th>
                            <th><?=  __('Action')  ?></th>
		                </tr>
		            </thead>
		            <tbody>
                    <?php if(count($orders)>0) {
						
						foreach($orders as $row) {
					
						  ?>
                    <tr>
		                    <td><?=   $row->name;  ?></td>
		                    <td><a href="tel:<?=  $row->phone;  ?>"><?=  $row->phone;  ?></a></td>
		                    <td><?=  $row->address;  ?></td>
                            <td><?=  $row->p_name;  ?></td>
                            <td><a href="javascript:void(0)" onclick="EditQuickOrder(<?=  $row->id;  ?>)">Edit</a>&nbsp;|&nbsp;<a href="javascript:void(0)" onclick="DeleteQuickOrder(<?=  $row->id;  ?>)">Delete</a></td>
		                 
		            </tr>
                    <?php } } ?>
                    
                    
                    </tbody>
		        </table>
		        <!-- datatable -->
	 		</div>
	        <!-- /Active Tab -->
	        <!-- Cancelled Tab -->
	
	        <!-- /Cancelled Tab -->
	        <!-- Completed Tab -->
	 
		</div>
	</div>
	<!--  /users tabs section -->


</div>
<script type="text/javascript">

function DeleteQuickOrder(id)
{
     $("#delet_order").click();
	 $("#q_o_id").val(id);	
}
 function DeleteOrder()
{
   var id = $("#q_o_id").val();	
   
   $.get("/manage/report/delete-quick-order/"+id,function(data){
	  
	 var resp = $.parseJSON(data);

      $(".close").click();
	   loadQuickOrder();
	   
	   })  
	   
	   
}
function EditQuickOrder(id)
{
   $.get("/manage/report/fetch-quick-single-order/"+id,function(data){
	  
	 var resp = $.parseJSON(data);
	 $("#order_id").val(resp[0]['id']);
	 $("#fullName").val(resp[0]['name']);
	 $("#phone").val(resp[0]['phone']);
	 $("#address").val(resp[0]['address']);

$("#click-nodel").click();
	   
	   }) ; 	
}

function save_quick_order()
						{
						   $.post('/manage/report/update-quick-order',$( "#quick_order" ).serialize(),function(data){
							    var resp = $.parseJSON(data);
								if(resp['status'] == true) {
							       $(".alert-success").html(resp['msg']);
								   $(".alert-success").show();
								   setTimeout(function(){ $(".close").click();
								   
								     loadQuickOrder();
								    }, 3000);
								   
								}
							   
							   })   	
							
						}
</script>

<button style="display:none" type="button" class="btn btn-info btn-lg" id="click-nodel" data-toggle="modal" data-target="#myModal">Open Modal</button>
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title"> Быстрый заказ</h4>
      </div>
      <div class="modal-body">
      
      <div class="alert alert-success">
  
</div>

         <form method="post" name="quick_order" id="quick_order">
                                        <input name="order_id" id="order_id" type="hidden" value=""/>
                                        <div class="form-group">
                                            <label for="fullName">
                                                Ваше Имя
                                            </label>
                                            <input class="form-control" id="fullName" name="fullName" placeholder="Ваше Имя"
                                                   required="required" type="text">
                                            </input>
                                        </div>
                                        <div class="form-group">
                                            <label for="phone">
                                                Ваш Телефон
                                            </label>
                                            <input class="form-control" id="phone" name="phone" placeholder="Ваш Телефон"
                                                   required="required" type="text">
                                            </input>
                                        </div>
                                        <div class="form-group">
                                            <label for="address">
                                                Адрес Доставки
                                            </label>
                                            <input class="form-control" id="address" name="address" placeholder="Адрес Доставки"
                                                   required="required" type="text">
                                            </input>
                                        </div>
                                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                        <div class="row">
                                            <div class="col-lg-1 col-centered" style="float: none; margin: 0 auto;">
                                                <button onclick="save_quick_order()" class="btn btn-lg btn-success" type="button">
                                                    Заказать
                                                </button>
                                            </div>
                                        </div>
                                    </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>



<button type="button" style="display:none" id="delet_order" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal2">Open Small Modal</button>

  <!-- Modal -->
  <div class="modal fade" id="myModal2" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <input type="hidden" name="q_o_id" id="q_o_id" />
          <h4 class="modal-title">Are you sure you want to delete Quick order</h4>
        </div>
      
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger" onclick="DeleteOrder()">Delete</button>
        </div>
      </div>
    </div>
  </div>
  
  
  
  
  
  
  
  
  