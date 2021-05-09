<?php
namespace App\Repositories\Interfaces\PackageOrder_ProductOrderInterface;

interface PackageOrder_ProductOrderInterface
{

    public function setModel($model);

    public function getAll($rows);

    public function getById($id);

    public function createOrUpdate($id = null,$request=null);

    public function deleteById($id);

    public function count();
  
}