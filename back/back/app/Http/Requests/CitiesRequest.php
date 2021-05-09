<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CitiesRequest extends FormRequest
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
                        'delivery_fees' => 'required|numeric',
                    ];
                }
            case 'PUT':
                {

                    return [
                        'name' => 'required|max:255',
                        'delivery_fees' => 'required|numeric',
                    ];
                }
        }
    }
    public function messages()
    {
        return [

            'name.required' => 'Name is required!',
            'delivery_fees.required' => 'Fee is a number!',
        ];
    }
    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }
}
