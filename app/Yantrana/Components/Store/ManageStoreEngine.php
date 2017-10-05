<?php
/*
* ManageStoreEngine.php - Main component file
*
* This file is part of the Store component.
*-----------------------------------------------------------------------------*/

namespace App\Yantrana\Components\Store;

use App\Yantrana\Components\Store\Repositories\ManageStoreRepository;
use App\Yantrana\Components\Store\Blueprints\ManageStoreEngineBlueprint;
use App\Yantrana\Components\Media\MediaEngine;

class ManageStoreEngine implements ManageStoreEngineBlueprint
{
    /**
     * @var ManageStoreRepository - ManageStore Repository
     */
    protected $manageStoreRepository;

    /**
     * @var MediaEngine - Media Engine
     */
    protected $mediaEngine;

    /**
     * Constructor.
     *
     * @param ManageStoreRepository $manageStoreRepository - ManageStore Repository
     * @param MediaEngine           $mediaEngine           - Media Engine
     *-----------------------------------------------------------------------*/
    public function __construct(ManageStoreRepository $manageStoreRepository,
     MediaEngine $mediaEngine)
    {
        $this->manageStoreRepository = $manageStoreRepository;
        $this->mediaEngine = $mediaEngine;
    }

    /**
     * get require data for form.
     *
     * @param string $data
     * @param string $string
     *---------------------------------------------------------------- */
    protected function checkIsEmpty($data, $string)
    {
        return isset($data[$string]) ? $data[$string] : '';
    }

    /**
     * check the data is true or false.
     *
     *  @param array $data
     *  @param string $string
     *---------------------------------------------------------------- */
    protected function checkIsValid($data, $string)
    {
        return isset($data[$string]) ? $data[$string] : true;
    }

    /**
     * check the data is true or false.
     *
     *  @param array $data
     *  @param string $string
     *---------------------------------------------------------------- */
    protected function makeItBool($data, $string)
    {
        if (__ifIsset($data[$string])) {
            return (bool) $data[$string];
        }

        return false;
    }

  /**
    * Set type of data
    *
    * @param number number $datTypeId
    * @param sting number $value
    *
    * @return void
    *-----------------------------------------------------------------------*/

    
    public function getDataType($datTypeId, $value)
    {
        switch ($datTypeId) {
            case 1:
                return (string) $value;
                break;
            case 2:
                return (bool) $value;
                break;
            case 3:
                return (int) $value;
                break;
            default:
                return $value;
        }
    }

    /**
     * cast each and every value of configuration table.
     *
     * @param array $dataType
     *
     *---------------------------------------------------------------- */
    public function castValue($dataArray)
    {
        $configArray = [];

        $configurationNames = config('__tech.settings.fields');

        foreach ($dataArray as $key => $data) {
            $datTypeId = $configurationNames[$key]['data_type'];

            $configArray[$key] = $this->getDataType($datTypeId, $data);
        }
        return $configArray;
    }

    /**
     * prepare data for configuration setting if data not exist then it will get from
     * config settings
     *
     *  @param array $selectedData
     *  @param array $dbArray
     *
     *  @param string $string
     *---------------------------------------------------------------- */
    protected function prepareConfigurationData($selectedData, $dbArray)
    {
        $configArray = config('__tech.settings.fields');
        
        if (!__isEmpty($selectedData)) {
            foreach ($selectedData as $key => $selectValue) {
                if (array_key_exists($selectValue, $dbArray) == false) {
                    $dbArray[$selectValue] =  $configArray[$selectValue]['default'];
                }
            }
        }

        // Get casting value
        $settingData = $this->castValue($dbArray);
        $settingArray = [];

        if (!__isEmpty($settingData)) {
            foreach ($settingData as $key => $setting) {
                if (array_key_exists('placeholder', $configArray[$key])) {
                    $settingArray[$key.'_placeholder'] = $configArray[$key]['placeholder'];
                }

                $settingArray[$key] = $setting;
            }
        }
        
        return $settingArray;
    }

