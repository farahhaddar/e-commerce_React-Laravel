<?php
namespace App\Repositories\Cart_Products;

use App\CartProducts;
use File;
use App\FileType\FileType;
use App\Repositories\Interfaces\Cart_Products_Interface\CartProductsInterface;
class CartProductsRepository implements CartProductsInterface
{

    public function getAll()
    {
        $userId=$productId="";
        if (isset($_GET['user_id'])) {
            $userId = $_GET['user_id'];
        }
        if (isset($_GET['product_id'])) {
            $productId = $_GET['product_id'];
            return CartProducts::with('products')->where('user_id',$userId)->where('product_id',$productId)->get();

        }
            return CartProducts::with('products')->where('user_id',$userId)->get();

    }
    public function createOrUpdate($id = null,$request=null){
        $Cart = CartProducts::where('user_id',$request->all()['user_id'])->where('product_id',$request->all()['product_id'])->first();
        return $this->ADD_EDIT($Cart,$request);
    }
    public function update($request=null){
        $Cart = CartProducts::where('user_id',$request->all()['user_id'])->where('product_id',$request->all()['product_id'])->first();
        if(is_null($Cart)){
            $Cart = new CartProducts;
            $Cart->user_id = $request->all()['user_id'];
            $Cart->product_id = $request->all()['product_id'];
        }
        $Cart->quantity = $request->all()['quantity'];
        return $Cart->save();
    }
    public function deleteById($id){
        $cart=CartProducts::where('id',$id);
      
        if($cart->exists())
        {  
            return $cart->delete();
        }
    }

    public function deleteByUserId($id){
        $cart=CartProducts::where('user_id',$id);
      
        if($cart->exists())
        {  
            return $cart->delete();
        }
    }

    private function ADD_EDIT($Cart = null,$request)
    {   
        if(is_null($Cart)){
            $Cart = new CartProducts;
            $Cart->quantity = $request->all()['quantity'];
            $Cart->user_id = $request->all()['user_id'];
            $Cart->product_id = $request->all()['product_id'];
            return $Cart->save();
        }else{
            $Cart->quantity += $request->all()['quantity'];
        }
        return $Cart->save();
    }
}
