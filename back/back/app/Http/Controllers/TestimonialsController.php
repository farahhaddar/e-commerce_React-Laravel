<?php

namespace App\Http\Controllers;


use App\Http\Requests\TestimonialsRequest;
use App\Repositories\Interfaces\Testimonials\TestimonialsInterface;
use App\Response\Response;
use App\Testimonials;
use Illuminate\Http\Request;

class TestimonialsController extends Controller
{

    protected $repository = null;

    public function __construct(TestimonialsInterface $repository)
    {
        $this->repository = $repository;
    }

    public function count()
    {
        return $this->repository->count();

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($rowNb)
    {
        $testimonials = $this->repository->index($rowNb);

        if ($testimonials) return Response::success($testimonials);
        
        return Response::error(400, "couldn't get Testimonials");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(TestimonialsRequest $request)
    {

        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        
        $path = $this->repository->image($request->file('image'),'images');

        if (!$path) return Response::error(400, "Couldn't upload image");
        
        $testimonials = $this->repository->storeOrUpdate($request, $path);

        if ($testimonials)  return Response::success($testimonials);
        
        return Response::error(400, "couldn't add Testimonial");

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Testimonials  $testimonials
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $testimonials = $this->repository->show($id);

        if ($testimonials) return Response::success($testimonials);

        return Response::error(400, "couldn't find Testimonial");
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Testimonials  $testimonials
     * @return \Illuminate\Http\Response
     */
    public function update(TestimonialsRequest $request, $id)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());

       
        $old_path =  $this->repository->findImageOfId($id);
        
        $path = $this->repository->image($request->file('image'),'images',$old_path);

        if (!$path) return Response::error(400, "Couldn't upload image");
        
        $testimonials = $this->repository->storeOrUpdate($request,$path,$id);

        if ($testimonials)  return Response::success($testimonials);
        
        return Response::error(400, "couldn't update Testimonial");


        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Testimonials  $testimonials
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        
        $testimonials = $this->repository->destroy($id);

        if ($testimonials)  return Response::success("Record has been deleted successfuly");
        
        return Response::error(400, "couldn't delete Testimonial");

        
    }
}
