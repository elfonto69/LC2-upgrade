<?php
/*
* ManageStoreRepository.php - Repository file
*
* This file is part of the Store component.
*-----------------------------------------------------------------------------*/

namespace App\Yantrana\Components\Store\Repositories;

use Cache;
use App\Yantrana\Core\BaseRepository;
use App\Yantrana\Components\Store\Models\Setting as StoreSetting;
use App\Yantrana\Components\Store\Blueprints\ManageStoreRepositoryBlueprint;

class ManageStoreRepository extends BaseRepository implements ManageStoreRepositoryBlueprint
{
    /**
     * @var StoreSetting - StoreSetting Model
     */
    protected $storeSetting;

    /**
     * Constructor.
     *
     * @param StoreSetting $storeSetting - StoreSetting Model
     *-----------------------------------------------------------------------*/
    public function __construct(StoreSetting $storeSetting)
    {
        $this->storeSetting = $storeSetting;
    }

    /**
     * Fetch store settings.
     *
     * @return eloquent collection object
     *---------------------------------------------------------------- */
    public function fetch()
    {
        return $this->storeSetting->select('name', 'value')->get();
    }

    /**
     * Fetch store settings.
     *
     * @return eloquent collection object
     *---------------------------------------------------------------- */
    public function fetchSettings()
    {
        return $this->viaCache('cache.storeSetting.namevalue', function () {
            return $this->storeSetting->select('name', 'value')->get();
        });
    }

    /**
     * Add new store settings.
     *
     * @param array $input
     *
     * @return bool
     *---------------------------------------------------------------- */
    public function addSettings($input)
    {
        $configArray = config('__tech.settings.fields');

        $insertData = [];

        foreach ($input as $key => $value) {
            if (array_key_exists($key, $configArray)) {
                $insertData[] = [
                    'name'   => $key,
                    'value'  => $value
                ];
            }
        }
 
        if ($this->storeSetting->prepareAndInsert($insertData)) {
            return true;
        }

        return false;
    }

    /**
     * Update store settings.
     *
     * @param object $configurations
     * @param array  $inputs
     *
     * @return bool
     *---------------------------------------------------------------- */
    public function updateSettings($configurations, $inputs)
    {
        $configArray = config('__tech.settings.fields');
        
        $existingConfigurations = $configurations->pluck('name')->all();
        $inputSettingName       = $updateData = [];
        
        // get input & check if the input already available in array then
        // set in array
        
        foreach ($inputs as $key => $input) {
            if (!__isEmpty($existingConfigurations)) {
                if (array_key_exists($key, $configArray) and in_array($key, $existingConfigurations)) {
                    $updateData[] = [
                        'name'   => $key,
                        'value' => $input
                    ];
                }
            } else {
                $updateData[] = [
                    'name'   => $key,
                    'value'  => $input
                ];
            }

            $inputSettingName[] = $key;
        }

        // Create new array for setting name
        $settingName = [];

        foreach ($configurations as $setting) {
            $settingName[] = $setting['name'];
        }


        $getNewConfigName = [];

        // Check input setting exist
        // compare database name and input name and return differences
        if (!empty($inputSettingName)) {
            $newConfigurationKey = array_diff($inputSettingName, $settingName);

            if (!empty($newConfigurationKey)) {
                foreach ($newConfigurationKey as $newConfigKey) {
                    if (array_key_exists($newConfigKey, $configArray)) {
                        $getNewConfigName[] = $newConfigKey;
                    }
                }
            }
        }

        $insertData = [];
        // Check if input exist and check input data exist in new configuration name
        if (!__isEmpty($inputs)) {
            foreach ($inputs as $inputConfigKey => $inputConfigValue) {
                if (in_array($inputConfigKey, $getNewConfigName)) {
                    $insertData[] = [
                        'name'   => $inputConfigKey,
                        'value' => $inputConfigValue
                    ];
                }
            }
        }

        // if insert data exist then insert new value in database
        if (!__isEmpty($insertData)) {
            if ($this->storeSetting->prepareAndInsert($insertData)) {
                return true;
            }
        }

        // if existing setting exist then update data
        if (!__isEmpty($existingConfigurations)) {
            if ($this->storeSetting->batchUpdate($updateData, 'name')) {
                return true;
            }
        } else {
            if ($this->storeSetting->prepareAndInsert($updateData)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Fetch store currency symbol.
     *
     * @return string
     *---------------------------------------------------------------- */
    public function fetchCurrencySymbol()
    {
        $storeCurrency = $this->storeSetting
                              ->where('name', 'currency_symbol')
                              ->select('value')
                              ->first();

        if (empty($storeCurrency)) {
            return '';
        }

        return $storeCurrency->value;
    }

    /**
     * Fetch store currency.
     *
     * @return string
     *---------------------------------------------------------------- */
    public function fetchCurrency()
    {
        $storeCurrency = $this->storeSetting
                              ->where('name', 'currency')
                              ->select('value')
                              ->first();

        if (empty($storeCurrency)) {
            return '';
        }

        return $storeCurrency->value;
    }
}
