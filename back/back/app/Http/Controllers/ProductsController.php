<?php

namespace App\Http\Controllers;
use App\Response\Response;
use App\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\ProductsRequest;
use App\Repositories\Interfaces\Products_Interface\ProductsRepositoryInterface;
class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $products_repo = null;

    public function __construct(ProductsRepositoryInterface $products_repo)
    {
        $this->products_repo = $products_repo;
    }
    public function index($row)
    {
        //
        $searchn=$searchp=$searchd=$searchq=$cat_id= "";
        if (isset($_GET['name'])) {
            $searchn = $_GET['name'];
        }
        if (isset($_GET['price'])) {
            $searchp = $_GET['price'];
        }
        if (isset($_GET['description'])) {
            $searchd = $_GET['description'];
        }
        if (isset($_GET['quantity'])) {
            $searchq = $_GET['quantity'];
        }
        if (isset($_GET['product_category_id'])) {
            $cat_id = $_GET['product_category_id'];
        }
        

        $products = $this->products_repo->getAll($row,$searchn,$searchp,$searchd,$searchq,$cat_id);
        // $products = Products::all();
        return $products;
    }

    public function decrementQuantity($id,$nb)
    {
        $result = $this->products_repo->decrementQuantity($id,$nb);

        if ( $result ) return Response::success( $result );
        
        return Response::error(400, "Error!");
    }

    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductsRequest $request)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        return $this->products_repo->createOrUpdate(null,$request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $product = $this->products_repo->getById($id);
        // $product = Products::find($id);
        
        return $product;
    }

  

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function update(ProductsRequest $request, $id)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        return $this->products_repo->createOrUpdate($id,$request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $this->products_repo->deleteById($id);

        
        // Products::destroy($id);
    }

    public function mostRecentProducts(){
        $product = $this->products_repo->mostRecentProducts();

        if ($product) return Response::success($product);
        
        return Response::error(400, "couldn't get products");
    }

    public function allProducts(){

        $product = $this->products_repo->index();

        if ($product) return Response::success($product);
        
        return Response::error(400, "couldn't get products");
    }

    public function count()
    {
        return $this->products_repo->count();

    }
}
