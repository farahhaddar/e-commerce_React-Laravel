<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\ArticleCategories;
class ArticleCategoriesValidation extends FormRequest
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
     * Custom message for validation
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'Name is required!',
            'image.required' => 'The Image field is required!',
            'name.unique' => 'Title Name must be unique!',
            'image.required'=>'Image is required',
            'image.file'=>'Image must be real image'
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        $nameRule= Rule::unique((new ArticleCategories)->getTable());
        $nameRule->ignore($this->route('articleCategory'));
        switch ($this->method())
        {
            case 'POST':
            {

                return [
                    'name' => "required|max:255|$nameRule",
                    'image'=>'required|file',  
                ];
            }
            case 'PUT':
                {

                    return [
                        'name' => "required|max:255",
                        'image'=>'required|file',  
                    ];
                }
        
            }
    }

       /**
     *  Filters to be applied to the input.
     *
     * @return array
     */
    // public function filters()
    // {
    //     return [
    //         'name' => 'trim|lowercase',
    //         'title' => 'trim|capitalize|escape'
    //     ];
    // }
    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }

}
