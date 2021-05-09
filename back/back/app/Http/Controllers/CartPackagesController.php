<?php

namespace App\Http\Controllers;

use App\CartPackages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Response\Response;
use App\Repositories\Interfaces\Cart_Packages_Interface\CartPackagesInterface;
class CartPackagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $cart_packages_repo = null;

    public function __construct(CartPackagesInterface $cart_packages_repo)
    {
        $this->cart_packages_repo = $cart_packages_repo;
    }
    public function index()
    {
        //
        return $this->cart_packages_repo->getAll();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        return $this->cart_packages_repo->createOrUpdate(null,$request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CartPackages  $cartPackages
     * @return \Illuminate\Http\Response
     */
    public function show(CartPackages $cartPackages)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CartPackages  $cartPackages
     * @return \Illuminate\Http\Response
     */
    public function edit(CartPackages $cartPackages)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CartPackages  $cartPackages
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
        return $this->cart_packages_repo->update($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CartPackages  $cartPackages
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        return $this->cart_packages_repo->deleteById($id);
    }

    public function destroyByUserId($id)
    {
        //
        return $this->cart_packages_repo->deleteByUserId($id);
    }
}
