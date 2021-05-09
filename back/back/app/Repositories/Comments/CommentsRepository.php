<?php
namespace App\Repositories\Comments;

use App\Comments;

use App\Repositories\Interfaces\Comments_Interface\CommentsRepositoryInterface;
use Illuminate\Support\Facades\Storage;
use File;
class CommentsRepository implements CommentsRepositoryInterface
{

    public function getAll($rows,$searchc,$user_id)
    {
        if($user_id==""){
            return Comments::with('users')->withCount('replies')
            ->where('comment', 'LIKE', '%' . $searchc . '%')
            ->orderBy('id','desc')
            ->paginate($rows);
        }
        else{
        return Comments::with('users')->withCount('replies')
        ->where('comment', 'LIKE', '%' . $searchc . '%')
        ->where('user_id', 'LIKE', '%' . $user_id . '%')
        ->orderBy('id','desc')
        ->paginate($rows);
    }
    }

    public function count(){
        return  Comments::count(); 
    }


    public function getById($id)
    {
        return Comments::with('users')->with('replies')->find($id);
    }

    public function createOrUpdate($id = null,$request=null)
    {
        if (!is_null($id)) {
            // update 
            $Comment = Comments::find($id);
            if($Comment!=null)
                return $this->ADD_EDIT($Comment,$request);
            return null;
          
        } else {
            // create
            $Comment = new Comments;
            return $this->ADD_EDIT(null,$request);
        }

   
    }
    public function deleteById($id)
    {
        
        $comment=Comments::where('id',$id);
      
        if($comment->exists())
        {  
            return $comment->delete();
        }
    }

    //For createOrUpdate function
    private function ADD_EDIT($Comment = null,$request)
    {   
        if(is_null($Comment)){
            $Comment = new Comments;
        }
        
        $Comment->comment = $request->all()['comment'];
        $Comment->user_id = $request->all()['user_id'];
      

        $Comment->save();
        $Com = new Comments;
        $Com = $Com::where('id',$Comment->id)->with('users')->get();
        return $Com;
    }
    

}
