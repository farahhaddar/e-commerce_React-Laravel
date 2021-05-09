<?php
namespace App\Repositories\Admin;

use App\Repositories\Interfaces\Admin\AdminInterface;
use App\Admins;
use App\FileType\FileType;

class AdminRepository implements AdminInterface
{
    public function index($rowNb)
    {

        $searchName  = $searchEmail = "";
        
        if (isset($_GET['name'])) {
            $searchName = $_GET['name'];
        }
       
        if (isset($_GET['email'])) {
            $searchEmail = $_GET['email'];
        }
           

        $admin= Admins::where('name', 'LIKE', '%' . $searchName. '%')
         -> where('email', 'LIKE', '%' . $searchEmail . '%')
         ->paginate($rowNb);
     

     return $admin;

    }
    public function show($id)
    {
        $admin= Admins::where('id',$id)->first();
        
        return  $admin;
    }

    public function count(){
        return  Admins::count(); 
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

            if(empty($request->file('image'))){
           
                $path = '';
     
             }else{
 
             $path = self::image($request->file('image'),'images');
 
             }
         $admin= new Admins();

         $admin->fill($request->all());
        
        }else
        {
            $data=$request->all();
            
            $admin = Admins::where('id', $id)->first();

            if(empty($request->file('image'))){
           
                $path = self::findImageOfId($id);
     
             }else{

                $old_path = self::findImageOfId($id);
        
                $path = self::image($request->file('image'),'images',$old_path);
            
             }
            

            $password = $request->password;

            if (trim($password) === '')
            {
                $admin->name = $data['name'];
                $admin->email = $data['email'];
            } else 
            {
                $admin->update($request->all());
            }
        }

         $admin->image = $path;
         $admin ->save();
      
         return $admin;
    }
    
     public function findImageOfId($id)
     {

        $admin = Admins::findOrFail($id);

        $old_path = $admin->image;

        return $old_path;

     }

    public function destroy($id)
    {
        if($id !=1){
        $image = self::findImageOfId($id);

        $admin = self::show($id);

        FileType::destroy($image);

        $admin->delete();

        return $admin;
        }else
        {
            return $admin=false;
        }
    
    }

}
