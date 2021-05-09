<?php
namespace App\Repositories\Interfaces\Workouts_Categories_Interface;
interface WorkoutCatRepositoryInterface
{

    public function getAll($rows);

    public function getById($id);

    public function createOrUpdate($id = null,$request=null);

    public function deleteById($id);

    public function count();
}
