<?php
namespace App\Repositories\Interfaces\Cart_Packages_Interface;

interface CartPackagesInterface
{

    public function getAll();
    
    public function createOrUpdate($id = null,$request=null);
    public function update($request=null);

    public function deleteByUserId($id);
    
    public function deleteById($id);
    


}
