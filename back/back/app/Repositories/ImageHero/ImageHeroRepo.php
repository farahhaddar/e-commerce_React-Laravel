<?php
namespace App\Repositories\ImageHero;

use App\Response\Response;
use App\Repositories\Interfaces\ImageHero\ImageHeroInterface;
use App\ImageHero;
use App\FileType\FileType;


class ImageHeroRepo implements ImageHeroInterface 
{
    public function index()
    {
        $HeroImages= ImageHero::all();

        return $HeroImages;
    
    }

    public function show($id)
    {
        $HeroImages= ImageHero::where('id',$id)->first();
        
        return  $HeroImages;
    }

    
    public function count(){
        return  ImageHero::count(); 
    }
   

    public function image($image,$folder,$old_path=null)
    {
        
     if(is_null($old_path))  
    {
     $path= FileType::store($image,$folder);

     if (!$path) return Response::error(400, "Couldn't upload image");

     return $path;

    }else
    {

        $path = FileType::update($image, $folder , $old_path); 

        return $path;
    }
 
    }
    
    public function storeOrUpdate($request,$id=null)
    {

        if(is_null($id))
        {
          
        $path = self::image($request->file('image'),'images');

         $HeroImages= new  ImageHero();

         $HeroImages->fill($request->all());
        
        }else
        {  
            $data=$request->all();
            
            $HeroImages = ImageHero::where('id', $id)->first();

                $old_path = self::findImageOfId($id);
        
                $path = self::image($request->file('image'),'images',$old_path);
            
               $HeroImages->update($request->all());

            
        }

         $HeroImages->image = $path;
         $HeroImages ->save();
      
         return $HeroImages;
    }
    
     public function findImageOfId($id)
     {
        $HeroImages = ImageHero::findOrFail($id);

        $old_path = $HeroImages->image;

        return $old_path;

     }


    public function destroy($id)
    {
        $image = self::findImageOfId($id);

        $HeroImages = self::show($id);
        
        FileType::destroy($image);

        $HeroImages->delete();

        return $HeroImages;
    
    }

}
