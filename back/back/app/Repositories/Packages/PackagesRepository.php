<?php
namespace App\Repositories\Packages;

use App\Packages;

use App\Repositories\Interfaces\Packages_Interface\PackagesRepositoryInterface;
use Illuminate\Support\Facades\Storage;
use File;
class PackagesRepository implements PackagesRepositoryInterface
{

    public function getAll($row,$searchn,$searchp,$searchd)
    {
        return Packages::with('products')
        ->where('name', 'LIKE', '%' . $searchn . '%')
        ->where('price', 'LIKE', '%' . $searchp . '%')
        ->where('description', 'LIKE', '%' . $searchd . '%')
        ->paginate($row);
    }

    public function getById($id)
    {
        return Packages::with('products')->find($id);
    }

    public function count(){
        return Packages::count(); 
    }
    public function decrementQuantity($id,$nb)
    {
        return Packages::where('id',$id)->decrement('quantity', $nb);
    }

    public function mostRecentPackages(){
        $Package= Packages::orderBy('id', 'DESC')->limit(4)->get();
        return $Package;
    }


    public function createOrUpdate($id = null,$request=null)
    {
        if (!is_null($id)) {
            // update 
            $Package = Packages::find($id);
            if($Package!=null){
                error_log("sad");
                return $this->ADD_EDIT($Package,$request);

            }
            return null;
          
        } else {
            // create
            $Package = new Packages;
            return $this->ADD_EDIT(null,$request);
        }

   
    }
    public function deleteById($id)
    {
        
        $package=Packages::where('id',$id);
        if($package->exists())
        {  
            Storage::disk('public')->delete('/' . $package->first()->image);
            return $package->delete();
        }
    }

    //For createOrUpdate function
    private function ADD_EDIT($Package = null,$request)
    {   
        if(is_null($Package)){
            $Package = new Packages;
            $data=$request->all();
            $image = $request->file('image');
            $path = Storage::disk('public')->put('images', $image);
        }
        else{
            $data=$request->all(); 
        $image = $request->file('image');
            $oldData = Packages::findOrFail($Package->id);
            $old_path = $oldData->image;

            if (!empty($image)) {
                $pic = $image;
                $path = Storage::disk('public')->put('images', $pic);
                if (!$path) {
                    return response()->json(['status' => 500, 'error' => "couldn't upload image"]);
                } else {
                    Storage::disk('public')->delete('/' . $old_path);
                }
            } else {
                $path = $oldData->image;
            }
        }
        
        $Package->name = $request->all()['name'];
        $Package->price = $request->all()['price'];
        $Package->description = $request->all()['description'];
        $Package->quantity = $request->all()['quantity'];
        $Package->image= $path;
      

        return $Package->save();
    }
    

}
