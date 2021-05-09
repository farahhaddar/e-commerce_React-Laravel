<?php
namespace App\Repositories\Interfaces\Articles_Interface;

interface ArticleRepositoryInterface
{

    public function getAllArticles();
    
    public function getLastTen();

    public function getArticleById($id);

    public function createOrUpdate($id = null,$request=null);

    public function deleteArticleById($id);
    
    public function count();


}
