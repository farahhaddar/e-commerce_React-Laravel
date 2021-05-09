<?php

namespace App\Http\Controllers;

use App\Cities;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\CitiesRequest;
use App\Response\Response;
use App\Repositories\Interfaces\Cities_Interface\CitiesRepositoryInterface;
class CitiesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $cities_repo = null;

    public function __construct(CitiesRepositoryInterface $cities_repo)
    {
        $this->cities_repo = $cities_repo;
    }

     
    public function count()
    {
        return $this->cities_repo->count();

    }



    public function index($row)
    {
        $searchn=$searchd ="";
        if (isset($_GET['name'])) {
            $searchn = $_GET['name'];
        }
        if (isset($_GET['delivery_fees'])) {
            $searchd = $_GET['delivery_fees'];
        }
        $cities = $this->cities_repo->getAll($row,$searchn,$searchd);
        return $cities;
    }

   

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CitiesRequest $request)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        $city = $this->cities_repo->createOrUpdate(null,$request);

        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Cities  $cities
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        // $city = Cities::find($id);
        $city = $this->cities_repo->getById($id);
        return $city;
    }

   

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Cities  $cities
     * @return \Illuminate\Http\Response
     */
    
    public function update(CitiesRequest $request,$id)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        $city = $this->cities_repo->createOrUpdate($id,$request);
        return $city;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Cities  $cities
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $this->cities_repo->deleteById($id);
    }
}
