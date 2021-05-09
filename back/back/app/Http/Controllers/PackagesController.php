<?php

namespace App\Http\Controllers;

use App\Packages;
use App\Response\Response;
use App\Http\Requests\PackagesRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Repositories\Interfaces\Packages_Interface\PackagesRepositoryInterface;

class PackagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $packages_repo = null;

    public function __construct(PackagesRepositoryInterface $packages_repo)
    {
        $this->packages_repo = $packages_repo;
    }
       
    public function count()
    {
        return $this->packages_repo->count();

    }

    public function mostRecentPackages(){
        $package = $this->packages_repo->mostRecentPackages();

        if ( $package ) return Response::success( $package );
        
        return Response::error(400, "couldn't get products");
    }

    public function decrementQuantity($id,$nb)
    {
        $result = $this->packages_repo->decrementQuantity($id,$nb);

        if ( $result ) return Response::success( $result );
        
        return Response::error(400, "Error!");
    }

    public function index($row)
    {
        //
        // $packages = Packages::all();
        $searchn=$searchp=$searchd= "";
        if (isset($_GET['name'])) {
            $searchn = $_GET['name'];
        }
        if (isset($_GET['price'])) {
            $searchp = $_GET['price'];
        }
        if (isset($_GET['description'])) {
            $searchd = $_GET['description'];
        }
        $packages = $this->packages_repo->getAll($row,$searchn,$searchp,$searchd);
        return $packages;
    }

  

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PackagesRequest $request)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        return $this->packages_repo->createOrUpdate(null,$request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Packages  $packages
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        // $package = Packages::find($id);
        $package = $this->packages_repo->getById($id);
        return $package;
    }

   

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Packages  $packages
     * @return \Illuminate\Http\Response
     */
    public function update(PackagesRequest $request,$id)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        return $this->packages_repo->createOrUpdate($id,$request);
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
        return $this->packages_repo->deleteById($id);
        // Packages::destroy($id);
    }
}
