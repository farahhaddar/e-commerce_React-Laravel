<?php

namespace App\Http\Controllers;

use App\ProductCategories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Response\Response;
use App\Http\Requests\ProductCategoriesRequest;
use App\Repositories\Interfaces\Product_Categories_Interface\ProductCategoriesRepositoryInterface;
class ProductCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $product_Category_repo = null;

    public function __construct(ProductCategoriesRepositoryInterface $product_Category_repo)
    {
        $this->product_Category_repo = $product_Category_repo;
    }
    public function index($row)
    {
        $searchn= "";
        if (isset($_GET['name'])) {
            $searchn = $_GET['name'];
        }
        //
        // $productCategories = ProductCategories::all();
        $productCategories = $this->product_Category_repo->getAll($row,$searchn);
        return $productCategories;
    }

   

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductCategoriesRequest $request)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        return $this->product_Category_repo->createOrUpdate(null,$request);
    }

    public function count()
    {
        return $this->product_Category_repo->count();

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProductCategories  $productCategories
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        // $productCategory = ProductCategories::find($id);

        $productCategories = $this->product_Category_repo->getById($id);
        return $productCategories;
    }

  

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProductCategories  $productCategories
     * @return \Illuminate\Http\Response
     */
    public function update(ProductCategoriesRequest $request, $id)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        return $this->product_Category_repo->createOrUpdate($id,$request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProductCategories  $productCategories
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $this->product_Category_repo->deleteById($id);
    }
}
