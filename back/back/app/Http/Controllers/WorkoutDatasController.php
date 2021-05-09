<?php

namespace App\Http\Controllers;

use App\WorkoutDatas;
use App\Repositories\Interfaces\Workout_Datas_Interface\WorkoutDatasInterface;
use App\Http\Requests\WorkoutDatasValidation;
use  App\Response\Response;

class WorkoutDatasController extends Controller
{
    protected $workout_Datas_repo = null;

    public function __construct(WorkoutDatasInterface $workout_Datas_repo)
    {
        $this->workout_Datas_repo = $workout_Datas_repo;
    }

    public function count()
    {
        return $this->workout_Datas_repo->count();

    }


    public function showAll()
    {
        $workout_Datas = $this->workout_Datas_repo->getAllWorkoutDatas();
        if(count($workout_Datas)>0)
            return Response::success($workout_Datas);

        return Response::success("No Workout Datas");
        
    }

    public function getById($id)
    {
        $workout_Data = $this->workout_Datas_repo->getWorkoutDataById($id);
        if($workout_Data)
            return Response::success($workout_Data);

        return Response::success("Couldn't find the workout Data");
   

    }
    public function save($id = null,$request=null)
    {
        //update
        if ($id) {
            $check=$this->workout_Datas_repo->createOrUpdate($id,$request);
            if($check!=null)
                return Response::success("Workout Data Updated");
            
            return Response::error(400,"Error ! ","Item does not exist");

        } 
        //add new
        else {
            $this->workout_Datas_repo->createOrUpdate($id,$request);
            return Response::success("New Workout Data Added");

        }
    }
    public function delete($id)
    {
            $check =$this->workout_Datas_repo->deleteWorkoutDataById($id);
            if(!is_null($check))
                return Response::success("Deleted Successfully");
          
            return Response::error(400,"Error ! ","Item does not exist");
    }

    public function index($row=5)
    {
        return $this->showAll($row=5);
    }

    public function store(WorkoutDatasValidation $request)
    {
        if (isset($request->validator) && $request->validator->fails()) {
            return Response::error(400,$request->validator->messages());
        }
        return $this->save(null,$request);
    }


    public function show($id)
    {
        return $this->getById($id);
    }

 
    public function update(WorkoutDatasValidation $request, $id)
    {
       
         if (isset($request->validator) && $request->validator->fails()) {
            return Response::error(400,$request->validator->messages());
        }
       
         
       return $this->save($id,$request);
    }

 
    public function destroy($id)
    {
        return $this->delete($id);
    }
}
