<?php
namespace App\Repositories\PackageOrder_ProductOrder;

use App\Orders;

use App\Repositories\Interfaces\PackageOrder_ProductOrderInterface\PackageOrder_ProductOrderInterface;
class PackageOrder_ProductOrder implements PackageOrder_ProductOrderInterface
{

  protected $model=null;

  //use App\Orders;
 
  public function setModel($model)
  {
    $this->model = $model;
  }

    public function getAll($rows)
    {
        $searchq =  "";
        if (isset($_GET['name'])) {
            $searchn = $_GET['name'];
        }
        if (isset($_GET['price'])) {
            $searchp = $_GET['price'];
        }
        if (isset($_GET['quantity'])) {
            $searchq = $_GET['quantity'];
        }
        if (isset($_GET['order_id'])) {
            if($this->model=="App\OrderPackages")
            return $this->model::with("packages")->where('order_id',  $_GET['order_id'] )->where('quantity', 'LIKE', '%' . $searchq . '%')->whereHas('packages', function ($query) {
                $searchp = $searchn ="";
                if (isset($_GET['name'])) {
                    $searchn = $_GET['name'];
                }
                if (isset($_GET['price'])) {
                    $searchp = $_GET['price'];
                }
                $query->where('name', 'LIKE', '%' . $searchn . '%');
                $query->where('price', 'LIKE', '%' . $searchp . '%');
            })
            ->paginate($rows);
            else
            return $this->model::with("products")->where('order_id',  $_GET['order_id'] )->where('quantity', 'LIKE', '%' . $searchq . '%')->whereHas('products', function ($query) {
                $searchp = $searchn ="";
                if (isset($_GET['name'])) {
                    $searchn = $_GET['name'];
                }
                if (isset($_GET['price'])) {
                    $searchp = $_GET['price'];
                }
                $query->where('name', 'LIKE', '%' . $searchn . '%');
                $query->where('price', 'LIKE', '%' . $searchp . '%');
            })
            ->paginate($rows);

        }
        if($this->model=="App\OrderPackages")
        return $this->model::with("packages")->where('quantity', 'LIKE', '%' . $searchq . '%')->whereHas('packages', function ($query) {
            $searchp = $searchn ="";
            if (isset($_GET['name'])) {
                $searchn = $_GET['name'];
            }
            if (isset($_GET['price'])) {
                $searchp = $_GET['price'];
            }
            $query->where('name', 'LIKE', '%' . $searchn . '%');
            $query->where('price', 'LIKE', '%' . $searchp . '%');
        })
        ->paginate($rows);
        else
        return $this->model::with("products")->where('quantity', 'LIKE', '%' . $searchq . '%')->whereHas('products', function ($query) {
            $searchp = $searchn ="";
            if (isset($_GET['name'])) {
                $searchn = $_GET['name'];
            }
            if (isset($_GET['price'])) {
                $searchp = $_GET['price'];
            }
            $query->where('name', 'LIKE', '%' . $searchn . '%');
            $query->where('price', 'LIKE', '%' . $searchp . '%');
        })
        ->paginate($rows);
    }
    

    public function count(){
        return $this->model::count(); 
    }

    public function getById($id)
    {
        return $this->model::find($id);
    }



    public function createOrUpdate($id = null,$request=null)
    {
        if (!is_null($id)) {
            // update 
            $PackOrProd = $this->getById($id);
            if($PackOrProd!=null){
                return $this->ADD_EDIT($PackOrProd,$request);
            }
            return null;
          
        } else {
            // create
            $PackOrProd = new $this->model;
            return $this->ADD_EDIT($PackOrProd,$request);
        }

   
    }
    public function deleteById($id)
    {
        
        $PackOrProd=$this->getById($id);
        if(!is_null($PackOrProd))
        {  
            return $PackOrProd->delete();
        }
    }

    //For createOrUpdate function
    private function ADD_EDIT($PackOrProd = null,$request)
    {   
    
        $PackOrProd->quantity = $request->all()['quantity'];
        $PackOrProd->order_id = $request->all()['order_id'];
        if($request->has('product_id'))
        $PackOrProd->product_id = $request->all()['product_id'];
        if($request->has('package_id'))
        $PackOrProd->package_id = $request->all()['package_id'];
      
        return $PackOrProd->save();
    }
    

}
