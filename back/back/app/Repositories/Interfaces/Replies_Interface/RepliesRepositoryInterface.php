<?php
namespace App\Repositories\Interfaces\Replies_Interface;

interface RepliesRepositoryInterface
{

    public function getAll($rows,$searchr,$comment_id,$user_id);

    public function getById($id);

    public function createOrUpdate($id = null,$request=null);

    public function deleteById($id);

    public function count();
}
