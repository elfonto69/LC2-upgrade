<div class="lw-custom-page-jumbotron jumbotron">
    <div class="lw-error-404">

	    <div class="lw-error-code m-b-10 m-t-20">
	    	<i class="fa fa-check-square-o fa-1x lw-success"></i> @section('page-title',  __( 'Register Success' ))
	    </div>

	    @if(is_null(getStoreSettings('activation_required_for_new_user')) or getStoreSettings('activation_required_for_new_user') == 1)

	    	<h2 class="font-bold"><?=  __("Activate your account")  ?></h2>

		    <div class="fa-1x">
		        <?=  __('Almost finished... You need to confirm your email address. To complete the activation process, please click the link in the email we just sent you.')  ?>
		    </div>

	    @else

	    	<h2 class="font-bold"><?=  __("Registration Done")  ?></h2>

		    <div class="fa-1x">
		        <?=  __('Your registration process completed successfully. Please logged in for uses.')  ?>
		    </div>

	    @endif

	</div>
</div>