    /**
     * get only requested data on form
     *
     *  @param string $requestType
     *
     *  @param string $string
     *---------------------------------------------------------------- */
    protected function getRequestedData($selectedData, $requestType)
    {
        $configurationCollection = $this->manageStoreRepository->fetch();

        $configurationArray = $configurationData = [];

        $isLiveStripeKeysExist = false;
        $isTestingStripeKeysExist = false;

        if (!__isEmpty($configurationCollection)) {
            foreach ($configurationCollection as $configuration) {
                $name   = $configuration->name;
                $value  = $configuration->value;

                // Get logo image URL
                if ($name == 'logo_image') {
                    $configurationData['logoURL'] = getStoreSettings('logo_image_url');
                }

                // when $selectedData is empty then get all configuration
                if (__isEmpty($selectedData)) {
                    $configurationArray[$name] = $value;
                } else {

                    // when $selectedData is not empty get selected configuration
                    if (in_array($name, $selectedData)) {
                        $configurationArray[$name] = $value;
                    }
                }
            }

            if ($requestType == 3) { // Order and Payment
                 
                // Check if stripe keys are exist
                if (isset($configurationArray['stripe_live_secret_key'])
                    and !__isEmpty($configurationArray['stripe_live_secret_key'])
                    and isset($configurationArray['stripe_live_publishable_key'])
                    and !__isEmpty($configurationArray['stripe_live_publishable_key'])) {
                    $isLiveStripeKeysExist = true;
                }

                // Check if stripe keys are exist
                if (isset($configurationArray['stripe_testing_secret_key'])
                    and !__isEmpty($configurationArray['stripe_testing_secret_key'])
                    and isset($configurationArray['stripe_testing_publishable_key'])
                    and !__isEmpty($configurationArray['stripe_testing_publishable_key'])) {
                    $isTestingStripeKeysExist = true;
                }
            }
        }

        $configurationArray = $this->prepareConfigurationData(
                                                        $selectedData,
                                                        $configurationArray
                                                    );

        // Check page type and get data as per request type
        if ($requestType == 1) { // general

            $configurationArray['timezone_list']       = getTimeZone();

            $configurationArray['home_page_setting']   = configItem('home_page_setting');
            
            $configurationArray['logoURL']            = __ifIsset($configurationData['logoURL']) ? $configurationData['logoURL'] : '';
        } elseif ($requestType == 2) { // currency

            $configurationArray['currencies'] = configItem('currencies');
            $configurationArray['default_currency_format']
                                = configItem('settings.fields.currency_format.default');
        } elseif ($requestType == 3) { // Order and Payment

            // if Live stripe key exist then remove from array
            if ($isLiveStripeKeysExist) {
                unset($configurationArray['stripe_live_secret_key']);
                unset($configurationArray['stripe_live_publishable_key']);
            }

            // if Live stripe key exist then remove from array
            if ($isTestingStripeKeysExist) {
                unset($configurationArray['stripe_testing_secret_key']);
                unset($configurationArray['stripe_testing_publishable_key']);
            }

            $configurationArray['isLiveStripeKeysExist'] = $isLiveStripeKeysExist;
            $configurationArray['isTestingStripeKeysExist'] = $isTestingStripeKeysExist;
        } elseif ($requestType == 5) { // placement

            $configurationArray['menu_placement'] = configItem('menu_placement');
        }
       
        return $configurationArray;
    }

    /**
      * get the edit support data
      *
      * @param string $requestType
      *
      * @return void
      *-----------------------------------------------------------------------*/

