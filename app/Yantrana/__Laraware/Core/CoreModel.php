<?php

namespace App\Yantrana\__Laraware\Core;

/*
 * __Laraware Core Model - 0.7.0 - 27 JAN 2017
 *
 * Base Model for Laravel applications
 *
 *
 * Dependencies:
 *
 * Laravel     5.0 +  - http://laravel.com
 *
 *
 *-------------------------------------------------------- */

use Datetime;
use Exception;
use Request;
use Cache;
use DB;
use Illuminate\Database\Eloquent\Model as Eloquent;

abstract class CoreModel extends Eloquent
{
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {

            // Generate UID if required
            if ($model->isGenerateUID) {
                $model->{ $model->UIDKey } = __generateUID();
            }

            foreach ($model->toArray() as $key => $value) {
                // process JSON data if exists
                if (array_key_exists($key, $model->toArray())
                    and array_key_exists($key, $model->jsonColumns)) {
                    // get verified data
                        $model->{ $key } = $model->verifyAndUpdateJsonColumnData($key, $value, false);
                }
            }
        });

        static::updating(function ($model) {
            foreach ($model->toArray() as $key => $value) {
                // process JSON data if exists
                if (array_key_exists($key, $model->toArray())
                        and array_key_exists($key, $model->jsonColumns)) {
                    // get verified data
                        $model->{ $key } = $model->verifyAndUpdateJsonColumnData($key, $value);
                }
            }
        });

        // clear cache if exist
        static::saved(function ($model) {
            $model->clearCacheItems();
        });

        // clear cache if exist
        static::deleted(function ($model) {
            $model->clearCacheItems();
        });
    }

    /**
     * Datatable Result counts also its max result per request.
     *
     * @var string
     *----------------------------------------------------------------------- */
    protected $maxDataTableResultCount = 100;

    /**
     * The generate UID or not.
     *
     * @var bool
     *----------------------------------------------------------------------- */
    protected $isGenerateUID = false;

    /**
     * The UID Name.
     *
     * @var string
     *----------------------------------------------------------------------- */
    protected $UIDKey = '_uid';

    /**
     * Caching Ids related to this model which may need to clear on add/update/delete.
     *
     * @var array
     *----------------------------------------------------------------------- */
    protected $cacheIds = [];

    /**
     * Let the system knows Text columns treated as JSON
     *
     * @var array
     *----------------------------------------------------------------------- */
    protected $jsonColumns = [];

    /**
     * Skip JSON Process Protocol
     *
     * @var bool
     *----------------------------------------------------------------------- */
    protected $skipJsonColumnProtocol = false;

    /**
     * Identify item to delete from JSON
     *
     * @var string
     *----------------------------------------------------------------------- */
   // protected $queryDeleteJsonItem = '--delete:';

    /**
     * Identify item to delete from JSON
     *
     * @var string
     *----------------------------------------------------------------------- */
   // protected $queryDeleteWrapperJsonItem = '--deleteWrapper:';

    /**
     * Match provided array field values with existing -
     * model field values and update model.
     *
     * @param array $inputs - for update existing model field values
     *
     * @return boolean/array
     *----------------------------------------------------------------------- */
    public function modelUpdate(array $inputs)
    {
        $updatedColumns = [];

        foreach ($inputs as $key => $value) {
            // process JSON data if exists
            if (array_key_exists($key, $this->toArray())
                and array_key_exists($key, $this->jsonColumns)) {
                $value = $this->verifyAndUpdateJsonColumnData($key, $value);
            }

            
            /*
            * Match provided array field with existing -
            * model field and also check values.
            *------------------------------------------------------------------------ */

            if (array_key_exists($key, $this->toArray())
                                and $this->{ $key } != $value) {
                // assign value
                $this->{$key} = $value;

                $updatedColumns[$key] = $value;
            }
        }

        if (!empty($updatedColumns)) {
            if ($this->save()) {
                return $updatedColumns;
            }

            return false;
        }

        return false;
    }
    

    /**
     * Notes:: this function optimized for __DataStore datatable 0.5.x.
     *
     * This function manage datatable ajax request. Function -
     * take query and manage all things need in datatable.
     *
     * @param array  $dataTablesConfig - for custom field alias
     * @param object $dataTablesConfig - for database table query scope
     *
     * @return eloquent object
     *------------------------------------------------------------------------ */
    public function scopeDataTables($query, array $dataTablesConfig = array())
    {
        $inputData = Request::all();

        $columns = $inputData['columns'];
        $order = isset($inputData['order']) ? $inputData['order'] : null;

        $sortBy = $this->table.'.'.$this->primaryKey;
        $sortOrder = 'asc';

        // if order not set
        if (!empty($order)) {
            $sortBy = $columns[$order[0]['column']]['data'];
            $sortOrder = $order[0]['dir'];
        }

        $recievedLength = $inputData['length'];

        $perPage = ($recievedLength <= 0)
                            ? $this->maxDataTableResultCount : $recievedLength;

        $start = $inputData['start'] / $perPage;

        /*  Field aliases
        --------------------------------------------------------------------- */

        $fieldAlias = [];

        // if dataTablesConfig fieldAlias exist
        if (!empty($dataTablesConfig['fieldAlias'])) {
            foreach ($dataTablesConfig['fieldAlias'] as $key => $value) {
                $fieldAlias[ $key] = $value;

                // set fieldAlias as sortable
                if ($key == $sortBy) {
                    $sortBy = $value;
                }
            }
        }

        /* DataTable Search
        --------------------------------------------------------------------- */

        $search = $inputData['search'];
        $searchableColumns = isset($dataTablesConfig['searchable'])
                                ? $dataTablesConfig['searchable'] : null;

        $query->shodh($search['value'], $searchableColumns);

        /*
         if search from datatables ends
        --------------------------------------------------------------------- */

        // check to see if maxDataTableResultCount has been set or not
        $applicableResultCount = (isset($this->maxDataTableResultCount)
                                    and is_int($this->maxDataTableResultCount))
                                    ? $this->maxDataTableResultCount : 100;

        // check if we received per page request from browser
        $applicableResultCount = $recievedLength
                                    ? $perPage : $applicableResultCount;

        // check if per page request from browser is greater
        // than maxDataTableResultCount
        $applicableResultCount =
                ($applicableResultCount > $this->maxDataTableResultCount)
                    ? $this->maxDataTableResultCount
                    : $applicableResultCount;

        // finally prepare query
        return $query->orderBy($sortBy, $sortOrder)
                     ->paginate($applicableResultCount);
    }

    /**
     * Search in the Model.
     *
     * @param array  $searchTerm        - search term
     * @param object $searchableColumns - columns to search
     *
     * @return eloquent object
     *
     * @since  0.2.0 - 30 NOV 2015
     *------------------------------------------------------------------------ */
    public function scopeShodh($query, $searchTerm, $searchableColumns)
    {
        if (!empty($searchTerm)
            and !empty($searchableColumns) and is_array($searchableColumns)) {
            $query->where(function ($whereQuery) use ($searchableColumns, $searchTerm) {
                foreach ($searchableColumns as $serachableFieldName) {
                    $whereQuery->orWhere(
                        $serachableFieldName,
                        'like',
                        '%'.$searchTerm.'%'
                    );
                }
            });
        }

        return $query;
    }

    /**
     * Assign values to inputs & save model.
     *
     * @param array $input     - input array
     * @param array $keyValues - assign constraints
     *
     * @return bool
     *------------------------------------------------------------------------ */
    public function assignInputsAndSave($input, $keyValues)
    {
        foreach ($keyValues as $key => $value) {
            if (is_string($key)) {
                // process JSON data if exists
                if (array_key_exists($key, $this->jsonColumns)) {
                    // get verified data
                    $this->{ $key } = $this->verifyAndUpdateJsonColumnData($key, $value, false);
                } else {
                    $this->{$key} = $value;
                }
            } else {
                if (isset($input[$value])) {
                    $this->{$value} = $input[$value];
                }
            }
        }

        unset($input, $keyValues);

        return $this->save();
    }

    /**
     * Prepare uid, timestamp etc & insert.
     *
     * @param array       $input        - input array
     * @param bool/string $returnColumn - if you want ids of the inserted records
     *
     * @return bool/mixed
     *------------------------------------------------------------------------ */
    public function prepareAndInsert($input, $returnColumn = false)
    {
        $timestamp = new Datetime();
        $preparedRecords = [];
        $itemUids = [];

        // check if needs return item & it should be string or boolean
        if ($returnColumn) {
            if (in_array(gettype($returnColumn), ['boolean', 'string']) === false) {
                throw new Exception('prepareAndInsert - Only boolean or string value is accepted.');
            }
        }

        // check input has contain of array items
        if ((is_array($input) === false) or (isset($input[0]) === false or is_array($input[0]) === false)) {
            throw new Exception('prepareAndInsert - Input should contain array items!!');
        }

        foreach ($input as $item) {
            foreach ($item as $itemKey => $itemValue) {
                // process JSON data if exists
                if (array_key_exists($itemKey, $this->jsonColumns)) {
                    $item[$itemKey] = json_encode($this->verifyAndUpdateJsonColumnData($itemKey, $itemValue, false));
                }
            }

            if ($this->isGenerateUID) { // generate uid if required
                $item[$this->UIDKey] = __generateUID();
                $itemUids[] = $item[$this->UIDKey];
            }

            if ($this->timestamps) { // add timestamps if allowed
                $item['created_at'] = $timestamp;
                $item['updated_at'] = $timestamp;
            }

            $preparedRecords[] = $item;
        }

        // insert the items
        $insertResult = $this->insert($preparedRecords);

        // clear cache items if available
        $this->clearCacheItems();

        unset($input, $timestamp, $preparedRecords);

        //check if return item required ids or selected column
        if (($returnColumn) and ($this->isGenerateUID) and ($insertResult === true)) {
            // item to get return
            $itemToPluck = ($returnColumn === true) ? $this->primaryKey : $returnColumn;

            // get items from db using uids
            $result = $this->whereIn($this->UIDKey, $itemUids)->get([
                $itemToPluck,
             ]);

            // check if pluck method is available which should be in Laravel 5.2+
            if (method_exists($result, 'pluck')) {
                return __ifIsset($result, $result->pluck([$itemToPluck]))->toArray();
            }

            // if not use earlier lists method
            return __ifIsset($result, $result->lists([$itemToPluck]))->toArray();
        }

        return $insertResult;
    }

    /**
     * Clear Cache using CacheIds.
     *
     * @return bool
     *------------------------------------------------------------------------ */
    protected function clearCacheItems()
    {
        if (empty($this->cacheIds) === true) {
            return false;
        }

        foreach ($this->cacheIds as $cacheId) {
            Cache::forget($cacheId);
        }

        return true;
    }

    /**
     * Batch Update.
     *
     * @param string $data  - Data to update along with index key passed
     *                      using 3rd parameter
     * @param string $index - Index key
     *
     * @return string.
     *-------------------------------------------------------- */
    public function batchUpdate(array $data, $index)
    {
        if (empty($data) or empty($index)) {
            throw new Exception('Invalid data or index');
        }

        $getItemsToUpdate = [];
        $jsonColumnKeys = [];

        if (empty($this->jsonColumns) === false) {
            $columnKeys = [];

            foreach ($data as $dataItem) {
                $columnKeys = array_merge($columnKeys, array_keys($dataItem));
            }

            $columnKeys = array_unique($columnKeys);

            if (empty($columnKeys) === false) {
                foreach ($columnKeys as $columnKey) {
                    if (array_key_exists($columnKey, $this->jsonColumns)) {
                        $jsonColumnKeys[] = $columnKey;
                    }
                }

                if (empty($jsonColumnKeys) === false) {
                    $getItemsToUpdate = $this->whereIn($index, array_pluck($data, $index))->get(array_merge($jsonColumnKeys, [$index]));
                }
            }
        }

        $tableName = $this->table;

        $recordsUpdated = DB::transaction(function () use ($tableName, $data, $index, $jsonColumnKeys, $getItemsToUpdate) {
            $rawQueryString = 'update '.$tableName.' SET ';
            $updateData = [];
            $ids = $when = [];
            $cases = '';

            //generate the WHEN statements from the set array
            foreach ($data as $key => $val) {
                foreach (array_keys($val) as $field) {
                    if ($field != $index) {
                        // process JSON data if exists
                        if ((empty($this->jsonColumns) === false)
                            and in_array($field, $jsonColumnKeys) === true) {
                            $existingItemData = $getItemsToUpdate->where($index, $val[$index])
                                                                 ->first();
                            
                            if (__isEmpty($existingItemData) === false) {
                                $existingItemData = $existingItemData->toArray();

                                $val[$field] = json_encode(
                                    $this->verifyAndUpdateJsonColumnData(
                                        $field,
                                        $val[$field],
                                        $existingItemData[$field]
                                    )
                                );
                            }
                        }

                        $when[$field][] = 'WHEN '.$index
                                        .' = "'.$val[$index].'" THEN ? ';

                        $updateData[$field][] = $val[$field];
                        $ids[$field][] = DB::connection()->getPdo()->quote($val[$index]);
                    }
                }
            }

            if (empty($when) or empty($ids) or empty($updateData)) {
                throw new Exception('Invalid data passed');
            }

            //generate the case statements with the keys and values from the when array
            foreach ($when as $k => $v) {
                $cases .= "\n".$k.' = CASE '."\n";

                foreach ($v as $row) {
                    $cases .= $row."\n";
                }
                $cases .= 'ELSE '.$k.' END, ';
            }

            $rawQueryString .= substr($cases, 0, -2)."\n"; //remove the comma of the last case

            $rawQueryString .= ' WHERE '.$index.' IN ( '.implode(',', array_flatten($ids)).' )';

            return DB::update($rawQueryString, array_flatten($updateData));
        });

        // clear cache items if available
        $this->clearCacheItems();

        return $recordsUpdated;
    }

    /**
     * Delete the model from the database & clear cache items.
     *
     * @param array $query - query
     *
     * @since  0.5.0 - 14 JUL 2015 - Updated on 05 JAN 2017
     *------------------------------------------------------------------------ */
    public function scopeDeleteIt($query)
    {
        $originals = $query->getModel()->getOriginal();

        if (!empty($originals)) {
            $query->where($this->primaryKey, $originals[$this->primaryKey]);
        }

        if (empty($query->getQuery()->wheres)) {
            return false;
        }

        $resultQuery = $query->delete();
         // clear cache items if available
        $this->clearCacheItems();

        return $resultQuery;
    }

    /**
     * Process JSON Item
     * Please note this function doesn't care about defined JSON column structure, so please be careful
     *
     * @param array $query - query
     *
     * @since  0.7.0 - 27 JAN 2017
     *------------------------------------------------------------------------ */
    public function scopeProcessJsonItem($query, $jsonColumn, $jsonItem, $callback)
    {
        // if no json column is set then no need to process further
        if ((empty($this->jsonColumns) === true)
                and array_key_exists($jsonColumn, $this->jsonColumns) === false) {
            return $query;
        }

        // get the existing
        $columnData = is_array($this->{$jsonColumn})
                        ? $this->{$jsonColumn}
                        : collect($this->{$jsonColumn})->toArray();

        if (array_has($columnData, $jsonItem) === false) {
            return $query;
        }

        // get requested items
        $itemsFound = array_get($columnData, $jsonItem);
        // do the process
        $resultData = call_user_func($callback, $itemsFound);
        // set the resulted item
        array_set($columnData, $jsonItem, $resultData);
        // set for column data
        $this->{$jsonColumn} = $columnData;
        // prevent verifyAndUpdateJsonColumnData to process
        $this->skipJsonColumnProtocol = true;

        // return the query
        return $query;
    }

    /**
     * Verify JSON data structure and merge existing data with new validated data
     *
     * @param string $key   - JSON column key
     * @param array $value  - new values to be add/update
     * @param array/boolean - $updateRequest - is it update
     *                        or new/old existing data to merged
     * @since  0.6.x - 28 NOV 2016
     *
     * @return array
     *----------------------------------------------------------------------- */
    protected function verifyAndUpdateJsonColumnData($key, $value, $updateRequest = true)
    {
        // check if it is process request
        if ($this->skipJsonColumnProtocol === true) {
            return $value;
        }

        // if no json column is set then no need to process further
        if (empty($this->jsonColumns) === true) {
            return $value;
        }

        // set values as Array
        $value = collect($value)->toArray();
        // line up array values
        $tempUpdates = array_dot($value);
        // check the request type if not boolean it should be existing data array
        if (is_bool($updateRequest) === false) {
            $existingKeyData = $updateRequest;
        } else {
            $existingData =  $updateRequest ? $this->getOriginal() : false;
            $existingKeyData = $updateRequest ? json_decode($existingData[$key], true) : [];
        }
        
        // get existing data & convert it to array
        $validData = collect($existingKeyData)->toArray();
        $itemKeyProcessed = [
            'array:extend' => []
        ];

        $itemsToRemove = [];
        $itemsToRemoveByKeys = [];
        $itemsToRemoveWrapperByKeys = [];

        foreach ($tempUpdates as $tempItemKey => $tempItemValue) {
            /*if(is_numeric($tempItemValue) or is_string($tempItemValue)) {

                // collect the items for the delete
                if(str_contains($tempItemKey, $this->queryDeleteJsonItem) === true) {
                    $itemsToRemoveByKeys[$tempItemKey] = $tempItemValue;
                    $itemsToRemoveByKeys[str_replace($this->queryDeleteJsonItem, '', $tempItemKey)] = $tempItemValue;

                }
                // collect the items for the delete
                else if(substr($tempItemValue, 0, strlen($this->queryDeleteJsonItem)) === $this->queryDeleteJsonItem) {

                    $parentKey = explode('.', $tempItemKey);
                    array_pop($parentKey);
                    $parentKey = implode('.', $parentKey);
                    // store items in the container to later use to delete
                    $itemsToRemove[$parentKey][] = substr($tempItemValue, strlen($this->queryDeleteJsonItem));

                }
                // delete item wrapper mostly array contains this item
                else if(str_contains($tempItemKey, $this->queryDeleteWrapperJsonItem) === true) {
                    $itemsToRemoveWrapperByKeys[$tempItemKey] = $tempItemValue;
                }

            }*/

            // get defined column item
            $definedItem = array_get($this->jsonColumns, $key. '.' .$tempItemKey);
            // data to update
            $updateItem  = array_get($value, $tempItemKey);
            // get update item datatype
            $updateItemType = strtolower(gettype($updateItem));
            // check if it is string and it matches with defined item datatype
            if (is_string($definedItem) and (strtolower($definedItem)  === $updateItemType)) {
                // set the values
                array_set($validData, $tempItemKey, $tempItemValue);

                continue;
            } // check if it's not string and it's datatype matches with defined item datatype
            elseif ((is_string($definedItem) !== true) and gettype($definedItem)  === $updateItemType) {
                // set the values
                array_set($validData, $tempItemKey, $tempItemValue);

                continue;
            } else {
                // if defined item is array so any values can be accepted for that particular item
                foreach (array_dot($this->jsonColumns) as $jsonKey => $jsonValue) {
                    $startWith       = starts_with($key. '.' . $tempItemKey, $jsonKey);
                    $searchedItemKey = str_replace($key . '.', '', $jsonKey);
                    $searchedItemValue = array_get($value, $searchedItemKey);

                    if (($startWith === true)
                        and (__isEmpty($searchedItemValue) === false)) {
                        switch ($jsonValue) {
                            case 'array': // will replace it with new items
                                // set the values
                                array_set($validData, $searchedItemKey, array_get($value, $searchedItemKey));
                                break;

                            case 'array:extend':
                                if (in_array($searchedItemKey, $itemKeyProcessed['array:extend'])) {
                                    break;
                                }

                                // get the existing data
                                $existingItemData = array_get($validData, $searchedItemKey);

                                if (!__isEmpty($existingItemData)) {
                                    array_set($validData, $searchedItemKey, array_merge($existingItemData, array_get($value, $searchedItemKey)));
                                } else {
                                    array_set($validData, $searchedItemKey, array_get($value, $searchedItemKey));
                                }

                                $itemKeyProcessed['array:extend'][] = $searchedItemKey;

                                break;
                        }
                    }
                }
            }
        }

        /*// If item requested to remove
        if((empty($itemsToRemove) === false)
            or (empty($itemsToRemoveByKeys) === false)) {

            $validDataDot = array_dot($validData);

            foreach ($validDataDot as $validDataDotItem => $validDataDotValue) {

                // check if item wants to delete using key
                if(array_key_exists($validDataDotItem, $itemsToRemoveByKeys)) {
                    //check if the item has condition or simply remove
                    if($validDataDotValue == $itemsToRemoveByKeys[$validDataDotItem]
                        or $itemsToRemoveByKeys[$validDataDotItem] == '') {
                        array_forget($validData, $validDataDotItem);
                        array_forget($itemsToRemoveByKeys, $validDataDotItem);

                        continue;
                    }
                }

                // check if whole wrapper of item wants to delete
                if(array_key_exists($validDataDotItem, $itemsToRemoveWrapperByKeys)) {

                    $explodedDeleteWrapperItem = explode($this->queryDeleteWrapperJsonItem, $validDataDotItem);

                    $deleteWrapperItemKey = $explodedDeleteWrapperItem[0];

                    $deleteWrapperItemKey = (substr($deleteWrapperItemKey, -1) == '.') ? substr($deleteWrapperItemKey, 0, (strlen($deleteWrapperItemKey) - 1)) : $deleteWrapperItemKey;

                    // container for remain items
                    $remainingItems = [];

                    foreach (array_get($validData, $deleteWrapperItemKey) as $deleteWrapperItem) {

                        if(isset($deleteWrapperItem[$explodedDeleteWrapperItem[1]]) and
                        $deleteWrapperItem[$explodedDeleteWrapperItem[1]] !== $validDataDotValue) {

                            $remainingItems[] = $deleteWrapperItem;

                             continue;
                        }

                    }

                    array_set($validData, $deleteWrapperItemKey, $remainingItems);

                     unset($deleteWrapperItemKey, $remainingItems, $explodedDeleteWrapperItem);
                }

                // item by index
                foreach ($itemsToRemove as $itemToRemoveKey => $itemToRemoveValue) {
                    // item contains in the expected parent
                    $itemRemoveStartWith  = starts_with($validDataDotItem, $itemToRemoveKey);
                    // if found further process required
                    if($itemRemoveStartWith === true) {

                        foreach ($itemToRemoveValue as $itemToRemoveSubItemKey => $itemToRemoveSubItemValue) {
                            // get the item values from $validData
                            $getItemFromValidData = array_get($validData, $itemToRemoveKey);
                            // lets find requested item
                            $itemSearchResult = array_search($itemToRemoveSubItemValue, $getItemFromValidData, true);
                            $queryItemSearchResult = array_search($this->queryDeleteJsonItem.$itemToRemoveSubItemValue, $getItemFromValidData, true);
                            // if found we need to delete it from the $validData array
                            if($itemSearchResult !== false
                                or $queryItemSearchResult !== false) {

                                array_forget($validData, $itemToRemoveKey.'.'.$itemSearchResult);
                                array_forget($validData, $itemToRemoveKey.'.'.$queryItemSearchResult);

                            }
                        }
                    }
                }

            }

            unset($validDataDot, $itemsToRemove, $itemsToRemove, $itemsToRemoveByKeys, $itemsToRemoveWrapperByKeys);
        }*/

        return $validData;
    }
}
