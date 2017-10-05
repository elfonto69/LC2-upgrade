<?php
/*
* ProductOptionAddRequest.php - Request file
*
* This file is part of the Product component.
*-----------------------------------------------------------------------------*/

namespace App\Yantrana\Components\Product\Requests;

use Illuminate\Http\Request;
use App\Yantrana\Core\BaseRequest;

class ProductOptionAddRequest extends BaseRequest
{
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
     * Get the validation rules that apply to the add product option
     * post request.
     *
     * @return array
     *-----------------------------------------------------------------------*/
    public function rules()
    {
        $values = Request::input('values');
        $productID = Request::route()->getParameter('productID');

        $rules = [
            'name' => 'required
            |unique:product_option_labels,name,NULL,id,products_id,'.$productID,
        ];

        if (is_array($values) and !empty($values)) {
            foreach ($values as $key => $value) {
                $rules['values.'.$key.'.name'] = 'required';
                $rules['values.'.$key.'.addon_price'] = 'numeric|min:0|amount_validation|decimal_validation';
            }
        }

        return $rules;
    }

    /**
    * Create custom msg for field
    *
    * @return array
    *-----------------------------------------------------------------------*/
    protected function createMessages()
    {
        $messages = [];

        $values = Request::input('values');

        if (is_array($values)) {
            foreach ($values as $key => $value) {
                $messages['values.'.$key.'.addon_price.amount_validation'] = __('The __attribute__ may not be greater than __max__.', [
                    '__attribute__' => ':attribute',
                    '__max__'       => '999999999'
                ]);

                $messages['values.'.$key.'.addon_price.decimal_validation'] = __('Digit after decimal may not be greater than __max__.', [
                        '__attribute__' => ':attribute',
                        '__max__'       => '4'
                    ]);
            }
        }

        return $messages;
    }

    /**
    * Set custom msg for field
    *
    * @return array
    *-----------------------------------------------------------------------*/

    public function messages()
    {
        return $this->createMessages();
    }
}
