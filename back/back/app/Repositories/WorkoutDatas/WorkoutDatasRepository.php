<?php
namespace App\Repositories\WorkoutDatas;

use App\WorkoutDatas;

use App\Repositories\Interfaces\Workout_Datas_Interface\WorkoutDatasInterface;
use App\FileType\FileType;
use File;
class WorkoutDatasRepository implements WorkoutDatasInterface
{

    public function getAllWorkoutDatas($row=5)
    {
        return WorkoutDatas::with('workout')->paginate($row);
    }
    
    public function count(){
        return WorkoutDatas::count(); 
    }

    public function getWorkoutDataById($id)
    {
        return WorkoutDatas::with('workout')->find($id);
    }

    public function createOrUpdate($id = null,$request=null)
    {
        if (!is_null($id)) {
            // update 
            $WorkoutData = WorkoutDatas::find($id);
            if($WorkoutData!=null)
                return $this->ADD_EDIT($WorkoutData,$request);
            return null;
          
        } else {
            // create
            $WorkoutData = new WorkoutDatas;
            return $this->ADD_EDIT($WorkoutData,$request);
        }

   
    }
    public function deleteWorkoutDataById($id)
    {
        
        $WorkoutData=WorkoutDatas::where('id',$id);
      
        if($WorkoutData->exists())
        { 
            if (File::exists('storage/'.$WorkoutData->first()->image))
                FileType::destroy($WorkoutData->first()->image);
            if (File::exists('storage/'.$WorkoutData->first()->video))
                FileType::destroy($WorkoutData->first()->video);

            // if (File::exists($WorkoutData->first()->content))
            //     File::delete($WorkoutData->first()->content);
         

            return $WorkoutData->delete();
        }
    }

    //For createOrUpdate function
    private function ADD_EDIT($WorkoutData,$request)
    {   
        
        if (File::exists('storage/'.$WorkoutData->image))
            FileType::destroy($WorkoutData->image);
        if (File::exists('storage/'.$WorkoutData->video))
            FileType::destroy($WorkoutData->video);
        if(!is_null($request->file('image')))
            $WorkoutData->image= FileType::store( $request->file('image'),'WorkoutDataImage');
        if(!is_null($request->file('video')))
            $WorkoutData->video= FileType::store( $request->file('video'),'WorkoutDataVideo');


            // store($file, $folder)
            // update($file, $folder, $old_path)
            // FileType::destroy($WorkoutData->first()->content)

       

        $WorkoutData->workout_id = $request->all()['workout_id'];
        $WorkoutData->title = $request->all()['title'];


        return $WorkoutData->save();
    }
    

}
