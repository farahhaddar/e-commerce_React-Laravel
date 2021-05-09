<?php
namespace App\Repositories\Interfaces\Workouts_Interface;

interface WorkoutsRepositoryInterface
{

    public function getAllWorkouts($rows);

    public function getWorkoutById($id);

    public function getWorkoutByWorkoutCatIdImage($id);

    public function getWorkoutByWorkoutCatIdVideo($id);

    public function createOrUpdate($id = null,$request=null);

    public function deleteWorkoutById($id);

    public function count();
}
