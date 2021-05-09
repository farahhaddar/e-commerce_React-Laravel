<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PackagesAndProductsOrderRequest extends FormRequest
{//'quantity', 'product_id', 'order_id'

  
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
        switch ($this->method()) 
        {
            case 'POST':
                {
                    return [
                        'quantity' => 'required|max:255|integer',
                        // 'product_id'=>'required|exists:products,id',
                        'order_id'=>'required|exists:orders,id',
                    ];
                }
            case 'PUT':
                {
                    return [
                        'quantity' => 'required|max:255|integer',
                        'product_id'=>'required|exists:products,id',
                        'order_id'=>'required|exists:orders,id',
                    ];
                }
        }
    }
    public function messages()
    {
        return [
            'quantity.required' => 'The quantity is required!',
            'quantity.integer' => 'The quantity must be number!',
            'product_id.required' => 'The Product is required!',
            'order_id.required' => 'the order is required!',
            'product_id.exists' => 'Chose correct product!',
            'product_id.exists' => 'Chose correct order!',
            
        ];
    }
    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }
}
