<?php
namespace App\Repositories\User;
use App\Response\Response;
use App\Repositories\Interfaces\User\UserInterface;
use App\User;
use App\FileType\FileType;

class UserRepository implements UserInterface 
{
    public function index($rowNb)
    {

        $searchName  = $searchEmail = $searchNumber=$searchCity=$searchAdress="";
        
        if (isset($_GET['name'])) {
            $searchName = $_GET['name'];
        }
       
        if (isset($_GET['email'])) {
            $searchEmail = $_GET['email'];
        }
        if (isset($_GET['phoneNb'])) {
            $searchNumber = $_GET['phoneNb'];
        }
        if (isset($_GET['adress'])) {
            $searchAdress = $_GET['adress'];
        }
        if (isset($_GET['city'])) {
            $searchCity = $_GET['city'];
        }
           

     $user= User::where('name', 'LIKE', '%' . $searchName. '%')
    -> where('email', 'LIKE', '%' . $searchEmail . '%')
    -> where('phoneNb', 'LIKE', '%' . $searchNumber . '%')
    -> where('adress', 'LIKE', '%' . $searchAdress . '%')
    -> where('city_id', 'LIKE', '%' . $searchCity . '%')
    ->paginate($rowNb);

     return $user;

    }

    public function show($id)
    {
        $user= User::where('id',$id)->first();
        
        return  $user;
    }

    
    public function relations($id)
    {
        $user= User::where('id',$id)
        ->with("comments")
         ->with("reply")
         ->with("orders")
         ->with("city")
        ->first();
        
        return  $user;
    }

    public function count(){
        return  User::count(); 
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

         $user= new User();

         $user->fill($request->all());
        
        }else
        {  
            $data=$request->all();
            
            $user = User::where('id', $id)->first();

            if(empty($request->file('image'))){
           
                $path = self::findImageOfId($id);
     
             }else{

                $old_path = self::findImageOfId($id);
        
                $path = self::image($request->file('image'),'images',$old_path);
            
             }
            
            $password = $request->password;

            error_log($password);
            // dd($request->all());
            if (trim($password) === '')
            {
             
            error_log($request->all()['name']);
            error_log($request->all()['email']);
            error_log($request->all()['phoneNb']);
            error_log($request->all()['adress']);
            error_log($request->all()['extraInfo']);
            error_log($request->all()['city_id']);

                $user->name = $request->all()['name'];
                $user->email = $request->all()['email'];
                $user->phoneNb = $request->all()['phoneNb'];
                $user->adress = $request->all()['adress'];
                $user->extraInfo = $request->all()['extraInfo'];
                $user->city_id = $request->all()['city_id'];
            } else 
            { 
            $user->update($request->all());

            }
        }

         $user->image = $path;
         $user ->save();
      
         return $user;
    }
    
     public function findImageOfId($id)
     {

        $user = User::findOrFail($id);

        $old_path = $user->image;

        return $old_path;

     }

    public function destroy($id)
    {
        $image = self::findImageOfId($id);

        $user = self::relations($id);
        
    
        FileType::destroy($image);

        $user->delete();

        return $user;
    
    }

}
