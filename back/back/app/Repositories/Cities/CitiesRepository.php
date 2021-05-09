<?php
namespace App\Repositories\Cities;

use App\Cities;

use App\Repositories\Interfaces\Cities_Interface\CitiesRepositoryInterface;
use Illuminate\Support\Facades\Storage;
use File;
class CitiesRepository implements CitiesRepositoryInterface
{

    public function getAll($row,$searchn,$searchd)
    {
        return Cities::with('orders')
        ->where('name', 'LIKE', '%' . $searchn . '%')
        ->where('delivery_fees', 'LIKE', '%' . $searchd . '%')
        ->paginate($row);
    }
    
    public function count(){
        return  Cities::count(); 
    }


    public function getById($id)
    {
        return Cities::with('orders')->find($id);
    }

    public function createOrUpdate($id = null,$request=null)
    {
        if (!is_null($id)) {
            // update 
            $City = Cities::find($id);
            if($City!=null)
                return $this->ADD_EDIT($City,$request);
            return null;
          
        } else {
            // create
            $City = new Cities;
            return $this->ADD_EDIT(null,$request);
        }

   
    }
    public function deleteById($id)
    {
        
        $city=Cities::where('id',$id);
      
        if($city->exists())
        {  
            return $city->delete();
        }
    }

    //For createOrUpdate function
    private function ADD_EDIT($City = null,$request)
    {   
        if(is_null($City)){
            $City = new Cities;
        }
        
        $City->name = $request->all()['name'];
        $City->delivery_fees = $request->all()['delivery_fees'];
      

        return $City->save();
    }
    

}
