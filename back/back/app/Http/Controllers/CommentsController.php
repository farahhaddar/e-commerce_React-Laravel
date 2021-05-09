<?php

namespace App\Http\Controllers;


use App\Http\Requests\CommentsRequest;
use App\Comments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Response\Response;
use App\Repositories\Interfaces\Comments_Interface\CommentsRepositoryInterface;
class CommentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $comments_repo = null;

    public function __construct(CommentsRepositoryInterface $comments_repo)
    {
        $this->comments_repo = $comments_repo;
    }

     
    public function count()
    {
        return $this->comments_repo->count();

    }

      
    public function index($rows)
    {
        //
        // $comment = Comments::all();
        $user_id=$searchc= "";
        if (isset($_GET['comment'])) {
            $searchc = $_GET['comment'];
        }
        if (isset($_GET['user_id'])) {
            $user_id = $_GET['user_id'];
        }
        
        $comment = $this->comments_repo->getAll($rows,$searchc,$user_id);
        return $comment;
    }

  

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CommentsRequest $request)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        $comment = $this->comments_repo->createOrUpdate(null,$request);
        return $comment;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        // $comment = Comments::find($id);
        $comment = $this->comments_repo->getById($id);
        return $comment;
    }

  

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        $comment = $this->comments_repo->createOrUpdate($id,$request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Comments  $comments
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        // $comment = Comments::find($id);
        // $comment->delete();
        $this->comments_repo->deleteById($id);
    }
}
