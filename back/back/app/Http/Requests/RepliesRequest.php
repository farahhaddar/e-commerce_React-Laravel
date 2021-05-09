<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RepliesRequest extends FormRequest
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
                        'reply' => 'required|max:255',
                        'user_id' => 'required|integer',
                        'comment_id' => 'required|integer'
                    ];
                }
            case 'PUT':
                {

                    return [
                        'reply' => 'required|max:255',
                        'user_id' => 'required|integer',
                        'comment_id' => 'required|integer'
                    ];
                }
        }
    }
    public function messages()
    {
        return [

            'reply.required' => 'Reply is required!',
            'user_id.required' => 'User is required!',
            'user_id.integer' => 'Error!',
            'comment_id.required' => 'Comment is required!',
            'comment_id.integer' => 'Error!',
        ];
    }
    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }
}
