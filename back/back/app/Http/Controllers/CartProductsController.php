<?php

namespace App\Http\Controllers;

use App\CartProducts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Response\Response;
use App\Repositories\Interfaces\Cart_Products_Interface\CartProductsInterface;
class CartProductsController extends Controller
{
    protected $cart_products_repo = null;

    public function __construct(CartProductsInterface $cart_products_repo)
    {
        $this->cart_products_repo = $cart_products_repo;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return $this->cart_products_repo->getAll();
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
        return $this->cart_products_repo->createOrUpdate(null,$request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CartProducts  $cartProducts
     * @return \Illuminate\Http\Response
     */
    public function show(CartProducts $cartProducts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CartProducts  $cartProducts
     * @return \Illuminate\Http\Response
     */
    public function edit(CartProducts $cartProducts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CartProducts  $cartProducts
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
        return $this->cart_products_repo->update($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CartProducts  $cartProducts
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        return $this->cart_products_repo->deleteById($id);
    }

    public function destroyByUserId($id)
    {
        //
        return $this->cart_products_repo->deleteByUserId($id);
    }
}
