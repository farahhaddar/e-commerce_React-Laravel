<?php

namespace App\Http\Controllers;

use App\ArticleCategories;
use Illuminate\Http\Request;
use App\Repositories\Interfaces\Articles_Categories_Interface\ArticleCatRepositoryInterface;
use App\Http\Requests\ArticleCategoriesValidation;
use App\Response\Response;

class ArticleCategoriesController extends Controller
{
    protected $article_Category_repo = null;

    // ArticleCatRepositoryInterface is the interface
    public function __construct(ArticleCatRepositoryInterface $article_Category_repo)
    {
        $this->article_Category_repo = $article_Category_repo;
    }

    public function showAll()
    {
        $articles = $this->article_Category_repo->getAll();
        // if($articles)
            return Response::success($articles);

        // return Response::success("No article category");
    }
     
    public function count()
    {
        return $this->article_Category_repo->count();

    }

    public function getById($id)
    {
        $article = $this->article_Category_repo->getById($id);
        if($article)
            return Response::success($article);

        return Response::error(404,"Couldn't find the article category");
    }
    public function save($id = null,$request=null)
    {
        //update
        if ($id) {
            $check=$this->article_Category_repo->createOrUpdate($id,$request);
            if($check!=null)
                return Response::success("Article Category".$request->all()['name']." Updated");
          
            return Response::error(400,"Error ! ","Item does not exist");
        } 
        //add new
        else
        {
            $this->article_Category_repo->createOrUpdate($id,$request);
            return Response::success("New Article Category Added");
        }
    }
    public function delete($id)
    {
            $check =$this->article_Category_repo->deleteById($id);
            if(!is_null($check))
                return Response::success("Deleted Successfully");
          
            return Response::error(400,"Error ! ","Item does not exist");

    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
   
    public function index()
    {
        return $this->showAll();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ArticleCategoriesValidation $request)
    {
        if (isset($request->validator) && $request->validator->fails()) 
            return Response::error(400,$request->validator->messages());

        return $this->save(null,$request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Articles  $articles
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->getById($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Articles  $articles
     * @return \Illuminate\Http\Response
     */
  
    public function update(ArticleCategoriesValidation $request, $id)
    {

        
         if (isset($request->validator) && $request->validator->fails())
         {error_log($request->validator->messages());
            return Response::error(400,$request->validator->messages());
         }
         
       return $this->save($id,$request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Articles  $articles
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->delete($id);
    }
}
