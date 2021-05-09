<?php
namespace App\Repositories\Interfaces\Cities_Interface;

interface CitiesRepositoryInterface
{

    public function getAll($row,$searchn,$searchd);

    public function getById($id);

    public function createOrUpdate($id = null,$request=null);

    public function deleteById($id);
    
    public function count();
}
