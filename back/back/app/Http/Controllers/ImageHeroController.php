<?php

namespace App\Http\Controllers;
use App\Http\Requests\ImageHeroRequest;
use App\ImageHero;
use Illuminate\Http\Request;
use App\Repositories\Interfaces\ImageHero\ImageHeroInterface;
use App\Response\Response;

class ImageHeroController extends Controller
{
 

    protected $repository = null;

    public function __construct(ImageHeroInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $HeroImages = $this->repository->index();

        if ($HeroImages) return Response::success($HeroImages);
        
        return Response::error(400, "couldn't get HeroImagess");
    }

    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ImageHeroRequest  $request)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        
    
        $HeroImages = $this->repository->storeOrUpdate($request);

        if ($HeroImages)  return Response::success($HeroImages);
        
        return Response::error(400, "couldn't add HeroImages");
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $HeroImages = $this->repository->show($id);

        if ($HeroImages) return Response::success($HeroImages);

        return Response::error(400, "couldn't find HeroImages");
    }

    public function count()
    {
        return $this->repository->count();

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ImageHeroRequest  $request, $id)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

    
        $HeroImages = $this->repository->storeOrUpdate($request,$id);

        if ($HeroImages)  return Response::success($HeroImages);
        
        return Response::error(400, "couldn't update HeroImages");
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $HeroImages = $this->repository->destroy($id);

        if ($HeroImages)  return Response::success("Record has been deleted successfuly");
        
        return Response::error(400, "couldn't delete HeroImages");
    }
}
