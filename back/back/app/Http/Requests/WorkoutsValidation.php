<?php

namespace App\Http\Requests;
use App\Workouts;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
class WorkoutsValidation extends FormRequest
{
      
    public function authorize()
    {
        return true;
    }

    
    public function messages()
    {
        return [
            'title.required' => 'Title is required!',
            'workout_category_id.required' => 'You have to select a workout category',
            'title.unique' => 'Title must be unique!',
            'workout_category_id.exists'=>'You must select existing Workout Category',
         
        ];
    }

  
    public function rules()
    {
        // $titleRule= Rule::unique((new Workouts)->getTable());
        // $titleRule->ignore($this->route('workout'));

                return [
                    // 'title' => "required|max:255|$titleRule",
                    'title' => "required|max:255",
                    'workout_category_id'=>'required|exists:workout_categories,id',
                ];
         
            
        
    }

  
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
