<?php
namespace App\Repositories\Interfaces\Cart_Products_Interface;

interface CartProductsInterface
{

    public function getAll();
    
    public function createOrUpdate($id = null,$request=null);
    public function update($request=null);

    public function deleteByUserId($id);
    
    public function deleteById($id);
    


}
