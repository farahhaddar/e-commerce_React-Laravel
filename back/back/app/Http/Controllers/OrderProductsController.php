<?php

namespace App\Http\Controllers;

use App\OrderProducts;
use Illuminate\Http\Request;
use App\Repositories\Interfaces\PackageOrder_ProductOrderInterface\PackageOrder_ProductOrderInterface;

use App\Response\Response;
use App\Http\Requests\PackagesAndProductsOrderRequest;
use Illuminate\Support\Facades\Validator;

class OrderProductsController extends Controller
{
    protected $OrdersProdRepo = null;

    public function __construct(PackageOrder_ProductOrderInterface $OrdersProdRepo)
    {
        $this->OrdersProdRepo = $OrdersProdRepo;
        $this->OrdersProdRepo->setModel('App\OrderProducts');
    }

    public function count()
    {
        return $this->OrdersProdRepo->count();

    }


    



    public function index($rows)
    {
        $OrderProduct = $this->OrdersProdRepo->getAll($rows);
        // if (count($OrderProduct)>0) 
        return Response::success($OrderProduct);
        
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
        $result =$this->OrdersProdRepo->createOrUpdate(null,$request);
        
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
        $Orders = $this->OrdersProdRepo->getById($id);

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
        $result =$this->OrdersProdRepo->createOrUpdate($id,$request);

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
        $result= $this->OrdersProdRepo->deleteById($id);

        if ($result)  return Response::success("This item has been deleted successfuly");
        
        return Response::error(400, "couldn't delete this item");
    }

}
