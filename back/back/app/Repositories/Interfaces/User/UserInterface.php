<?php
namespace App\Repositories\Interfaces\User;

interface UserInterface
{

    public function index($rowNb);

    public function show($id);

    public function relations($id);

    public function image($image,$folder,$old_path=null);

    public function findImageOfId($id);

    public function  storeOrUpdate($request,$id=null);

    public function destroy($id);

    public function count();
    


}