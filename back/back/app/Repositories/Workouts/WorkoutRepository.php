<?php
namespace App\Repositories\Workouts;

use App\Workouts;

use App\Repositories\Interfaces\Workouts_Interface\WorkoutsRepositoryInterface;
class WorkoutRepository implements WorkoutsRepositoryInterface
{

    public function getAllWorkouts($rows)
    {

        if (isset($_GET['title'])) {
            return Workouts::with('category')->with('data')
            ->where('title', 'LIKE', '%' . $_GET['title'] . '%')
            ->paginate($rows);
        }

        return Workouts::with('category')->with('data')->paginate($rows);
    }


    public function count(){
        return  Workouts::count(); 
    }


    public function getWorkoutById($id)
    {
        return Workouts::with('category')->with('data')->find($id);
    }
    public function getWorkoutByWorkoutCatIdImage($id)
    {
        $workout=Workouts::where('workout_category_id',$id)->with('data');
        // dd($workout->first()->data()->paginate());
        if (isset($_GET['title'])) return $workout->first()->data()->where('title', 'LIKE', '%' . $_GET['title'] . '%')->whereNotNull('image')->paginate(5);
        return $workout->first()->data()->whereNotNull('image')->paginate(5);
    }

    public function getWorkoutByWorkoutCatIdVideo($id)
    {
        $workout=Workouts::where('workout_category_id',$id)->with('data');
        // dd($workout->first()->data()->paginate());
        if (isset($_GET['title'])) return $workout->first()->data()->where('title', 'LIKE', '%' . $_GET['title'] . '%')->whereNotNull('video')->paginate(5);
        return $workout->first()->data()->whereNotNull('video')->paginate(5);
    }

    public function createOrUpdate($id = null,$request=null)
    {
        if (!is_null($id)) {
            // update 
            $Workout = Workouts::find($id);
            if($Workout!=null)
                return $this->ADD_EDIT($Workout,$request);
            return null;
          
        } else {
            // create
            $Workout = new Workouts;
            return $this->ADD_EDIT($Workout,$request);
        }

   
    }
    public function deleteWorkoutById($id)
    {
        
        $Workout=Workouts::where('id',$id);
      
        if($Workout->exists())
        {   
            $Workout->first()->data()->delete();
            return $Workout->delete();
        }
    }

    //For createOrUpdate function
    private function ADD_EDIT($Workout,$request)
    {   
        
        $Workout->title = $request->all()['title'];
        $Workout->workout_category_id = $request->all()['workout_category_id'];
        return $Workout->save();
    }
    

}
