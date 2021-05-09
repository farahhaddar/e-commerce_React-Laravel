<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Articles;
class ArticlesValidation extends FormRequest
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
            'title.required' => 'Title is required!',
            'content.required' => 'The content field is required!',
            'article_category_id.required' => 'You have to select an article category',
            'title.unique' => 'Title must be unique!',
            'article_category_id.exists'=>'You must select existing article category',
         
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {

        $titleRule= Rule::unique((new Articles)->getTable());
        $titleRule->ignore($this->route('articles'));

        switch ($this->method())
        {
            case 'POST':
            {

                return [
                    'title' => 'required|unique:articles|max:255',
                    'content'=>'required|max:255',
                    'article_category_id'=>'required|exists:article_categories,id',
                   
                ];
            }
            case 'PUT':
            {

                return [
                    'title' => "required|max:255",
                    'content'=>'required|max:255',
                    'article_category_id'=>'required|exists:article_categories,id',
                ];
            }
        }
    }

       /**
     *  Filters to be applied to the input.
     *
     * @return array
     */
    public function filters()
    {
        return [
            'email' => 'trim|lowercase',
            'title' => 'trim|capitalize|escape'
        ];
    }
    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }

    
}
