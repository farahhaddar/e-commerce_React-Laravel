<?php
namespace App\Repositories\Product_Categories;

use App\ProductCategories;

use App\Repositories\Interfaces\Product_Categories_Interface\ProductCategoriesRepositoryInterface;
use File;
class ProductCategoriesRepository implements ProductCategoriesRepositoryInterface
{

    public function getAll($row,$searchn)
    {
        return ProductCategories::with('products')->where('name', 'LIKE', '%' . $searchn . '%')->paginate($row);
    }

    public function count(){
        return ProductCategories::count(); 
    }

    public function getById($id)
    {
        return ProductCategories::with('products')->find($id);
    }

    public function createOrUpdate($id = null,$request=null)
    {
        if (!is_null($id)) {
            // update 
            
            $productCategory = ProductCategories::find($id);
            error_log("d");
            if($productCategory!=null)
                return $this->ADD_EDIT($productCategory,$request);
            return null;
          
        } else {
            // create
            $productCategory = new ProductCategories;
            return $this->ADD_EDIT($productCategory,$request);
        }

   
    }
    public function deleteById($id)
    {
        
        $productCategory=productCategories::where('id',$id);
      
        if($productCategory->exists())
        {  
            return $productCategory->delete();
        }
    }

    //For createOrUpdate function
    private function ADD_EDIT($productCategory,$request)
    {   
        error_log($productCategory->name);
        error_log($productCategory->name);
        
        $productCategory->name = $request->all()['name'];
      

        $productCategory->save();
        return $productCategory;
    }
    

}
