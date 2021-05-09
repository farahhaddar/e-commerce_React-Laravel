<?php
namespace App\Repositories\Interfaces\Articles_Categories_Interface;
interface ArticleCatRepositoryInterface
{

    public function getAll();

    public function getById($id);

    public function createOrUpdate($id = null,$request=null);

    public function deleteById($id);
    
    public function count();
}
