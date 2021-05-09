<?php

namespace App\Http\Controllers;

use App\Workouts;
use Illuminate\Http\Request;
use App\Repositories\Interfaces\Workouts_Interface\WorkoutsRepositoryInterface;
use App\Http\Requests\WorkoutsValidation;
use  App\Response\Response;

class WorkoutsController extends Controller
{
    protected $workout_repo = null;

    public function __construct(WorkoutsRepositoryInterface $workout_repo)
    {
        $this->workout_repo = $workout_repo;
    }


    public function count()
    {
        return $this->workout_repo->count();

    }


    public function showWorkouts($rows)
    {
        $Workouts = $this->workout_repo->getAllWorkouts($rows);
        // if(count($Workouts)>0)
            return Response::success($Workouts);

        // return Response::success("Couldn't find any Workout");
        
    }

    public function getWorkout($id)
    {
        $workout = $this->workout_repo->getWorkoutById($id);
        if($workout)
            return Response::success($workout);

        return Response::success("Couldn't find the workout");
       

    }


    public function getWorkoutByWorkoutCatIdImage($id)
    {
        $workout = $this->workout_repo->getWorkoutByWorkoutCatIdImage($id);
        if($workout)
            return Response::success($workout);

        return Response::success("Couldn't find");
       

    }
    public function getWorkoutByWorkoutCatIdVideo($id)
    {
        $workout = $this->workout_repo->getWorkoutByWorkoutCatIdVideo($id);
        if($workout)
            return Response::success($workout);

        return Response::success("Couldn't find");
       

    }

    public function saveWorkout($id = null,$request=null)
    {
        if ($id) {
            $check=$this->workout_repo->createOrUpdate($id,$request);
            if($check!=null)
                return Response::success("Workout ".$request->all()['title']." Updated");
            
            return Response::error(400,"Error ! ","Item does not exist");
          

        } else {
            $this->workout_repo->createOrUpdate($id,$request);
            return Response::success("New Workout Added");

        }
    }
    public function deleteWorkout($id)
    {
            $check =$this->workout_repo->deleteWorkoutById($id);
            if(!is_null($check))
                return Response::success("Deleted Successfully");
          
            return Response::error(400,"Error ! ","Item does not exist");
    }
  
   
    public function index($rows)
    {
        return $this->showWorkouts($rows);
    }

 
    public function store(WorkoutsValidation $request)
    {
        if (isset($request->validator) && $request->validator->fails()) {
            return Response::error(400,$request->validator->messages());
        }
        return $this->saveWorkout(null,$request);
    }

  
    public function show($id)
    {
        return $this->getWorkout($id);
    }
    public function showByCatVideo($id)
    {
        return $this->getWorkoutByWorkoutCatIdVideo($id);
    }
    public function showByCatImage($id)
    {
        return $this->getWorkoutByWorkoutCatIdImage($id);
    }

    

  
    public function update(WorkoutsValidation $request, $id)
    {
       
         if (isset($request->validator) && $request->validator->fails()) {
            return Response::error(400,$request->validator->messages());
        }
       
         

       return $this->saveWorkout($id,$request);
    }

  
    public function destroy($id)
    {
        return $this->deleteWorkout($id);
    }
  
}
