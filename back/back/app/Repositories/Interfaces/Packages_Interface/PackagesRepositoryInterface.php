<?php
namespace App\Repositories\Interfaces\Packages_Interface;

interface PackagesRepositoryInterface
{

    public function getAll($row,$searchn,$searchp,$searchd);

    public function getById($id);

    public function createOrUpdate($id = null,$request=null);

    public function decrementQuantity($id,$nb);
    
    public function deleteById($id);

    public function count();

    public function mostRecentpackages();
}
