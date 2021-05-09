<?php
namespace App\Repositories\Interfaces\Product_Categories_Interface;

interface ProductCategoriesRepositoryInterface
{

    public function getAll($row,$searchn);

    public function getById($id);

    public function createOrUpdate($id = null,$request=null);

    public function deleteById($id);

    public function count();
}
