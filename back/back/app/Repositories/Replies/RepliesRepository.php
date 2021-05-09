<?php
namespace App\Repositories\Replies;

use App\Replies;

use App\Repositories\Interfaces\Replies_Interface\RepliesRepositoryInterface;
use Illuminate\Support\Facades\Storage;
use File;
class RepliesRepository implements RepliesRepositoryInterface
{

    public function getAll($rows,$searchr,$comment_id,$user_id)
    {
        error_log('a');
        return Replies::with('users')->with('comments')
        ->where('reply', 'LIKE', '%' . $searchr . '%')
        ->where('comment_id', '=',$comment_id)
        ->orderBy('id','desc')
        // ->where('user_id', '=',$user_id)
        ->paginate($rows);
    }

    public function getById($id)
    {
        return Replies::with('users')->with('comments')->find($id);
    }

    public function count(){
        return Replies::count(); 
    }

    public function createOrUpdate($id = null,$request=null)
    {
        if (!is_null($id)) {
            // update 
            $reply = Replies::find($id);
            if($reply!=null)
                return $this->ADD_EDIT($reply,$request);
            return null;
          
        } else {
            // create
            $reply = new Replies;
            return $this->ADD_EDIT(null,$request);
        }

   
    }
    public function deleteById($id)
    {
        
        $reply=Replies::where('id',$id);
      
        if($reply->exists())
        {  
            return $reply->delete();
        }
    }

    //For createOrUpdate function
    private function ADD_EDIT($Reply = null,$request)
    {   
        if(is_null($Reply)){
            $Reply = new Replies;
        }
        
        $Reply->comment_id = $request->all()['comment_id'];
        $Reply->user_id = $request->all()['user_id'];
        $Reply->reply = $request->all()['reply'];
        $Reply->save();
      

        // return $Reply;
        return Replies::with('users')->with('comments')->find($Reply->id);
    }
    

}
