<?php

namespace App\Http\Controllers;

use App\WorkoutCategories;
use App\Repositories\Interfaces\Workouts_Categories_Interface\WorkoutCatRepositoryInterface;
use App\Http\Requests\WorkoutCategoriesValidation;
use  App\Response\Response;

class WorkoutCategoriesController extends Controller
{
    
    protected $workout_Category_repo = null;

    public function __construct(WorkoutCatRepositoryInterface $workout_Category_repo)
    {
        $this->workout_Category_repo = $workout_Category_repo;
    }


    public function count()
    {
        return $this->workout_Category_repo->count();

    }
    

    public function showAll($rows)
    {
        $workout_Cat = $this->workout_Category_repo->getAll($rows);
        // if(count($workout_Cat)>0)
            return Response::success($workout_Cat);

        // return Response::success("No Workout category");
    }

    public function getById($id)
    {
        $workout_Cat = $this->workout_Category_repo->getById($id);
        if($workout_Cat)
            return Response::success($workout_Cat);

        return Response::success("Couldn't find the workout category");
        

    }
    public function save($id = null,$request=null)
    {
        //update
        if ($id) {
            $check=$this->workout_Category_repo->createOrUpdate($id,$request);
            if($check!=null)

                return Response::success("Workout Category ".$request->all()['name']." Updated");
            
            return Response::error(400,"Error ! ","Item does not exist");            

        } 
        //add new
        else {
            $this->workout_Category_repo->createOrUpdate($id,$request);
            return Response::success($request->all()['name']." Category Added");
        }
    }
    public function delete($id)
    {
            $check =$this->workout_Category_repo->deleteById($id);
            if(!is_null($check))
                return Response::success("Deleted Successfully");
          
            return Response::error(400,"Error ! ","Item does not exist");
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
   
    public function index($rows)
    {
        return $this->showAll($rows);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(WorkoutCategoriesValidation $request)
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

 
    public function update(WorkoutCategoriesValidation $request, $id)
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