    public function prepareSettingsEditSupportData($requestType)
    {
        $selectedData = [];
        
        // set required keys
        if ($requestType == 1) { // general

            $selectedData = [
                                'store_name',
                                'logo_image',
                                'logo_background_color',
                                'timezone',
                                'home_page',
                                'business_email',
                            ];
        } elseif ($requestType == 2) { // currency

            $selectedData = [
                                'currency',
                                'currency_symbol',
                                'currency_value',
                                'currency_format',
                                'round_zero_decimal_currency'
                            ];
        } elseif ($requestType == 3) { // order & payments
            
            $selectedData = [
                                'payment_other',
                                'payment_other_text',
                                'hide_sidebar_on_order_page',
                                'use_paypal',
                                'paypal_email',
                                'paypal_sandbox_email',
                                'use_stripe',
                                'stripe_live_secret_key',
                                'stripe_live_publishable_key',
                                'stripe_testing_secret_key',
                                'stripe_testing_publishable_key',
                                'payment_check',
                                'payment_check_text',
                                'payment_bank',
                                'payment_bank_text',
                                'payment_cod',
                                'payment_cod_text',
                                'apply_tax_after_before_discount',
                                'calculate_tax_as_per_shipping_billing'
                            ];
        } elseif ($requestType == 4) { // product
            
            $selectedData = [
                                'show_out_of_stock',
                                'pagination_count',
                                'item_load_type'
                            ];
        } elseif ($requestType == 5) { // placement
            
            $selectedData = [
                                'categories_menu_placement',
                                'brand_menu_placement',
                                'credit_info',
                                'addtional_page_end_content',
                                'footer_text',
                                'show_language_menu',
                                'global_notification',
                                'append_email_message'
                            ];
        } elseif ($requestType == 6) { // contact
            
            $selectedData = [
                                'contact_email',
                                'contact_address'
                            ];
        } elseif ($requestType == 7) { // termsAndConditions or users tab
            
            $selectedData = [
                                'activation_required_for_new_user',
                                'activation_required_for_change_email',
                                'term_condition',
                                'show_captcha'
                        ];
        } elseif ($requestType == 8) { // privacy policy

            $selectedData = [
                                'privacy_policy'
                            ];
        } elseif ($requestType == 9) { // css style

          $selectedData = [
                    'custom_css'
                  ];
        } elseif ($requestType == 10) { // payment

            $selectedData = [
                                'social_facebook',
                                'social_twitter',
                            ];
        }

        return __engineReaction(1, [
            'store_settings' => $this->getRequestedData($selectedData, $requestType)
        ]);
    }

    

