<?php
namespace App\Repositories\Interfaces\Workout_Datas_Interface;
interface WorkoutDatasInterface
{

    public function getAllWorkoutDatas($row=5);

    public function getWorkoutDataById($id);

    public function createOrUpdate($id = null,$request=null);

    public function deleteWorkoutDataById($id);
    
    public function count();
}
