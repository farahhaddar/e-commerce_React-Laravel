<?php
namespace App\Repositories\Products;

use App\Products;

use App\Repositories\Interfaces\Products_Interface\ProductsRepositoryInterface;
use Illuminate\Support\Facades\Storage;
use File;
class ProductsRepository implements ProductsRepositoryInterface
{

    public function getAll($row,$searchn,$searchp,$searchd,$searchq,$cat_id)
    {
        if($cat_id ==""){
        return Products::with('productCategories')
        ->where('name', 'LIKE', '%' . $searchn . '%')
        ->where('price', 'LIKE', '%' . $searchp . '%')
        ->where('description', 'LIKE', '%' . $searchd . '%')
        ->where('quantity', 'LIKE', '%' . $searchq . '%')
        
        ->paginate($row);
    }
    else{
        return Products::with('productCategories')
        ->where('name', 'LIKE', '%' . $searchn . '%')
        ->where('price', 'LIKE', '%' . $searchp . '%')
        ->where('description', 'LIKE', '%' . $searchd . '%')
        ->where('quantity', 'LIKE', '%' . $searchq . '%')
        ->where('product_category_id', '=',$cat_id)
        
        ->paginate(15);
    }
    }

    public function getById($id)
    {
        return Products::with('productCategories')->find($id);
    }

    public function decrementQuantity($id,$nb)
    {
        return Products::where('id',$id)->decrement('quantity', $nb);
    }

    public function createOrUpdate($id = null,$request=null)
    {
        if (!is_null($id)) {
            // update 
            $Product = Products::find($id);
            if($Product!=null)
                return $this->ADD_EDIT($Product,$request);
            return null;
          
        } else {
            // create
            $Product = new Products;
            return $this->ADD_EDIT(null,$request);
        }

   
    }
    public function deleteById($id)
    {
        
        $product=Products::where('id',$id);
      
        if($product->exists())
        {  
            Storage::disk('public')->delete('/' . $product->first()->image);
            return $product->delete();
        }
    }

    //For createOrUpdate function
    private function ADD_EDIT($Product = null,$request)
    {   
        if(is_null($Product)){
            $Product = new Products;
            $data=$request->all();
            $image = $request->file('image');
            $path = Storage::disk('public')->put('images', $image);
        }
        else{
            $data=$request->all(); 
        $image = $request->file('image');
            $oldData = Products::findOrFail($Product->id);
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
        
        $Product->name = $request->all()['name'];
        $Product->price = $request->all()['price'];
        $Product->image= $path;
        if($request->all()['product_category_id']!="null"){
            error_log("hii");
            
        $Product->product_category_id = $request->all()['product_category_id'];
    }
        else{
            error_log("hi");
        $Product->product_category_id=$oldData->product_category_id;
    }
        $Product->description = $request->all()['description'];
        $Product->quantity = $request->all()['quantity'];
      

        return $Product->save();
    }
    
    public function mostRecentProducts(){
        $product=Products::orderBy('id', 'DESC')->limit(4)->get();
        return $product;
    }

    public function index(){
        $products=Products::all();
        return $products;
    }

    public function count(){
        return Products::count(); 
    }

}