    /**
     * Process edit store settings.
     *
     * @param array $inputs
     * @param int $requestType
     *
     * @return array
     *---------------------------------------------------------------- */
    public function processEditStoreSettings($inputs, $requestType)
    {
        $reactionCode =  $this->manageStoreRepository
                             ->processTransaction(function () use ($inputs, $requestType) {

            // fetch all configuration array
            $configurations = $this->manageStoreRepository->fetch();

                                 $logoImage = __ifIsset($inputs['logo_image'],
                            $inputs['logo_image'], '');

                                 $landingPageImage = __ifIsset($inputs['landing_page_image'])
                                ? $inputs['landing_page_image']
                                : '';

                                 $logoUpdated = false;
            
            // Check if logo exist Then Process This Logo Image
            if (!__isEmpty($logoImage)) {

                // Store Logo image
                $newLogoImage = $this->mediaEngine->processStoreSettingLogoMedia($logoImage);

                if (!__isEmpty($newLogoImage)) {
                    $inputs['logo_image'] = $newLogoImage;

                    $logoUpdated = true;
                }
            }

            // If logo not exist then remove logo image from input data
            if ($logoUpdated == false) {
                $inputs = array_except($inputs, 'logo_image');
            }

                                 if ($requestType == 6) { // Contact
                $inputs['contact_email'] = strtolower($inputs['contact_email']);
                                 }

                                 if ($requestType == 1) { // General
                $inputs['business_email'] = strtolower($inputs['business_email']);
                                 }

            // Check if store configuration is empty
            if (__isEmpty($configurations)) {
                if ($this->manageStoreRepository->addSettings($inputs)) {
                    return $this->manageStoreRepository->transactionResponse(1, [
                            'message' => __('Settings updated successfully.'),
                            'textMessage' => __('To take a effect updated settings, please reload page.')
                    ]);
                }

                return $this->manageStoreRepository->transactionResponse(14, null, __('Nothing updated.'));
            }
          
            // if the item already available in database
            $configurationUpdated = $this->manageStoreRepository
                                         ->updateSettings($configurations, $inputs);

            // check if the configuration object updated
            if ($configurationUpdated or $logoUpdated) {
                return $this->manageStoreRepository->transactionResponse(1, [
                            'message' => __('Settings updated successfully.'),
                            'textMessage' => __('To take a effect updated settings, please reload page.')
                    ]);
            }

                                 return $this->manageStoreRepository->transactionResponse(14, null, __('Nothing updated.'));
                             });

        return __engineReaction($reactionCode);


        /*$reactionCode = $this->manageStoreRepository
                             ->processTransaction(function () use ($input, $formType) {

            $logoUpdated = false;

            // General tab
            if ($formType == 'general') {
                $logoImage = (isset($input['logo_image'])) ? $input['logo_image'] : '';

                // Check if logo exist Then Process This Logo Image
                if (!__isEmpty($logoImage)) {

                    // Store Logo image
                    $newLogoImage = $this->mediaEngine->processStoreSettingLogoMedia($logoImage);

                    if (!__isEmpty($newLogoImage)) {
                        $input['logo_image'] = $newLogoImage;

                        $logoUpdated = true;
                    }
                }

            // Currency tab
            } elseif ($formType == 'currency') {
                if (isset($input['currency']) == 'other') {
                    $input['currency'] = $input['currency_value'];
                }

            // order tab
            } elseif ($formType == 'order') {

                // use paypal checkbox checkbox
                $input['use_paypal'] = (isset($input['use_paypal']))
                                          ? $input['use_paypal']
                                          : false;

                // use submit order by email checkbox
                $input['payment_other'] = (isset($input['payment_other']))
                                              ? $input['payment_other']
                                              : false;

                // hide or show sidebar on order summary page checkbox
                $input['hide_sidebar_on_order_page'] = (isset($input['hide_sidebar_on_order_page']))
                                              ? $input['hide_sidebar_on_order_page']
                                              : false;

                // payment by Check checkbox
                $input['payment_check'] = (isset($input['payment_check']))
                                                      ? $input['payment_check']
                                                      : false;

                // Payment by bank checkbox
                $input['payment_bank'] = (isset($input['payment_bank']))
                                                      ? $input['payment_bank']
                                                      : false;

                // Payment by COD checkbox
                $input['payment_cod'] = (isset($input['payment_cod']))
                                                      ? $input['payment_cod']
                                                      : false;

            // product tab
            } elseif ($formType == 'product') {
                $input['show_out_of_stock'] = (isset($input['show_out_of_stock']))
                                          ? $input['show_out_of_stock']
                                          : false;
            // language tab
            } elseif ($formType == 'language') {
                $input['show_language_menu'] = (isset($input['show_language_menu']))
                                          ? $input['show_language_menu']
                                          : false;

                $input['send_mail_in_customer_language'] = (isset($input['send_mail_in_customer_language']))
                                          ? $input['send_mail_in_customer_language']
                                          : false;
            }

            $settingsCollection = $this->manageStoreRepository->fetch();

            // Check if store settings empty
            if (empty($settingsCollection)) {
                if ($this->manageStoreRepository->addSettings($input)) {
                    return 1;
                }

                return 14;
            }

            // If logo not exist then remove logo image from input data
            if ($logoUpdated == false) {
                $input = array_except($input, 'logo_image');
            }

            $settingUpdate = $this->manageStoreRepository
                                   ->updateSettings($settingsCollection, $input);

            // check setting update
            if ($logoUpdated == true and $settingUpdate == false) {
                return 1;
            } else {
                return 1;
            }

            return 14;

        });

        if ($reactionCode == 1) {
            return __engineReaction(1, [
                    'message' => __('Settings updated successfully.'),
                    'textMessage' => __('To take a effect updated settings, please reload page.'),
                    ]);
        }

        return __engineReaction($reactionCode);*/
    }

    /**
     * Prepare store settings.
     *
     * @return eloquent collection object
     *---------------------------------------------------------------- */
    public function prepareStoreSettings()
    {
        return $this->manageStoreRepository->fetchSettings();
    }
}
