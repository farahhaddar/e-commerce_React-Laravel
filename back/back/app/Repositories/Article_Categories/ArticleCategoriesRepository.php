<?php
namespace App\Repositories\Article_Categories;

use App\ArticleCategories;

use App\Repositories\Interfaces\Articles_Categories_Interface\ArticleCatRepositoryInterface;
use File;
use App\FileType\FileType;
class ArticleCategoriesRepository implements ArticleCatRepositoryInterface
{

    public function getAll()
    {

        if (isset($_GET['name'])) {
            return ArticleCategories::with('articles')
            ->where('name', 'LIKE', '%' . $_GET['name'] . '%')
            ->paginate();
        }

        return ArticleCategories::with('articles')->paginate();
    }

    public function getById($id)
    {
        return ArticleCategories::with('articles')->find($id);
    }

    public function createOrUpdate($id = null,$request=null)
    {       

        if (!is_null($id)) {
            // update 
            $ArticleCat = ArticleCategories::find($id);
            if($ArticleCat!=null)
                return $this->ADD_EDIT($ArticleCat,$request);
            return null;
          
        } else {
            // create
            return $this->ADD_EDIT(null,$request);
        }

   
    }
    public function deleteById($id)
    {
        
        
        $ArticleCat=ArticleCategories::where('id',$id);
        if($ArticleCat->exists())
            {
                // $article->articles()->delete();
                if (File::exists('storage/'.$ArticleCat->first()->image)) 
                {
                FileType::destroy($ArticleCat->first()->image);
                }
                $ArticleCat->first()->articles()->delete();
                return $ArticleCat->delete();
            }
    }

    //For createOrUpdate function
    private function ADD_EDIT($ArticleCatUpdate,$request)
    {
        if(is_null($ArticleCatUpdate)){

        $ArticleCat = new ArticleCategories;

        
        if (File::exists('storage/'.$ArticleCat->image))
            FileType::destroy($ArticleCat->image);
        $ArticleCat->image= FileType::store( $request->file('image'),'ArticleCat');
        $ArticleCat->name = $request->all()['name'];
    }
    else{
        if (File::exists('storage/'.$ArticleCatUpdate->image))
            FileType::destroy($ArticleCatUpdate->image);
            if($request->all()['image']!="")
        $ArticleCatUpdate->image= FileType::store( $request->file('image'),'ArticleCat');

        if($request->all()['name']!="")
        $ArticleCatUpdate->name = $request->all()['name'];
        return $ArticleCatUpdate->save();

    }
        return $ArticleCat->save();
    }
    
    public function count(){
        return  ArticleCategories::count(); 
    }

}
