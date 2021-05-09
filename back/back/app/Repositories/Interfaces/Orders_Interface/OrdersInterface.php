<?php
namespace App\Repositories\Interfaces\Orders_Interface;

interface OrdersInterface
{

    public function getAll($row);

    public function getAllWithInfos();

    public function getById($id);

    public function getByIdWithInfos($id);

    public function createOrUpdate($id = null,$request=null);

    public function deleteById($id);

    public function count();

    public function updateStatus($request,$id);
}