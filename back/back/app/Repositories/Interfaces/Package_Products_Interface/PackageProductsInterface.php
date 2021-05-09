<?php
namespace App\Repositories\Interfaces\Package_Products_Interface;

interface PackageProductsInterface
{

    public function getAll($packageId,$row);


    public function getById($packageId,$productId);


    public function createOrUpdate($id = null,$request=null);
    public function create($packageId,$productId,$quantity);
    public function update($id,$quantity);

    public function deleteById($id);

    public function count();
}