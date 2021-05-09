<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Workouts;
class WorkoutDatasValidation extends FormRequest
{
   
    public function authorize()
    {
        return true;
    }

   
    public function messages()
    {
        return [
            'workout_id.required' => 'You have to select Workout',
            'workout_id.exists'=>'You must select existing workout',
            'image.file'=>'Content type must be image or video',
            'video.mimes'=>'Video must be video',
            'video.max'=>'Size of the video limited',
            'title.required' => 'Title field is required',
        ];
    }

 
    public function rules()
    {
            return [
                'image'=>'file',
                'workout_id'=>'required|exists:workouts,id',
                'video'=>'mimes:mpeg,ogg,mp4,webm,3gp,mov,flv,avi,wmv,ts|max:100040',
                'title'=>'required|max:100'
            ];
    }

  

    public $validator = null;

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        $this->validator = $validator;
    }

}
