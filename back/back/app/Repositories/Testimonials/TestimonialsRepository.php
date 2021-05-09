<?php
namespace App\Repositories\Testimonials;

use App\Repositories\Interfaces\Testimonials\TestimonialsInterface;
use App\Testimonials;
use App\FileType\FileType;

class TestimonialsRepository implements TestimonialsInterface
{
    public function index($rowNb)
    {

        $searchName  = $searchCONTENT = "";
        
        if (isset($_GET['name'])) {
            $searchName = $_GET['name'];
        }
       
        if (isset($_GET['content'])) {
            $searchCONTENT  = $_GET['content'];
        }
           

     $testimonials= Testimonials::where('name', 'LIKE', '%' . $searchName. '%')
    -> where('content', 'LIKE', '%' . $searchCONTENT  . '%')
    ->paginate($rowNb);

     
     return $testimonials;

    }


    public function show($id)
    {
        $testimonials= Testimonials::where('id',$id)->first();
        
        return  $testimonials;
    }

    public function image($image,$folder,$old_path=null){
    
     if(is_null($old_path))  
    {
     $path= FileType::store($image,$folder);

     return $path;

    }else{

        $path = FileType::update($image, $folder , $old_path); 

        return $path;
    }
 
    }
    
    public function storeOrUpdate($request,$path,$id=null)
    {
        if(is_null($id)){

         $testimonials= new Testimonials();
         $testimonials->fill($request->all());
        
        }else{

            $testimonials = Testimonials::where('id', $id)->first();
            $testimonials->update($request->all());
        }
         $testimonials->image = $path;
         $testimonials ->save();
      
         return $testimonials;

    }
    
     public function findImageOfId($id){

        $testimonials = Testimonials::findOrFail($id);

        $old_path = $testimonials->image;

        return $old_path;

     }

    public function destroy($id)
    {
        $image = self::findImageOfId($id);

        $testimonials = self::show($id);

        FileType::destroy($image);

        $testimonials->delete();

        return $testimonials;
    
    }
     
    public function count(){
        return Testimonials::count(); 
    }

}
