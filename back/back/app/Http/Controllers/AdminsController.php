<?php

namespace App\Http\Controllers;

use App\Admins;
use App\Repositories\Interfaces\Admin\AdminInterface;
use App\Response\Response;
use App\Http\Requests\AdminRequest;
use Illuminate\Http\Request;

class AdminsController extends Controller
{
    protected $repository = null;

    public function __construct(AdminInterface $repository)
    {
        $this->repository = $repository;
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($rowNb)
    {
        $admin = $this->repository->index($rowNb);

        if ($admin) return Response::success($admin);
        
        return Response::error(400, "couldn't get Admin");
    }

    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AdminRequest $request)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        

        $admin = $this->repository->storeOrUpdate($request);

        if ($admin)  return Response::success($admin);
        
        return Response::error(400, "couldn't add Admin");

            
          
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Admin $admin
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $admin = $this->repository->show($id);

        if ($admin) return Response::success($admin);

        return Response::error(400, "couldn't find Admin");

    }

    public function count()
    {
        return $this->repository->count();

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Admin $admin
     * @return \Illuminate\Http\Response
     */
    public function update(AdminRequest $request, $id)
    {
       
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

        $admin = $this->repository->storeOrUpdate($request,$id);

        if ($admin)  return Response::success($admin);
        
        return Response::error(400, "couldn't update Admin");

        
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $admin = $this->repository->destroy($id);

        if ($admin)  return Response::success("Record has been deleted successfuly");
        
        return Response::error(400, "couldn't delete  Admin");

    }
}