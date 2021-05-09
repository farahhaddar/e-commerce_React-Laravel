<?php

namespace App\Http\Controllers;

use App\Articles;
use App\Http\Requests\ArticlesValidation;
use  App\Response\Response;

use App\Repositories\Interfaces\Articles_Interface\ArticleRepositoryInterface;
use Illuminate\Http\Request;

class ArticlesController extends Controller
{
    protected $article_repo = null;

    // ArticleRepositoryInterface is the interface
    public function __construct(ArticleRepositoryInterface $article_repo)
    {
        $this->article_repo = $article_repo;
    }



    public function count()
    {
        return $this->article_repo->count();

    }

    public function showArticles()
    {
        $articles = $this->article_repo->getAllArticles();
        // if($articles)
            return Response::success($articles);

        // return Response::success("Couldn't find any article");

    }

    public function getLastTen()
    {
        $articles = $this->article_repo->getLastTen();
        if($articles)
            return Response::success($articles);

        return Response::success("Couldn't find any article");
    }

    public function getArticle($id)
    {
        $article = $this->article_repo->getArticleById($id);
        if($article)
            return Response::success($article);

        return Response::success("Couldn't find the article");

    }
    public function saveArticle($id = null, $request = null)
    {
        if ($id) {
            $check=$this->article_repo->createOrUpdate($id,$request);
            if($check!=null)
                return Response::success("Article ".$request->all()['title']." Updated");
            
            return Response::error(400,"Error ! ","Item does not exist");

        } else {
            $this->article_repo->createOrUpdate($id,$request);
            return Response::success("New Article Added");
        }
    }
    public function deleteArticle($id)
    {
            $check =$this->article_repo->deleteArticleById($id);
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
        return $this->showArticles();
    }

    public function getLast()
    {
        return $this->getLastTen();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ArticlesValidation $request)
    {
        if (isset($request->validator) && $request->validator->fails()) 
        {
            return Response::error(400,$request->validator->messages());
        }
        return $this->saveArticle(null, $request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Articles  $articles
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->getArticle($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Articles  $articles
     * @return \Illuminate\Http\Response
     */

    public function update(ArticlesValidation $request, $id)
    {
       
         if (isset($request->validator) && $request->validator->fails()) {
            return Response::error(400,$request->validator->messages());
        }

        return $this->saveArticle($id, $request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Articles  $articles
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->deleteArticle($id);
    }

}
