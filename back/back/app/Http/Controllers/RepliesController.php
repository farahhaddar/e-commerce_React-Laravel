<?php

namespace App\Http\Controllers;

use App\Replies;
use Illuminate\Http\Request;
use App\Response\Response;
use App\Http\Requests\RepliesRequest;
use App\Repositories\Interfaces\Replies_Interface\RepliesRepositoryInterface;
class RepliesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    protected $replies_repo = null;

    public function __construct(RepliesRepositoryInterface $replies_repo)
    {
        $this->replies_repo = $replies_repo;
    }



    public function count()
    {
        return $this->replies_repo->count();

    }


    public function index($rows)
    {
        //
        error_log('sd');
        $user_id=$comment_id=$searchr= "";
        if (isset($_GET['comment_id'])) {
            $comment_id = $_GET['comment_id'];
        }
        if (isset($_GET['user_id'])) {
            $user_id = $_GET['user_id'];
        }
        if (isset($_GET['reply'])) {
            $searchr = $_GET['reply'];
        }
        $reply = $this->replies_repo->getAll($rows,$searchr,$comment_id,$user_id);
        return $reply;
    }

  

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RepliesRequest $request)
    {
        //
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        $reply = $this->replies_repo->createOrUpdate(null,$request);
        return $reply;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Replies  $replies
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $reply = $this->replies_repo->getById($id);
        return $reply;
    }

   

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Replies  $replies
     * @return \Illuminate\Http\Response
     */
    public function update(RepliesRequest $request, $id)
    {
        //
        if ($request->validator->fails())  return Response::error(400, $request->validator->messages());
        $reply = $this->replies_repo->createOrUpdate($id,$request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Replies  $replies
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $this->replies_repo->deleteById($id);
    }
}
