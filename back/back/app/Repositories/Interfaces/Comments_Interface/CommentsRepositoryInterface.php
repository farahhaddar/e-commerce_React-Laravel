<?php
namespace App\Repositories\Interfaces\Comments_Interface;

interface CommentsRepositoryInterface
{

    public function getAll($rows,$searchc,$user_id);

    public function getById($id);

    public function createOrUpdate($id = null,$request=null);

    public function deleteById($id);
    
    public function count();
}
