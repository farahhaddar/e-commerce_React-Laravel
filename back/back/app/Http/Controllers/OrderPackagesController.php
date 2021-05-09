<?php

namespace App\Http\Controllers;

use App\OrderPackages;
use Illuminate\Http\Request;

use App\Repositories\Interfaces\PackageOrder_ProductOrderInterface\PackageOrder_ProductOrderInterface;

use App\Response\Response;
use App\Http\Requests\PackagesAndProductsOrderRequest;
use Illuminate\Support\Facades\Validator;

class OrderPackagesController extends Controller
{
    protected $OrdersPackRepo = null;

    public function __construct(PackageOrder_ProductOrderInterface $OrdersPackRepo)
    {
        $this->OrdersPackRepo = $OrdersPackRepo;
        $this->OrdersPackRepo->setModel('App\OrderPackages');
    }

    public function count()
    {
        return $this->OrdersPackRepo->count();

    }




    public function index($rows)
    {
        $OrderPackage = $this->OrdersPackRepo->getAll($rows);
        // if (count($OrderPackage)>0) 
        return Response::success($OrderPackage);
        
        // return Response::error(400, "couldn't get item");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PackagesAndProductsOrderRequest $request)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        $result =$this->OrdersPackRepo->createOrUpdate(null,$request);
        
        if ($result) return Response::success($result);
        
        return Response::error(400, "couldn't add item");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Packages  $packages
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Orders = $this->OrdersPackRepo->getById($id);

        if ($Orders) return Response::success($Orders);

        return Response::error(400, "couldn't find this item");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Packages  $packages
     * @return \Illuminate\Http\Response
     */
    public function update(PackagesAndProductsOrderRequest $request,$id)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        $result =$this->OrdersPackRepo->createOrUpdate($id,$request);

        if ($result)  return Response::success($result);
        
        return Response::error(400, "couldn't update item");
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
        $result= $this->OrdersPackRepo->deleteById($id);

        if ($result)  return Response::success("This item has been deleted successfuly");
        
        return Response::error(400, "couldn't delete this item");
    }

}
