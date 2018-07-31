<?php


namespace App\Http\Controllers;

use App\Http\Requests\StashStore;
use App\Http\Requests\StashUpdate;
use App\Stash;
use App\Http\Resources\StashResource;
use App\User;
use Illuminate\Http\Request;

sleep(1);

class StashController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        /** @var $user User */
        $user = auth()->user();
        return response()->json([
            'stashes' => StashResource::collection($user->stashes()->get()),
        ]);
    }

    public function store(StashStore $request)
    {
        $data = $request->validated();

        $stash = new Stash();
        $stash->user_id = auth()->user()->id;
        $stash->label = $data['label'];
        $stash->type = $data['type'];
        $stash->save();

        return response()->json([
            'stash' => new StashResource($stash)
        ]);
    }

    public function show(Stash $stash)
    {
        return response()->json([
            'stash' => new StashResource($stash)
        ]);
    }

    public function update(StashUpdate $request, Stash $stash)
    {
        if (auth()->user()->id !== $stash->user_id) {
            # TODO Translate
            return response()->json(['error' => 'You can only edit your own stashes.'], 403);
        }

        $stash->update($request->validated());

        return response()->json([
            'stash' => new StashResource($stash)
        ]);
    }

    public function destroy(Stash $stash)
    {
        $id = $stash->id;
        $stash->delete();

        return response()->json([ 'id' => $id ], 204);
    }

    public function types()
    {
        return response()->json([
            'types' => array_keys(Stash::STASH_TYPES),
        ]);
    }
}
