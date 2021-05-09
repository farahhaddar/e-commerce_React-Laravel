<?php
namespace App\Repositories\Interfaces\Testimonials;

interface TestimonialsInterface
{

    public function index($rowNb);

    public function show($id);

    public function image($image,$folder,$old_path=null);

    public function findImageOfId($id);

    public function  storeOrUpdate($request,$path,$id=null);

    public function destroy($id);
    
    public function count();



}
