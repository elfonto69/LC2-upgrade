<?php
// Response Codes & other global configurations
$techConfig = require app_path('Yantrana/__Laraware/Config/tech-config.php');

$techAppConfig = [
     "gettext_fallback" => true,

    /* Paths
    ------------------------------------------------------------------------- */

    "custom_pages"        => "external-pages/",
    "product_assets"      => "media-storage/products/product-",
    "product_user_assets" => "media-storage/users/user-",
    'day_date_time_format'=> 'l jS F Y  g:ia',
    'account_activation'  => (60*60*48),
    'cart_expiration_time' => 60*60*24*365, // shoppingCart expiration in 1 year

    /* pagination
    ------------------------------------------------------------------------- */

    'pagination_count'  => 5,

    /* default item load type
    ------------------------------------------------------------------------- */
    'loadItemType' => 24, // use scroll

    /* character limit
    ------------------------------------------------------------------------- */

    'character_limit'  => 16,

    /* quantity limit
    ------------------------------------------------------------------------- */

    'qty_limit'  => 99999,

    /* international shipping - All Other Countries
    ------------------------------------------------------------------------- */

    'aoc'  => 'AOC', // treated as Country Code
    'aoc_id'  => 999, // id in countries table 

    /* shop logo name
    ------------------------------------------------------------------------- */

    'logoName'  => 'logo.png',

    /* Email Config
    ------------------------------------------------------------------------- */

    'mail_from'         =>  [ 
        env('MAIL_FROM_ADD', 'your@domain.com'),
        env('MAIL_FROM_NAME', 'E-Mail Service')
    ],

    /* Account related 
    ------------------------------------------------------------------------- */

    'account' => [
        'activation_expiry'         => 24 * 2, // hours
        'change_email_expiry'       => 24 * 2, // hours
        'password_reminder_expiry'  => 24 * 2, // hours
        'passwordless_login_expiry' => 5, // minutes
    ],

    'login_attempts'    =>  5,

    /* Status Code Multiple Uses
    ------------------------------------------------------------------------- */

    'status_codes' => [
        1 => ('Active'),
        2 => ('Inactive'),
        3 => ('Banned'),
        4 => ('Never Activated'),
        5 => ('Deleted'),
        6 => ('Suspended'),
        7 => ('On Hold'),
        8 => ('Completed'),
        9 => ('Invite')
    ],

    /* User Roles
    ------------------------------------------------------------------------- */

    'roles' => [
        1 => ('Admin'),
        2 => ('User'),
    ],

    /* Assigned user status codes
    ------------------------------------------------------------------------- */

    'user' => [
        'status_codes' => [ 
            1, // active
            2, // deactive
            3, // banned
            4, // never activated
            5  // deleted
        ]
    ],

    /* Order Status
    ------------------------------------------------------------------------- */

    'orders' => [
        'type' => [ 
            1 => ('Order by Email'),
            2 => ('PayPal/Stripe')
        ],
        'payment_methods' => [ 
            1 => ('PayPal'), // PayPal IPN Payments
            2 => ('Check'),
            3 => ('Bank Transfer'),
            4 => ('COD'),    
            5 => ('Other'),
            6 => ('Stripe'),
            7 => ('PayPal Sandbox'), 
            8 => ('Stripe Test Mode') 
        ],
        'payment_status' => [ 
            1 => ('Awaiting Payment'), // PayPal IPN Payments
            2 => ('Completed'),
            3 => ('Payment Failed'),
            4 => ('Pending'),
            5 => ('Refunded')
        ],
        'payment_type' => [ 
            1 => ('Deposit'),
            2 => ('Refund')
        ],
        'products' => [ 
            1 => ('Ordered'),
            2 => ('Confirmed & Available'),
            3 => ('Cancelled'),
            4 => ('Not Available'),
            5 => ('Not Shippable')
        ],
        'status_codes' => [ 
            1 => ('New'),
            2 => ('Processing'),
            3 => ('Cancelled'),
            4 => ('On Hold'),
            5 => ('In Transit'),
            6 => ('Completed'),
            7 => ('Confirmed'),
            // 8 => ('Cancellation Request Received'),
            // 9 => ('User Cancelled'),
            //10 => ('Invalid'),
            11 => ('Delivered')
        ],
        'date_filter_code' => [ 
            1 => ('Placed'),
            2 => ('Updated')
        ],
    ],


    /* Manage Pages related
    --------------------------------------------------------------------------*/

    'pages_status_codes' => [
        1 => ('Yes'),
        2 => ('No')
    ],

    'pages_types' => [
        1 => ('Page'),
        2 => ('Link')
    ],

    'pages_types_with_system_link' => [
        1 => ('Page'),
        2 => ('Link'),
        3 => ('System Link')
    ],


    /* Reserve page id
    ------------------------------------------------------------------------- */
    'reserve_pages_ids'    =>  [/*1,*/ 2, 3, 4, 5, 6],
    'reserve_pages'        =>  [/*1,*/ 2, 3, 4, 5, 6],

    'system_links'  => [
        //'home'         => 1,
        'categories' => 2,
        'brand'      => 3,
        'login'      => 4,
        'register'   => 5,
        'contact'    => 6
    ],

    'pages_type_codes' => [1,2,3],

    'link_target' => [
        '_blank'  => ('_blank'),
        '_self'   => ('_self') ,
        '_parent' => ('_parent')
    ],

    'link_target_array' => ['_blank','_self','_parent'],

    /* Manage categories related
    --------------------------------------------------------------------------*/

    'categories_status_codes' => [
        1 => ('Active'),
        2 => ('Deactive')
    ],


    /* Store Related Config Values
    --------------------------------------------------------------------------*/

    'currencies'         => [

        /* Zero-decimal currencies
        ----------------------------------------------------------------------*/
        'zero_decimal'  => [
            'BIF' =>  'Burundian Franc',
            'CLP' =>  'Chilean Peso',
            'DJF' =>  'Djiboutian Franc',
            'GNF' =>  'Guinean Franc',
            'JPY' =>  'Japanese Yen',
            'KMF' =>  'Comorian Franc',
            'KRW' =>  'South Korean Won',
            'MGA' =>  'Malagasy Ariary',
            'PYG' =>  'Paraguayan Guaraní',
            'RWF' =>  'Rwandan Franc',
            'VND' =>  'Vietnamese Đồng',
            'VUV' =>  'Vanuatu Vatu',
            'XAF:' => 'Central African Cfa Franc',
            'XOF' =>  'West African Cfa Franc',
            'XPF' =>  'Cfp Franc',
            // Paypal zero-decimal currencies
            'HUF' =>  'Hungarian Forint',
            'TWD' =>  'New Taiwan Dollar',
        ], 
        
        'options'   => [
            'AUD' => ('Australian Dollar'),
            'CAD' => ('Canadian Dollar'),
            'EUR' => ('Euro'),
            'GBP' => ('British Pound'),
            'USD' => ('U.S. Dollar'),
            'NZD' => ('New Zealand Dollar'),
            'CHF' => ('Swiss Franc'),
            'HKD' => ('Hong Kong Dollar'),
            'SGD' => ('Singapore Dollar'),
            'SEK' => ('Swedish Krona'),
            'DKK' => ('Danish Krone'),
            'PLN' => ('Polish Zloty'),
            'NOK' => ('Norwegian Krone'),
            'HUF' => ('Hungarian Forint'),
            'CZK' => ('Czech Koruna'),
            'ILS' => ('Israeli New Shekel'),
            'MXN' => ('Mexican Peso'),
            'BRL' => ('Brazilian Real (only for Brazilian members)'),
            'MYR' => ('Malaysian Ringgit (only for Malaysian members)'),
            'PHP' => ('Philippine Peso'),
            'TWD' => ('New Taiwan Dollar'),
            'THB' => ('Thai Baht'),
            'TRY' => ('Turkish Lira (only for Turkish members)'),
            ''    => ('Other')
        ],
        'details'    => [

            'AUD' => [
                'name'   => ("Australian Dollar"), 
                'symbol' => "A$", 
                'ASCII'  => "A&#36;"
            ],
                 
            'CAD' => [
                'name'   => ("Canadian Dollar"), 
                'symbol' => "$", 
                'ASCII'  => "&#36;"
            ],

            'CZK' => [
                'name'   => ("Czech Koruna"), 
                'symbol' => "Kč", 
                'ASCII'  => "K&#x10d;"
            ],

            'DKK' => [
                'name'   => ("Danish Krone"), 
                'symbol' => "Kr", 
                'ASCII'  => "K&#x72;"
            ],

            'EUR' => [
                'name'   => ("Euro"), 
                'symbol' => "€", 
                'ASCII'  => "&euro;"
             ],

            'HKD' => [
                'name'   => ("Hong Kong Dollar"), 
                'symbol' => "$", 
                'ASCII'  => "&#36;"
            ],

            'HUF' => [
                'name'   => ("Hungarian Forint"), 
                'symbol' => "Ft", 
                'ASCII'  => "F&#x74;"
            ],

            'ILS' => [
                'name'   => ("Israeli New Sheqel"), 
                'symbol' => "₪", 
                'ASCII'  => "&#8361;"
            ],

            'JPY' => [
                'name'   => ("Japanese Yen"), 
                'symbol' => "¥", 
                'ASCII'  => "&#165;"
            ],

            'MXN' => [
                'name'   => ("Mexican Peso"), 
                'symbol' => "$", 
                'ASCII'  => "&#36;"
            ],

            'NOK' => [
                'name'   => ("Norwegian Krone"), 
                'symbol' => "Kr", 
                'ASCII'  => "K&#x72;"
            ],

            'NZD' => [
                'name'   => ("New Zealand Dollar"), 
                'symbol' => "$", 
                'ASCII'  => "&#36;"
            ],

            'PHP' => [
                'name'   => ("Philippine Peso"), 
                'symbol' => "₱", 
                'ASCII'  => "&#8369;"
            ],

            'PLN' => [
                'name'   => ("Polish Zloty"), 
                'symbol' => "zł", 
                'ASCII'  => "z&#x142;"
            ],

            'GBP' => [
                'name'   => ("Pound Sterling"), 
                'symbol' => "£", 
                'ASCII'  => "&#163;"
            ],

            'SGD' => [
                'name'   => ("Singapore Dollar"), 
                'symbol' => "$", 
                'ASCII'  => "&#36;"
            ],

            'SEK' => [
                'name'   => ("Swedish Krona"), 
                'symbol' => "kr", 
                'ASCII'  => "K&#x72;"
            ],

            'CHF' => [
                'name'   => ("Swiss Franc"), 
                'symbol' => "CHF", 
                'ASCII'  => "&#x43;&#x48;&#x46;"
            ],

            'TWD' => [
                'name'   => ("Taiwan New Dollar"), 
                'symbol' => "NT$", 
                'ASCII'  => "NT&#36;"
            ],

            'THB' => [
                'name'   => ("Thai Baht"), 
                'symbol' => "฿", 
                'ASCII'  => "&#3647;"
            ],

            'USD' => [
                'name'   => ("U.S. Dollar"), 
                'symbol' => "$", 
                'ASCII'  => "&#36;"
            ]
        ],
    ],

    'menu_placement' =>  [
        [
            'value'    => 1,
            'name'  => ('Sidebar')
        ],
        [
            'value'    => 2,
            'name'  => ('Top Menu')
        ],
        [
            'value'    => 3,
            'name'  => ('Both')
        ],
        [
            'value'    => 4,
            'name'  => ('Dont Show')
        ]
    ],

    'settings' => [

        /* Configuration setting data-types id
        ------------------------------------------------------------------------- */
        'datatypes'  => [
            'string' => 1,
            'bool'   => 2,
            'int'    => 3,
            'json'   => 4
        ],
        'fields' => [
            // General Tab
            'store_name' => [
                'key'           => 'store_name',
                'data_type'     => 1,    // string
                'default'       => 'You Website Name'
            ],
            'logo_image' => [
                'key'           => 'logo_image',
                'data_type'     => 1,    // string
                'default'       => 'logo.png'
            ],
            'logo_background_color' => [
                'key'           => 'logo_background_color',
                'data_type'     => 1,    // string
                'default'       => '383838' // dark grey
            ],
            'business_email' => [
                'key'           => 'business_email',
                'data_type'     => 1,    // string
                'default'       => '',
                'placeholder'   => 'your-email-address@example.com'
            ],
            'home_page' => [
                'key'           => 'home_page',
                'data_type'     => 3,    // integer
                'default'       => 1    // home page settings
            ],
            'timezone' => [
                'key'           => 'timezone',
                'data_type'     => 1,    // string
                'default'       => 'UTC'
            ],
            // Currency settings
            'currency'              => [
                'key'           => 'currency',
                'data_type'     => 1,    // string
                'default'       => 'USD'
            ],
            'currency_symbol'       => [
                'key'           => 'currency_symbol',
                'data_type'     => 1,    // string
                'default'       => '&#36;'
            ],
            'currency_value'        => [
                'key'           => 'currency_value',
                'data_type'     => 1,    // string
                'default'       => 'USD'
            ],
            'currency_decimal_round' => [
                'key'           => 'currency_decimal_round',
                'data_type'     => 3, // int
                'default'       => 2
            ],
            'round_zero_decimal_currency' => [
                'key'           => 'round_zero_decimal_currency',
                'data_type'     => 2, // boolean
                'default'       => true // round
            ],
            'currency_format'   => [
                'key'           => 'currency_format',
                'data_type'     => 1,    // string
                'default'       => '{__currencySymbol__}{__amount__} {__currencyCode__}'
            ],
            'payment_other'        => [
                'key'           => 'payment_other',
                'data_type'     => 2,    // boolean
                'default'       => false
            ],
            'payment_other_text'        => [
                'key'           => 'payment_other_text',
                'data_type'     => 1,    // string
                'default'       => 'Add here other payment related information'
            ],
            'hide_sidebar_on_order_page' => [
                'key'           => 'hide_sidebar_on_order_page',
                'data_type'     => 2,    // boolean
                'default'       => true
            ],
            // Payment method
            'use_paypal'        => [
                'key'           => 'use_paypal',
                'data_type'     => 2,    // boolean
                'default'       => false
            ],
            'paypal_email'        => [
                'key'           => 'paypal_email',
                'data_type'     => 1,    // string
                'default'       => '',
                'placeholder'   => 'your-paypal-email-address@example.com'
            ],
            'paypal_sandbox_email'          => [
                'key'           => 'paypal_sandbox_email',
                'data_type'     => 1,    // string
                'default'       => '',
                'placeholder'   => 'your-sandbox-email-address@example.com'
            ],
            'use_stripe'            => [
                'key'           => 'use_stripe',
                'data_type'     => 2,    // boolean
                'default'       => false
            ],
            'stripe_live_secret_key'          => [
                'key'           => 'stripe_live_secret_key',
                'data_type'     => 1,    // string
                'default'       => '',
                'placeholder'   => 'Live secret key'
            ],
            'stripe_live_publishable_key'          => [
                'key'           => 'stripe_live_publishable_key',
                'data_type'     => 1,    // string
                'default'       => '',
                'placeholder'   => 'Live Publishable Key'
            ],
            'stripe_testing_secret_key'          => [
                'key'           => 'stripe_testing_secret_key',
                'data_type'     => 1,    // string
                'default'       => '',
                'placeholder'   => 'Test Secret Key'
            ],
            'stripe_testing_publishable_key'          => [
                'key'           => 'stripe_testing_publishable_key',
                'data_type'     => 1,    // string
                'default'       => '',
                'placeholder'   => 'Test Publishable key'
            ],
            'payment_check'        => [
                'key'           => 'payment_check',
                'data_type'     => 2,    // boolean
                'default'       => false
            ],
            'payment_check_text'        => [
                'key'           => 'payment_check_text',
                'data_type'     => 1,    // string
                'default'       => 'Add here check related information.'
            ],
            'payment_bank'        => [
                'key'           => 'payment_bank',
                'data_type'     => 2,    // boolean
                'default'       => false
            ],
            'payment_bank_text'        => [
                'key'           => 'payment_bank_text',
                'data_type'     => 1,    // string
                'default'       => 'Add here bank related information'
            ],
            'payment_cod'        => [
                'key'           => 'payment_cod',
                'data_type'     => 2,    // boolean
                'default'       => false
            ],
            'payment_cod_text'        => [
                'key'           => 'payment_cod_text',
                'data_type'     => 1,    // string
                'default'       => 'Add here cod related information.'
            ],
            'show_out_of_stock'        => [
                'key'           => 'show_out_of_stock',
                'data_type'     => 2,    // boolean
                'default'       => true
            ],
            'pagination_count'        => [
                'key'           => 'pagination_count',
                'data_type'     => 3,    // int
                'default'       => 5
            ],
            'item_load_type'        => [
                'key'           => 'item_load_type',
                'data_type'     => 3,    // int
                'default'       => 2
            ],
            'categories_menu_placement'        => [
                'key'           => 'categories_menu_placement',
                'data_type'     => 3,    // int
                'default'       => 3
            ],
            'brand_menu_placement'        => [
                'key'           => 'brand_menu_placement',
                'data_type'     => 3,    // int
                'default'       => 3
            ],
            'credit_info'       => [
                'key'           => 'credit_info',
                'data_type'     => 2,    // bool
                'default'       => true
            ],
            'addtional_page_end_content'        => [
                'key'           => 'addtional_page_end_content',
                'data_type'     => 1,    // string
                'default'       => ''
            ],
            'footer_text'        => [
                'key'           => 'footer_text',
                'data_type'     => 1,    // string
                'default'       => ''
            ],
            'show_language_menu' => [
                'key'           => 'show_language_menu',
                'data_type'     => 2,    // boolean
                'default'       => true
            ],
            'contact_email'        => [
                'key'           => 'contact_email',
                'data_type'     => 1,    // string
                'default'       => '',
                'placeholder'   => 'your-email-address@example.com'
            ],
            'contact_address'        => [
                'key'           => 'contact_address',
                'data_type'     => 1,    // string
                'default'       => 'add your contact address'
            ],
            'activation_required_for_new_user'        => [
                'key'           => 'activation_required_for_new_user',
                'data_type'     => 2,    // bool
                'default'       => true
            ],
            'show_captcha' => [
                'key'           => 'show_captcha',
                'data_type'     => 3,       // integer
                'default'       => 5
            ],
            'activation_required_for_change_email'        => [
                'key'           => 'activation_required_for_change_email',
                'data_type'     => 2,    // boolean
                'default'       => true
            ],
            'term_condition'        => [
                'key'           => 'term_condition',
                'data_type'     => 1,    // string
                'default'       => 'Add terms & conditions'
            ],
            'facebook_client_id'    => [
                'key'           => 'facebook_client_id',              
                'data_type'     => 1,    // string
                'default'       => ''
            ],
            'facebook_client_secret' => [
                'key'           => 'facebook_client_secret',
                'data_type'     => 1,    // string
                'default'       => ''
            ],
            'google_client_id'      => [
                'key'           => 'google_client_id',
                'data_type'     => 1,    // string
                'default'       => ''
            ],
            'google_client_secret'  => [
                'key'           => 'google_client_secret',
                'data_type'     => 1,    // string
                'default'       => ''
            ],
            'allow_facebook_login'  => [
                'key'           => 'allow_facebook_login',
                'data_type'     => 2,     // boolean
                'default'       => false
            ],
            'allow_google_login' => [
                'key'           => 'allow_google_login',
                'data_type'     => 2,     // boolean
                'default'       => false
            ],// Privacy Policy
            'privacy_policy'        => [
                'key'           => 'privacy_policy',
                'data_type'     => 1,    // string
                'default'       => 'Add Privacy Policy'
            ],
            // Social account configuration
            'social_facebook'   => [
                'key'           => 'social_facebook',
                'data_type'     => 1,    // string
                'default'       => '',
                'placeholder'   => 'Your Social Facebook Id'
            ],
            'social_twitter' => [
                'key'           => 'social_twitter',
                'data_type'     => 1,    // string
                'default'       => '',
                'placeholder'   => 'Your Social Twitter Id'
            ],
            'custom_css' => [
                'key'           => 'custom_css',
                'data_type'     => 1,    // string
                'default'       => ''
            ],
            // Notification
            'global_notification'         => [
                'key'           => 'global_notification',
                'data_type'     => 1,    // string
                'default'       => ''
            ],
            'append_email_message' => [
                'key'           => 'append_email_message',
                'data_type'     => 1,    // string
                'default'       => ''
            ],
            'apply_tax_after_before_discount' => [
                'key'           => 'apply_tax_after_before_discount',
                'data_type'     => 3,    // int
                'default'       => 1
            ],
            'calculate_tax_as_per_shipping_billing' => [
                'key'           => 'calculate_tax_as_per_shipping_billing',
                'data_type'     => 3,    // int
                'default'       => 1
            ]
        ],
    ],

    'address_type' => [
        1 => ('Home'),
        2 => ('Office'),
        3 => ('Other Address')
    ],

    /*
    ------------------------------------------------------------------------- */
    'home_page_setting' => [
        1 => ('Home page'),
        2 => ('All Products'),
        3 => ('Featured Products'),
        4 => ('Brands')
    ],

    'address_type_list' =>  [
        [
            'id'    => 1,
            'name'  => ('Home')
        ],
        [
            'id'    => 2,
            'name'  => ('Office')
        ],
        [
            'id'    => 3,
            'name'  => ('Other Address')
        ]
    ],

    'payment_methods_list' =>  [
        [
            'id'    => 1,
            'name'  => ('PayPal')
        ],
        [
            'id'    => 2,
            'name'  => ('Check')
        ],
        [
            'id'    => 3,
            'name'  => ('Bank Transfer')
        ],
        [
            'id'    => 4,
            'name'  => ('COD')
        ],
        [
            'id'    => 5,
            'name'  =>  ('Other')
        ],
        [
            'id'    => 6,
            'name'  =>  ('Stripe')
        ],
        [
            'id'    => 7,
            'name'  =>  ('PayPal Sandbox')
        ],
        [
            'id'    => 8,
            'name'  =>  ('Stripe Test Mode')
        ]
    ],

    // Brand Status
    'brand_status' => [
        1 => ('Active'),
        2 => ('Deactive')
    ],

    // Coupon Discount Type
    'coupon_type' => [
        1 => ('Amount'),
        2 => ('Percentage')
    ],

    'coupon_discount_type' =>  [
        [
            'id'    => 1,
            'name'  => ('Amount')
        ],
        [
            'id'    => 2,
            'name'  => ('Percentage')
        ]
    ],

    /* Shipping 
    ------------------------------------------------------------------------- */
    'shipping' => [
        'type' => [
        
            [
                'id'    => 1,
                'name'  => ('Flat')
            ],
            [
                'id'    => 2,
                'name'  => ('Percentage')
            ],
            [
                'id'    => 3,
                'name'  => ('Free')
            ],
            [
                'id'    => 4,
                'name'  => ('Not Shippable')
            ]
        ],
        'typeShow' => [
            1 => ('Flat'),
            2 => ('Percentage'),
            3 => ('Free'),
            4 => ('Not Shippable')
        ],
        'status' => [
            1 => ('Active'),
            2 => ('Deactive')
        ]
    ],

    /* Tax 
    ------------------------------------------------------------------------- */
    'tax' => [
        'type' => [
            1 => ('Flat'),
            2 => ('Percentage')/*,
            3 => ('No Tax')*/
        ],
        'status' => [
            1 => ('Active'),
            2 => ('Deactive')
        ]
    ],

    /* Report duration 
    ------------------------------------------------------------------------- */
    'report_duration' => [
            1 => ('Current Month'),
            2 => ('Last Month'),
            3 => ('Current Week'),
            4 => ('Last Week'),
            5 => ('Today'),
            6 => ('Yesterday'),
            7 => ('Last Year'), 
            8 => ('Current Year'), 
            9 => ('Last 30 Days'), 
            10 => ('Custom')
    ],

    /* Payment modes
    ------------------------------------------------------------------------- */
    'env_settings' => [
        'paypal_test_mode' => env('USE_PAYPAL_SANDBOX', false),
        'stripe_test_mode' => env('STRIPE_TEST_MODE', false),
    ],

    /* PayPal URLs
    ------------------------------------------------------------------------- */
    "paypal_urls" => [
        "production" => "https://www.paypal.com/cgi-bin/webscr",
        "sandbox" => "https://www.sandbox.paypal.com/cgi-bin/webscr",
    ],
];

return array_merge( $techConfig, $techAppConfig );