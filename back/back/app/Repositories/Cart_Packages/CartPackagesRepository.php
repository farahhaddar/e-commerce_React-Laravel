<?php
namespace App\Repositories\Cart_Packages;

use App\CartPackages;
use File;
use App\FileType\FileType;
use App\Repositories\Interfaces\Cart_Packages_Interface\CartPackagesInterface;
class CartPackagesRepository implements CartPackagesInterface
{

    public function getAll()
    {
        $userId=$packageId="";
        if (isset($_GET['user_id'])) {
            $userId = $_GET['user_id'];
        }
        if (isset($_GET['package_id'])) {
            $packageId = $_GET['package_id'];
            return CartPackages::with('packages')->where('user_id',$userId)->where('package_id',$packageId)->get();

        }
            return CartPackages::with('packages')->where('user_id',$userId)->get();

    }
    public function createOrUpdate($id = null,$request=null){
        $Cart = CartPackages::where('user_id',$request->all()['user_id'])->where('package_id',$request->all()['package_id'])->first();
        return $this->ADD_EDIT($Cart,$request);
    }
    public function update($request=null){
        $Cart = CartPackages::where('user_id',$request->all()['user_id'])->where('package_id',$request->all()['package_id'])->first();
        if(is_null($Cart)){
            $Cart = new CartPackages;
            $Cart->user_id = $request->all()['user_id'];
            $Cart->product_id = $request->all()['package_id'];
        }
        $Cart->quantity = $request->all()['quantity'];
        return $Cart->save();
    }
    public function deleteById($id){
        $cart=CartPackages::where('id',$id);
      
        if($cart->exists())
        {  
            return $cart->delete();
        }
    }

    public function deleteByUserId($id){
        $cart=CartPackages::where('user_id',$id);
      
        if($cart->exists())
        {  
            return $cart->delete();
        }
    }

    private function ADD_EDIT($Cart = null,$request)
    {   
        if(is_null($Cart)){
            $Cart = new CartPackages;
            $Cart->quantity = $request->all()['quantity'];
            $Cart->user_id = $request->all()['user_id'];
            $Cart->package_id = $request->all()['package_id'];
        }else{
            $Cart->quantity += $request->all()['quantity'];
        }
        return $Cart->save();
    }
    


    

}
