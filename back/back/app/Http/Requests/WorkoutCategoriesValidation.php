<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\WorkoutCategories;
class WorkoutCategoriesValidation extends FormRequest
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

        // $nameRule= Rule::unique((new WorkoutCategories)->getTable());
        // $nameRule->ignore($this->route('workoutCategory'));

                return [
                    'name' => "required|max:255",
                    // 'name' => "required|max:255|$nameRule",
                    // 'image'=>'required|file',  
                ];
        
        
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
