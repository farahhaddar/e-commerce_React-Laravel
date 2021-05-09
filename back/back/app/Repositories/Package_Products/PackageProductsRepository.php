<?php
namespace App\Repositories\Package_Products;

use App\PackageProducts;
use App\Packages;
use App\Products;
use DB;
use App\Repositories\Interfaces\Package_Products_Interface\PackageProductsInterface;
use Illuminate\Support\Facades\Storage;
use File;
class PackageProductsRepository implements PackageProductsInterface
{

    public function getAll($packageId,$row)
    {
        return DB::table('package_products')
            ->join('products', 'package_products.product_id', '=', 'products.id')
            ->join('packages', 'package_products.package_id', '=', 'packages.id')
            ->where('package_products.package_id',$packageId)
            ->select('product_id','package_products.id','package_products.quantity','products.name','products.image','packages.price','product_category_id','description')
            ->paginate($row);
    //     if($user_id==""){
    //         return Comments::with('users')->with('replies')
    //         ->where('comment', 'LIKE', '%' . $searchc . '%')
    //         ->get();
    //     }
    //     else{
    //     return Comments::with('users')->with('replies')
    //     ->where('comment', 'LIKE', '%' . $searchc . '%')
    //     ->where('user_id', 'LIKE', '%' . $user_id . '%')
    //     ->get();
    // }
    }

    public function getById($packageId,$productId)
    {
        return DB::table('package_products')
            ->join('products', 'package_products.product_id', '=', 'products.id')
            ->join('packages', 'package_products.package_id', '=', 'packages.id')
            ->where('package_products.package_id',$packageId)
            ->where('package_products.product_id',$productId)
            ->select('product_id','package_products.id','package_products.quantity','products.name','products.image','packages.price','product_category_id','description')
            ->get();
    }
    public function create($packageId,$productId,$quantity)
    {
        $PackageProducts = new PackageProducts;
        $PackageProducts->package_id = $packageId;
        $PackageProducts->product_id = $productId;
        $PackageProducts->quantity = $quantity;
        return $PackageProducts->save();

    }
    public function update($id,$quantity)
    {
        $PackageProducts = PackageProducts::find($id);
        $PackageProducts->quantity = $quantity;
        return $PackageProducts->save();

    }

    public function createOrUpdate($id = null,$request=null)
    {
        if (!is_null($id)) {
            // update 
            $Comment = Comments::find($id);
            if($Comment!=null)
                return $this->ADD_EDIT($Comment,$request);
            return null;
          
        } else {
            // create
            $Comment = new Comments;
            return $this->ADD_EDIT(null,$request);
        }

   
    }

    public function count(){
        return Comments::count(); 
    }


    public function deleteById($id)
    {
        $PackageProducts=PackageProducts::where('id',$id);
        if($PackageProducts->exists())
        {  
            return $PackageProducts->delete();
        }
    }

    //For createOrUpdate function
    private function ADD_EDIT($Comment = null,$request)
    {   
        if(is_null($Comment)){
            $Comment = new Comments;
        }
        
        $Comment->comment = $request->all()['comment'];
        $Comment->user_id = $request->all()['user_id'];
      

        return $Comment->save();
    }
    

}
