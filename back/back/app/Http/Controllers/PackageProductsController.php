<?php

namespace App\Http\Controllers;

use App\PackageProducts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
// use App\Http\Requests\ProductCategoriesRequest;
use App\Repositories\Interfaces\Package_Products_Interface\PackageProductsInterface;
use App\Response\Response;

class PackageProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    protected $package_Products_repo = null;

    public function __construct(PackageProductsInterface $package_Products_repo)
    {
        $this->package_Products_repo = $package_Products_repo;
    }


    public function count()
    {
        return $this->package_Products_repo->count();

    }


    public function index($packageId,$row)
    {
        //
        $package_Products = $this->package_Products_repo->getAll($packageId,$row);
        return $package_Products;
    }

   

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store($packageId,$productId,$quantity)
    {
        //
        $package_Products = $this->package_Products_repo->create($packageId,$productId,$quantity);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PackageProducts  $packageProducts
     * @return \Illuminate\Http\Response
     */
    public function show($packageId,$productId)
    {
        //
        $package_Products = $this->package_Products_repo->getById($packageId,$productId);
        return $package_Products;
    }

    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PackageProducts  $packageProducts
     * @return \Illuminate\Http\Response
     */
    public function update($id,$quantity)
    {
        //
        $package_Products = $this->package_Products_repo->update($id,$quantity);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PackageProducts  $packageProducts
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $package_Products = $this->package_Products_repo->deleteById($id);
    }
}
