<?php
namespace App\Repositories\Interfaces\Products_Interface;

interface ProductsRepositoryInterface
{

    public function getAll($row,$searchn,$searchp,$searchd,$searchq,$cat_id);

    public function getById($id);

    public function createOrUpdate($id = null,$request=null);

    public function decrementQuantity($id,$nb);

    public function deleteById($id);

    public function mostRecentProducts();
    
    public function index();

    public function count();
}
