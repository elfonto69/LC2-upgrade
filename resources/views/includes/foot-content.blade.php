@if(getStoreSettings('addtional_page_end_content'))
    <div class="clearfix">
        <div class="col-lg-12">
            <?= getStoreSettings('addtional_page_end_content') ?>
        </div>
    </div>
@endif
<footer class="lw-footer">
    <div class="container">
        <p class="text-muted">
            <span class="pull-left">
                <?= getStoreSettings('store_name'). ' - ' ?> &copy; <?= date("Y") ?>
                <?= getStoreSettings('footer_text') ?>
            </span>
            <span class="pull-right">
                @if(getStoreSettings('social_twitter'))
                    <a class="btn btn-link" title="Twitter" target="_blank" href="https://twitter.com/<?= getStoreSettings('social_twitter') ?>"> <i class="fa fa-twitter"></i></a>
                @endif

                @if(getStoreSettings('social_facebook'))
                    <a class="btn btn-link" title="Facebook" target="_blank" href="https://www.facebook.com/<?= getStoreSettings('social_facebook') ?>"><i class="fa fa-facebook"></i></a>
                @endif

                @if (getStoreSettings('privacy_policy'))
                    <span>
                        <a title="<?= __('Privacy Policy') ?>" target="_new" href="<?=  route('privacy.policy')  ?>">
                        <?=  __('Privacy Policy')  ?>
                        </a>
                    </span>
                @endif
                <span><?= e( (getStoreSettings('privacy_policy') and  getStoreSettings('credit_info')) ? '|' : '') ?></span>
                @if (getStoreSettings('credit_info'))
                    <span> Powered by <a target="_blank" href="http://livelycart.com">LivelyCart <?= env('LC_VER', '2.2.7.39') ?></a>  Designed &amp; Developed by <a href="http://livelyworks.net" title="Design &amp; Developed by LivelyWorks" target="_blank" >LivelyWorks</a>                       
                    </span>
                @endif

            </span>
        </p>
        </div>
    </footer>
</div>

@include('includes.javascript-content')
@include('includes.form-template')

    <!--[if lte IE 9]>
    <script src="//cdnjs.cloudflare.com/ajax/libs/Base64/0.3.0/base64.min.js"></script>
    <![endif]-->
    <script src="<?= __yesset('dist/js/vendor-first*.js') ?>"></script> 
    <script src="<?= __yesset('dist/js/vendor-second*.js') ?>"></script> 
    @stack('vendorScripts')
        <script src="<?= __yesset('dist/js/application*.min.js') ?>"></script>
    @stack('appScripts')

    <!-- container -->
<script type="text/javascript">
    $(document).ready(function () {
         $('.top-horizental-menu').smartmenus({
            mainMenuSubOffsetX: -1,
            mainMenuSubOffsetY: 4,
            subMenusSubOffsetX: 6,
            subMenusSubOffsetY: -6
        });

        $('body').on('click','.lw-prevent-default-action', function(e) {
            e.preventDefault();
         });

        $('.lw-locale-change-action').on('click', function(e) {
            e.preventDefault();
            __globals.redirectBrowser($(this).attr('href') + window.location.hash);
        });

        $('html').removeClass('lw-has-disabled-block');

        $('html body').on('click','.lw-show-process-action', function(e) {
            $('html').addClass('lw-has-disabled-block');
            $('.lw-disabling-block').addClass('lw-disabled-block lw-has-processing-window');
        });

        $('.hide-till-load').removeClass('hide-till-load');
        $('.lw-show-till-loading').removeClass('lw-show-till-loading');

        $('[data-toggle="offcanvas"]').click(function () {
            $('.lw-sidebar-overlay').toggleClass('active');
            $('html').toggleClass('lw-turn-off-y-scroll-sidebar');
        });

        $('.lw-sidebar-menu a.lw-item-link, .lw-sidebar-menu button').on('click', function() {
            $('.row-offcanvas').toggleClass('active');
            $('.lw-sidebar-overlay').toggleClass('active');
            $('html').toggleClass('lw-turn-off-y-scroll-sidebar');
        });
        
		// Only enable if the document has a long scroll bar
		// Note the window height + offset
		if ( ($(window).height() + 100) < $(document).height() ) {
		    $('.lw-top-link-block').removeClass('hidden').affix({
		        // how far to scroll down before link "slides" into view
		        offset: {top:100}
		    });
		}

});
</script>