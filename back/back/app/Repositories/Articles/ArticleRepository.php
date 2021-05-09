<?php
namespace App\Repositories\Articles;

use App\Articles;
use File;
use App\FileType\FileType;
use App\Repositories\Interfaces\Articles_Interface\ArticleRepositoryInterface;
class ArticleRepository implements ArticleRepositoryInterface
{

    public function getAllArticles()
    {
        if (isset($_GET['title']) || isset($_GET['content'])|| isset($_GET['catId'])) {

            $title = (isset($_GET['title'])) ? $_GET['title'] : '';

            $content = (isset($_GET['content'])) ? $_GET['content'] : '';

            $catId = (isset($_GET['catId'])) ? $_GET['catId'] : '';

            return Articles::with('articleCategory')
            ->where('title', 'LIKE', '%' . $title . '%')
            ->where('content', 'LIKE', '%' . $content . '%')
            // ->where('article_category_id',  $catId )
            ->paginate(5);
        }

        return Articles::with('articleCategory')->paginate(5);
    }

    public function count(){
        return  Articles::count(); 
    }
      

    public function getLastTen()
    {
        return Articles::orderBy('id', 'desc')->limit(10)->get();
    }

    public function getArticleById($id)
    {
        return Articles::with('articleCategory')->find($id);
    }

    public function createOrUpdate($id = null,$request=null)
    {
        if (!is_null($id)) {
            // update 
            $Article = Articles::find($id);
            if($Article!=null)
                return $this->ADD_EDIT($Article,$request);
            return null;
          
        } else {
            // create
            $Article = new Articles;
            return $this->ADD_EDIT($Article,$request);
        }

   
    }
    public function deleteArticleById($id)
    {
        
        $article=Articles::where('id',$id);
      
        if($article->exists())
        {  
          
             
            return $article->delete();
        }
    }

    //For createOrUpdate function
    private function ADD_EDIT($Article,$request)
    {   
        
       
        $Article->date= now()->toDateString();


        $Article->title = $request->all()['title'];
        $Article->content = $request->all()['content'];
        $Article->article_category_id = $request->all()['article_category_id'];
      

        return $Article->save();
    }


    

}
