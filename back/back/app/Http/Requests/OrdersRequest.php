<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OrdersRequest extends FormRequest
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
        switch ($this->method()) 
        {
            case 'POST':
                {
                    return [
                        'address' => 'required|max:255',
                        'name' => 'required|max:255',
                        // 'comment' => 'required',
                        'price' => 'required',
                        'city_id'=>'required|exists:cities,id',
                        'user_id'=>'required|exists:users,id',
                    ];
                }
            case 'PUT':
                {
                    return [
                        'address' => 'required|max:255',
                        'name' => 'required|max:255',
                        'comment' => 'max:255',
                        'price' => 'required|float',
                        'city_id'=>'required|exists:cities,id',
                        'user_id'=>'required|exists:users,id',
                    ];
                }
        }
    }
    public function messages()
    {
        return [
            'address.required' => 'Address is required!',
            // 'comment.required' => 'Comment Text is required!',
            'price.required' => 'The price is required!',
            'user_id.required' => 'User is required!',
            'city_id.required' => 'City is required!',
            'name.required' => 'Your name is required!',
            'price.float' => 'The price must be number!',
            'user_id.exists' => 'Error !',
            'city_id.exists' => 'Error !',
        ];
    }
    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }
}
