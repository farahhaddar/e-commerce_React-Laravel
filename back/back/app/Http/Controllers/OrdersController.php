<?php

namespace App\Http\Controllers;

use App\Orders;
use Illuminate\Http\Request;

use App\Response\Response;
use App\Http\Requests\OrdersRequest;
use Illuminate\Support\Facades\Validator;

use App\Repositories\Interfaces\Orders_Interface\OrdersInterface;

class OrdersController extends Controller
{

    protected $OrdersRepo = null;

    public function __construct(OrdersInterface $OrdersRepo)
    {
        $this->OrdersRepo = $OrdersRepo;
    }

    public function count()
    {
        return $this->OrdersRepo->count();

    }

    public function index($row)
    {
        $Orders = $this->OrdersRepo->getAll($row);
        // if (count($Orders)>0) 
        return Response::success($Orders);
        
        // return Response::error(400, "couldn't get Orders");
    }
    public function updateStatus(OrdersRequest $request,$id){
        $orders = $this->OrdersRepo->updateStatus($request,$id);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(OrdersRequest $request)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        $result =$this->OrdersRepo->createOrUpdate(null,$request);
        // error_log($result[1]);
        if ($result)  return Response::success($result,$result[1]);
        
        return Response::error(400, "couldn't add Order");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Packages  $packages
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Orders = $this->OrdersRepo->getById($id);

        if ($Orders) return Response::success($Orders);

        return Response::error(400, "couldn't find this Order");
    }

   

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Packages  $packages
     * @return \Illuminate\Http\Response
     */
    public function update(OrdersRequest $request,$id)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        $result =$this->OrdersRepo->createOrUpdate($id,$request);

        if ($result)  return Response::success($result);
        
        return Response::error(400, "couldn't update Order");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Packages  $packages
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $result= $this->OrdersRepo->deleteById($id);

        if ($result)  return Response::success("Order has been deleted successfuly");
        
        return Response::error(400, "couldn't delete  Order");
    }
}
