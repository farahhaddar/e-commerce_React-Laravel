<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        switch ($this->method()) {
            case 'POST':
                {
                    return [
                        'name' => 'required|max:255',
                        'price' => 'required|numeric',
                        'product_category_id' => 'required|integer',
                        'description' => 'required|max:255',
                        'quantity' => 'required|integer',
                        
                    ];
                }
            case 'PUT':
                {

                    return [
                        'name' => 'required|max:255',
                        'price' => 'required|numeric',
                        // 'product_category_id' => 'required|integer',
                        'description' => 'required|max:255',
                        'quantity' => 'required|integer',
                        
                    ];
                }
        }
    }
    public function messages()
    {
        return [

            'name.required' => 'Name is required!',
            'price.required' => 'Price is required!',
            'price.numeric' => 'Price is a number!',
            'product_category_id.required' => 'Category is required!',
            'product_category_id.integer' => 'Error',
            'Description.required' => 'Description is required!',
            'quantity.required' => 'Quantity is required',
            'quantity.integer' => 'Quantity is an integer',
            

        ];
    }
    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }
}
