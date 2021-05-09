<?php

namespace App\Http\Controllers;

use App\User;

use App\Repositories\Interfaces\User\UserInterface;
use App\Response\Response;
use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;


class UserController extends Controller
{

    protected $repository = null;

    public function __construct(UserInterface $repository)
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
        $user = $this->repository->index($rowNb);

        if ($user) return Response::success($user);
        
        return Response::error(400, "couldn't get Users");
    }

    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
      
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        
    
        $user = $this->repository->storeOrUpdate($request);

        if ($user)  return Response::success($user);
        
        return Response::error(400, "couldn't add User");

            
          
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $user = $this->repository->relations($id);

        if ($user) return Response::success($user);

        return Response::error(400, "couldn't find user");

    }
       /**
     * Display the specified resource.
     *
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function relations($id)
    {

        $user = $this->repository->relations($id);

        if ($user) return Response::success($user);

        return Response::error(400, "couldn't find user");

    }

    public function count()
    {
        return $this->repository->count();

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, $id)
    {
       
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $user = $this->repository->storeOrUpdate($request,$id);

        if ($user)  return Response::success($user);
        
        return Response::error(400, "couldn't update user");

        
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = $this->repository->destroy($id);

        if ($user)  return Response::success("Record has been deleted successfuly");
        
        return Response::error(400, "couldn't delete user");

    }
}