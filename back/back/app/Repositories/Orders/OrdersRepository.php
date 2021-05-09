<?php
namespace App\Repositories\Orders;

use App\Orders;

use App\Repositories\Interfaces\Orders_Interface\OrdersInterface;
class OrdersRepository implements OrdersInterface
{

    public function getAll($row)
    {

        if (isset($_GET['address']) || isset($_GET['comment']) || isset($_GET['price'])) {

            $address = (isset($_GET['address'])) ? $_GET['address'] : '';

            $comment = (isset($_GET['comment'])) ? $_GET['comment'] : '';

            $price = (isset($_GET['price'])) ? $_GET['price'] : '';
            
            return Orders::where('address', 'LIKE', '%' . $address . '%')
            // ->where('comment', 'LIKE', '%' . $comment . '%')
            ->where('price', 'LIKE', '%' . $price . '%')->with('user')
            ->paginate($row);
        }

        return Orders::with('user')->paginate();
    }
    public function updateStatus($request,$id){
        error_log($id);
        error_log($request->all()['status']);
        $order = Orders::find($id);
        error_log("asdasd");
        $order->status = $request->all()['status'];
        $order->save();
    }

    public function count(){
        return  Orders::count(); 
    }

    public function getAllWithInfos()
    {
        return Orders::
        with('packages')
        ->with('user')
        ->with('city')
        ->with('products')
        ->get();
    }


    public function getById($id)
    {
        return Orders::find($id);
    }

    public function getByIdWithInfos($id)
    {

        return Orders::with('packages')
        ->with('user')
         ->with('city')
        ->with('products')
        ->find($id);
    }


    public function createOrUpdate($id = null,$request=null)
    {
        if (!is_null($id)) {
            // update 
            $Order = $this->getById($id);
            if($Order!=null){
                return $this->ADD_EDIT($Order,$request);
            }
            return null;
          
        } else {
            // create
            $Order = new Orders;
            return $this->ADD_EDIT($Order,$request);
        }

   
    }
    public function deleteById($id)
    {
        
        $Order=$this->getByIdWithInfos($id);
        if(!is_null($Order))
        {  

            $Order->products()->detach();

            return $Order->delete();
        }
    }

    //For createOrUpdate function
    private function ADD_EDIT($Order = null,$request)
    {   
        $Order->date= now()->toDateString();
        $Order->address = $request->all()['address'];
        $Order->comment = $request->all()['comment'];
        $Order->price = $request->all()['price'];
        $Order->city_id = $request->all()['city_id'];
        $Order->user_id = $request->all()['user_id'];
        $Order->name = $request->all()['name'];
        $data=$Order->save();
        error_log($Order->id);
        return [$data, $Order->id];
    }
    

}
