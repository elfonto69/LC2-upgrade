<?php
/*
* EditStoreSettingsRequest.php - Request file
*
* This file is part of the Store component.
*-----------------------------------------------------------------------------*/

namespace App\Yantrana\Components\Store\Requests;

use App\Yantrana\Core\BaseRequest;
use Illuminate\Http\Request;

class EditStoreSettingsRequest extends BaseRequest
{
    /**
     * Set if you need form request secured.
     *------------------------------------------------------------------------ */
    protected $securedForm = true;

    /**
     * Unsecured/Unencrypted form fields.
     *------------------------------------------------------------------------ */
    protected $unsecuredFields = [
        'store_name',
        'contact_address',
        'term_condition',
        'privacy_policy',
        'addtional_page_end_content',
        'payment_check_text',
        'payment_bank_text',
        'payment_cod_text',
        'payment_other_text',
        'custom_css',
        'append_email_message',
        'global_notification',
        'currency_symbol'
    ];

    /**
     * Loosely sanitize fields.
     *------------------------------------------------------------------------ */
    protected $looseSanitizationFields = [
                                            'contact_address' => '',
                                            'term_condition' => '',
                                            'privacy_policy' => '',
                                            'payment_check_text' => '',
                                            'payment_bank_text' => '',
                                            'payment_cod_text' => '',
                                            'payment_other_text' => '',
                                            'append_email_message' => '',
                                            'global_notification' => '',
                                            'currency_symbol' => '',
                                            'addtional_page_end_content' => '<script></script>',
                                         ];

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     *-----------------------------------------------------------------------*/
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the edit store settings request.
     *
     * @return bool
     *-----------------------------------------------------------------------*/
    public function rules()
    {
        $formType = (int) Request::route()->getParameter('formType');

        $rules = [];

        if ($formType == 1) {
            $rules = [
                'store_name' => 'required',
                'business_email' => 'required|email',
                'timezone' => 'required',
            ];
        } elseif ($formType === 2) {
            $rules = [
                'currency'        => 'required',
                'currency_symbol' => 'required',
                'currency_value'  => 'required',
                'currency_format' => 'required|verify_format'
            ];
        } elseif ($formType === 3) {
            $rules = [];

            // Check payment other checkbox is true then show payment other text
            if (Request::input('payment_other')) {
                $rules['payment_other_text'] = 'required';
            }

            // Check if use paypal true then show papal email
            if (Request::input('use_paypal')) {
                $rules['paypal_email'] = 'required|email';
                $rules['paypal_sandbox_email'] = 'required|email';
            }

            // Check if check payment true or false
            if (Request::input('payment_check')) {
                $rules['payment_check_text'] = 'required';
            }

            // Check if bank payment true or false
            if (Request::input('payment_bank')) {
                $rules['payment_bank_text'] = 'required';
            }

            // Check if cod payment true or false
            if (Request::input('payment_cod')) {
                $rules['payment_cod_text'] = 'required';
            }

            $isLiveStripeKeysExist      = Request::input('isLiveStripeKeysExist');
            $isTestingStripeKeysExist   = Request::input('isTestingStripeKeysExist');

            $stripeLiveSecretKey        = Request::input('stripe_live_secret_key');
            $stripeLivePublishableKey   = Request::input('stripe_live_publishable_key');

            $stripeTestingSecretKey   = Request::input('stripe_testing_secret_key');
            $stripeTestingPublishableKey = Request::input('stripe_testing_publishable_key');

            if (Request::input('use_stripe')) {
                if (!$isLiveStripeKeysExist) {

                    // check if stripe live publish key exist
                    if (!__isEmpty($stripeLivePublishableKey)) {
                        $rules['stripe_live_secret_key']         = 'required';
                    }
                    
                    // check if stripe live secret key exist
                    if (!__isEmpty($stripeLiveSecretKey)) {
                        $rules['stripe_live_publishable_key']    = 'required';
                    }
                }

                if (!$isTestingStripeKeysExist) {

                    // Check if stripe testing publishable key exist
                    if (!__isEmpty($stripeTestingPublishableKey)) {
                        $rules['stripe_testing_secret_key']      = 'required';
                    }
                    
                    // Check if stripe testing secret key exist
                    if (!__isEmpty($stripeTestingSecretKey)) {
                        $rules['stripe_testing_publishable_key'] = 'required';
                    }
                }
            }
        } elseif ($formType === 6) {
            $rules = [
                'contact_email' => 'required|email',
                'contact_address' => 'required|min:6',
            ];
        } elseif ($formType === 5) {
            $rules = [
                'categories_menu_placement' => 'required',
                'brand_menu_placement' => 'required',
                'footer_text' => 'min:3|max:50',
            ];
        } elseif ($formType === 4) {
            $itemLoadType = (int) Request::input('item_load_type');

            if (__ifIsset($itemLoadType)) {
                if ($itemLoadType === 1) {
                    $rules = [
                        'pagination_count' => 'required|integer|min:20|max:100',
                    ];
                } else {
                    $rules = [
                        'pagination_count' => 'required|integer|min:5|max:100',
                    ];
                }
            }
        } elseif ($formType === 7) {
            $rules['term_condition'] = 'min:6';
            $rules['show_captcha']   = 'required|min:1';
        } elseif ($formType === 8) {
            $rules['privacy_policy'] = 'min:6';
        } elseif ($formType === 10) {
            $rules = [
                'social_facebook' => 'alpha_dash',
                'social_twitter' => 'alpha_dash',
            ];
        }

        return $rules;
    }

    /**
    * Set custom msg for field
    *
    * @return array
    *-----------------------------------------------------------------------*/

    public function messages()
    {
        return [
            'currency_format.verify_format' => __('Invalid currency format.')
        ];
    }
}
